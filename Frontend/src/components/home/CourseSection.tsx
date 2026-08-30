import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Course } from "../../types/Course";
import { getCourses } from "../../api/coursesApi";
import CourseCard from "./CourseCard";
import "../../styles/courses.css";

function CourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();

        const featuredCourses = data
          .filter((course) => course.isFeatured)
          .slice(0, 3);

        setCourses(featuredCourses);
      } catch {
        setError("Kunde inte hämta utbildningarna.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  return (
    <section className="course-section" id="utbildningar">
      <div className="course-section-container">
        <div className="course-section-header">
          <div>
            <span className="course-section-eyebrow">UTBILDNINGAR</span>
            <h2>Hitta utbildningen för ditt nästa steg.</h2>
          </div>

          <Link className="all-courses-link" to="/utbildningar">
            Se alla utbildningar
          </Link>
        </div>

        {loading && <p>Laddar utbildningar...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseSection;