'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { apiFetch, formatScore } from '@/lib/api';
import type { Supplier } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';

const emptyForm = {
  code: '',
  name: '',
  taxCode: '',
  type: 'Phần mềm',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  note: '',
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [rank, setRank] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = (filters = { search, type, rank }) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.type) params.set('type', filters.type);
    if (filters.rank) params.set('rank', filters.rank);
    apiFetch<Supplier[]>(`/suppliers?${params.toString()}`)
      .then(setSuppliers)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialSearch = params.get('search') ?? '';
    setSearch(initialSearch);
    load({ search: initialSearch, type: '', rank: '' });
  }, []);

  const supplierTypes = useMemo(() => [...new Set(suppliers.map((supplier) => supplier.type))], [suppliers]);
  const ranks = useMemo(
    () => [...new Set(suppliers.map((supplier) => supplier.latestRankCode).filter(Boolean))],
    [suppliers],
  );

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await apiFetch<Supplier>(editingId ? `/suppliers/${editingId}` : '/suppliers', {
        method: editingId ? 'PATCH' : 'POST',
        body: JSON.stringify(form),
      });
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const edit = (supplier: Supplier) => {
    setEditingId(supplier.id);
    setForm({
      code: supplier.code,
      name: supplier.name,
      taxCode: supplier.taxCode,
      type: supplier.type,
      contactName: supplier.contactName ?? '',
      email: supplier.email ?? '',
      phone: supplier.phone ?? '',
      address: supplier.address ?? '',
      note: supplier.note ?? '',
    });
  };

  const remove = async (supplier: Supplier) => {
    if (!confirm(`Xóa nhà cung cấp ${supplier.name}?`)) return;
    await apiFetch(`/suppliers/${supplier.id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Nhà cung cấp</h1>
          <p className="mt-1 text-sm text-slate-600">
            Tìm kiếm, lọc, thêm và cập nhật hồ sơ nhà cung cấp CNTT.
          </p>
        </div>
        <button
          onClick={() => load()}
          className="focus-ring flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm"
        >
          <RefreshCw size={16} />
          Tải lại
        </button>
      </header>

      {error && <ErrorState message={error} />}

      <section className="rounded-md border border-line bg-white p-4">
        <form onSubmit={submit} className="grid gap-3 lg:grid-cols-4">
          <Input label="Mã NCC" value={form.code} onChange={(value) => setForm({ ...form, code: value })} required />
          <Input
            label="Tên nhà cung cấp"
            value={form.name}
            onChange={(value) => setForm({ ...form, name: value })}
            required
          />
          <Input
            label="Mã số thuế"
            value={form.taxCode}
            onChange={(value) => setForm({ ...form, taxCode: value })}
            required
          />
          <Input label="Loại hình" value={form.type} onChange={(value) => setForm({ ...form, type: value })} required />
          <Input
            label="Người liên hệ"
            value={form.contactName}
            onChange={(value) => setForm({ ...form, contactName: value })}
          />
          <Input label="Email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
          <Input label="Điện thoại" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
          <Input label="Địa chỉ" value={form.address} onChange={(value) => setForm({ ...form, address: value })} />
          <div className="flex gap-2 lg:col-span-4">
            <button
              disabled={saving}
              className="focus-ring flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              <Plus size={16} />
              {editingId ? 'Lưu thay đổi' : 'Thêm nhà cung cấp'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="rounded-md border border-line px-4 py-2 text-sm"
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-md border border-line bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_160px_auto]">
          <label className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') load();
              }}
              placeholder="Tìm theo tên, mã, mã số thuế"
              className="focus-ring w-full rounded-md border border-line py-2 pl-9 pr-3 text-sm"
            />
          </label>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="focus-ring rounded-md border border-line px-3 py-2 text-sm"
          >
            <option value="">Tất cả loại hình</option>
            {supplierTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={rank}
            onChange={(event) => setRank(event.target.value)}
            className="focus-ring rounded-md border border-line px-3 py-2 text-sm"
          >
            <option value="">Tất cả rank</option>
            {ranks.map((item) => (
              <option key={item ?? ''}>{item}</option>
            ))}
          </select>
          <button onClick={() => load()} className="focus-ring rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
            Lọc
          </button>
        </div>
      </section>

      {loading ? (
        <LoadingState />
      ) : suppliers.length === 0 ? (
        <EmptyState message="Không có nhà cung cấp phù hợp" />
      ) : (
        <section className="overflow-hidden rounded-md border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Nhà cung cấp</th>
                <th className="px-4 py-3">Loại hình</th>
                <th className="px-4 py-3">MST</th>
                <th className="px-4 py-3 text-right">Điểm</th>
                <th className="px-4 py-3 text-center">Rank</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="px-4 py-3">
                    <button onClick={() => edit(supplier)} className="text-left font-semibold text-ink hover:text-accent">
                      {supplier.name}
                    </button>
                    <div className="text-xs text-slate-500">
                      {supplier.code} - {supplier.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">{supplier.type}</td>
                  <td className="px-4 py-3">{supplier.taxCode}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatScore(supplier.latestScore)}</td>
                  <td className="px-4 py-3 text-center">
                    {supplier.latestRankCode ? (
                      <span
                        className="rounded px-2 py-1 text-xs font-semibold text-white"
                        style={{ backgroundColor: supplier.latestRankColor ?? '#64748b' }}
                      >
                        {supplier.latestRankCode}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Chưa có</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => remove(supplier)}
                      className="focus-ring inline-flex rounded-md border border-red-200 p-2 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="focus-ring w-full rounded-md border border-line px-3 py-2"
      />
    </label>
  );
}
