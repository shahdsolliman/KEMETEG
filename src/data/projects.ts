import type { Project } from '@/types/project';

/**
 * Project data layer — sourced from this file initially.
 * To connect to a CMS or API later, replace this array with a fetch call
 * while keeping the same Project interface. No UI components need to change.
 *
 * Image paths follow the pattern:
 *   /images/projects/[slug]/cover.webp
 *   /images/projects/[slug]/01.webp, 02.webp, ...
 */
export const projects: Project[] = [
  {
    slug: 'project-01',
    featured: true,
    title: {
      ar: '[اسم المشروع الأول]',
      en: '[Project One Name]',
    },
    description: {
      ar: '[وصف المشروع الأول — سيُضاف لاحقاً من قِبَل العميل. يمكن أن يكون النص مفصلاً ويصف طبيعة المشروع والأعمال المنفذة.]',
      en: '[Project One description — to be provided by client. This can be a detailed description of the project scope and work completed.]',
    },
    location: {
      ar: '[الموقع — المدينة، الحي]',
      en: '[Location — City, District]',
    },
    category: 'construction',
    year: 2024,
    coverImage: '/images/projects/project-01/cover.webp',
    gallery: [
      '/images/projects/project-01/01.webp',
      '/images/projects/project-01/02.webp',
      '/images/projects/project-01/03.webp',
    ],
    client: '[Client Name]',
    area: '[XX,XXX م²]',
    status: { ar: 'مكتمل', en: 'Completed' },
    scope: [
      { ar: 'أعمال المقاولات', en: 'Contracting Works' },
      { ar: 'التشطيبات الداخلية', en: 'Interior Finishing' },
    ],
  },
  {
    slug: 'project-02',
    featured: true,
    title: {
      ar: '[اسم المشروع الثاني]',
      en: '[Project Two Name]',
    },
    description: {
      ar: '[وصف المشروع الثاني — سيُضاف لاحقاً من قِبَل العميل.]',
      en: '[Project Two description — to be provided by client.]',
    },
    location: {
      ar: '[الموقع]',
      en: '[Location]',
    },
    category: 'finishing',
    year: 2024,
    coverImage: '/images/projects/project-02/cover.webp',
    gallery: [
      '/images/projects/project-02/01.webp',
      '/images/projects/project-02/02.webp',
    ],
    status: { ar: 'مكتمل', en: 'Completed' },
  },
  {
    slug: 'project-03',
    featured: true,
    title: {
      ar: '[اسم المشروع الثالث]',
      en: '[Project Three Name]',
    },
    description: {
      ar: '[وصف المشروع الثالث — سيُضاف لاحقاً.]',
      en: '[Project Three description — to be provided by client.]',
    },
    location: {
      ar: '[الموقع]',
      en: '[Location]',
    },
    category: 'residential',
    year: 2023,
    coverImage: '/images/projects/project-03/cover.webp',
    gallery: [
      '/images/projects/project-03/01.webp',
      '/images/projects/project-03/02.webp',
      '/images/projects/project-03/03.webp',
      '/images/projects/project-03/04.webp',
    ],
    status: { ar: 'مكتمل', en: 'Completed' },
  },
  {
    slug: 'project-04',
    featured: false,
    title: {
      ar: '[اسم المشروع الرابع]',
      en: '[Project Four Name]',
    },
    description: {
      ar: '[وصف المشروع الرابع — سيُضاف لاحقاً.]',
      en: '[Project Four description — to be provided by client.]',
    },
    location: {
      ar: '[الموقع]',
      en: '[Location]',
    },
    category: 'commercial',
    year: 2023,
    coverImage: '/images/projects/project-04/cover.webp',
    gallery: [
      '/images/projects/project-04/01.webp',
      '/images/projects/project-04/02.webp',
    ],
    status: { ar: 'مكتمل', en: 'Completed' },
  },
  {
    slug: 'project-05',
    featured: false,
    title: {
      ar: '[اسم المشروع الخامس]',
      en: '[Project Five Name]',
    },
    description: {
      ar: '[وصف المشروع الخامس — سيُضاف لاحقاً.]',
      en: '[Project Five description — to be provided by client.]',
    },
    location: {
      ar: '[الموقع]',
      en: '[Location]',
    },
    category: 'interior',
    year: 2023,
    coverImage: '/images/projects/project-05/cover.webp',
    gallery: [
      '/images/projects/project-05/01.webp',
      '/images/projects/project-05/02.webp',
      '/images/projects/project-05/03.webp',
    ],
    status: { ar: 'مكتمل', en: 'Completed' },
  },
  {
    slug: 'project-06',
    featured: true,
    title: {
      ar: '[اسم المشروع السادس]',
      en: '[Project Six Name]',
    },
    description: {
      ar: '[وصف المشروع السادس — سيُضاف لاحقاً.]',
      en: '[Project Six description — to be provided by client.]',
    },
    location: {
      ar: '[الموقع]',
      en: '[Location]',
    },
    category: 'exterior',
    year: 2022,
    coverImage: '/images/projects/project-06/cover.webp',
    gallery: [
      '/images/projects/project-06/01.webp',
      '/images/projects/project-06/02.webp',
    ],
    status: { ar: 'مكتمل', en: 'Completed' },
  },
];

const hasPublishedContent = (project: Project) => [
  project.title.ar,
  project.title.en,
  project.description.ar,
  project.description.en,
  project.location.ar,
  project.location.en,
].every((value) => !/^\s*\[.*\]\s*$/.test(value));

export const publishedProjects = projects.filter(hasPublishedContent);
export const featuredProjects = publishedProjects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return publishedProjects.find((project) => project.slug === slug);
}

export function getAdjacentProject(
  slug: string
): { next: Project | null } {
  const index = publishedProjects.findIndex((project) => project.slug === slug);
  const next = index < publishedProjects.length - 1
    ? publishedProjects[index + 1]
    : publishedProjects[0];
  return { next: next ?? null };
}

export function getAllSlugs(): string[] {
  return publishedProjects.map((project) => project.slug);
}
