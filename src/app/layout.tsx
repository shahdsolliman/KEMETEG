import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kemet.eg'),
  title: {
    default: 'KEMET | كيميت للمقاولات والتشطيبات',
    template: '%s | KEMET',
  },
  description:
    'كيميت للمقاولات والتشطيبات — شريككم في تحويل المساحات إلى تحف معمارية. مقاولات عامة، تشطيبات داخلية وخارجية، إدارة مشاريع.',
  keywords: ['مقاولات', 'تشطيبات', 'بناء', 'KEMET', 'كيميت', 'construction', 'finishing'],
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'KEMET | كيميت للمقاولات والتشطيبات',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
