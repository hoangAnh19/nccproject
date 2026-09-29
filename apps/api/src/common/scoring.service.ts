import { BadRequestException, Injectable } from '@nestjs/common';
import { EvaluationConfig, RankRule } from '../database/entities';
import { AnnualContext, calculateAnnual } from './annual-scoring';

export type SubmittedScore = {
  criterionId: string;
  score: number | null;
  note?: string;
};

export type ScoreResult = {
  totalScore: number;
  rank: RankRule;
  groupScores: Array<{ groupId: string; code: string; name: string; score: number; weight: number }>;
  itemScores: Array<{ criterionId: string; score: number | null; note?: string; normalizedScore: number }>;
};

const round2 = (value: number) => Math.round(value * 100) / 100;

@Injectable()
export class ScoringService {
  validateConfig(config: EvaluationConfig) {
    const activeGroups = (config.groups ?? []).filter((group) => group.isActive);
    const activeRanks = (config.rankRules ?? []).filter((rank) => rank.isActive);

    if (!config.name?.trim()) {
      throw new BadRequestException('Tên bộ cấu hình là bắt buộc');
    }
    if (config.scaleMin < 0 || config.scaleMax <= config.scaleMin) {
      throw new BadRequestException('Thang điểm không hợp lệ');
    }
    if (activeGroups.length === 0) {
      throw new BadRequestException('Cần ít nhất một nhóm tiêu chí đang bật');
    }

    const totalGroupWeight = round2(activeGroups.reduce((sum, group) => sum + Number(group.weight), 0));
    if (totalGroupWeight !== 100) {
      throw new BadRequestException(`Tổng trọng số nhóm phải bằng 100%, hiện tại ${totalGroupWeight}%`);
    }

    for (const group of activeGroups) {
      const activeCriteria = (group.criteria ?? []).filter((criterion) => criterion.isActive);
      if (activeCriteria.length === 0) {
        throw new BadRequestException(`Nhóm ${group.code} cần ít nhất một tiêu chí con đang bật`);
      }
      if (config.scoringMethod === 'layered') {
        const layers = new Map<string, number>();
        for (const criterion of activeCriteria) {
          const weight = Number(criterion.layer1Weight);
          if (!criterion.layer1Code || !Number.isFinite(weight) || weight < 0 || weight > 100) throw new BadRequestException('Trọng số Layer 1 không hợp lệ');
          if (layers.has(criterion.layer1Code) && layers.get(criterion.layer1Code) !== weight) throw new BadRequestException('Trọng số trong cùng Layer 1 phải thống nhất');
          layers.set(criterion.layer1Code, weight);
          if (!['supplier', 'contract'].includes(criterion.scope)) throw new BadRequestException('Phạm vi tiêu chí không hợp lệ');
        }
        if (round2([...layers.values()].reduce((a,b) => a+b,0)) !== 100) throw new BadRequestException(`Tổng trọng số Layer 1 nhóm ${group.code} phải bằng 100%`);
      } else if (config.useCriterionWeights) {
        const totalCriterionWeight = round2(
          activeCriteria.reduce((sum, criterion) => sum + Number(criterion.weight), 0),
        );
        if (totalCriterionWeight !== 100) {
          throw new BadRequestException(
            `Tổng trọng số tiêu chí trong nhóm ${group.code} phải bằng 100%, hiện tại ${totalCriterionWeight}%`,
          );
        }
      }
    }

    if (config.scoringMethod === 'layered') {
      if (activeGroups.map(g => g.code).sort().join(',') !== 'A,B,C,D') throw new BadRequestException('Bộ tiêu chí cần đủ nhóm A, B, C, D');
      for (const group of activeGroups) {
        for (const criterion of group.criteria.filter(c => c.isActive)) {
          const expected = group.code === 'C' || criterion.layer1Code === 'D4' ? 'contract' : 'supplier';
          if (criterion.scope !== expected) throw new BadRequestException(`Phạm vi ${criterion.code} phải là ${expected}`);
        }
      }
      const d = activeGroups.find(g => g.code === 'D')!;
      const layers = [...new Map(d.criteria.filter(c => c.isActive).map(c => [c.layer1Code, c])).values()];
      if (layers.filter(c => c.scope === 'supplier').reduce((s,c) => s+Number(c.layer1Weight),0) !== 60 || layers.filter(c => c.scope === 'contract').reduce((s,c) => s+Number(c.layer1Weight),0) !== 40) throw new BadRequestException('ESG cần 60% nhà cung cấp và 40% sản phẩm/dịch vụ');
    }

    this.validateRanks(activeRanks);
  }

