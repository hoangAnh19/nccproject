import { ReactNode } from 'react';

type StatCardProps = {
  icon: ReactNode;
  value: string | number;
  label: string;
};

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="panel p-6">
      <div className="flex items-center gap-5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2 bg-[#f1f5f9] text-blue">
          {icon}
        </div>
        <div>
          <div className="text-[24px] font-bold text-blue">{value}</div>
          <p className="text-slate-600">{label}</p>
        </div>
      </div>
    </div>
  );
}
