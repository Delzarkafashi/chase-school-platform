import type { User } from "../types/User";

const BASE_URL = "http://localhost:3001";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta användare");
  }

  return response.json();
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta användaren");
  }

  return response.json();
}

export async function createUser(
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> {
  const now = new Date().toISOString();

  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
      createdAt: now,
      updatedAt: now,
    }),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa användaren");
  }

  return response.json();
}

export async function updateUser(
  id: string,
  user: Partial<Omit<User, "id" | "createdAt">>
): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera användaren");
  }

  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Kunde inte ta bort användaren");
  }
}