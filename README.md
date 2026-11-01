# KEMET

Arabic/English website for KEMET Contracting & Finishing, built with Next.js, React, TypeScript, Tailwind CSS, and `next-intl`.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Routes are available under `/ar` and `/en`.

## Quality checks and production build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

The production server runs on port 3000 by default. Set `PORT` if the hosting environment assigns another port.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin (for example, `https://your-domain.example`) so generated metadata uses the deployed domain. The application currently has no contact-form delivery integration or required server secrets.

## Before public launch

- Add approved company contact details and social URLs in `messages/ar.json`, `messages/en.json`, and `src/data/navigation.ts`.
- Connect the contact form to the company’s chosen submission service. It intentionally reports that it is not connected instead of pretending messages were sent.
- Replace draft company/about copy, timeline entries, statistics, and project records with approved facts and add the corresponding project photography. Draft-only statistics, timeline entries, and project records are hidden from public pages.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain and verify the site on the production host.

Do not treat the site as production-ready until the launch items above are complete and a production build succeeds.
