import { useEffect, useState } from "react";
import type { Course } from "../types/Course";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../api/coursesApi";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import "../styles/course-content-admin.css";

type CourseFormData = Omit<Course, "id">;

const emptyCourse: CourseFormData = {
  name: "",
  shortDescription: "",
  description: "",
  category: "",
  level: "Yrkeshögskola",

  teacher: "",
  duration: "",
  studyPace: "100%",
  studyForm: "På plats",
  location: "",

  startDate: "",
  applicationDeadline: "",

  points: 400,
  language: "Svenska",
  requirements: "",
  careerOpportunities: [],

  image: "",
  isFeatured: false,
  isOpenForApplication: true,

  isActive: true,
  createdAt: "",
  updatedAt: "",
};

export default function CourseContentAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<CourseFormData>(emptyCourse);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [careerText, setCareerText] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    } catch (error) {
      console.error(error);
      setError("Kunde inte hämta utbildningarna.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;

      setFormData((current) => ({
        ...current,
        [name]: checked,
      }));

      return;
    }

    if (name === "points") {
      setFormData((current) => ({
        ...current,
        points: Number(value),
      }));

      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleCreate() {
    setEditingId(null);
    setFormData(emptyCourse);
    setCareerText("");
    setShowForm(true);
    setError("");
  }

  function handleEdit(course: Course) {
    const { id, ...courseWithoutId } = course;

    setEditingId(id);
    setFormData(courseWithoutId);
    setCareerText(course.careerOpportunities.join("\n"));
    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancel() {
    setEditingId(null);
    setFormData(emptyCourse);
    setCareerText("");
    setShowForm(false);
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const now = new Date().toISOString();

      const courseData: CourseFormData = {
        ...formData,

        careerOpportunities: careerText
          .split("\n")
          .map((career) => career.trim())
          .filter(Boolean),

        createdAt: editingId
          ? formData.createdAt
          : now,

        updatedAt: now,
      };

      if (editingId) {
        const updatedCourse = await updateCourse(
          editingId,
          courseData
        );

        setCourses((current) =>
          current.map((course) =>
            course.id === editingId ? updatedCourse : course
          )
        );
      } else {
        const createdCourse = await createCourse(courseData);

        setCourses((current) => [
          ...current,
          createdCourse,
        ]);
      }

      handleCancel();
    } catch (error) {
      console.error(error);

      setError(
        editingId
          ? "Kunde inte uppdatera utbildningen."
          : "Kunde inte skapa utbildningen."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(course: Course) {
    const shouldDelete = window.confirm(
      `Är du säker på att du vill ta bort "${course.name}"?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setError("");

      await deleteCourse(course.id);

      setCourses((current) =>
        current.filter((item) => item.id !== course.id)
      );

      if (editingId === course.id) {
        handleCancel();
      }
    } catch (error) {
      console.error(error);
      setError("Kunde inte ta bort utbildningen.");
    }
  }

  return (
    <DashboardLayout>
      <div className="content-admin-page course-admin-page">
        <div className="content-admin-header">
          <div>
            <p className="content-admin-eyebrow">
              INNEHÅLLSHANTERING
            </p>

            <h1>Utbildningar</h1>

            <p>
              Skapa, redigera och ta bort utbildningar som visas
              på Chase webbplats.
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              className="content-admin-primary-button"
              onClick={handleCreate}
            >
              + Lägg till utbildning
            </button>
          )}
        </div>

        {error && (
          <div className="content-admin-error">
            {error}
          </div>
        )}

        {showForm && (
          <section className="content-admin-form-section">
            <div className="content-admin-section-header">
              <div>
                <h2>
                  {editingId
                    ? "Redigera utbildning"
                    : "Lägg till utbildning"}
                </h2>

                <p>
                  Fyll i informationen som ska visas på
                  utbildningens sida.
                </p>
              </div>
            </div>

            <form
              className="content-admin-form"
              onSubmit={handleSubmit}
            >
              <div className="content-admin-form-grid">
                <div className="content-admin-field">
                  <label htmlFor="name">
                    Utbildningens namn
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="category">
                    Kategori
                  </label>

                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="level">
                    Utbildningsnivå
                  </label>

                  <input
                    id="level"
                    name="level"
                    type="text"
                    value={formData.level}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="teacher">
                    Lärare
                  </label>

                  <input
                    id="teacher"
                    name="teacher"
                    type="text"
                    value={formData.teacher}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field content-admin-field-full">
                  <label htmlFor="shortDescription">
                    Kort beskrivning
                  </label>

                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="content-admin-field content-admin-field-full">
                  <label htmlFor="description">
                    Fullständig beskrivning
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="duration">
                    Längd
                  </label>

                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="studyPace">
                    Studietakt
                  </label>

                  <select
                    id="studyPace"
                    name="studyPace"
                    value={formData.studyPace}
                    onChange={handleChange}
                  >
                    <option value="100%">100%</option>
                    <option value="75%">75%</option>
                    <option value="50%">50%</option>
                    <option value="25%">25%</option>
                  </select>
                </div>

                <div className="content-admin-field">
                  <label htmlFor="studyForm">
                    Studieform
                  </label>

                  <select
                    id="studyForm"
                    name="studyForm"
                    value={formData.studyForm}
                    onChange={handleChange}
                  >
                    <option value="På plats">
                      På plats
                    </option>

                    <option value="Hybrid">
                      Hybrid
                    </option>

                    <option value="Distans">
                      Distans
                    </option>
                  </select>
                </div>

                <div className="content-admin-field">
                  <label htmlFor="location">
                    Studieort
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="startDate">
                    Startdatum
                  </label>

                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="applicationDeadline">
                    Sista ansökningsdag
                  </label>

                  <input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="points">
                    YH-poäng
                  </label>

                  <input
                    id="points"
                    name="points"
                    type="number"
                    min="0"
                    value={formData.points}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field">
                  <label htmlFor="language">
                    Språk
                  </label>

                  <input
                    id="language"
                    name="language"
                    type="text"
                    value={formData.language}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="content-admin-field content-admin-field-full">
                  <label htmlFor="requirements">
                    Behörighetskrav
                  </label>

                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="content-admin-field content-admin-field-full">
                  <label htmlFor="careerOpportunities">
                    Karriärmöjligheter
                  </label>

                  <textarea
                    id="careerOpportunities"
                    value={careerText}
                    onChange={(event) =>
                      setCareerText(event.target.value)
                    }
                    rows={5}
                    placeholder={`Frontendutvecklare
Webbutvecklare
Reactutvecklare`}
                  />

                  <small>
                    Skriv en yrkesroll per rad.
                  </small>
                </div>

                <div className="content-admin-field content-admin-field-full">
                  <label htmlFor="image">
                    Bild
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={formData.image ?? ""}
                    onChange={handleChange}
                    placeholder="/images/courses/frontend-developer.png"
                  />

                  {formData.image && (
                    <div className="content-admin-image-preview">
                      <img
                        src={formData.image}
                        alt="Förhandsvisning"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="content-admin-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                  />

                  Visa som utvald utbildning
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="isOpenForApplication"
                    checked={formData.isOpenForApplication}
                    onChange={handleChange}
                  />

                  Öppen för ansökan
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />

                  Aktiv utbildning
                </label>
              </div>

              <div className="content-admin-form-actions">
                <button
                  type="button"
                  className="content-admin-secondary-button"
                  onClick={handleCancel}
                >
                  Avbryt
                </button>

                <button
                  type="submit"
                  className="content-admin-primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Sparar..."
                    : editingId
                      ? "Spara ändringar"
                      : "Skapa utbildning"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="content-admin-list-section">
          <div className="content-admin-section-header">
            <div>
              <h2>Befintliga utbildningar</h2>
              <p>{courses.length} utbildningar</p>
            </div>
          </div>

          {loading ? (
            <p>Laddar utbildningar...</p>
          ) : courses.length === 0 ? (
            <p>Det finns inga utbildningar ännu.</p>
          ) : (
            <div className="content-admin-list">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="content-admin-card"
                >
                  {course.image && (
                    <div className="content-admin-card-image">
                      <img
                        src={course.image}
                        alt={course.name}
                      />
                    </div>
                  )}

                  <div className="content-admin-card-content">
                    <div>
                      <span className="content-admin-card-eyebrow">
                        {course.category}
                      </span>

                      <h3>{course.name}</h3>

                      <p>{course.shortDescription}</p>

                      <div className="content-admin-card-meta">
                        <span>{course.location}</span>
                        <span>{course.studyForm}</span>

                        <span>
                          {course.points} YH-poäng
                        </span>

                        <span>
                          {course.isOpenForApplication
                            ? "Ansökan öppen"
                            : "Ansökan stängd"}
                        </span>

                        <span>
                          {course.isActive
                            ? "Aktiv"
                            : "Inaktiv"}
                        </span>
                      </div>
                    </div>

                    <div className="content-admin-card-actions">
                      <button
                        type="button"
                        className="content-admin-secondary-button"
                        onClick={() => handleEdit(course)}
                      >
                        Redigera
                      </button>

                      <button
                        type="button"
                        className="content-admin-delete-button"
                        onClick={() => handleDelete(course)}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}