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