import { AlertCircle, Inbox } from 'lucide-react';

export function LoadingState({ label = 'Đang tải dữ liệu' }: { label?: string }) {
  return <div className="rounded-md border border-line bg-white p-5 text-sm text-slate-600">{label}...</div>;
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <AlertCircle size={18} />
      {message}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-line bg-white p-5 text-sm text-slate-600">
      <Inbox size={18} />
      {message}
    </div>
  );
}
