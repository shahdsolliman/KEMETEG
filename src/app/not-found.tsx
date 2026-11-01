import Link from 'next/link';
import Container from '@/components/ui/Container';

/**
 * Root not-found.tsx
 * Used when a locale is missing or an unknown route is hit at the root.
 * Simple fallback since we don't have locale context here.
 */
export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-black text-warm-white antialiased">
        <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-black">
          <Container narrow>
            <div className="w-20 h-20 mx-auto border-2 border-gold flex items-center justify-center mb-8">
              <span className="text-4xl font-bold text-gold">404</span>
            </div>
            <h1 className="text-4xl font-bold text-warm-white mb-4">Page Not Found</h1>
            <p className="text-body-lg text-gray-muted mb-10">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link 
              href="/ar"
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-black font-semibold text-sm tracking-widest uppercase hover:bg-transparent hover:text-gold border border-gold transition-colors"
            >
              Return Home
            </Link>
          </Container>
        </main>
      </body>
    </html>
  );
}
