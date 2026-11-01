import type { LocalizedString } from './common';

export interface Service {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string; // Lucide icon name
  image?: string;
  href?: string;
}
