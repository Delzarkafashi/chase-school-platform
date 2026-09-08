import { useEffect, useState } from "react";
import { getCourses, updateCourse } from "../api/coursesApi";
import type { Course } from "../types/Course";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import "../styles/course-display-admin.css";

function CourseDisplayAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      setError("");

      const data = await getCourses();
      setCourses(data);
    } catch {
      setError("Kunde inte hämta utbildningarna.");
    } finally {
      setLoading(false);
    }
  }

  async function updateCourseVisibility(
    course: Course,
    changes: Partial<Course>
  ) {
    try {
      setSavingId(course.id);
      setError("");

      const updatedCourse: Course = {
        ...course,
        ...changes,
        updatedAt: new Date().toISOString(),
      };

      await updateCourse(course.id, updatedCourse);

      setCourses((currentCourses) =>
        currentCourses.map((item) =>
          item.id === course.id ? updatedCourse : item
        )
      );
    } catch {
      setError("Kunde inte uppdatera utbildningen.");
    } finally {
      setSavingId(null);
    }
  }

  function handleActiveChange(course: Course) {
    updateCourseVisibility(course, {
      isActive: !course.isActive,
    });
  }

  function handleFeaturedChange(course: Course) {
    updateCourseVisibility(course, {
      isFeatured: !course.isFeatured,
    });
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="course-display-admin">
          <p>Laddar utbildningar...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="course-display-admin">
        <div className="course-display-admin-header">
          <p className="course-display-admin-eyebrow">
            INNEHÅLL / UTBILDNINGAR
          </p>

          <h1>Utbildningar på webbplatsen</h1>

          <p>
            Välj vilka utbildningar som ska visas på utbildningssidan och vilka
            som ska lyftas fram på startsidan.
          </p>
        </div>

        {error && (
          <div className="course-display-admin-error">
            {error}
          </div>
        )}

        <div className="course-display-admin-list">
          {courses.map((course) => (
            <article
              key={course.id}
              className="course-display-admin-card"
            >
              {course.image && (
                <div className="course-display-admin-image">
                  <img
                    src={course.image}
                    alt={course.name}
                  />
                </div>
              )}

              <div className="course-display-admin-content">
                <div>
                  <span className="course-display-admin-category">
                    {course.category}
                  </span>

                  <h3>{course.name}</h3>

                  <p className="course-display-admin-description">
                    {course.shortDescription}
                  </p>

                  <div className="course-display-admin-meta">
                    <span
                      className={`course-display-admin-status ${
                        course.isActive
                          ? "course-display-admin-status-active"
                          : ""
                      }`}
                    >
                      {course.isActive
                        ? "Visas på utbildningssidan"
                        : "Dold från utbildningssidan"}
                    </span>

                    <span
                      className={`course-display-admin-status ${
                        course.isFeatured
                          ? "course-display-admin-status-active"
                          : ""
                      }`}
                    >
                      {course.isFeatured
                        ? "Visas på startsidan"
                        : "Visas inte på startsidan"}
                    </span>

                    <span className="course-display-admin-meta-item">
                      {course.studyPace}
                    </span>

                    <span className="course-display-admin-meta-item">
                      {course.location}
                    </span>
                  </div>
                </div>

                <div className="course-display-admin-actions">
                  <button
                    type="button"
                    className="course-display-admin-secondary-button"
                    disabled={savingId === course.id}
                    onClick={() => handleActiveChange(course)}
                  >
                    {savingId === course.id
                      ? "Sparar..."
                      : course.isActive
                        ? "Dölj från utbildningssidan"
                        : "Visa på utbildningssidan"}
                  </button>

                  <button
                    type="button"
                    className="course-display-admin-secondary-button"
                    disabled={savingId === course.id}
                    onClick={() => handleFeaturedChange(course)}
                  >
                    {savingId === course.id
                      ? "Sparar..."
                      : course.isFeatured
                        ? "Ta bort från startsidan"
                        : "Visa på startsidan"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CourseDisplayAdminPage;