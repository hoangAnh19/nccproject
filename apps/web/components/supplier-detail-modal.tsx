'use client';

import { useEffect, useState } from 'react';
import { Award, Calendar, CheckCircle2, Clock, User, X } from 'lucide-react';
import { apiFetch, formatScore } from '@/lib/api';
import type { Evaluation, Supplier } from '@/lib/types';
import { EmptyState, LoadingState } from './state';

interface SupplierDetailModalProps {
  supplierId: string | null;
  onClose: () => void;
}

export function SupplierDetailModal({ supplierId, onClose }: SupplierDetailModalProps) {
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [selectedPastEvaluation, setSelectedPastEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    if (!supplierId) return;
    setLoading(true);
    setError('');

    apiFetch<Supplier>(`/suppliers/${supplierId}`)
      .then((data) => {
        setSupplier(data);
        if (data.evaluations && data.evaluations.length > 1) {
          setSelectedPastEvaluation(data.evaluations[1]);
        } else if (data.evaluations && data.evaluations.length === 1) {
          setSelectedPastEvaluation(data.evaluations[0]);
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [supplierId]);

  if (!supplierId) return null;

  const currentEvaluation = supplier?.evaluations && supplier.evaluations.length > 0 ? supplier.evaluations[0] : null;
  const historyList = supplier?.evaluations ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-xl border border-line">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-ink">{supplier?.name || 'Chi tiết nhà cung cấp'}</h2>
              {supplier?.type && (
                <span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                  {supplier.type}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Mã: <span className="font-medium text-slate-700">{supplier?.code}</span> | MST:{' '}
              <span className="font-medium text-slate-700">{supplier?.taxCode}</span>
              {supplier?.contactName && ` | Liên hệ: ${supplier.contactName}`}
              {supplier?.phone && ` (${supplier.phone})`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        {loading ? (
          <div className="p-12">
            <LoadingState label="Đang tải dữ liệu nhà cung cấp..." />
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 font-medium">{error}</div>
        ) : !supplier ? (
          <div className="p-8">
            <EmptyState message="Không tìm thấy thông tin nhà cung cấp" />
          </div>
        ) : (
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 divide-x divide-line border-b border-line bg-white px-6 py-3 text-sm">
              <div className="flex items-center gap-3">
                <Award className="text-accent" size={24} />
                <div>
                  <div className="text-xs text-slate-500">Điểm đánh giá mới nhất</div>
                  <div className="text-lg font-bold text-ink">{formatScore(supplier.latestScore)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-4">
                <CheckCircle2 className="text-emerald-600" size={24} />
                <div>
                  <div className="text-xs text-slate-500">Xếp hạng (Rank)</div>
                  <div className="flex items-center gap-2">
                    {supplier.latestRankCode ? (
                      <span
                        className="rounded px-2 py-0.5 text-xs font-bold text-white"
                        style={{ backgroundColor: supplier.latestRankColor ?? '#64748b' }}
                      >
                        Rank {supplier.latestRankCode}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Chưa xếp hạng</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-4">
                <Clock className="text-blue-600" size={24} />
                <div>
                  <div className="text-xs text-slate-500">Đánh giá gần nhất</div>
                  <div className="text-sm font-semibold text-slate-700">
                    {supplier.lastEvaluatedAt
                      ? new Date(supplier.lastEvaluatedAt).toLocaleDateString('vi-VN')
                      : 'Chưa có'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Header */}
            <div className="flex border-b border-line bg-slate-50 px-6">
              <button
                onClick={() => setActiveTab('current')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                  activeTab === 'current'
                    ? 'border-accent text-accent bg-white'
                    : 'border-transparent text-slate-600 hover:text-ink'
                }`}
              >
                <Calendar size={16} />
                1. Điểm đang đánh giá kỳ hiện tại
                {currentEvaluation && (
                  <span className="rounded bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                    {currentEvaluation.period}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                  activeTab === 'history'
                    ? 'border-accent text-accent bg-white'
                    : 'border-transparent text-slate-600 hover:text-ink'
                }`}
              >
                <Clock size={16} />
                2. Lịch sử các kỳ đánh giá cũ ({historyList.length})
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'current' ? (
                <EvaluationDetailView evaluation={currentEvaluation} isCurrent />
              ) : (
                <div className="space-y-6">
                  {historyList.length === 0 ? (
                    <EmptyState message="Chưa có lịch sử đánh giá nào cho nhà cung cấp này" />
                  ) : (
                    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                      {/* Left Sidebar: List of past evaluations */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Chọn kỳ đánh giá
                        </h3>
                        <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
                          {historyList.map((item, index) => {
                            const isSelected = selectedPastEvaluation?.id === item.id;
                            const isLatest = index === 0;
                            return (
                              <button
                                key={item.id}
                                onClick={() => setSelectedPastEvaluation(item)}
                                className={`w-full text-left rounded-md border p-3 text-sm transition ${
                                  isSelected
                                    ? 'border-accent bg-accent/5 font-semibold text-accent shadow-xs'
                                    : 'border-line bg-white hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold">{item.period}</span>
                                  <span
                                    className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                                    style={{ backgroundColor: item.rankColor }}
                                  >
                                    Rank {item.rankCode}
                                  </span>
                                </div>
                                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                                  <span>Điểm: {formatScore(item.totalScore)}</span>
                                  <span>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                                </div>
                                {isLatest && (
                                  <span className="mt-1 inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    Kỳ mới nhất
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Panel: Selected evaluation details */}
                      <div>
                        {selectedPastEvaluation ? (
                          <div className="rounded-md border border-line bg-slate-50/50 p-4">
                            <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
                              <h3 className="font-bold text-ink flex items-center gap-2">
                                Chi tiết đánh giá: {selectedPastEvaluation.period}
                              </h3>
                              <span className="text-xs text-slate-500">
                                Thực hiện ngày {new Date(selectedPastEvaluation.createdAt).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                            <EvaluationDetailView evaluation={selectedPastEvaluation} />
                          </div>
                        ) : (
                          <EmptyState message="Chọn một kỳ đánh giá từ danh sách bên trái để xem chi tiết" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="border-t border-line px-6 py-3 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

function EvaluationDetailView({ evaluation, isCurrent }: { evaluation: Evaluation | null; isCurrent?: boolean }) {
  if (!evaluation) {
    return (
      <EmptyState
        message={
          isCurrent
            ? 'Nhà cung cấp này chưa được đánh giá ở kỳ hiện tại.'
            : 'Chưa chọn thông tin phiếu đánh giá.'
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Evaluation Overview Box */}
      <div className="rounded-md border border-line bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500">Kỳ đánh giá</span>
            <div className="text-base font-bold text-ink">{evaluation.period}</div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Người đánh giá</span>
            <div className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              {evaluation.evaluator}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Tổng điểm</span>
            <div className="text-xl font-bold text-accent">{formatScore(evaluation.totalScore)} / 100</div>
          </div>
          <div>
            <span className="text-xs text-slate-500 block mb-1">Xếp hạng</span>
            <span
              className="rounded px-3 py-1 text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: evaluation.rankColor }}
            >
              Rank {evaluation.rankCode} - {evaluation.rankName}
            </span>
          </div>
        </div>
      </div>

      {/* Group Scores Breakdown */}
      <div>
        <h4 className="text-sm font-bold text-ink mb-2">Điểm theo nhóm tiêu chí</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {evaluation.groupScores?.map((group) => (
            <div key={group.groupId} className="rounded-md border border-line bg-white p-3 text-sm">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-ink">
                  {group.code}. {group.name}
                </span>
                <span className="text-accent">{formatScore(group.score)}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.min(group.score, 100)}%` }} />
                </div>
                <span className="text-xs text-slate-500 font-medium">Trọng số {group.weight}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Criteria Score Items Detail Table */}
      {evaluation.items && evaluation.items.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-ink mb-2">Bảng điểm tiêu chí chi tiết</h4>
          <div className="overflow-hidden rounded-md border border-line bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 uppercase text-slate-500 border-b border-line">
                <tr>
                  <th className="px-3 py-2">Tiêu chí</th>
                  <th className="px-3 py-2 text-center">Điểm gốc</th>
                  <th className="px-3 py-2 text-right">Điểm quy đổi</th>
                  <th className="px-3 py-2">Ghi chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {evaluation.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-800">
                      {item.criterion ? `${item.criterion.code}. ${item.criterion.name}` : 'Tiêu chí'}
                    </td>
                    <td className="px-3 py-2 text-center font-semibold text-ink">{item.score}</td>
                    <td className="px-3 py-2 text-right font-bold text-accent">
                      {formatScore(item.normalizedScore)}
                    </td>
                    <td className="px-3 py-2 text-slate-500 italic">
                      {item.note || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
