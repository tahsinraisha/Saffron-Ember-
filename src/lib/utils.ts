import { type ClassValue, clsx } from "clsx";

/** Merge conditional class names. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Appends Unsplash sizing/quality params to a base image URL so the
 * source asset requested is already close to the size it will render at.
 * Next/Image still optimizes on top of this.
 */
export function cdn(url: string, width = 1600, quality = 80) {
  const hasParams = url.includes("?");
  const params = `auto=format&fit=crop&w=${width}&q=${quality}`;
  return `${url}${hasParams ? "&" : "?"}${params}`;
}

export function formatPrice(value: number) {
  return value.toFixed(2);
}
