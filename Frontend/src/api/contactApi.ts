import type { ContactMessage } from "../types/ContactMessage";
import type { ContactPerson } from "../types/ContactPerson";
import type { ContactContent } from "../types/ContactContent";

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
  const response = await fetch(
    `${BASE_URL}/contactMessages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

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

export async function getContactContent(): Promise<ContactContent[]> {
  const response = await fetch(
    `${BASE_URL}/contactContent`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta kontaktinnehållet.");
  }

  return response.json();
}

export async function createContactContent(
  content: Omit<ContactContent, "id">
): Promise<ContactContent> {
  const response = await fetch(
    `${BASE_URL}/contactContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte skapa kontaktinnehållet.");
  }

  return response.json();
}

export async function updateContactContent(
  id: string,
  content: ContactContent
): Promise<ContactContent> {
  const response = await fetch(
    `${BASE_URL}/contactContent/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera kontaktinnehållet.");
  }

  return response.json();
}

export async function deleteContactContent(
  id: string
): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/contactContent/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte ta bort kontaktinnehållet.");
  }
}

export async function createContactPerson(
  person: Omit<ContactPerson, "id">
): Promise<ContactPerson> {
  const response = await fetch(`${BASE_URL}/contactPeople`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa kontaktpersonen.");
  }

  return response.json();
}

export async function updateContactPerson(
  id: string,
  person: ContactPerson
): Promise<ContactPerson> {
  const response = await fetch(
    `${BASE_URL}/contactPeople/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera kontaktpersonen.");
  }

  return response.json();
}

export async function deleteContactPerson(
  id: string
): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/contactPeople/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte ta bort kontaktpersonen.");
  }
}