import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { SuppliersClient } from '@/components/SuppliersClient';
import { getSuppliers } from '@/lib/api';

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();
  const evaluated = suppliers.filter((supplier) => supplier.rank !== 'UNRATED').length;

  return (
    <>
      <PageHeader
        title="Nhà cung cấp"
        description={`${suppliers.length} nhà cung cấp - ${evaluated} đã đánh giá trong kỳ Quý II/2026`}
        action={{
          href: '/suppliers/new',
          label: 'Thêm nhà cung cấp',
          icon: <Plus size={18} />,
        }}
      />
      <SuppliersClient suppliers={suppliers} />
    </>
  );
}
