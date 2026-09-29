'use client';
import type { EvaluationConfig } from '@/lib/types';

export function FinalConfigSettings({ config, onChange }: { config: EvaluationConfig; onChange: (config: EvaluationConfig) => void }) {
  const fieldClass = 'w-full rounded border border-line px-3 py-2 text-sm';
  return <section className="space-y-4 rounded border border-teal-200 bg-white p-5">
    <h2 className="text-lg font-semibold">Tham số trọng số Layer 1</h2>
    <p className="text-sm text-slate-600">A/B/C đang khởi tạo trọng số bằng nhau. Cấu hình từng nhóm dưới đây; tổng Layer 1 của mỗi nhóm phải bằng 100%. Trong cùng Layer 1, các tiêu chí có điểm được tính bình quân, N/A không nằm trong mẫu số. ESG: D1–D3 tổng 60%, D4 là 40%.</p>
    <div className="grid gap-4 md:grid-cols-2">{config.groups.map((g,gi) => {
      const layers = [...new Map(g.criteria.filter(c => c.isActive !== false).map(c => [c.layer1Code, c])).values()];
      const total = layers.reduce((s,c) => s+(c.layer1Weight ?? 0),0);
      return <div key={g.id} className="space-y-2 rounded border p-3"><h3 className="font-semibold">{g.code} · Tổng {Math.round(total*100)/100}%</h3>{layers.map(layer => <label key={layer.layer1Code} className="grid grid-cols-[1fr_100px] items-center gap-3 text-sm"><span>{layer.layer1Code} · {layer.layer1Name}</span><input aria-label={`Trọng số ${layer.layer1Code}`} type="number" min={0} max={100} step="0.01" className={fieldClass} value={layer.layer1Weight ?? 0} onChange={e => {
        const weight = Number(e.target.value);
        onChange({ ...config, weightsConfirmed: false, groups: config.groups.map((group,i) => i !== gi ? group : { ...group, criteria: group.criteria.map(c => c.layer1Code !== layer.layer1Code ? c : { ...c, layer1Weight: weight, weight: weight / group.criteria.filter(x => x.layer1Code === layer.layer1Code && x.isActive !== false).length }) }) });
      }} /></label>)}</div>;
    })}</div>
    <label className="flex gap-2 text-sm font-semibold"><input type="checkbox" checked={config.weightsConfirmed ?? false} onChange={e => onChange({ ...config, weightsConfirmed: e.target.checked })} />Tôi đã hoàn tất cấu hình trọng số để sử dụng chấm chính thức</label>
    <details><summary className="cursor-pointer font-semibold">Danh mục đối tác–Tier ({config.partners?.length ?? 0})</summary><p className="my-2 text-xs text-slate-600">Rà soát tối thiểu hàng năm. Hãng chưa có tên áp dụng Tier thấp nhất của lĩnh vực; giữ minh chứng cho việc điều chỉnh.</p>
      <div className="max-h-96 space-y-2 overflow-y-auto">{config.partners?.map((p,i) => <div key={i} className="grid grid-cols-[1fr_1fr_80px_50px] gap-2"><select aria-label={`Lĩnh vực đối tác ${i+1}`} className={fieldClass} value={p.field} onChange={e => updatePartner(i,{ field:e.target.value })}>{config.procurementFields?.map(f => <option key={f}>{f}</option>)}</select><input aria-label={`Tên đối tác ${i+1}`} className={fieldClass} value={p.name} onChange={e => updatePartner(i,{ name:e.target.value })} /><select aria-label={`Tier đối tác ${i+1}`} className={fieldClass} value={p.tier} onChange={e => updatePartner(i,{ tier:Number(e.target.value) })}>{[1,2,3].map(t => <option key={t} value={t}>{t}</option>)}</select><button onClick={() => onChange({ ...config, partners:config.partners?.filter((_,j) => i!==j) })}>Xóa</button></div>)}</div>
      <button className="mt-3 rounded border px-3 py-2 text-sm" onClick={() => onChange({ ...config, partners:[...(config.partners ?? []),{ field:config.procurementFields?.[0] ?? '',name:'Đối tác mới',tier:3 }] })}>Thêm đối tác</button>
    </details>
    <details><summary className="cursor-pointer font-semibold">Phạm vi áp dụng và hướng dẫn chấm</summary><div className="max-h-[600px] space-y-4 overflow-y-auto py-3">{config.groups.flatMap(g => g.criteria).map(c => <div key={c.id} className="space-y-2 border-b pb-3"><p className="text-sm font-semibold">{c.code} · {c.name}</p><p className="text-xs">{c.scope === 'contract' ? 'Theo hợp đồng' : 'Nhà cung cấp'} · Điểm cho phép: {c.allowedScores?.join(', ')} · {c.applicableType}</p><p className="text-xs text-slate-600">{c.applicableFields?.join(' · ')}</p><p className="whitespace-pre-line text-sm">{c.guidance}</p></div>)}</div></details>
  </section>;
  function updatePartner(index: number, patch: Partial<NonNullable<EvaluationConfig['partners']>[number]>) {
    onChange({ ...config, partners:config.partners?.map((p,i) => index===i ? { ...p,...patch } : p) });
  }
}
