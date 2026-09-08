import type { Course } from "../types/Course";

const BASE_URL = "http://localhost:3001";

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${BASE_URL}/courses`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta utbildningarna.");
  }

  return response.json();
}

export async function getCourseById(id: string): Promise<Course> {
  const response = await fetch(`${BASE_URL}/courses/${id}`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta utbildningen.");
  }

  return response.json();
}

export async function createCourse(
  course: Omit<Course, "id">
): Promise<Course> {
  const response = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa utbildningen.");
  }

  return response.json();
}

export async function updateCourse(
  id: string,
  course: Omit<Course, "id">
): Promise<Course> {
  const response = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera utbildningen.");
  }

  return response.json();
}

export async function deleteCourse(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Kunde inte ta bort utbildningen.");
  }
}