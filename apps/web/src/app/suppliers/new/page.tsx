import { PageHeader } from '@/components/PageHeader';
import { NewSupplierForm } from '@/components/NewSupplierForm';

export default function NewSupplierPage() {
  return (
    <>
      <PageHeader title="Thêm nhà cung cấp mới" />
      <NewSupplierForm />
    </>
  );
}
