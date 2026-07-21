'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { RankBadge } from '@/components/RankBadge';
import { formatDate, formatScore } from '@/lib/format';
import { Supplier, SupplierRank } from '@/lib/types';

const ranks: Array<{ value: SupplierRank | ''; label: string }> = [
  { value: '', label: 'Xếp hạng' },
  { value: 'A', label: 'Loại A' },
  { value: 'B', label: 'Loại B' },
  { value: 'C', label: 'Loại C' },
  { value: 'D', label: 'Loại D' },
  { value: 'UNRATED', label: 'Chưa đánh giá' },
];

export function SuppliersClient({ suppliers }: { suppliers: Supplier[] }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [rank, setRank] = useState<SupplierRank | ''>('');

  const filteredSuppliers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        supplier.name.toLowerCase().includes(normalizedSearch) ||
        supplier.code.toLowerCase().includes(normalizedSearch) ||
        supplier.taxCode?.toLowerCase().includes(normalizedSearch);
      const matchesType = type.length === 0 || supplier.types.includes(type);
      const matchesRank = rank.length === 0 || supplier.rank === rank;

      return matchesSearch && matchesType && matchesRank;
    });
  }, [rank, search, suppliers, type]);

  return (
    <>
      <section className="panel mb-6 p-6">
        <div className="grid gap-3 text-[14px] lg:grid-cols-2">
          <input
            type="text"
            className="field"
            placeholder="Tìm theo tên nhà cung cấp, mã hoặc mã số thuế"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <select className="field" value={type} onChange={(event) => setType(event.target.value)}>
              <option value="">Loại hình</option>
              <option value="Hàng hóa">Hàng hóa</option>
              <option value="TV">TV</option>
              <option value="PTV">PTV</option>
            </select>
            <select
              className="field"
              value={rank}
              onChange={(event) => setRank(event.target.value as SupplierRank | '')}
            >
              {ranks.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <button className="h-10 rounded-2 bg-blue px-5 font-bold text-white" type="button">
              Filter
            </button>
          </div>
        </div>
      </section>

      <section className="panel p-6">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nhà cung cấp</th>
                <th>Mã số thuế</th>
                <th>Loại hình</th>
                <th>Điểm</th>
                <th>Ngày đánh giá</th>
                <th>Xếp hạng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>
                    <div className="name">{supplier.name}</div>
                    <span className="list-badge">{supplier.code}</span>
                  </td>
                  <td>{supplier.taxCode ?? '--'}</td>
                  <td>{supplier.types.join(', ')}</td>
                  <td>
                    <span className="font-bold">{formatScore(supplier.latestScore)}</span>
                  </td>
                  <td>{formatDate(supplier.lastEvaluatedAt)}</td>
                  <td>
                    <RankBadge rank={supplier.rank} />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        href={supplier.rank === 'UNRATED' ? `/suppliers/${supplier.id}/evaluate` : '/reports/sample'}
                        className="more-single bg-blue text-white"
                      >
                        {supplier.rank === 'UNRATED' ? 'Đánh giá' : 'Chi tiết'}
                      </Link>
                      {supplier.rank === 'UNRATED' ? (
                        <button type="button" className="more-single">
                          Xóa
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
