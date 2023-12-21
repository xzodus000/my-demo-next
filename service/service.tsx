// src/services/service.tsx
const LIST_COUNTRY_API_URL =
  "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json";

export default async function fetchDataCountries() {
  try {
    const response = await fetch(LIST_COUNTRY_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
