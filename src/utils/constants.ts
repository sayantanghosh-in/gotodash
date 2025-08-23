export const FE_DATE_FORMAT_MINIFIED = "dd MMM";
export const FE_DATE_FORMAT = "dd MMM, yy";
export const WEBSITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://sayantanghosh.in"
    : "http://localhost:3000";
export const GOTODASH_URL =
  process.env.NODE_ENV === "production"
    ? "https://gotodash.sayantanghosh.in"
    : "http://localhost:5173";
export const GITHUB_PROFILE_URL = "https://github.com/sayantanghosh-in";
export const GOTODASH_GITHUB_PROJECT_URL = GITHUB_PROFILE_URL + "/gotodash";
export const BE_API_ENDPOINT = WEBSITE_URL + "/api";
export const GITHUB_CONTRIBUTIONS_API_ENDPOINT =
  "https://github-contributions-api.jogruber.de/v4/sayantanghosh-in";
