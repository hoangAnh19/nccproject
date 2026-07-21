import Link from 'next/link';
import { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: {
    href: string;
    label: string;
    icon?: ReactNode;
  };
  children?: ReactNode;
};

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-5 border-b border-solid border-[#e2e8f0] pb-10 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="page-title">{title}</div>
        {description ? <p className="mt-1 text-slate-600">{description}</p> : null}
      </div>
      {children}
      {action ? (
        <Link href={action.href} className="btn-main">
          {action.icon}
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
