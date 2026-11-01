import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /api routes
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /images (public assets)
  // - files with extensions (favicon, etc.)
  matcher: ['/((?!api|_next|_vercel|images|.*\\..*).*)'],
};
