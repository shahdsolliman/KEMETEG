import type { LocalizedString } from '@/types/common';

export interface NavItem {
  labelKey: string;
  href: string;
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.projects', href: '/projects' },
  { labelKey: 'nav.services', href: '/#services' },
  { labelKey: 'nav.contact', href: '/contact' },
];

export const projectCategories: Array<{
  value: string;
  labelKey: string;
}> = [
  { value: 'all', labelKey: 'projects.filterAll' },
  { value: 'construction', labelKey: 'projects.filterConstruction' },
  { value: 'finishing', labelKey: 'projects.filterFinishing' },
  { value: 'residential', labelKey: 'projects.filterResidential' },
  { value: 'commercial', labelKey: 'projects.filterCommercial' },
  { value: 'administrative', labelKey: 'projects.filterAdministrative' },
  { value: 'industrial', labelKey: 'projects.filterIndustrial' },
  { value: 'interior', labelKey: 'projects.filterInterior' },
  { value: 'exterior', labelKey: 'projects.filterExterior' },
];

export const socialLinks: Array<{
  platform: string;
  href: string;
  icon: string;
}> = [
  { platform: 'Instagram', href: '#', icon: 'Instagram' },
  { platform: 'Facebook', href: '#', icon: 'Facebook' },
  { platform: 'WhatsApp', href: '#', icon: 'MessageCircle' },
  { platform: 'LinkedIn', href: 'https://www.linkedin.com/company/kemetegconstruction', icon: 'Linkedin' },
];

export const configuredSocialLinks = socialLinks.filter(({ href }) => href !== '#');

export const aboutTimeline: Array<{
  year: string;
  title: LocalizedString;
  description: LocalizedString;
}> = [
  {
    year: '[YEAR]',
    title: { ar: '[حدث تأسيس الشركة]', en: '[Company Founded]' },
    description: {
      ar: '[وصف المرحلة الأولى — سيُضاف لاحقاً]',
      en: '[Description of founding — to be provided by client]',
    },
  },
  {
    year: '[YEAR]',
    title: { ar: '[أول مشروع كبير]', en: '[First Major Project]' },
    description: {
      ar: '[وصف المرحلة — سيُضاف لاحقاً]',
      en: '[Description — to be provided by client]',
    },
  },
  {
    year: '[YEAR]',
    title: { ar: '[توسع في أسواق جديدة]', en: '[Expansion]' },
    description: {
      ar: '[وصف المرحلة — سيُضاف لاحقاً]',
      en: '[Description — to be provided by client]',
    },
  },
  {
    year: '[YEAR]',
    title: { ar: '[إنجاز حديث]', en: '[Recent Achievement]' },
    description: {
      ar: '[وصف المرحلة — سيُضاف لاحقاً]',
      en: '[Description — to be provided by client]',
    },
  },
];
