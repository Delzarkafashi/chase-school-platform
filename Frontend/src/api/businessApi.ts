import type { BusinessContent } from "../types/BusinessContent";

const BASE_URL = "http://localhost:3001";

export async function getBusinessContent(): Promise<BusinessContent[]> {
  const response = await fetch(`${BASE_URL}/businessContent`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta information för företag.");
  }

  return response.json();
}