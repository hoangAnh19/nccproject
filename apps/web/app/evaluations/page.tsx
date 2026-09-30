'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch, formatScore } from '@/lib/api';
import type { Criterion, Evaluation, EvaluationConfig, Supplier } from '@/lib/types';
import { ErrorState, LoadingState } from '@/components/state';

type Answer = { score: number | null | ''; note: string };
type Answers = Record<string, Answer>;
type Contract = { code: string; name: string; evaluator: string; procurementType: string; answers: Answers };
type Preview = { totalScore: number; rank: { code: string; name: string }; groupScores: Evaluation['groupScores']; calculationDetails?: Evaluation['calculationDetails'] };
const input = 'w-full rounded border border-line bg-white px-3 py-2 text-sm text-slate-800';
const applies = (c: Criterion, field: string, types: string[]) =>
  (!c.applicableFields?.length || c.applicableFields.includes(field)) &&
  (!c.applicableType || types.some(t => c.applicableType!.split(',').map(s => s.trim()).includes(t)));
const blankContract = (): Contract => ({ code: '', name: '', evaluator: '', procurementType: 'Hàng hóa', answers: {} });
const HISTORY_PAGE_SIZE = 10;
type EvaluationPage = { items: Evaluation[]; total: number; page: number; limit: number; totalPages: number };

