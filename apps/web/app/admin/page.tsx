'use client';

import { useEffect, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CopyPlus, Eye, Plus, Save, Star, Trash2 } from 'lucide-react';
import { apiFetch, formatScore } from '@/lib/api';
import type { EvaluationConfig } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';

type DraftGroup = EvaluationConfig['groups'][number];
type DraftCriterion = DraftGroup['criteria'][number];

export default function AdminPage() {
  const [configs, setConfigs] = useState<EvaluationConfig[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [draft, setDraft] = useState<EvaluationConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [previewScore, setPreviewScore] = useState<{
    totalScore: number;
    rank: { code: string; name: string; color: string };
  } | null>(null);

  const load = () => {
    setLoading(true);
    apiFetch<EvaluationConfig[]>('/admin/evaluation-configs')
      .then((data) => {
        setConfigs(data);
        const first = data.find((item) => item.isDefault) ?? data[0];
        if (first) {
          setSelectedId(first.id);
          setDraft(JSON.parse(JSON.stringify(first)));
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const totals = useMemo(() => {
    if (!draft) return { groupTotal: 0, criterionTotals: [] as Array<{ code: string; total: number }> };
    return {
      groupTotal: draft.groups
        .filter((group) => group.isActive)
        .reduce((sum, group) => sum + Number(group.weight), 0),
      criterionTotals: draft.groups.map((group) => ({
        code: group.code,
        total: group.criteria
          .filter((criterion) => criterion.isActive)
          .reduce((sum, criterion) => sum + Number(criterion.weight), 0),
      })),
    };
  }, [draft]);

  const selectConfig = (id: string) => {
    const config = configs.find((item) => item.id === id);
    setSelectedId(id);
    setDraft(config ? JSON.parse(JSON.stringify(config)) : null);
    setPreviewScore(null);
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const saved = await apiFetch<EvaluationConfig>(`/admin/evaluation-configs/${draft.id}`, {
        method: 'PATCH',
        body: JSON.stringify(draft),
      });
      setMessage('Đã lưu cấu hình');
      setDraft(saved);
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const cloneConfig = async () => {
    if (!draft) return;
    const clone = {
      ...draft,
      name: `${draft.name} - bản sao`,
      isDefault: false,
      groups: draft.groups.map((group) => ({
        ...group,
        id: undefined,
        criteria: group.criteria.map((criterion) => ({ ...criterion, id: undefined })),
      })),
      scoreOptions: draft.scoreOptions.map((option) => ({ ...option, id: undefined })),
      rankRules: draft.rankRules.map((rank) => ({ ...rank, id: undefined })),
    };
    const saved = await apiFetch<EvaluationConfig>('/admin/evaluation-configs', {
      method: 'POST',
      body: JSON.stringify(clone),
    });
    setConfigs([saved, ...configs]);
    setSelectedId(saved.id);
    setDraft(saved);
    setMessage('Đã tạo bản sao cấu hình');
  };

  const setDefault = async () => {
    if (!draft) return;
    const saved = await apiFetch<EvaluationConfig>(`/admin/evaluation-configs/${draft.id}/set-default`, {
      method: 'POST',
    });
    setDraft(saved);
    setMessage('Đã đặt làm mặc định');
    load();
  };

  const remove = async () => {
    if (!draft || !confirm(`Xóa cấu hình ${draft.name}?`)) return;
    await apiFetch(`/admin/evaluation-configs/${draft.id}`, { method: 'DELETE' });
    setDraft(null);
    load();
  };

  const preview = () => {
    if (!draft) return;
    const activeGroups = draft.groups.filter((group) => group.isActive);
    const totalScore = activeGroups.reduce((sum, group) => sum + Number(group.weight), 0);
    const rank = draft.rankRules
      .filter((rule) => rule.isActive)
      .find((rule) => totalScore >= rule.minScore && totalScore <= rule.maxScore);

    if (!rank) {
      setPreviewScore(null);
      setError(`Không có rank phù hợp cho điểm preview ${formatScore(totalScore)}`);
      return;
    }

    setError('');
    setPreviewScore({ totalScore, rank });
  };

  if (loading) return <LoadingState label="Đang tải cấu hình admin" />;
  if (error && !draft) return <ErrorState message={error} />;
  if (!draft) return <EmptyState message="Chưa có bộ cấu hình đánh giá" />;

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Admin cấu hình đánh giá</h1>
          <p className="mt-1 text-sm text-slate-600">
            Quản trị bộ tiêu chí, trọng số, thang điểm, rank và kỳ đánh giá.
          </p>
        </div>
        <select
          value={selectedId}
          onChange={(event) => selectConfig(event.target.value)}
          className="focus-ring rounded-md border border-line bg-white px-3 py-2 text-sm"
        >
          {configs.map((config) => (
            <option key={config.id} value={config.id}>
              {config.isDefault ? '* ' : ''}
              {config.name}
            </option>
          ))}
        </select>
      </header>

      {error && <ErrorState message={error} />}
      {message && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {message}
        </div>
      )}

      <section className="grid gap-4 rounded-md border border-line bg-white p-4 lg:grid-cols-4">
        <Input label="Tên cấu hình" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} />
        <Input
          label="Kỳ đánh giá"
          value={draft.evaluationPeriod}
          onChange={(value) => setDraft({ ...draft, evaluationPeriod: value })}
        />
        <NumberInput label="Điểm min" value={draft.scaleMin} onChange={(value) => setDraft({ ...draft, scaleMin: value })} />
        <NumberInput label="Điểm max" value={draft.scaleMax} onChange={(value) => setDraft({ ...draft, scaleMax: value })} />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.isActive}
            onChange={(event) => setDraft({ ...draft, isActive: event.target.checked })}
          />
          Đang bật
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.useCriterionWeights}
            onChange={(event) => setDraft({ ...draft, useCriterionWeights: event.target.checked })}
          />
          Dùng trọng số tiêu chí con
        </label>
        <div className="text-sm">
          <div className="font-medium">Tổng trọng số nhóm</div>
          <div className={totals.groupTotal === 100 ? 'text-emerald-700' : 'text-red-600'}>
            {totals.groupTotal}%
          </div>
        </div>
        <div className="flex gap-2">
          <Action onClick={save} disabled={saving} icon={Save} label="Lưu" />
          <Action onClick={preview} icon={Eye} label="Preview" />
        </div>
        <div className="flex flex-wrap gap-2 lg:col-span-4">
          <Action onClick={cloneConfig} icon={CopyPlus} label="Tạo bản sao" />
          <Action onClick={addGroup} icon={Plus} label="Thêm nhóm" />
          <Action onClick={setDefault} icon={Star} label="Đặt mặc định" />
          <Action onClick={remove} icon={Trash2} label="Xóa" danger />
        </div>
      </section>

      {previewScore && (
        <section className="rounded-md border border-line bg-white p-4 text-sm">
          Preview bản nháp: <b>{formatScore(previewScore.totalScore)}</b> điểm, rank{' '}
          <span
            className="rounded px-2 py-1 font-semibold text-white"
            style={{ backgroundColor: previewScore.rank.color }}
          >
            {previewScore.rank.code} - {previewScore.rank.name}
          </span>
        </section>
      )}

      <section className="space-y-4">
        {draft.groups.map((group, groupIndex) => {
          const criterionTotal = totals.criterionTotals[groupIndex]?.total ?? 0;
          return (
            <div key={group.id ?? `${group.code}-${groupIndex}`} className="rounded-md border border-line bg-white">
              <div className="grid gap-3 border-b border-line p-4 md:grid-cols-[90px_1fr_120px_120px_130px]">
                <Input label="Mã nhóm" value={group.code} onChange={(value) => updateGroup(groupIndex, { code: value })} />
                <Input label="Tên nhóm" value={group.name} onChange={(value) => updateGroup(groupIndex, { name: value })} />
                <NumberInput
                  label="Trọng số"
                  value={group.weight}
                  onChange={(value) => updateGroup(groupIndex, { weight: value })}
                />
                <div className="text-sm">
                  <div className="mb-1 text-xs font-medium text-slate-600">Tổng tiêu chí</div>
                  <div className={criterionTotal === 100 ? 'text-emerald-700' : 'text-red-600'}>
                    {criterionTotal}%
                  </div>
                </div>
                <div className="self-end">
                  <Action onClick={() => addCriterion(groupIndex)} icon={Plus} label="Thêm tiêu chí" />
                </div>
              </div>
              <div className="divide-y divide-line">
                {group.criteria.map((criterion, criterionIndex) => (
                  <div
                    key={criterion.id ?? `${group.code}-${criterionIndex}`}
                    className="grid gap-3 p-4 md:grid-cols-[90px_1fr_120px_90px_44px]"
                  >
                    <Input
                      label="Mã"
                      value={criterion.code}
                      onChange={(value) => updateCriterion(groupIndex, criterionIndex, { code: value })}
                    />
                    <Input
                      label="Tiêu chí con"
                      value={criterion.name}
                      onChange={(value) => updateCriterion(groupIndex, criterionIndex, { name: value })}
                    />
                    <NumberInput
                      label="Trọng số"
                      value={criterion.weight}
                      onChange={(value) => updateCriterion(groupIndex, criterionIndex, { weight: value })}
                    />
                    <label className="flex items-center gap-2 self-end pb-2 text-sm">
                      <input
                        type="checkbox"
                        checked={criterion.isActive !== false}
                        onChange={(event) =>
                          updateCriterion(groupIndex, criterionIndex, { isActive: event.target.checked })
                        }
                      />
                      Bật
                    </label>
                    <button
                      type="button"
                      onClick={() => removeCriterion(groupIndex, criterionIndex)}
                      className="focus-ring self-end rounded-md border border-red-200 p-2 text-red-600"
                      title="Xóa tiêu chí"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-md border border-line bg-white p-4">
          <h2 className="mb-3 font-semibold">Thang điểm</h2>
          <div className="space-y-2">
            {draft.scoreOptions.map((option, index) => (
              <div key={option.id ?? option.value} className="grid grid-cols-[80px_1fr_80px] gap-2">
                <NumberInput label="Điểm" value={option.value} onChange={(value) => updateScoreOption(index, { value })} />
                <Input label="Nhãn" value={option.label} onChange={(value) => updateScoreOption(index, { label: value })} />
                <label className="flex items-center gap-2 self-end pb-2 text-sm">
                  <input
                    type="checkbox"
                    checked={option.isActive}
                    onChange={(event) => updateScoreOption(index, { isActive: event.target.checked })}
                  />
                  Bật
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-line bg-white p-4">
          <h2 className="mb-3 font-semibold">Luật xếp hạng</h2>
          <div className="space-y-2">
            {draft.rankRules.map((rank, index) => (
              <div key={rank.id ?? rank.code} className="grid grid-cols-[70px_1fr_90px_90px_90px] gap-2">
                <Input label="Mã" value={rank.code} onChange={(value) => updateRank(index, { code: value })} />
                <Input label="Tên" value={rank.name} onChange={(value) => updateRank(index, { name: value })} />
                <NumberInput label="Từ" value={rank.minScore} onChange={(value) => updateRank(index, { minScore: value })} />
                <NumberInput label="Đến" value={rank.maxScore} onChange={(value) => updateRank(index, { maxScore: value })} />
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-slate-600">Màu</span>
                  <input
                    type="color"
                    value={rank.color}
                    onChange={(event) => updateRank(index, { color: event.target.value })}
                    className="h-10 w-full rounded-md border border-line"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  function updateGroup(index: number, patch: Partial<DraftGroup>) {
    const groups = [...draft!.groups];
    groups[index] = { ...groups[index], ...patch };
    setDraft({ ...draft!, groups });
  }

  function addGroup() {
    const nextIndex = draft!.groups.length + 1;
    const nextGroup = {
      code: `N${nextIndex}`,
      name: 'Nhóm tiêu chí mới',
      weight: 0,
      sortOrder: nextIndex,
      isActive: true,
      criteria: [
        {
          code: `N${nextIndex}.1`,
          name: 'Tiêu chí con mới',
          description: '',
          weight: 100,
          sortOrder: 1,
          isActive: true,
        },
      ],
    } as DraftGroup;
    setDraft({ ...draft!, groups: [...draft!.groups, nextGroup] });
  }

  function addCriterion(groupIndex: number) {
    const groups = [...draft!.groups];
    const group = groups[groupIndex];
    const nextIndex = group.criteria.length + 1;
    const nextCriterion = {
      code: `${group.code}.${nextIndex}`,
      name: 'Tiêu chí con mới',
      description: '',
      weight: 0,
      sortOrder: nextIndex,
      isActive: true,
    } as DraftCriterion;
    groups[groupIndex] = { ...group, criteria: [...group.criteria, nextCriterion] };
    setDraft({ ...draft!, groups });
  }

  function updateCriterion(groupIndex: number, criterionIndex: number, patch: Partial<DraftCriterion>) {
    const groups = [...draft!.groups];
    const criteria = [...groups[groupIndex].criteria];
    criteria[criterionIndex] = { ...criteria[criterionIndex], ...patch };
    groups[groupIndex] = { ...groups[groupIndex], criteria };
    setDraft({ ...draft!, groups });
  }

  function removeCriterion(groupIndex: number, criterionIndex: number) {
    const groups = [...draft!.groups];
    groups[groupIndex] = {
      ...groups[groupIndex],
      criteria: groups[groupIndex].criteria.filter((_, index) => index !== criterionIndex),
    };
    setDraft({ ...draft!, groups });
  }

  function updateScoreOption(index: number, patch: Partial<EvaluationConfig['scoreOptions'][number]>) {
    const scoreOptions = [...draft!.scoreOptions];
    scoreOptions[index] = { ...scoreOptions[index], ...patch };
    setDraft({ ...draft!, scoreOptions });
  }

  function updateRank(index: number, patch: Partial<EvaluationConfig['rankRules'][number]>) {
    const rankRules = [...draft!.rankRules];
    rankRules[index] = { ...rankRules[index], ...patch };
    setDraft({ ...draft!, rankRules });
  }
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <input
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring w-full rounded-md border border-line px-3 py-2"
      />
    </label>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="focus-ring w-full rounded-md border border-line px-3 py-2"
      />
    </label>
  );
}

function Action({
  onClick,
  icon: Icon,
  label,
  disabled,
  danger,
}: {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`focus-ring flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold disabled:opacity-60 ${
        danger ? 'border border-red-200 text-red-600' : 'border border-line bg-white text-ink'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
