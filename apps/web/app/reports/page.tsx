'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch, formatScore } from '@/lib/api';
import type { Evaluation, EvaluationConfig } from '@/lib/types';
import { ErrorState, LoadingState } from '@/components/state';

export default function ReportsPage() {
  const [fields,setFields]=useState<string[]>([]);
  const [field,setField]=useState('');
  const [period,setPeriod]=useState('2026');
  const [report,setReport]=useState<{items:Evaluation[];count:number;averageScore:number|null}>();
  const [error,setError]=useState('');
  useEffect(()=>{apiFetch<EvaluationConfig>('/evaluation-configs/default/form-schema').then(c=>{setFields(c.procurementFields ?? []);setPeriod(c.evaluationPeriod);setField(c.procurementFields?.[0] ?? '');}).catch(e=>setError(e.message));},[]);
  useEffect(()=>{
    if(!field || !/^\d{4}$/.test(period)) return;
    let cancelled=false;
    setReport(undefined);setError('');
    apiFetch<{items:Evaluation[];count:number;averageScore:number|null}>(`/reports/annual?field=${encodeURIComponent(field)}&period=${encodeURIComponent(period)}`).then(r=>{if(!cancelled)setReport(r);}).catch(e=>{if(!cancelled)setError(e.message);});
    return()=>{cancelled=true;};
  },[field,period]);
  return <div className="space-y-6"><header><h1 className="text-2xl font-bold">Xếp hạng nhà cung cấp theo lĩnh vực</h1><p className="mt-2 text-sm text-slate-600">Mỗi nhà cung cấp lấy phiên bản phiếu mới nhất trong năm và lĩnh vực được chọn. Phiếu cũ được giữ tại lịch sử đánh giá.</p></header>
    <div className="flex flex-wrap gap-4 rounded border border-line bg-white p-4"><label className="text-sm">Lĩnh vực<select className="ml-3 rounded border p-2" value={field} onChange={e=>setField(e.target.value)}>{fields.map(f=><option key={f}>{f}</option>)}</select></label><label className="text-sm">Năm<input className="ml-3 w-24 rounded border p-2" value={period} maxLength={4} onChange={e=>setPeriod(e.target.value)} /></label></div>
    {error && <ErrorState message={error} />}
    {!/^\d{4}$/.test(period) ? <p>Nhập năm gồm 4 chữ số.</p> : !report && !error ? <LoadingState label="Đang tổng hợp kết quả" /> : report && <>
      <div className="grid gap-4 sm:grid-cols-3"><Metric label="Nhà cung cấp đã đánh giá" value={String(report.count)} /><Metric label="Điểm trung bình" value={formatScore(report.averageScore)} /><Metric label="Cần cải thiện / Yếu kém" value={String(report.items.filter(e=>['C','D'].includes(e.rankCode)).length)} /></div>
      <div className="overflow-x-auto rounded border border-line bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr>{['Nhà cung cấp','Điểm','Xếp hạng','Số hợp đồng','Người đánh giá','Ngày lưu'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{report.items.map(e=><tr key={e.id} className="border-t"><td className="p-3"><Link className="font-semibold text-teal-700" href={`/suppliers?search=${encodeURIComponent(e.supplier?.code ?? '')}&highlight=${e.supplierId}`}>{e.supplier?.name}</Link></td><td className="p-3 font-semibold">{formatScore(e.totalScore)}</td><td className="p-3"><span className="rounded px-2 py-1 text-white" style={{backgroundColor:e.rankColor}}>{e.rankCode}</span></td><td className="p-3">{e.contracts?.length ?? 0}</td><td className="p-3">{e.evaluator}</td><td className="p-3">{new Date(e.createdAt).toLocaleDateString('vi-VN')}</td></tr>)}</tbody></table>{report.count===0 && <p className="p-6 text-slate-500">Chưa có phiếu cho lĩnh vực và năm này.</p>}</div>
    </>}
  </div>;
}
function Metric({label,value}:{label:string;value:string}) { return <div className="rounded border border-line bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>; }
