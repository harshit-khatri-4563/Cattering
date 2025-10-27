// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { OrderProvider } from '@/context/OrderContext'; // 1. Import
import OrderSummary from '@/components/OrderSummary'; // 2. Import

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gourmet Catering Services',
  description: 'Premium catering for all your events.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrderProvider> {/* 3. Wrap everything */}
          <Navbar />
          <main>{children}</main>
          <Footer />
          <OrderSummary /> {/* 4. Add the summary component */}
        </OrderProvider>
      </body>
    </html>
  );
}