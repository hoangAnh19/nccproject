import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { EvaluationForm } from '@/components/EvaluationForm';
import { getSuppliers } from '@/lib/api';

type EvaluatePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EvaluateSupplierPage({ params }: EvaluatePageProps) {
  const { id } = await params;
  const suppliers = await getSuppliers();
  const supplier = suppliers.find((item) => String(item.id) === id);

  if (!supplier) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title="Khảo sát & Đánh giá"
        description={`Nhà cung cấp: ${supplier.name} (${supplier.types.join(', ')})`}
      />
      <EvaluationForm supplier={supplier} />
    </>
  );
}
