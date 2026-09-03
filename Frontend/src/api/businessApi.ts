import type { BusinessContent } from "../types/BusinessContent";

const BASE_URL = "http://localhost:3001";

export async function getBusinessContent(): Promise<BusinessContent[]> {
  const response = await fetch(`${BASE_URL}/businessContent`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta information för företag.");
  }

  return response.json();
}

export async function createBusinessContent(
  content: Omit<BusinessContent, "id">
): Promise<BusinessContent> {
  const response = await fetch(`${BASE_URL}/businessContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa innehållet.");
  }

  return response.json();
}

export async function updateBusinessContent(
  id: string,
  content: BusinessContent
): Promise<BusinessContent> {
  const response = await fetch(
    `${BASE_URL}/businessContent/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera innehållet.");
  }

  return response.json();
}

export async function deleteBusinessContent(
  id: string
): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/businessContent/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte ta bort innehållet.");
  }
}