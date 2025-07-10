export function isDevelopment(): boolean {
  return import.meta.env.VITE_ENVIRONMENT === "development";
}