export default function EvaluationsPage() {
  const [config, setConfig] = useState<EvaluationConfig>();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [history, setHistory] = useState<Evaluation[]>([]);
  const [historyPagination, setHistoryPagination] = useState<Omit<EvaluationPage, 'items'>>({ total: 0, page: 1, limit: HISTORY_PAGE_SIZE, totalPages: 1 });
  const [historyLoading, setHistoryLoading] = useState(false);
  const [supplierId, setSupplierId] = useState('');
  const [period, setPeriod] = useState('2026');
  const [field, setField] = useState('');
  const [evaluator, setEvaluator] = useState('');
  const [answers, setAnswers] = useState<Answers>({});
  const [contracts, setContracts] = useState<Contract[]>([blankContract()]);
  const [preview, setPreview] = useState<Preview>();
  const [detail, setDetail] = useState<Evaluation>();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function loadHistory(nextSupplierId = supplierId, nextPage = 1) {
    setHistoryLoading(true);
    try {
      const params = new URLSearchParams({ page: String(nextPage), limit: String(HISTORY_PAGE_SIZE) });
      if (nextSupplierId) params.set('supplierId', nextSupplierId);
      const data = await apiFetch<EvaluationPage>(`/evaluations?${params.toString()}`);
      setHistory(data.items);
      setHistoryPagination({ total: data.total, page: data.page, limit: data.limit, totalPages: data.totalPages });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [schema, first, evaluations] = await Promise.all([
        apiFetch<EvaluationConfig>('/evaluation-configs/default/form-schema'),
        apiFetch<{ items: Supplier[]; totalPages: number }>('/suppliers?limit=100'),
        apiFetch<EvaluationPage>(`/evaluations?page=1&limit=${HISTORY_PAGE_SIZE}`),
      ]);
      const all = [...first.items];
      for (let page = 2; page <= first.totalPages; page++) all.push(...(await apiFetch<{ items: Supplier[] }>(`/suppliers?limit=100&page=${page}`)).items);
      if (cancelled) return;
      setConfig(schema); setPeriod(schema.evaluationPeriod); setSuppliers(all); setHistory(evaluations.items);
      setHistoryPagination({ total: evaluations.total, page: evaluations.page, limit: evaluations.limit, totalPages: evaluations.totalPages });
    }
    load().catch(e => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, []);

  if (!config) return error ? <ErrorState message={error} /> : <LoadingState label="Đang tải bộ tiêu chí" />;
  const allCriteria = config.groups.flatMap(g => g.criteria);
  const types = [...new Set(contracts.map(c => c.procurementType))];
  const supplierCriteria = allCriteria.filter(c => c.scope === 'supplier' && applies(c, field, types));
  const contractCriteria = (contract: Contract) => allCriteria.filter(c => c.scope === 'contract' && applies(c, field, [contract.procurementType]));
  const draftKey = `ncc-draft:${config.id}:${supplierId}:${period}:${field}`;
  const invalidate = () => { setPreview(undefined); setMessage(''); setError(''); };
  const serialize = (criteria: Criterion[], values: Answers) => criteria.map(c => {
    const answer = values[c.id];
    if (!answer || answer.score === '') throw new Error(`Chưa chấm tiêu chí ${c.code}`);
    if (answer.score === null && !answer.note.trim()) throw new Error(`Cần lý do N/A cho ${c.code}`);
    return { criterionId: c.id, score: answer.score, note: answer.note };
  });
  const payload = () => ({ supplierId, configId: config.id, period, evaluator, procurementField: field,
    items: serialize(supplierCriteria, answers),
    contracts: contracts.map(c => ({ code: c.code, name: c.name, evaluator: c.evaluator, procurementType: c.procurementType, items: serialize(contractCriteria(c), c.answers) })),
  });
  async function calculate(save: boolean) {
    setBusy(true); setError(''); setMessage(''); setPreview(undefined);
    try {
      const body = JSON.stringify(payload());
      if (save) {
        const saved = await apiFetch<Evaluation>('/evaluations', { method: 'POST', body });
        await loadHistory(supplierId, 1); setDetail(saved);
        localStorage.removeItem(draftKey);
        setMessage(`Đã lưu phiếu năm ${period} · ${field}: ${formatScore(saved.totalScore)} điểm, loại ${saved.rankCode}`);
      } else setPreview(await apiFetch<Preview>('/evaluations/preview', { method: 'POST', body }));
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }
  function draft(restore: boolean) {
    try {
      if (restore) {
        const raw = localStorage.getItem(draftKey);
        if (!raw) throw new Error('Không có bản nháp cho nhà cung cấp, năm và lĩnh vực đang chọn');
        const saved = JSON.parse(raw);
        setEvaluator(saved.evaluator); setAnswers(saved.answers); setContracts(saved.contracts); invalidate();
        setMessage('Đã khôi phục bản nháp');
      } else {
        localStorage.setItem(draftKey, JSON.stringify({ evaluator, answers, contracts }));
        setMessage('Đã lưu nháp trên trình duyệt');
      }
    } catch (e) { setError((e as Error).message); }
  }
  async function view(id: string) {
    try { setDetail(await apiFetch<Evaluation>(`/evaluations/${id}`)); } catch (e) { setError((e as Error).message); }
  }
  function renderCriteria(criteria: Criterion[], values: Answers, update: (next: Answers) => void) {
    const layers = [...new Set(criteria.map(c => c.layer1Code))];
    return layers.map(layer => {
      const list = criteria.filter(c => c.layer1Code === layer);
      return <details key={layer} className="rounded border border-line bg-white" open>
        <summary className="cursor-pointer bg-slate-50 p-3 font-semibold">{layer} · {list[0].layer1Name} <span className="text-xs font-normal">({list[0].layer1Weight}% nhóm · {list.length} tiêu chí áp dụng)</span></summary>
        {list.map(c => <div key={c.id} className="space-y-2 border-t border-line p-4">
          <p className="font-medium">{c.code} · {c.name}</p>
          <p className="whitespace-pre-line text-sm leading-6 text-slate-600">{c.guidance || c.description}</p>
          <div className="grid gap-3 md:grid-cols-[230px_1fr]">
            <label className="text-xs">Điểm / Không áp dụng
              <select aria-label={`Điểm ${c.code}`} className={input} value={values[c.id]?.score === null ? 'NA' : values[c.id]?.score ?? ''} onChange={e => { invalidate(); update({ ...values, [c.id]: { note: values[c.id]?.note ?? '', score: e.target.value === 'NA' ? null : e.target.value === '' ? '' : Number(e.target.value) } }); }}>
                <option value="">Chưa đánh giá</option>
                {(c.allowedScores ?? config!.scoreOptions.map(o => o.value)).map(score => <option key={score} value={score}>{score} điểm</option>)}
                <option value="NA">N/A · Không phát sinh/áp dụng</option>
              </select>
            </label>
            <label className="text-xs">Minh chứng / Ghi chú / Lý do N/A
              <textarea aria-label={`Minh chứng ${c.code}`} className={input} value={values[c.id]?.note ?? ''} onChange={e => { invalidate(); update({ ...values, [c.id]: { score: values[c.id]?.score ?? (values[c.id]?.score === null ? null : ''), note: e.target.value } }); }} placeholder="Tên hồ sơ, đường dẫn minh chứng hoặc lý do không áp dụng" />
            </label>
          </div>
          <details className="text-xs text-slate-500"><summary className="cursor-pointer">Nguồn khảo sát · {c.sourceSheet}, dòng {c.sourceRow}</summary><p className="whitespace-pre-line py-2">{c.source}</p></details>
          {c.code === 'A5.1' && <details className="text-sm"><summary className="cursor-pointer">Tra cứu đối tác–Tier trong lĩnh vực {field}</summary>
            <p className="py-2 text-xs">Tier 1: 5 điểm · Tier 2: 4 điểm · Tier 3: 3 điểm. Hãng chưa có tên áp dụng Tier thấp nhất của lĩnh vực; ghi minh chứng để đầu mối xem xét.</p>
            <div className="grid gap-1 sm:grid-cols-2">{config!.partners?.filter(p => p.field === field).map(p => <p key={p.name}>{p.name} · Tier {p.tier}</p>)}</div>
          </details>}
        </div>)}
      </details>;
    });
  }

  return <div className="space-y-6">
    <header><h1 className="text-2xl font-bold">Đánh giá nhà cung cấp theo năm</h1><p className="mt-1 text-sm text-slate-600">{config.name} · Xếp hạng theo từng lĩnh vực</p></header>
    {!config.weightsConfirmed && <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm">Trọng số chưa được xác nhận. <Link className="font-semibold underline" href="/admin">Cấu hình trọng số trên trang quản trị</Link> trước khi hoàn thành phiếu. Bạn vẫn có thể nhập nháp và tính thử.</div>}
    {error && <ErrorState message={error} />}{message && <p role="status" className="rounded bg-emerald-50 p-4 text-emerald-800">{message}</p>}
    <section className="grid gap-4 rounded border border-line bg-white p-4 md:grid-cols-2">
      <label className="text-sm">Nhà cung cấp<select className={input} value={supplierId} onChange={e => { const nextSupplierId = e.target.value; setSupplierId(nextSupplierId); setAnswers({}); setContracts([blankContract()]); invalidate(); void loadHistory(nextSupplierId, 1); }}><option value="">Chọn nhà cung cấp</option>{suppliers.map(s => <option key={s.id} value={s.id}>{s.code} · {s.name}</option>)}</select></label>
      <label className="text-sm">Năm đánh giá<input className={input} value={period} maxLength={4} onChange={e => { setPeriod(e.target.value); setAnswers({}); setContracts([blankContract()]); invalidate(); }} /></label>
      <label className="text-sm">Lĩnh vực mua sắm<select className={input} value={field} onChange={e => { setField(e.target.value); setAnswers({}); setContracts([blankContract()]); invalidate(); }}><option value="">Chọn lĩnh vực trước khi chấm</option>{config.procurementFields?.map(f => <option key={f}>{f}</option>)}</select></label>
      <label className="text-sm">Đầu mối đánh giá nhà cung cấp<input className={input} value={evaluator} onChange={e => { setEvaluator(e.target.value); invalidate(); }} /></label>
    </section>
    {supplierId && field && <>
      <section className="space-y-3"><h2 className="text-lg font-semibold">1. Hợp đồng thuộc lĩnh vực {field} trong năm {period}</h2><p className="text-sm text-slate-600">Khai báo đủ hợp đồng để xác định loại hình áp dụng. C được tính bình quân điểm các hợp đồng, không theo giá trị hợp đồng.</p>
        {contracts.map((contract, index) => <div key={index} className="grid gap-3 rounded border border-line bg-white p-4 md:grid-cols-2 xl:grid-cols-5">
          {(['code', 'name', 'evaluator'] as const).map((key, i) => <label key={key} className="text-xs">{['Mã hợp đồng', 'Tên hợp đồng', 'Đơn vị/người đánh giá hợp đồng'][i]}<input className={input} value={contract[key]} onChange={e => { setContracts(contracts.map((c,j) => j === index ? { ...c, [key]: e.target.value } : c)); invalidate(); }} /></label>)}
          <label className="text-xs">Loại hình<select className={input} value={contract.procurementType} onChange={e => { setContracts(contracts.map((c,j) => j === index ? { ...c, procurementType: e.target.value, answers: {} } : c)); invalidate(); }}>{['Hàng hóa','TV','PTV'].map(t => <option key={t}>{t}</option>)}</select></label>
          <button className="text-sm text-red-700" disabled={contracts.length === 1} onClick={() => { setContracts(contracts.filter((_,j) => j !== index)); invalidate(); }}>Bỏ hợp đồng</button>
        </div>)}
        <button className="rounded border border-line bg-white px-4 py-2" onClick={() => { setContracts([...contracts, blankContract()]); invalidate(); }}>+ Thêm hợp đồng</button>
      </section>
      <section className="space-y-3"><h2 className="text-lg font-semibold">2. Hồ sơ nhà cung cấp · A, B và ESG nhà cung cấp</h2><p className="text-sm text-slate-600">Đầu mối nhập một lần trong phiếu năm, dùng chung cho các hợp đồng trong lĩnh vực này.</p>{renderCriteria(supplierCriteria, answers, setAnswers)}</section>
      <section className="space-y-4"><h2 className="text-lg font-semibold">3. Đánh giá từng hợp đồng · C và ESG sản phẩm/dịch vụ</h2>{contracts.map((c,index) => <details key={index} open className="space-y-3 rounded-lg border-2 border-teal-100 p-4"><summary className="cursor-pointer text-lg font-semibold">{c.code || `Hợp đồng ${index+1}`} · {c.name} · {c.procurementType}</summary>{renderCriteria(contractCriteria(c), c.answers, next => setContracts(contracts.map((contract,j) => j === index ? { ...contract, answers: next } : contract)))}</details>)}</section>
      <section className="sticky bottom-0 space-y-3 rounded border border-line bg-white p-4 shadow-lg">
        <p className="text-sm">0 là điểm không đáp ứng; N/A loại khỏi mẫu số và cần lý do. Không tự chấm điểm cho ô chưa nhập.</p>
        {preview && <div className="rounded bg-teal-50 p-3"><p className="text-xl font-bold">{formatScore(preview.totalScore)} / 100 · {preview.rank.code} – {preview.rank.name}</p><p className="text-sm">{preview.groupScores.map(g => `${g.code}: ${formatScore(g.score)} × ${formatScore(g.weight)}%`).join(' · ')}</p><p className="text-xs">{preview.calculationDetails?.explanation}</p></div>}
        <div className="flex flex-wrap gap-3"><button disabled={busy} onClick={() => calculate(false)} className="rounded border px-4 py-2">Tính thử</button><button disabled={busy || !config.weightsConfirmed} onClick={() => calculate(true)} className="rounded bg-teal-700 px-4 py-2 font-semibold text-white disabled:opacity-40">{busy ? 'Đang xử lý…' : 'Hoàn thành phiếu năm'}</button><button onClick={() => draft(false)} className="rounded border px-4 py-2">Lưu nháp</button><button onClick={() => draft(true)} className="rounded border px-4 py-2">Khôi phục nháp</button></div>
      </section>
    </>}
    <section className="space-y-3"><h2 className="text-lg font-semibold">Lịch sử đánh giá {supplierId ? 'nhà cung cấp đang chọn' : ''}</h2>
      {historyLoading ? <p className="text-sm text-slate-500">Đang tải lịch sử đánh giá...</p> : history.length === 0 ? <p className="rounded border border-dashed border-line p-3 text-sm text-slate-500">Chưa có phiếu đánh giá.</p> : history.map(e => <button key={e.id} onClick={() => view(e.id)} className="flex w-full flex-wrap justify-between gap-2 rounded border border-line bg-white p-3 text-left text-sm"><span>{e.supplier?.name} · {e.period} · {e.procurementField || 'Bộ tiêu chí cũ'}</span><strong>{formatScore(e.totalScore)} · {e.rankCode}</strong></button>)}
      {historyPagination.total > 0 && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 text-sm"><span className="text-slate-600">Hiển thị {(historyPagination.page - 1) * historyPagination.limit + 1}–{Math.min(historyPagination.page * historyPagination.limit, historyPagination.total)} / {historyPagination.total} phiếu</span><div className="flex items-center gap-2"><button type="button" disabled={historyPagination.page <= 1 || historyLoading} onClick={() => void loadHistory(supplierId, historyPagination.page - 1)} className="rounded border border-line px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Trước</button><span>Trang {historyPagination.page}/{historyPagination.totalPages}</span><button type="button" disabled={historyPagination.page >= historyPagination.totalPages || historyLoading} onClick={() => void loadHistory(supplierId, historyPagination.page + 1)} className="rounded border border-line px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Sau</button></div></div>}
    </section>
    {detail && <section className="space-y-3 rounded border border-teal-200 bg-white p-4"><button className="float-right" onClick={() => setDetail(undefined)}>Đóng</button><h2 className="font-semibold">Phiếu {detail.period} · {detail.procurementField || 'Lịch sử'}</h2><p>{detail.evaluator} · {formatScore(detail.totalScore)} điểm · {detail.rankName}</p><p className="text-xs">{detail.configSnapshot?.name || 'Cấu hình lịch sử'} · {new Date(detail.createdAt).toLocaleString('vi-VN')}</p>
      {(detail.items ?? []).map(item => <p key={item.id || item.criterionId} className="text-sm">{item.criterion?.code || detail.configSnapshot?.groups.flatMap(g => g.criteria).find(c => c.id === item.criterionId)?.code}: {item.score === null ? 'N/A' : item.score} · {item.note}</p>)}
      {detail.contracts?.map(c => <details key={c.code}><summary>{c.code} · {c.name} · C: {formatScore(c.performanceScore)} · ESG SP/DV: {c.productScore === null ? 'N/A' : formatScore(c.productScore)}</summary><p className="text-xs">{c.evaluator} · {c.procurementType}</p>{c.items.map(i => <p key={i.criterionId} className="text-sm">{detail.configSnapshot?.groups.flatMap(g => g.criteria).find(k => k.id === i.criterionId)?.code}: {i.score === null ? 'N/A' : i.score} · {i.note}</p>)}</details>)}
      {detail.configId === config.id && detail.supplierId === supplierId && detail.period === period && detail.procurementField === field && <button className="rounded border px-3 py-2" onClick={() => { setAnswers(Object.fromEntries((detail.items ?? []).map(i => [i.criterionId, { score: i.score, note: i.note ?? '' }]))); setEvaluator(detail.evaluator); setContracts((detail.contracts ?? []).map(c => ({ ...c, answers: Object.fromEntries(c.items.map(i => [i.criterionId, { score: i.score, note: i.note ?? '' }])) }))); invalidate(); setMessage('Đã nạp dữ liệu để lập phiên bản phiếu mới; bản lịch sử được giữ nguyên.'); }}>Nạp phiếu để cập nhật</button>}
    </section>}
  </div>;
}
