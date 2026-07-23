'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';
import { apiFetch, formatScore } from '@/lib/api';
import type { Supplier } from '@/lib/types';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';
import { SupplierDetailModal } from '@/components/supplier-detail-modal';

const PAGE_SIZES = [10, 20, 50];

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

type PaginatedResponse = {
  items: Supplier[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse, 'items'>>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [rank, setRank] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [detailSupplierId, setDetailSupplierId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(
    (customParams?: {
      search?: string;
      type?: string;
      rank?: string;
      status?: string;
      sortBy?: string;
      sortOrder?: 'ASC' | 'DESC';
      page?: number;
      limit?: number;
    }) => {
      setLoading(true);
      const querySearch = customParams?.search ?? search;
      const queryType = customParams?.type ?? type;
      const queryRank = customParams?.rank ?? rank;
      const queryStatus = customParams?.status ?? status;
      const querySortBy = customParams?.sortBy ?? sortBy;
      const querySortOrder = customParams?.sortOrder ?? sortOrder;
      const queryPage = customParams?.page ?? page;
      const queryLimit = customParams?.limit ?? limit;

      const params = new URLSearchParams();
      if (querySearch) params.set('search', querySearch);
      if (queryType) params.set('type', queryType);
      if (queryRank) params.set('rank', queryRank);
      if (queryStatus) params.set('status', queryStatus);
      if (querySortBy) params.set('sortBy', querySortBy);
      if (querySortOrder) params.set('sortOrder', querySortOrder);
      params.set('page', String(queryPage));
      params.set('limit', String(queryLimit));

      // Sync URL without full page refresh
      const urlParams = new URLSearchParams(params);
      window.history.replaceState(null, '', `${window.location.pathname}?${urlParams.toString()}`);

      apiFetch<PaginatedResponse>(`/suppliers?${params.toString()}`)
        .then((data) => {
          setSuppliers(data.items);
          setPagination({ total: data.total, page: data.page, limit: data.limit, totalPages: data.totalPages });
          setPage(data.page);
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
    },
    [search, type, rank, status, sortBy, sortOrder, page, limit],
  );

  // Load baseline list to populate unique dropdown options (no pagination)
  useEffect(() => {
    apiFetch<PaginatedResponse>('/suppliers?limit=200')
      .then((data) => setAllSuppliers(data.items ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialSearch = params.get('search') ?? '';
    const initialType = params.get('type') ?? '';
    const initialRank = params.get('rank') ?? '';
    const initialStatus = params.get('status') ?? '';
    const initialSortBy = params.get('sortBy') ?? 'createdAt';
    const initialSortOrder = (params.get('sortOrder')?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC') as 'ASC' | 'DESC';
    const initialPage = parseInt(params.get('page') ?? '1', 10);
    const initialLimit = parseInt(params.get('limit') ?? '20', 10);
    const initialHighlight = params.get('highlight');
    const initialId = params.get('id');

    setSearch(initialSearch);
    setType(initialType);
    setRank(initialRank);
    setStatus(initialStatus);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
    setPage(initialPage);
    setLimit(initialLimit);
    if (initialHighlight) setHighlightId(initialHighlight);
    if (initialId) setDetailSupplierId(initialId);

    load({
      search: initialSearch,
      type: initialType,
      rank: initialRank,
      status: initialStatus,
      sortBy: initialSortBy,
      sortOrder: initialSortOrder,
      page: initialPage,
      limit: initialLimit,
    });
  }, [load]);

  const supplierTypes = useMemo(() => {
    const set = new Set(allSuppliers.map((s) => s.type).concat(suppliers.map((s) => s.type)));
    return [...set].filter(Boolean);
  }, [allSuppliers, suppliers]);

  const ranks = useMemo(() => {
    const set = new Set(
      allSuppliers
        .map((s) => s.latestRankCode)
        .concat(suppliers.map((s) => s.latestRankCode))
        .filter(Boolean),
    );
    return [...set] as string[];
  }, [allSuppliers, suppliers]);

  const handleHeaderSort = (field: string) => {
    let nextOrder: 'ASC' | 'DESC' = 'ASC';
    if (sortBy === field) {
      nextOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else if (field === 'latestScore' || field === 'createdAt') {
      nextOrder = 'DESC';
    }
    setSortBy(field);
    setSortOrder(nextOrder);
    setPage(1);
    load({ sortBy: field, sortOrder: nextOrder, page: 1 });
  };

  const handleFilterSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
    load({ page: 1 });
  };

  const handleResetFilters = () => {
    setSearch('');
    setType('');
    setRank('');
    setStatus('');
    setSortBy('createdAt');
    setSortOrder('DESC');
    setHighlightId(null);
    setPage(1);
    load({
      search: '',
      type: '',
      rank: '',
      status: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    load({ page: newPage });
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    load({ limit: newLimit, page: 1 });
  };

  const isFiltered = Boolean(search || type || rank || status || sortBy !== 'createdAt' || sortOrder !== 'DESC');

  const submitForm = async (event: FormEvent) => {
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
            Tìm kiếm, lọc, sắp xếp, xem chi tiết điểm đánh giá và cập nhật hồ sơ nhà cung cấp CNTT.
          </p>
        </div>
        <button
          onClick={() => load()}
          className="focus-ring flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm hover:bg-slate-50 transition"
        >
          <RefreshCw size={16} />
          Tải lại
        </button>
      </header>

      {error && <ErrorState message={error} />}

      {/* Detail Modal */}
      {detailSupplierId && (
        <SupplierDetailModal
          supplierId={detailSupplierId}
          onClose={() => setDetailSupplierId(null)}
        />
      )}

      {/* Accordion/Card for Form */}
      <section className="rounded-md border border-line bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-ink">
          {editingId ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}
        </h2>
        <form onSubmit={submitForm} className="grid gap-3 lg:grid-cols-4">
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
              className="focus-ring flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90 transition"
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
                className="rounded-md border border-line px-4 py-2 text-sm hover:bg-slate-50"
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Filter and Sort Toolbar */}
      <section className="rounded-md border border-line bg-white p-4 space-y-3">
        <form onSubmit={handleFilterSubmit} className="grid gap-3 md:grid-cols-12 items-center">
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên, mã, mã số thuế..."
              className="focus-ring w-full rounded-md border border-line py-2 pl-9 pr-3 text-sm"
            />
          </div>

          {/* Type Filter */}
          <div className="md:col-span-2">
            <select
              value={type}
              onChange={(event) => {
                const val = event.target.value;
                setType(val);
                setPage(1);
                load({ type: val, page: 1 });
              }}
              className="focus-ring w-full rounded-md border border-line px-3 py-2 text-sm bg-white"
            >
              <option value="">Tất cả loại hình</option>
              {supplierTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Rank Filter */}
          <div className="md:col-span-2">
            <select
              value={rank}
              onChange={(event) => {
                const val = event.target.value;
                setRank(val);
                setPage(1);
                load({ rank: val, page: 1 });
              }}
              className="focus-ring w-full rounded-md border border-line px-3 py-2 text-sm bg-white"
            >
              <option value="">Tất cả rank</option>
              {ranks.map((item) => (
                <option key={item} value={item}>
                  Rank {item}
                </option>
              ))}
              <option value="UNRATED">Chưa có rank</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={status}
              onChange={(event) => {
                const val = event.target.value;
                setStatus(val);
                setPage(1);
                load({ status: val, page: 1 });
              }}
              className="focus-ring w-full rounded-md border border-line px-3 py-2 text-sm bg-white"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="evaluated">Đã đánh giá</option>
              <option value="unevaluated">Chưa đánh giá</option>
            </select>
          </div>

          {/* Filter button */}
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="focus-ring flex-1 flex items-center justify-center gap-1.5 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              <Filter size={15} />
              Lọc
            </button>
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                title="Xóa bộ lọc"
                className="focus-ring flex items-center justify-center rounded-md border border-line bg-white px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-100 transition"
              >
                <RotateCcw size={15} />
              </button>
            )}
          </div>
        </form>

        {/* Sort Bar */}
        <div className="flex flex-wrap items-center justify-between border-t border-line pt-3 text-sm gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Sắp xếp theo:</span>
            {[
              { id: 'createdAt', label: 'Ngày tạo' },
              { id: 'name', label: 'Tên NCC' },
              { id: 'code', label: 'Mã NCC' },
              { id: 'type', label: 'Loại hình' },
              { id: 'latestScore', label: 'Điểm đánh giá' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleHeaderSort(option.id)}
                className={`rounded px-2.5 py-1 transition ${
                  sortBy === option.id
                    ? 'bg-accent/10 font-semibold text-accent border border-accent/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {option.label}
                {sortBy === option.id && (
                  <span className="ml-1 inline-block">
                    {sortOrder === 'ASC' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const nextOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
              setSortOrder(nextOrder);
              load({ sortOrder: nextOrder });
            }}
            className="flex items-center gap-1.5 rounded border border-line bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50 transition"
          >
            {sortOrder === 'ASC' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            Thứ tự: {sortOrder === 'ASC' ? 'Tăng dần (A-Z)' : 'Giảm dần (Z-A)'}
          </button>
        </div>
      </section>

      {/* Main Table / Results */}
      {loading ? (
        <LoadingState label="Đang tải danh sách nhà cung cấp..." />
      ) : suppliers.length === 0 ? (
        <EmptyState message="Không có nhà cung cấp nào phù hợp với bộ lọc" />
      ) : (
        <section className="overflow-hidden rounded-md border border-line bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-line">
              <tr>
                <th
                  onClick={() => handleHeaderSort('name')}
                  className="px-4 py-3 cursor-pointer select-none hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1.5">
                    Nhà cung cấp
                    <SortIcon field="name" currentSortBy={sortBy} currentSortOrder={sortOrder} />
                  </div>
                </th>
                <th
                  onClick={() => handleHeaderSort('type')}
                  className="px-4 py-3 cursor-pointer select-none hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1.5">
                    Loại hình
                    <SortIcon field="type" currentSortBy={sortBy} currentSortOrder={sortOrder} />
                  </div>
                </th>
                <th
                  onClick={() => handleHeaderSort('taxCode')}
                  className="px-4 py-3 cursor-pointer select-none hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1.5">
                    MST
                    <SortIcon field="taxCode" currentSortBy={sortBy} currentSortOrder={sortOrder} />
                  </div>
                </th>
                <th
                  onClick={() => handleHeaderSort('latestScore')}
                  className="px-4 py-3 text-right cursor-pointer select-none hover:bg-slate-100 transition"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    Điểm
                    <SortIcon field="latestScore" currentSortBy={sortBy} currentSortOrder={sortOrder} />
                  </div>
                </th>
                <th className="px-4 py-3 text-center">Rank</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {suppliers.map((supplier) => {
                const isHighlighted = supplier.id === highlightId;
                return (
                  <tr
                    key={supplier.id}
                    className={`transition hover:bg-slate-50 ${
                      isHighlighted ? 'bg-amber-50/80 font-medium border-l-4 border-l-amber-500' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDetailSupplierId(supplier.id)}
                        className="text-left font-semibold text-ink hover:text-accent transition flex items-center gap-1.5 group"
                      >
                        <span>{supplier.name}</span>
                        <Eye size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                      </button>
                      <div className="text-xs text-slate-500">
                        {supplier.code} - {supplier.email || 'Không có email'}
                      </div>
                    </td>
                    <td className="px-4 py-3">{supplier.type}</td>
                    <td className="px-4 py-3">{supplier.taxCode}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatScore(supplier.latestScore)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {supplier.latestRankCode ? (
                        <span
                          className="rounded px-2.5 py-1 text-xs font-semibold text-white shadow-xs"
                          style={{ backgroundColor: supplier.latestRankColor ?? '#64748b' }}
                        >
                          Rank {supplier.latestRankCode}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Chưa có</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1.5">
                      <button
                        onClick={() => setDetailSupplierId(supplier.id)}
                        title="Xem chi tiết đánh giá"
                        className="focus-ring inline-flex rounded-md border border-line bg-white p-2 text-slate-600 hover:bg-slate-100 transition"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => edit(supplier)}
                        title="Chỉnh sửa thông tin"
                        className="focus-ring inline-flex rounded-md border border-line bg-white p-2 text-blue-600 hover:bg-blue-50 transition"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => remove(supplier)}
                        title="Xóa nhà cung cấp"
                        className="focus-ring inline-flex rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <span>
                Hiển thị {(pagination.page - 1) * pagination.limit + 1}–
                {Math.min(pagination.page * pagination.limit, pagination.total)} / {pagination.total} nhà cung cấp
              </span>
              <select
                value={limit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                className="rounded border border-line px-2 py-1 text-xs bg-white"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>{s} / trang</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="flex items-center gap-1 rounded border border-line bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={14} /> Trước
              </button>

              {/* Page numbers */}
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - pagination.page) <= 2)
                .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-slate-400">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p as number)}
                      className={`rounded border px-2.5 py-1.5 text-xs transition ${
                        pagination.page === p
                          ? 'border-accent bg-accent text-white font-semibold'
                          : 'border-line bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="flex items-center gap-1 rounded border border-line bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Sau <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SortIcon({
  field,
  currentSortBy,
  currentSortOrder,
}: {
  field: string;
  currentSortBy: string;
  currentSortOrder: 'ASC' | 'DESC';
}) {
  if (currentSortBy !== field) {
    return <ArrowUpDown size={13} className="text-slate-400 opacity-60" />;
  }
  return currentSortOrder === 'ASC' ? (
    <ArrowUp size={14} className="text-accent font-bold" />
  ) : (
    <ArrowDown size={14} className="text-accent font-bold" />
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
        className="focus-ring w-full rounded-md border border-line px-3 py-2 text-sm"
      />
    </label>
  );
}
