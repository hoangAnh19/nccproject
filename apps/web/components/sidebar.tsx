'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpenText, ClipboardCheck, LayoutDashboard, Settings, Truck } from 'lucide-react';
import logoBidv from '@/assets/images/logo-bidv-white.png';
import { classNames } from '@/lib/api';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/suppliers', label: 'Nhà cung cấp', icon: Truck },
  { href: '/evaluations', label: 'Đánh giá', icon: ClipboardCheck },
  { href: '/reports', label: 'Báo cáo', icon: BarChart3 },
  { href: '/guideline', label: 'Hướng dẫn', icon: BookOpenText },
  { href: '/admin', label: 'Admin', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/15 bg-[linear-gradient(to_bottom_right,#005d5c_0%,#0d9880_80.75%)] px-4 py-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:py-5">
      <div className="mb-4 flex items-center gap-4 lg:mb-8 lg:block">
        <Image src={logoBidv} alt="BIDV" className="h-10 w-auto sm:h-12 lg:h-16" priority />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-white/80 lg:mt-4 lg:text-sm">NCC CNTT</div>
          <div className="mt-0.5 text-sm font-bold text-white lg:mt-1 lg:text-lg">Đánh giá nhà cung cấp</div>
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                'flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition lg:gap-3',
                active ? 'bg-white text-[#005d5c]' : 'text-white/85 hover:bg-white/10 hover:text-white',
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
