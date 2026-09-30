'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch, formatScore } from '@/lib/api';
import { currentEvaluationPeriod } from '@/lib/evaluation-period';
import type { Evaluation, EvaluationConfig } from '@/lib/types';
import { ErrorState, LoadingState } from '@/components/state';

export default function ReportsPage() {
  const [fields,setFields]=useState<string[]>([]);
  const [field,setField]=useState('');
  const [mode,setMode]=useState<'year'|'period'>('year');
  const [year,setYear]=useState(String(new Date().getFullYear()));
  const [quarter,setQuarter]=useState(currentEvaluationPeriod().slice(-2));
  const [years,setYears]=useState<string[]>([]);
  const [report,setReport]=useState<{items:Evaluation[];count:number;averageScore:number|null}>();
  const [error,setError]=useState('');
  useEffect(()=>{Promise.all([
    apiFetch<EvaluationConfig>('/evaluation-configs/default/form-schema'),
    apiFetch<{years:string[]}>('/reports/period-options'),
  ]).then(([config, options])=>{
    setFields(config.procurementFields ?? []);
    setYears(options.years);
    setYear(options.years[0] ?? String(new Date().getFullYear()));
  }).catch(e=>setError(e.message));},[]);
  useEffect(()=>{
    if(!/^\d{4}$/.test(year)) return;
    let cancelled=false;
    setReport(undefined);setError('');
    const filter = mode === 'year' ? `year=${encodeURIComponent(year)}` : `period=${encodeURIComponent(`${year}-${quarter}`)}`;
    apiFetch<{items:Evaluation[];count:number;averageScore:number|null}>(`/reports/annual?field=${encodeURIComponent(field)}&${filter}`).then(r=>{if(!cancelled)setReport(r);}).catch(e=>{if(!cancelled)setError(e.message);});
    return()=>{cancelled=true;};
  },[field,mode,quarter,year]);
  const isValidYear = /^\d{4}$/.test(year);
  const selectedLabel = mode === 'year' ? `năm ${year}` : `kỳ ${year}-${quarter}`;
  return <div className="space-y-6"><header><h1 className="text-2xl font-bold">Xếp hạng nhà cung cấp theo lĩnh vực</h1><p className="mt-2 text-sm text-slate-600">Có thể xem tổng hợp theo năm hoặc theo từng kỳ. Mỗi nhà cung cấp chỉ lấy phiên bản phiếu mới nhất trong phạm vi đã chọn.</p></header>
    <div className="flex flex-wrap items-end gap-4 rounded border border-line bg-white p-4"><label className="text-sm">Lĩnh vực<select className="ml-3 rounded border p-2" value={field} onChange={e=>setField(e.target.value)}><option value="">Tất cả lĩnh vực</option>{fields.map(f=><option key={f}>{f}</option>)}</select></label><label className="text-sm">Năm<select className="ml-3 w-24 rounded border p-2" value={year} onChange={e=>setYear(e.target.value)}>{years.length ? years.map(value=><option key={value}>{value}</option>) : <option>{year}</option>}</select></label><fieldset className="flex gap-3 text-sm"><legend className="mb-1">Xem báo cáo</legend><label><input type="radio" checked={mode==='year'} onChange={()=>setMode('year')} /> Theo năm</label><label><input type="radio" checked={mode==='period'} onChange={()=>setMode('period')} /> Theo kỳ</label></fieldset>{mode==='period' && <label className="text-sm">Kỳ<select className="ml-3 rounded border p-2" value={quarter} onChange={e=>setQuarter(e.target.value)}>{['Q1','Q2','Q3','Q4'].map(value=><option key={value}>{value}</option>)}</select></label>}</div>
    {field && <p className="text-xs text-slate-500">Bao gồm cả phiếu lịch sử chưa được gán lĩnh vực.</p>}
    {error && <ErrorState message={error} />}
    {!isValidYear ? <p>Nhập năm gồm 4 chữ số, ví dụ 2025.</p> : !report && !error ? <LoadingState label="Đang tổng hợp kết quả" /> : report && <>
      <div className="grid gap-4 sm:grid-cols-3"><Metric label="Nhà cung cấp đã đánh giá" value={String(report.count)} /><Metric label="Điểm trung bình" value={formatScore(report.averageScore)} /><Metric label="Cần cải thiện / Yếu kém" value={String(report.items.filter(e=>['C','D'].includes(e.rankCode)).length)} /></div>
      <div className="overflow-x-auto rounded border border-line bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr>{['Nhà cung cấp','Điểm','Xếp hạng','Số hợp đồng','Người đánh giá','Ngày lưu'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{report.items.map(e=><tr key={e.id} className="border-t"><td className="p-3"><Link className="font-semibold text-teal-700" href={`/suppliers?search=${encodeURIComponent(e.supplier?.code ?? '')}&highlight=${e.supplierId}`}>{e.supplier?.name}</Link></td><td className="p-3 font-semibold">{formatScore(e.totalScore)}</td><td className="p-3"><span className="rounded px-2 py-1 text-white" style={{backgroundColor:e.rankColor}}>{e.rankCode}</span></td><td className="p-3">{e.contracts?.length ?? 0}</td><td className="p-3">{e.evaluator}</td><td className="p-3">{new Date(e.createdAt).toLocaleDateString('vi-VN')}</td></tr>)}</tbody></table>{report.count===0 && <p className="p-6 text-slate-500">Chưa có phiếu cho lĩnh vực và {selectedLabel}.</p>}</div>
    </>}
  </div>;
}
function Metric({label,value}:{label:string;value:string}) { return <div className="rounded border border-line bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>; }
