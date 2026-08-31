import type { Application } from "../types/Application";

const BASE_URL = "http://localhost:3001";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${BASE_URL}/applications`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta ansökningarna.");
  }

  return response.json();
}

export async function getApplicationById(
  id: string
): Promise<Application> {
  const response = await fetch(`${BASE_URL}/applications/${id}`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta ansökan.");
  }

  return response.json();
}

export async function createApplication(
  application: Application
): Promise<Application> {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skicka ansökan.");
  }

  return response.json();
}

export async function updateApplication(
  id: string,
  application: Partial<Application>
): Promise<Application> {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera ansökan.");
  }

  return response.json();
}