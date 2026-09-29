import { BadRequestException } from '@nestjs/common';
import { EvaluationConfig, EvaluationCriterion } from '../database/entities';
import type { SubmittedScore } from './scoring.service';

export type ContractSubmission = {
  code: string; name: string; procurementType: string; evaluator: string; items: SubmittedScore[];
};
export type AnnualContext = { procurementField: string; contracts: ContractSubmission[] };
const fail = (message: string): never => { throw new BadRequestException(message); };
const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function applicable(criterion: EvaluationCriterion, field: string, types: string[]) {
  return (!criterion.applicableFields?.length || criterion.applicableFields.includes(field)) &&
    (!criterion.applicableType || types.some(type => criterion.applicableType!.split(',').map(v => v.trim()).includes(type)));
}

export function calculateAnnual(config: EvaluationConfig, items: SubmittedScore[], context: AnnualContext) {
  if (!config.procurementFields?.includes(context.procurementField)) fail('Chọn lĩnh vực mua sắm hợp lệ');
  if (!context.contracts?.length) fail('Cần ít nhất một hợp đồng trong năm đánh giá');
  const codes = new Set<string>();
  for (const contract of context.contracts) {
    const code = contract.code?.trim().toLocaleLowerCase();
    if (!code || !contract.name?.trim() || !contract.evaluator?.trim()) fail('Hợp đồng cần mã, tên và người/đơn vị đánh giá');
    if (codes.has(code)) fail(`Trùng mã hợp đồng ${contract.code}`);
    codes.add(code);
    if (!['Hàng hóa', 'TV', 'PTV'].includes(contract.procurementType)) fail('Loại hình hợp đồng không hợp lệ');
  }
  const groups = config.groups.filter(g => g.isActive);
  const criteria = groups.flatMap(g => g.criteria.filter(c => c.isActive));
  const types = [...new Set(context.contracts.map(c => c.procurementType))];
  const results: Array<{ criterionId: string; score: number | null; note?: string; normalizedScore: number }> = [];

  function scoreSection(section: EvaluationCriterion[], submitted: SubmittedScore[], selectedTypes: string[]) {
    const selected = section.filter(c => applicable(c, context.procurementField, selectedTypes));
    const expected = new Map(selected.map(c => [c.id, c]));
    const map = new Map<string, SubmittedScore>();
    for (const item of submitted) {
      if (!expected.has(item.criterionId)) fail('Có tiêu chí không thuộc phạm vi đánh giá');
      if (map.has(item.criterionId)) fail('Một tiêu chí được gửi nhiều lần');
      map.set(item.criterionId, item);
    }
    for (const criterion of selected) {
      const item = map.get(criterion.id) ?? fail(`Chưa đánh giá ${criterion.code}`);
      if (item.score === null) {
        if (!item.note?.trim()) fail(`N/A tại ${criterion.code} cần lý do`);
      } else if (!Number.isInteger(item.score) || item.score < config.scaleMin || item.score > config.scaleMax ||
        (criterion.allowedScores?.length && !criterion.allowedScores.includes(item.score))) {
        fail(`Điểm ${criterion.code} không đúng thang điểm của tiêu chí`);
      }
    }
    const layers = [...new Set(section.map(c => c.layer1Code))].map(code => {
      const layer = section.filter(c => c.layer1Code === code);
      const active = selected.filter(c => c.layer1Code === code && map.get(c.id)!.score !== null);
      const score = active.length ? active.reduce((sum, c) => sum + map.get(c.id)!.score!, 0) / active.length / config.scaleMax * 100 : null;
      return { code, weight: Number(layer[0].layer1Weight), score, scored: active.length };
    });
    const denominator = layers.reduce((sum, l) => sum + (l.score === null ? 0 : l.weight), 0);
    return {
      score: denominator > 0 ? layers.reduce((sum, l) => sum + (l.score ?? 0) * l.weight, 0) / denominator : null,
      layers,
      items: selected.map(c => ({ ...map.get(c.id)!, normalizedScore: map.get(c.id)!.score === null ? 0 : map.get(c.id)!.score! / config.scaleMax * 100 })),
    };
  }

  const supplierCriteria = criteria.filter(c => c.scope === 'supplier');
  // Validate the entire supplier submission before partitioning, including unknown and duplicate IDs.
  const supplier = scoreSection(supplierCriteria, items, types);
  results.push(...supplier.items);
  const supplierGroups = ['A', 'B', 'D'].map(code => {
    const section = groups.find(g => g.code === code)!.criteria.filter(c => c.isActive && c.scope === 'supplier');
    const ids = new Set(section.map(c => c.id));
    return { code, ...scoreSection(section, items.filter(i => ids.has(i.criterionId)), types) };
  });
  const contracts = context.contracts.map(contract => {
    const section = criteria.filter(c => c.scope === 'contract');
    const checked = scoreSection(section, contract.items, [contract.procurementType]);
    const performanceCriteria = groups.find(g => g.code === 'C')!.criteria.filter(c => c.isActive);
    const cIds = new Set(performanceCriteria.map(c => c.id));
    const performance = scoreSection(performanceCriteria, contract.items.filter(i => cIds.has(i.criterionId)), [contract.procurementType]);
    if (performance.score === null) fail(`Hợp đồng ${contract.code} chưa có tiêu chí C được chấm điểm`);
    const product = scoreSection(section.filter(c => !cIds.has(c.id)), contract.items.filter(i => !cIds.has(i.criterionId)), [contract.procurementType]);
    return { ...contract, items: checked.items, performanceScore: performance.score!, productScore: product.score, layers: { performance: performance.layers, product: product.layers } };
  });
  const avg = (values: number[]) => values.length ? values.reduce((a,b) => a+b,0) / values.length : null;
  const a = supplierGroups.find(g => g.code === 'A')!.score;
  const b = supplierGroups.find(g => g.code === 'B')!.score;
  const dSupplier = supplierGroups.find(g => g.code === 'D')!.score;
  if (a === null || b === null || dSupplier === null) fail('Nhóm A, B và ESG nhà cung cấp cần ít nhất một tiêu chí có điểm');
  const c = avg(contracts.map(c => c.performanceScore))!;
  const dProduct = avg(contracts.flatMap(c => c.productScore === null ? [] : [c.productScore]));
  const dLayers = groups.find(g => g.code === 'D')!.criteria.filter(c => c.isActive);
  const uniqueD = [...new Map(dLayers.map(c => [c.layer1Code, c])).values()];
  const supplierDWeight = uniqueD.filter(c => c.scope === 'supplier').reduce((s,c) => s + Number(c.layer1Weight), 0);
  const productDWeight = uniqueD.filter(c => c.scope === 'contract').reduce((s,c) => s + Number(c.layer1Weight), 0);
  const effectiveD = supplierDWeight + (dProduct === null ? 0 : productDWeight);
  const d = (dSupplier! * supplierDWeight + (dProduct ?? 0) * productDWeight) / effectiveD;
  const scores: Record<string, number> = { A: a!, B: b!, C: c, D: d };
  const groupScores = groups.map(g => ({ groupId: g.id, code: g.code, name: g.name, score: round(scores[g.code]), weight: g.weight * (g.code === 'D' ? effectiveD / 100 : 1) }));
  const denominator = groupScores.reduce((s,g) => s+g.weight,0);
  const totalScore = round(groups.reduce((sum,g) => sum + scores[g.code] * g.weight * (g.code === 'D' ? effectiveD / 100 : 1),0) / denominator);
  const rank = config.rankRules.find(r => r.isActive && totalScore >= r.minScore && totalScore <= r.maxScore) ?? fail('Không tìm thấy xếp hạng');
  return { totalScore, rank, groupScores, itemScores: results, contracts,
    calculationDetails: { supplierGroups, performance: c, supplierEsg: dSupplier, productEsg: dProduct,
      effectiveWeight: denominator, procurementTypes: types, explanation: 'N/A loại khỏi bình quân trong Layer 1; Layer 1 rỗng loại khỏi cấu phần. C và ESG SP/DV bình quân các hợp đồng có điểm. Cấu phần SP/DV không áp dụng loại khỏi mẫu số tổng.' } };
}
