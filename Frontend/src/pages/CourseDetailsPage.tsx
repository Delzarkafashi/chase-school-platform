import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import type { Course } from "../types/Course";
import { getCourseById } from "../api/coursesApi";
import "../styles/course-details.css";

function CourseDetailsPage() {
  const { id } = useParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourse() {
      if (!id) {
        setError("Utbildningen kunde inte hittas.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch {
        setError("Kunde inte hämta utbildningen.");
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [id]);

  return (
    <>
      <Header />

      <main className="course-details-page">
        {loading && (
          <div className="course-details-container">
            <p>Laddar utbildningen...</p>
          </div>
        )}

        {error && (
          <div className="course-details-container">
            <p>{error}</p>

            <Link to="/utbildningar">
              Till alla utbildningar
            </Link>
          </div>
        )}

        {!loading && !error && course && (
          <>
            <section className="course-details-hero">
              <div className="course-details-container">
                <Link
                  className="course-back-link"
                  to="/utbildningar"
                >
                  ← Alla utbildningar
                </Link>

                <span className="course-details-category">
                  {course.category}
                </span>

                <h1>{course.name}</h1>

                <p className="course-details-intro">
                  {course.shortDescription}
                </p>

                <div className="course-details-actions">
                  {course.isOpenForApplication && (
                    <a
                      className="course-apply-button"
                      href="#ansok"
                    >
                      Ansök till utbildningen
                    </a>
                  )}
                </div>
              </div>
            </section>

            <section className="course-details-content">
              <div className="course-details-container course-details-grid">
                <div className="course-main-content">
                  <section className="course-content-section">
                    <span className="course-section-label">
                      OM UTBILDNINGEN
                    </span>

                    <h2>Om {course.name}</h2>

                    <p>{course.description}</p>
                  </section>

                  <section className="course-content-section">
                    <span className="course-section-label">
                      EFTER UTBILDNINGEN
                    </span>

                    <h2>Vad kan du arbeta som?</h2>

                    <div className="career-list">
                      {course.careerOpportunities.map((career) => (
                        <div
                          className="career-item"
                          key={career}
                        >
                          {career}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="course-content-section">
                    <span className="course-section-label">
                      BEHÖRIGHET
                    </span>

                    <h2>Förkunskaper</h2>

                    <p>{course.requirements}</p>
                  </section>
                </div>

                <aside className="course-facts">
                  <h2>Utbildningsfakta</h2>

                  <div className="course-fact">
                    <span>Längd</span>
                    <strong>{course.duration}</strong>
                  </div>

                  <div className="course-fact">
                    <span>Studietakt</span>
                    <strong>{course.studyPace}</strong>
                  </div>

                  <div className="course-fact">
                    <span>Studieform</span>
                    <strong>{course.studyForm}</strong>
                  </div>

                  <div className="course-fact">
                    <span>Ort</span>
                    <strong>{course.location}</strong>
                  </div>

                  <div className="course-fact">
                    <span>YH-poäng</span>
                    <strong>{course.points}</strong>
                  </div>

                  <div className="course-fact">
                    <span>Språk</span>
                    <strong>{course.language}</strong>
                  </div>

                  <div className="course-fact">
                    <span>Start</span>
                    <strong>{course.startDate}</strong>
                  </div>

                  <div className="course-fact">
                    <span>Sista ansökningsdag</span>
                    <strong>{course.applicationDeadline}</strong>
                  </div>

                  <div className="course-fact">
                    <span>Utbildare</span>
                    <strong>{course.teacher}</strong>
                  </div>
                </aside>
              </div>
            </section>

            <section
              className="course-apply-section"
              id="ansok"
            >
              <div className="course-details-container">
                <div className="course-apply-content">
                  <span className="course-section-label">
                    NÄSTA STEG
                  </span>

                  <h2>Redo att börja?</h2>

                  <p>
                    Ta nästa steg mot en karriär inom {course.category}.
                  </p>

                  <button type="button">
                    Ansök till {course.name}
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default CourseDetailsPage;