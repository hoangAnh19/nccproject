import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Đánh giá chất lượng nhà cung cấp CNTT',
  description: 'Quản lý, chấm điểm và báo cáo chất lượng nhà cung cấp CNTT',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <div className="flex min-h-screen bg-surface">
          <Sidebar />
          <main className="min-w-0 flex-1 px-8 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