  validateRanks(ranks: RankRule[]) {
    if (ranks.length === 0) {
      throw new BadRequestException('Cần ít nhất một luật xếp hạng đang bật');
    }

    const sorted = [...ranks].sort((left, right) => left.minScore - right.minScore);
    if (sorted[0].minScore > 0 || sorted[sorted.length - 1].maxScore < 100) {
      throw new BadRequestException('Rank phải bao phủ toàn bộ thang 0-100');
    }

    for (let index = 0; index < sorted.length; index += 1) {
      const rank = sorted[index];
      if (rank.minScore < 0 || rank.maxScore > 100 || rank.minScore > rank.maxScore) {
        throw new BadRequestException(`Khoảng điểm rank ${rank.code} không hợp lệ`);
      }
      const next = sorted[index + 1];
      if (!next) continue;
      if (next.minScore <= rank.maxScore) {
        throw new BadRequestException(`Rank ${rank.code} và ${next.code} đang chồng lấn`);
      }
      if (next.minScore - rank.maxScore > 0.011) {
        throw new BadRequestException(`Rank ${rank.code} và ${next.code} chưa bao phủ liên tục`);
      }
    }
  }

  calculate(config: EvaluationConfig, submittedScores: SubmittedScore[], context?: AnnualContext) {
    this.validateConfig(config);
    if (config.scoringMethod === 'layered') {
      if (!context) throw new BadRequestException('Cần lĩnh vực và danh sách hợp đồng để tính điểm');
      return calculateAnnual(config, submittedScores, context);
    }

    if (new Set(submittedScores.map(i => i.criterionId)).size !== submittedScores.length) throw new BadRequestException('Trùng tiêu chí');
    const allowedIds = new Set(config.groups.filter(g => g.isActive).flatMap(g => g.criteria.filter(c => c.isActive).map(c => c.id)));
    if (submittedScores.some(i => !allowedIds.has(i.criterionId))) throw new BadRequestException('Tiêu chí không thuộc cấu hình');

    const scoreMap = new Map(submittedScores.map((item) => [item.criterionId, item]));
    const activeGroups = [...config.groups]
      .filter((group) => group.isActive)
      .sort((left, right) => left.sortOrder - right.sortOrder);

    const itemScores: ScoreResult['itemScores'] = [];
    const groupScores = activeGroups.map((group) => {
      const criteria = [...group.criteria]
        .filter((criterion) => criterion.isActive)
        .sort((left, right) => left.sortOrder - right.sortOrder);

      let rawGroupScore = 0;
      for (const criterion of criteria) {
        const submitted = scoreMap.get(criterion.id);
        if (!submitted) {
          throw new BadRequestException(`Thiếu điểm cho tiêu chí ${criterion.code}`);
        }
        if (submitted.score === null || !Number.isInteger(submitted.score) || submitted.score < config.scaleMin || submitted.score > config.scaleMax) {
          throw new BadRequestException(`Điểm tiêu chí ${criterion.code} nằm ngoài thang cho phép`);
        }
        const normalizedScore = round2((submitted.score / config.scaleMax) * 100);
        itemScores.push({
          criterionId: criterion.id,
          score: submitted.score,
          note: submitted.note,
          normalizedScore,
        });
        if (config.useCriterionWeights) {
          rawGroupScore += (submitted.score * criterion.weight) / 100;
        } else {
          rawGroupScore += submitted.score / criteria.length;
        }
      }

      return {
        groupId: group.id,
        code: group.code,
        name: group.name,
        score: round2((rawGroupScore / config.scaleMax) * 100),
        weight: group.weight,
      };
    });

    const totalScore = round2(
      groupScores.reduce((sum, group) => sum + (group.score * group.weight) / 100, 0),
    );
    const rank = [...config.rankRules]
      .filter((rule) => rule.isActive)
      .find((rule) => totalScore >= rule.minScore && totalScore <= rule.maxScore);

    if (!rank) {
      throw new BadRequestException(`Không tìm thấy rank phù hợp cho điểm ${totalScore}`);
    }

    return { totalScore, rank, groupScores, itemScores };
  }
}
