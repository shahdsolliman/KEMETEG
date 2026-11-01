import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class names safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Get localized string based on current locale */
export function getLocalized(
  obj: { ar: string; en: string },
  locale: string
): string {
  return locale === 'en' ? obj.en : obj.ar;
}

/** Format a year for display */
export function formatYear(year: number): string {
  return year.toString();
}

/** Truncate text to a given character length */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '…';
}

export function isPlaceholderValue(value: string): boolean {
  return /^\s*\[.*\]\s*$/.test(value);
}
