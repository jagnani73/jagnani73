// Countries where we suppress the persistent visitor id (GDPR / UK GDPR / EEA
// ePrivacy). Gated visitors still contribute to aggregate + record stats — they
// just drop out of per-visitor superlatives, since those need a stable id.
// `x-vercel-ip-country` returns uppercase ISO 3166-1 alpha-2 codes.
const PRIVACY_GATED_COUNTRIES = new Set<string>([
  // EU 27
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  // EEA (non-EU)
  "IS",
  "LI",
  "NO",
  // UK GDPR
  "GB",
]);

export const isPrivacyGatedCountry = (
  code: string | null | undefined,
): boolean => !!code && PRIVACY_GATED_COUNTRIES.has(code.toUpperCase());
