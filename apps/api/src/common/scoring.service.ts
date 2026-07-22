import { BadRequestException, Injectable } from '@nestjs/common';
import { EvaluationConfig, RankRule } from '../database/entities';

export type SubmittedScore = {
  criterionId: string;
  score: number;
  note?: string;
};

export type ScoreResult = {
  totalScore: number;
  rank: RankRule;
  groupScores: Array<{ groupId: string; code: string; name: string; score: number; weight: number }>;
  itemScores: Array<{ criterionId: string; score: number; note?: string; normalizedScore: number }>;
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
      if (config.useCriterionWeights) {
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

  calculate(config: EvaluationConfig, submittedScores: SubmittedScore[]): ScoreResult {
    this.validateConfig(config);

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
        if (submitted.score < config.scaleMin || submitted.score > config.scaleMax) {
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
