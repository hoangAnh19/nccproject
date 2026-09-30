'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import type { Supplier } from '@/lib/types';
import { ErrorState, LoadingState } from '@/components/state';

const emptyForm = {
  code: '', name: '', taxCode: '', type: 'Phần mềm', contactName: '', email: '', phone: '', address: '', note: '',
};

export default function SupplierFormPage() {
  return (
    <Suspense fallback={<LoadingState label="Đang tải biểu mẫu nhà cung cấp..." />}>
      <SupplierForm />
    </Suspense>
  );
}

function SupplierForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get('edit');
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(Boolean(editingId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editingId) return;
    apiFetch<Supplier>(`/suppliers/${editingId}`)
      .then((supplier) => setForm({
        code: supplier.code, name: supplier.name, taxCode: supplier.taxCode, type: supplier.type,
        contactName: supplier.contactName ?? '', email: supplier.email ?? '', phone: supplier.phone ?? '',
        address: supplier.address ?? '', note: supplier.note ?? '',
      }))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [editingId]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await apiFetch<Supplier>(editingId ? `/suppliers/${editingId}` : '/suppliers', {
        method: editingId ? 'PATCH' : 'POST',
        body: JSON.stringify(form),
      });
      router.push('/suppliers');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState label="Đang tải thông tin nhà cung cấp..." />;

  return (
    <div className="max-w-5xl space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">{editingId ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}</h1>
          <p className="mt-1 text-sm text-slate-600">Nhập thông tin hồ sơ nhà cung cấp CNTT.</p>
        </div>
        <Link href="/suppliers" className="focus-ring flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm hover:bg-slate-50">
          <ArrowLeft size={16} /> Quay lại danh sách
        </Link>
      </header>

      {error && <ErrorState message={error} />}

      <form onSubmit={submit} className="grid gap-4 rounded-md border border-line bg-white p-5 md:grid-cols-2">
        <Input label="Mã NCC" value={form.code} onChange={(code) => setForm({ ...form, code })} required />
        <Input label="Tên nhà cung cấp" value={form.name} onChange={(name) => setForm({ ...form, name })} required />
        <Input label="Mã số thuế" value={form.taxCode} onChange={(taxCode) => setForm({ ...form, taxCode })} required />
        <Input label="Loại hình" value={form.type} onChange={(type) => setForm({ ...form, type })} required />
        <Input label="Người liên hệ" value={form.contactName} onChange={(contactName) => setForm({ ...form, contactName })} />
        <Input label="Email" type="email" value={form.email} onChange={(email) => setForm({ ...form, email })} />
        <Input label="Điện thoại" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />
        <Input label="Địa chỉ" value={form.address} onChange={(address) => setForm({ ...form, address })} />
        <label className="block text-sm md:col-span-2">
          <span className="mb-1 block text-xs font-medium text-slate-600">Ghi chú</span>
          <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} className="focus-ring min-h-24 w-full rounded-md border border-line px-3 py-2 text-sm" />
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button disabled={saving} className="focus-ring flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90">
            <Save size={16} /> {saving ? 'Đang lưu...' : editingId ? 'Lưu thay đổi' : 'Thêm nhà cung cấp'}
          </button>
          <Link href="/suppliers" className="rounded-md border border-line px-4 py-2 text-sm hover:bg-slate-50">Hủy</Link>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, required, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="block text-sm"><span className="mb-1 block text-xs font-medium text-slate-600">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="focus-ring w-full rounded-md border border-line px-3 py-2 text-sm" /></label>;
}
