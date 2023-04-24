export function cookies(rawCookies: string): Record<string, string> {
  return rawCookies
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
}
