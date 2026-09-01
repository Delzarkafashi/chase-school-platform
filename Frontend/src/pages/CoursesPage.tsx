import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import CourseCard from "../components/home/CourseCard";
import CourseFilters from "../components/courses/CourseFilters";
import type { Course } from "../types/Course";
import type { CourseFilters as CourseFiltersType } from "../types/CourseFilters";
import { getCourses } from "../api/coursesApi";
import "../styles/courses-page.css";
import "../styles/courses.css";
import Footer from "../components/layout/Footer";

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState<CourseFiltersType>({
    search: "",
    studyForm: "",
    studyPace: "",
    location: "",
    category: "",
    startYear: "",
    applicationStatus: "",
  });

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

  const filteredCourses = courses.filter((course) => {
    const searchTerm = filters.search.toLowerCase().trim();

    const matchesSearch =
      searchTerm === "" ||
      course.name.toLowerCase().includes(searchTerm) ||
      course.shortDescription.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm);

    const matchesStudyForm =
      filters.studyForm === "" ||
      course.studyForm === filters.studyForm;

    const matchesStudyPace =
      filters.studyPace === "" ||
      course.studyPace === filters.studyPace;

    const matchesLocation =
      filters.location === "" ||
      course.location === filters.location;

    const matchesCategory =
      filters.category === "" ||
      course.category === filters.category;

    const matchesStartYear =
      filters.startYear === "" ||
      course.startDate.startsWith(filters.startYear);

    const matchesApplicationStatus =
      filters.applicationStatus === "" ||
      (filters.applicationStatus === "open" &&
        course.isOpenForApplication === true) ||
      (filters.applicationStatus === "closed" &&
        course.isOpenForApplication === false);

    return (
      matchesSearch &&
      matchesStudyForm &&
      matchesStudyPace &&
      matchesLocation &&
      matchesCategory &&
      matchesStartYear &&
      matchesApplicationStatus
    );
  });

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
                {filteredCourses.length} utbildningar
              </span>
            </div>

            <CourseFilters
            filters={filters}
            onChange={setFilters}
            courses={courses}
            />

            {loading && <p>Laddar utbildningar...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && filteredCourses.length === 0 && (
              <p>Inga utbildningar matchar dina filter.</p>
            )}

            {!loading && !error && filteredCourses.length > 0 && (
              <div className="courses-page-grid">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CoursesPage;