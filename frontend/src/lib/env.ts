export function getApiBase(): string {
  const url = import.meta.env.VITE_API_URL as string | undefined;
  if (!url) {
    // valeur par defaut pour dev local
    return "http://localhost:8000/api/v1";
  }
  return url;
}
