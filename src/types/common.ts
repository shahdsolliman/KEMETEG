export interface LocalizedString {
  ar: string;
  en: string;
}

export type Locale = 'ar' | 'en';

export interface LocalizedField<T> {
  ar: T;
  en: T;
}
