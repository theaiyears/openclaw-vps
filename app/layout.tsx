import type { Metadata } from 'next';
import { Analytics } from '../components/Analytics';

export const metadata: Metadata = {
  title: 'TrendForge',
  description:
    'Trend-driven micro-publications optimized for search traffic, lead capture, and affiliate monetization.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'Inter,Arial,sans-serif',
          margin: 0,
          background: '#0b1020',
          color: '#f5f7ff'
        }}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
