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

export async function updateAboutContent(
  id: string,
  content: AboutContent
): Promise<AboutContent> {
  const response = await fetch(
    `${BASE_URL}/aboutContent/${id}`,
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

export async function createAboutContent(
  content: Omit<AboutContent, "id">
): Promise<AboutContent> {
  const response = await fetch(`${BASE_URL}/aboutContent`, {
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

export async function deleteAboutContent(
  id: string
): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/aboutContent/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte ta bort innehållet.");
  }
}