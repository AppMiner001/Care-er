export const SITE_URL = "https://care-er.se";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
