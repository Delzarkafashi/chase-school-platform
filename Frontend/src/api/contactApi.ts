import type { ContactMessage } from "../types/ContactMessage";
import type { ContactPerson } from "../types/ContactPerson";

const BASE_URL = "http://localhost:3001";

export async function getContactPeople(): Promise<ContactPerson[]> {
  const response = await fetch(`${BASE_URL}/contactPeople`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta kontaktpersonerna.");
  }

  return response.json();
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const response = await fetch(`${BASE_URL}/contactMessages`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta kontaktmeddelandena.");
  }

  return response.json();
}

export async function getContactMessageById(
  id: string
): Promise<ContactMessage> {
  const response = await fetch(
    `${BASE_URL}/contactMessages/${id}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta kontaktmeddelandet.");
  }

  return response.json();
}

export async function createContactMessage(
  message: ContactMessage
): Promise<ContactMessage> {
  const response = await fetch(`${BASE_URL}/contactMessages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skicka meddelandet.");
  }

  return response.json();
}

export async function updateContactMessage(
  id: string,
  updates: Partial<ContactMessage>
): Promise<ContactMessage> {
  const response = await fetch(
    `${BASE_URL}/contactMessages/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera kontaktmeddelandet.");
  }

  return response.json();
}