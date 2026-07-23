import type { Metadata } from 'next';
import Script from 'next/script';
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-04J14TQJ1K" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-04J14TQJ1K');
          `}
        </Script>
        <div className="flex min-h-screen flex-col bg-surface lg:flex-row">
          <Sidebar />
          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
