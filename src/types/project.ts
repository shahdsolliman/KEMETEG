import type { LocalizedString } from './common';

export type ProjectCategory =
  | 'construction'
  | 'finishing'
  | 'residential'
  | 'commercial'
  | 'administrative'
  | 'industrial'
  | 'interior'
  | 'exterior';

export interface Project {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  location: LocalizedString;
  category: ProjectCategory;
  year: number;
  coverImage: string;
  gallery: string[];
  featured?: boolean;
  // Optional rich fields
  client?: string;
  area?: string;
  status?: LocalizedString;
  scope?: LocalizedString[];
  challenge?: LocalizedString;
  solution?: LocalizedString;
  execution?: LocalizedString;
  materials?: LocalizedString[];
  results?: LocalizedString;
}
