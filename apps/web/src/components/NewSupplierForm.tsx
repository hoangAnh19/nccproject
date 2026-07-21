'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { getBrowserApiUrl } from '@/lib/api';

const supplierTypes = ['Hàng hóa', 'TV', 'PTV'];

export function NewSupplierForm() {
  const router = useRouter();
  const apiUrl = useMemo(() => getBrowserApiUrl(), []);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      code: String(formData.get('code') ?? ''),
      taxCode: String(formData.get('taxCode') ?? ''),
      types: selectedTypes,
      note: String(formData.get('note') ?? ''),
    };

    try {
      const response = await fetch(`${apiUrl}/suppliers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Không thể lưu nhà cung cấp');
      }

      router.push('/suppliers');
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Không thể lưu nhà cung cấp');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-6">
      <div className="grid gap-x-6 gap-y-6 lg:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-[14px] font-bold text-blue">Tên nhà cung cấp *</span>
          <input className="field" name="name" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-[14px] font-bold text-blue">Mã cung cấp *</span>
          <input className="field" name="code" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-[14px] font-bold text-blue">Mã số thuế</span>
          <input className="field" name="taxCode" />
        </label>

        <div className="lg:col-span-3">
          <span className="mb-2 block text-[14px] font-bold text-blue">Loại hình áp dụng</span>
          <ul className="flex flex-wrap items-center gap-6">
            {supplierTypes.map((type) => (
              <li key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onChange={(event) => {
                    setSelectedTypes((current) =>
                      event.target.checked ? [...current, type] : current.filter((item) => item !== type),
                    );
                  }}
                />
                <label htmlFor={`type-${type}`} className="cursor-pointer">
                  {type}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <label className="block lg:col-span-3">
          <span className="mb-2 block text-[14px] font-bold text-blue">Mô tả chi tiết / Ghi chú</span>
          <textarea className="textarea" name="note" />
        </label>

        {error ? <p className="font-semibold text-red lg:col-span-3">{error}</p> : null}

        <div className="text-right lg:col-span-3">
          <button type="submit" disabled={saving} className="btn-main disabled:opacity-60">
            {saving ? 'Đang lưu...' : 'Thêm Nhà Cung Cấp'}
          </button>
        </div>
      </div>
    </form>
  );
}
