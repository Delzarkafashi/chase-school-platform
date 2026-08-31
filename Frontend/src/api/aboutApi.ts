import type { AboutContent } from "../types/AboutContent";

const BASE_URL = "http://localhost:3001";

export async function getAboutContent(): Promise<AboutContent[]> {
  const response = await fetch(`${BASE_URL}/aboutContent`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta information om Chase.");
  }

  return response.json();
}

export async function getAboutSection(
  id: string
): Promise<AboutContent> {
  const response = await fetch(`${BASE_URL}/aboutContent/${id}`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta sektionen.");
  }

  return response.json();
}