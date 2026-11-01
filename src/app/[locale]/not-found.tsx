import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Container from '@/components/ui/Container';

/**
 * Localized not-found.tsx
 * Rendered within the LocaleLayout when a page is not found within a valid locale.
 */
export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 text-center">
      <Container narrow>
        <div className="w-24 h-24 mx-auto border-2 border-gold flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-gold/10" />
          <span className="text-4xl font-bold text-gold relative z-10">{t('notFound.code')}</span>
        </div>
        <h1 className="text-heading-xl font-bold text-warm-white mb-6">
          {t('notFound.headline')}
        </h1>
        <p className="text-body-xl text-gray-muted mb-12">
          {t('notFound.body')}
        </p>
        <Link 
          href="/"
          className="btn-primary"
        >
          {t('notFound.cta')}
        </Link>
      </Container>
    </div>
  );
}
