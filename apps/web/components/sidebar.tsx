'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, ClipboardCheck, LayoutDashboard, Settings, Truck } from 'lucide-react';
import { classNames } from '@/lib/api';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/suppliers', label: 'Nhà cung cấp', icon: Truck },
  { href: '/evaluations', label: 'Đánh giá', icon: ClipboardCheck },
  { href: '/reports', label: 'Báo cáo', icon: BarChart3 },
  { href: '/admin', label: 'Admin', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-line bg-white px-4 py-5">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-wide text-accent">NCC CNTT</div>
        <div className="mt-1 text-lg font-bold text-ink">Đánh giá nhà cung cấp</div>
      </div>
      <nav className="space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
                active ? 'bg-accent text-white' : 'text-slate-700 hover:bg-slate-100',
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
