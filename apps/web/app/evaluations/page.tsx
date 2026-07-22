'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Save, Search } from 'lucide-react';
import { apiFetch, formatScore } from '@/lib/api';
import type { Evaluation, EvaluationConfig, Supplier } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';

type Scores = Record<string, { score: number; note: string }>;

const includesText = (value: string | undefined | null, query: string) =>
  (value ?? '').toLowerCase().includes(query.toLowerCase().trim());

function groupCriteriaByLayer(criteria: EvaluationConfig['groups'][number]['criteria']) {
  const layers = new Map<
    string,
    {
      code: string;
      name: string;
      criteria: EvaluationConfig['groups'][number]['criteria'];
    }
  >();

  criteria.forEach((criterion) => {
    const code = criterion.layer1Code ?? criterion.code.split('.')[0];
    const name = criterion.layer1Name ?? 'Nhóm tiêu chí';
    const current = layers.get(code) ?? { code, name, criteria: [] };
    current.criteria.push(criterion);
    layers.set(code, current);
  });

  return [...layers.values()];
}

export default function EvaluationsPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [config, setConfig] = useState<EvaluationConfig | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [supplierId, setSupplierId] = useState('');
  const [supplierQuery, setSupplierQuery] = useState('');
  const [periodSearch, setPeriodSearch] = useState('');
  const [period, setPeriod] = useState('');
  const [evaluator, setEvaluator] = useState('anhth12');
  const [scores, setScores] = useState<Scores>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    Promise.all([
      apiFetch<Supplier[]>('/suppliers'),
      apiFetch<EvaluationConfig>('/evaluation-configs/default/form-schema'),
      apiFetch<Evaluation[]>('/evaluations'),
    ])
      .then(([supplierData, configData, evaluationData]) => {
        setSuppliers(supplierData);
        setConfig(configData);
        setEvaluations(evaluationData);
        setPeriod(configData.evaluationPeriod);
        setSupplierId(supplierData[0]?.id ?? '');
        const initial: Scores = {};
        configData.groups.forEach((group) => {
          group.criteria.forEach((criterion) => {
            initial[criterion.id] = { score: configData.scaleMax, note: '' };
          });
        });
        setScores(initial);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredSuppliers = useMemo(() => {
    if (!supplierQuery.trim()) return suppliers;
    return suppliers.filter(
      (supplier) =>
        includesText(supplier.name, supplierQuery) ||
        includesText(supplier.code, supplierQuery) ||
        includesText(supplier.taxCode, supplierQuery),
    );
  }, [supplierQuery, suppliers]);

  useEffect(() => {
    if (filteredSuppliers.length === 0) {
      setSupplierId('');
      return;
    }
    if (!filteredSuppliers.some((supplier) => supplier.id === supplierId)) {
      setSupplierId(filteredSuppliers[0].id);
    }
  }, [filteredSuppliers, supplierId]);

  const periodOptions = useMemo(() => {
    const values = [config?.evaluationPeriod, ...evaluations.map((evaluation) => evaluation.period)].filter(Boolean);
    return [...new Set(values as string[])].sort().reverse();
  }, [config?.evaluationPeriod, evaluations]);

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((evaluation) => {
      const supplierMatched =
        !supplierQuery.trim() ||
        includesText(evaluation.supplier?.name, supplierQuery) ||
        includesText(evaluation.supplier?.code, supplierQuery) ||
        includesText(evaluation.supplier?.taxCode, supplierQuery);
      const periodMatched = !periodSearch.trim() || includesText(evaluation.period, periodSearch);
      return supplierMatched && periodMatched;
    });
  }, [evaluations, periodSearch, supplierQuery]);

  const preview = useMemo(() => {
    if (!config) return null;
    const groupScores = config.groups.map((group) => {
      let raw = 0;
      group.criteria.forEach((criterion) => {
        const value = scores[criterion.id]?.score ?? config.scaleMin;
        raw += config.useCriterionWeights ? (value * criterion.weight) / 100 : value / group.criteria.length;
      });
      return { ...group, score: (raw / config.scaleMax) * 100 };
    });
    const totalScore = groupScores.reduce((sum, group) => sum + (group.score * group.weight) / 100, 0);
    const rank = config.rankRules.find((rule) => totalScore >= rule.minScore && totalScore <= rule.maxScore);
    return { totalScore, rank, groupScores };
  }, [config, scores]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!config) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        supplierId,
        configId: config.id,
        period,
        evaluator,
        items: Object.entries(scores).map(([criterionId, value]) => ({
          criterionId,
          score: Number(value.score),
          note: value.note,
        })),
      };
      const saved = await apiFetch<Evaluation>('/evaluations', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setSuccess(`Đã lưu đánh giá ${saved.rankCode} với ${formatScore(saved.totalScore)} điểm`);
      setEvaluations([saved, ...evaluations]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState label="Đang tải form đánh giá" />;
  if (error && !config) return <ErrorState message={error} />;
  if (!config) return <EmptyState message="Chưa có cấu hình đánh giá mặc định" />;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink">Đánh giá nhà cung cấp</h1>
        <p className="mt-1 text-sm text-slate-600">{config.name} - form sinh từ cấu hình trong database.</p>
      </header>

      {error && <ErrorState message={error} />}
      {success && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <div className="grid gap-3 rounded-md border border-line bg-white p-4 md:grid-cols-4">
            <label className="relative text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-600">Tìm nhà cung cấp</span>
              <Search className="absolute left-3 top-8 text-slate-400" size={16} />
              <input
                value={supplierQuery}
                onChange={(event) => setSupplierQuery(event.target.value)}
                placeholder="Tên, mã, mã số thuế"
                className="focus-ring w-full rounded-md border border-line py-2 pl-9 pr-3"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-600">Nhà cung cấp</span>
              <select
                value={supplierId}
                disabled={filteredSuppliers.length === 0}
                onChange={(event) => setSupplierId(event.target.value)}
                className="focus-ring w-full rounded-md border border-line px-3 py-2 disabled:bg-slate-100"
              >
                {filteredSuppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.code} - {supplier.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-600">Kỳ đánh giá</span>
              <input
                list="period-options"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="focus-ring w-full rounded-md border border-line px-3 py-2"
              />
              <datalist id="period-options">
                {periodOptions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-600">Người đánh giá</span>
              <input
                value={evaluator}
                onChange={(event) => setEvaluator(event.target.value)}
                className="focus-ring w-full rounded-md border border-line px-3 py-2"
              />
            </label>
          </div>

          {filteredSuppliers.length === 0 && <EmptyState message="Không tìm thấy nhà cung cấp phù hợp để đánh giá" />}

          {config.groups.map((group) => (
            <div key={group.id} className="rounded-md border border-line bg-white">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <h2 className="font-semibold text-ink">
                  {group.code}. {group.name}
                </h2>
                <span className="text-sm text-slate-600">Trọng số nhóm {group.weight}%</span>
              </div>
              <div className="divide-y divide-line">
                {groupCriteriaByLayer(group.criteria).map((layer) => (
                  <div key={layer.code}>
                    <div className="bg-slate-50 px-4 py-3 text-sm font-semibold text-ink">
                      {layer.code}. {layer.name}
                    </div>
                    <div className="divide-y divide-line">
                      {layer.criteria.map((criterion) => (
                        <div key={criterion.id} className="grid gap-3 px-4 py-3 lg:grid-cols-[1fr_220px_1fr]">
                          <div>
                            <div className="font-medium text-ink">
                              {criterion.code}. {criterion.name}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              Trọng số {formatScore(criterion.weight)}% · Áp dụng: {criterion.applicableType ?? 'Tất cả'}
                            </div>
                            {criterion.description && (
                              <div className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-600">
                                {criterion.description}
                              </div>
                            )}
                          </div>
                          <select
                            value={scores[criterion.id]?.score ?? config.scaleMin}
                            onChange={(event) =>
                              setScores({
                                ...scores,
                                [criterion.id]: { ...scores[criterion.id], score: Number(event.target.value) },
                              })
                            }
                            className="focus-ring rounded-md border border-line px-3 py-2 text-sm"
                          >
                            {config.scoreOptions.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.value} - {option.label}
                              </option>
                            ))}
                          </select>
                          <input
                            value={scores[criterion.id]?.note ?? ''}
                            onChange={(event) =>
                              setScores({
                                ...scores,
                                [criterion.id]: { ...scores[criterion.id], note: event.target.value },
                              })
                            }
                            placeholder="Ghi chú tiêu chí"
                            className="focus-ring rounded-md border border-line px-3 py-2 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-md border border-line bg-white p-5">
          <h2 className="font-semibold text-ink">Preview tạm</h2>
          <div className="mt-4 text-4xl font-bold text-ink">{preview ? formatScore(preview.totalScore) : '0.00'}</div>
          <div className="mt-2">
            {preview?.rank ? (
              <span className="rounded px-2 py-1 text-sm font-semibold text-white" style={{ backgroundColor: preview.rank.color }}>
                {preview.rank.code} - {preview.rank.name}
              </span>
            ) : (
              <span className="text-sm text-red-600">Chưa khớp rank</span>
            )}
          </div>
          <div className="mt-5 space-y-2">
            {preview?.groupScores.map((group) => (
              <div key={group.id} className="text-sm">
                <div className="flex justify-between">
                  <span>{group.code}</span>
                  <span className="font-semibold">{formatScore(group.score)}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${group.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button
            disabled={saving || !supplierId}
            className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Save size={16} />
            Lưu đánh giá
          </button>
        </aside>
      </form>

      <section className="rounded-md border border-line bg-white">
        <div className="grid gap-3 border-b border-line px-5 py-4 md:grid-cols-[1fr_260px]">
          <div className="font-semibold text-ink">Lịch sử đánh giá</div>
          <label className="relative text-sm">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              value={periodSearch}
              onChange={(event) => setPeriodSearch(event.target.value)}
              placeholder="Tìm kỳ đánh giá"
              className="focus-ring w-full rounded-md border border-line py-2 pl-9 pr-3"
            />
          </label>
        </div>
        {filteredEvaluations.length === 0 ? (
          <div className="p-5">
            <EmptyState message="Không có phiếu đánh giá phù hợp" />
          </div>
        ) : (
          <div className="divide-y divide-line">
            {filteredEvaluations.slice(0, 12).map((evaluation) => (
              <div key={evaluation.id} className="grid grid-cols-[1fr_100px_120px_140px] items-center gap-3 px-5 py-3 text-sm">
                <div>
                  <div className="font-semibold">{evaluation.supplier?.name}</div>
                  <div className="text-slate-500">
                    {evaluation.period} - {evaluation.evaluator}
                  </div>
                </div>
                <div className="text-right font-semibold">{formatScore(evaluation.totalScore)}</div>
                <div className="text-center">
                  <span className="rounded px-2 py-1 text-xs font-semibold text-white" style={{ backgroundColor: evaluation.rankColor }}>
                    {evaluation.rankCode}
                  </span>
                </div>
                <div className="text-right text-slate-500">{new Date(evaluation.createdAt).toLocaleDateString('vi-VN')}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
