import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import CourseCard from "../components/home/CourseCard";
import type { Course } from "../types/Course";
import { getCourses } from "../api/coursesApi";
import "../styles/courses-page.css";

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch {
        setError("Kunde inte hämta utbildningarna.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  return (
    <>
      <Header />

      <main className="courses-page">
        <section className="courses-page-hero">
          <div className="courses-page-container">
            <span className="courses-page-eyebrow">
              CHASE YRKESHÖGSKOLA
            </span>

            <h1>Utbildningar</h1>

            <p>
              Hitta utbildningen som passar ditt nästa steg. Våra utbildningar
              är utvecklade med tydlig koppling till arbetslivet och den
              kompetens som efterfrågas i branschen.
            </p>
          </div>
        </section>

        <section className="courses-page-content">
          <div className="courses-page-container">
            <div className="courses-page-heading">
              <div>
                <span className="courses-page-eyebrow">
                  ALLA UTBILDNINGAR
                </span>

                <h2>Välj din väg.</h2>
              </div>

              <span className="courses-count">
                {courses.length} utbildningar
              </span>
            </div>

            {loading && <p>Laddar utbildningar...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
              <div className="courses-page-grid">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default CoursesPage;