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
export const BE_API_ENDPOINT = WEBSITE_URL + "/api";
