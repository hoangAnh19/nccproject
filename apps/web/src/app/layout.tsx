import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'BIDV IT-VMS',
  description: 'Hệ thống đánh giá chất lượng nhà cung cấp CNTT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Sidebar />
        <main className="app-shell min-h-screen pl-[280px]">
          <div className="p-5 md:p-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
