import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getApiUrl(path: string): string {
  // Use local backend for development
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? "https://eventmanagementapi-production.up.railway.app"
    : "http://localhost:3001";
  // Ensure no double slashes
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
