import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionThemeSync from '@/components/layout/SectionThemeSync';
import CustomCursor from '@/components/cursor/CustomCursor';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as 'ar' | 'en')) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-black text-warm-white antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <SectionThemeSync />

          {/* Custom cursor — desktop only */}
          <CustomCursor />

          {/* Navigation */}
          <Navbar locale={locale as 'ar' | 'en'} />

          {/* Main content */}
          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <Footer locale={locale as 'ar' | 'en'} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
