'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, ClipboardList, LayoutDashboard, Users } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/guideline', label: 'Hướng dẫn', icon: ClipboardList },
  { href: '/suppliers', label: 'Nhà cung cấp', icon: Users },
  { href: '/reports', label: 'Báo cáo', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar fixed left-0 top-0 z-20 h-full w-full max-w-[280px] overflow-hidden px-8 py-10 text-white">
      <div className="sidebar-inner flex h-full flex-col justify-between">
        <div>
          <Link href="/" className="mb-10 block w-[150px] lg:w-auto">
            <Image
              src="/assets/images/logo-bidv.png"
              alt="BIDV"
              width={180}
              height={58}
              priority
              className="brightness-0 invert"
            />
          </Link>

          <nav className="nav-menu">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link href={item.href} className={active ? 'active' : undefined}>
                      <Icon size={20} strokeWidth={2.1} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
