'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronsDown, ChevronsUp, Search } from 'lucide-react';
import { apiFetch, formatScore } from '@/lib/api';
import type { Evaluation, EvaluationConfig, Supplier } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';

type Scores = Record<string, { score: number; note: string }>;

const includesText = (value: string | undefined | null, query: string) =>
  (value ?? '').toLowerCase().includes(query.toLowerCase().trim());

function createDefaultScores(config: EvaluationConfig) {
  const initial: Scores = {};
  config.groups.forEach((group) => {
    group.criteria.forEach((criterion) => {
      initial[criterion.id] = { score: config.scaleMax, note: '' };
    });
  });
  return initial;
}

function getEvaluationSupplierId(evaluation: Evaluation) {
  return evaluation.supplierId ?? evaluation.supplier?.id;
}

function findEvaluation(evaluations: Evaluation[], supplierId: string, period: string) {
  return evaluations.find((evaluation) => getEvaluationSupplierId(evaluation) === supplierId && evaluation.period === period);
}

function getLatestSupplierEvaluation(evaluations: Evaluation[], supplierId: string) {
  return evaluations.find((evaluation) => getEvaluationSupplierId(evaluation) === supplierId);
}

function hydrateScoresFromEvaluation(config: EvaluationConfig, evaluation: Evaluation) {
  const nextScores = createDefaultScores(config);
  const nextTouched: Record<string, boolean> = {};

  evaluation.items?.forEach((item) => {
    nextScores[item.criterionId] = {
      score: item.score,
      note: item.note ?? '',
    };
    nextTouched[item.criterionId] = true;
  });

  return { scores: nextScores, touchedCriteria: nextTouched };
}

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
  const [touchedCriteria, setTouchedCriteria] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Collapse states for groups and sub-layers
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [collapsedLayers, setCollapsedLayers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    Promise.all([
      apiFetch<{ items: Supplier[] }>('/suppliers?limit=500'),
      apiFetch<EvaluationConfig>('/evaluation-configs/default/form-schema'),
      apiFetch<Evaluation[]>('/evaluations'),
    ])
      .then(([supplierData, configData, evaluationData]) => {
        setSuppliers(supplierData.items ?? []);
        setConfig(configData);
        setEvaluations(evaluationData);
        setPeriod(configData.evaluationPeriod);
        setSupplierId(supplierData.items?.[0]?.id ?? '');
        setScores(createDefaultScores(configData));
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

  useEffect(() => {
    if (!config || !supplierId) return;
    const latestEvaluation = getLatestSupplierEvaluation(evaluations, supplierId);
    setPeriod(latestEvaluation?.period ?? config.evaluationPeriod);
  }, [config, evaluations, supplierId]);

  const periodOptions = useMemo(() => {
    const values = [config?.evaluationPeriod, ...evaluations.map((evaluation) => evaluation.period)].filter(Boolean);
    return [...new Set(values as string[])].sort().reverse();
  }, [config?.evaluationPeriod, evaluations]);

  useEffect(() => {
    if (!config) return;

    const resetScores = () => {
      setScores(createDefaultScores(config));
      setTouchedCriteria({});
    };

    if (!supplierId || !period) {
      resetScores();
      return;
    }

    const existingEvaluation = findEvaluation(evaluations, supplierId, period);
    if (!existingEvaluation) {
      resetScores();
      return;
    }

    let cancelled = false;
    const applyEvaluation = (evaluation: Evaluation) => {
      if (cancelled) return;
      const hydrated = hydrateScoresFromEvaluation(config, evaluation);
      setScores(hydrated.scores);
      setTouchedCriteria(hydrated.touchedCriteria);
      setEvaluator(evaluation.evaluator);
    };

    if (existingEvaluation.items?.length) {
      applyEvaluation(existingEvaluation);
    } else {
      apiFetch<Evaluation>(`/evaluations/${existingEvaluation.id}`)
        .then(applyEvaluation)
        .catch((err: Error) => {
          if (!cancelled) setError(err.message);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [config, evaluations, period, supplierId]);

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

  const totalCriteria = useMemo(() => {
    return config?.groups.reduce((sum, group) => sum + group.criteria.length, 0) ?? 0;
  }, [config]);

  const enteredCriteria = useMemo(() => Object.keys(touchedCriteria).length, [touchedCriteria]);

  const markCriterionTouched = (criterionId: string) => {
    setTouchedCriteria((current) => ({ ...current, [criterionId]: true }));
  };

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const toggleLayer = (layerCode: string) => {
    setCollapsedLayers((prev) => ({ ...prev, [layerCode]: !prev[layerCode] }));
  };

  const handleExpandAll = () => {
    setCollapsedGroups({});
    setCollapsedLayers({});
  };

  const handleCollapseAll = () => {
    if (!config) return;
    const nextGroups: Record<string, boolean> = {};
    const nextLayers: Record<string, boolean> = {};
    config.groups.forEach((group) => {
      nextGroups[group.id] = true;
      const layers = groupCriteriaByLayer(group.criteria);
      layers.forEach((layer) => {
        nextLayers[layer.code] = true;
      });
    });
    setCollapsedGroups(nextGroups);
    setCollapsedLayers(nextLayers);
  };

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

  const saveDraft = () => {
    if (!config) return;
    localStorage.setItem(
      'ncc-evaluation-draft',
      JSON.stringify({
        supplierId,
        configId: config.id,
        period,
        evaluator,
        scores,
        touchedCriteria,
        savedAt: new Date().toISOString(),
      }),
    );
    setSuccess('Đã lưu nháp đánh giá trên trình duyệt');
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

      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-6">
        <section className="space-y-4">
          <div className="grid gap-3 rounded-md border border-line bg-white p-3 sm:p-4 md:grid-cols-2 2xl:grid-cols-4">
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

          {/* Quick Collapse / Expand All controls */}
          <div className="flex flex-col gap-2 px-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold text-slate-700">Các nhóm tiêu chí đánh giá ({config.groups.length} nhóm)</span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <button
                type="button"
                onClick={handleExpandAll}
                className="flex items-center gap-1 font-medium text-accent hover:underline"
              >
                <ChevronsDown size={14} />
                Mở rộng tất cả
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="flex items-center gap-1 font-medium text-slate-600 hover:underline"
              >
                <ChevronsUp size={14} />
                Thu gọn tất cả
              </button>
            </div>
          </div>

          {config.groups.map((group) => {
            const isGroupCollapsed = Boolean(collapsedGroups[group.id]);
            const layers = groupCriteriaByLayer(group.criteria);
            const totalCriteriaCount = group.criteria.length;

            return (
              <div key={group.id} className="rounded-md border border-line bg-white shadow-2xs overflow-hidden">
                {/* Group Header - Clickable to collapse */}
                <div
                  onClick={() => toggleGroup(group.id)}
                  className="flex cursor-pointer flex-col gap-2 border-b border-line bg-slate-50/80 px-3 py-3 transition hover:bg-slate-100/80 sm:flex-row sm:items-center sm:justify-between sm:px-4"
                >
                  <div className="flex items-center gap-2">
                    {isGroupCollapsed ? (
                      <ChevronRight size={18} className="text-slate-500" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-500" />
                    )}
                    <h2 className="font-semibold text-ink">
                      {group.code}. {group.name}
                    </h2>
                    <span className="shrink-0 rounded bg-slate-200 px-2 py-0.5 text-xs text-slate-600 font-medium">
                      {totalCriteriaCount} tiêu chí
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-600">Trọng số nhóm {group.weight}%</span>
                </div>

                {/* Group Content */}
                {!isGroupCollapsed && (
                  <div className="divide-y divide-line">
                    {layers.map((layer) => {
                      const isLayerCollapsed = Boolean(collapsedLayers[layer.code]);
                      return (
                        <div key={layer.code}>
                          {/* Layer Sub-header */}
                          <div
                            onClick={() => toggleLayer(layer.code)}
                            className="flex cursor-pointer items-center justify-between gap-3 bg-slate-100/60 px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-slate-200/60 sm:px-4 sm:pl-6"
                          >
                            <div className="flex items-center gap-2">
                              {isLayerCollapsed ? (
                                <ChevronRight size={16} className="text-slate-400" />
                              ) : (
                                <ChevronDown size={16} className="text-slate-400" />
                              )}
                              <span>
                                {layer.code}. {layer.name}
                              </span>
                            </div>
                            <span className="text-xs font-normal text-slate-500">
                              {layer.criteria.length} tiêu chí
                            </span>
                          </div>

                          {/* Criteria list inside layer */}
                          {!isLayerCollapsed && (
                            <div className="divide-y divide-line">
                              {layer.criteria.map((criterion) => (
                                <div key={criterion.id} className="grid gap-3 px-3 py-3 sm:px-4 sm:pl-8 2xl:grid-cols-[1fr_220px_1fr]">
                                  <div>
                                    <div className="font-medium text-ink">
                                      {criterion.code}. {criterion.name}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500">
                                      Trọng số {formatScore(criterion.weight)}% · Áp dụng:{' '}
                                      {criterion.applicableType ?? 'Tất cả'}
                                    </div>
                                    {criterion.description && (
                                      <div className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-600">
                                        {criterion.description}
                                      </div>
                                    )}
                                  </div>
                                  <select
                                    value={scores[criterion.id]?.score ?? config.scaleMin}
                                    onChange={(event) => {
                                      markCriterionTouched(criterion.id);
                                      setScores({
                                        ...scores,
                                        [criterion.id]: {
                                          ...scores[criterion.id],
                                          score: Number(event.target.value),
                                        },
                                      });
                                    }}
                                    className="focus-ring rounded-md border border-line px-3 py-2 text-sm bg-white"
                                  >
                                    {config.scoreOptions.map((option) => (
                                      <option key={option.id} value={option.value}>
                                        {option.value} - {option.label}
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    value={scores[criterion.id]?.note ?? ''}
                                    onChange={(event) => {
                                      markCriterionTouched(criterion.id);
                                      setScores({
                                        ...scores,
                                        [criterion.id]: {
                                          ...scores[criterion.id],
                                          note: event.target.value,
                                        },
                                      });
                                    }}
                                    placeholder="Ghi chú tiêu chí"
                                    className="focus-ring rounded-md border border-line px-3 py-2 text-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <aside className="mx-auto h-fit w-full max-w-md rounded-xl bg-[#087b72] px-4 py-5 text-white shadow-sm sm:px-5 sm:py-6 lg:sticky lg:top-4 lg:mx-0 lg:max-w-none">
          <h2 className="text-center text-lg font-bold">Bảng điểm thời gian thực</h2>
          <div className="mt-5 border-t border-white/15 pt-5">
            <div className="space-y-3">
              {preview?.groupScores.map((group) => (
                <div key={group.id} className="grid grid-cols-[1fr_72px] items-baseline gap-3">
                  <span className="min-w-0 text-sm font-medium leading-5 text-white/75">
                    {group.code}. {group.name}
                  </span>
                  <span className="text-right text-lg font-bold">{formatScore(group.score)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-dashed border-white/15 pt-5">
            <div className="flex items-baseline justify-between gap-5">
              <span className="text-lg font-medium">Tổng điểm</span>
              <span className="text-3xl font-bold">{preview ? formatScore(preview.totalScore) : '0.00'}</span>
            </div>
            <div className="mt-4 text-center text-sm font-semibold">
              Đã nhập: {enteredCriteria} / {totalCriteria} tiêu chí
            </div>
          </div>

          <div className="mt-5">
            {preview?.rank ? (
              <div
                className="rounded-full bg-white px-4 py-3 text-center text-sm font-bold"
                style={{ color: preview.rank.color }}
              >
                {preview.rank.code} - {preview.rank.name}
              </div>
            ) : (
              <div className="rounded-full bg-white px-4 py-3 text-center text-sm font-bold text-red-600">
                Chưa khớp rank
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              disabled={saving || !supplierId}
              className="focus-ring rounded-lg bg-[#c9ad57] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#b99c45] disabled:opacity-60"
            >
              {saving ? 'Đang lưu' : 'Hoàn thành'}
            </button>
            <button
              type="button"
              disabled={!supplierId}
              onClick={saveDraft}
              className="focus-ring rounded-lg bg-white px-3 py-3 text-sm font-bold text-[#006f68] transition hover:bg-slate-50 disabled:opacity-60"
            >
              Lưu nháp
            </button>
          </div>
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
              <div key={evaluation.id} className="grid gap-2 px-4 py-3 text-sm md:grid-cols-[1fr_100px_120px_140px] md:items-center md:gap-3 md:px-5">
                <div>
                  <div className="font-semibold">{evaluation.supplier?.name}</div>
                  <div className="text-slate-500">
                    {evaluation.period} - {evaluation.evaluator}
                  </div>
                </div>
                <div className="font-semibold md:text-right">{formatScore(evaluation.totalScore)}</div>
                <div className="md:text-center">
                  <span className="rounded px-2 py-1 text-xs font-semibold text-white" style={{ backgroundColor: evaluation.rankColor }}>
                    {evaluation.rankCode}
                  </span>
                </div>
                <div className="text-slate-500 md:text-right">{new Date(evaluation.createdAt).toLocaleDateString('vi-VN')}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
