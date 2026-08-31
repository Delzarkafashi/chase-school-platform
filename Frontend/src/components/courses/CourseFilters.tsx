import type { Course } from "../../types/Course";
import type { CourseFilters as CourseFiltersType } from "../../types/CourseFilters";
import "../../styles/course-filters.css";

type CourseFiltersProps = {
  filters: CourseFiltersType;
  onChange: (filters: CourseFiltersType) => void;
  courses: Course[];
};

function CourseFilters({
  filters,
  onChange,
  courses,
}: CourseFiltersProps) {
  function updateFilter(
    key: keyof CourseFiltersType,
    value: string
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  function resetFilters() {
    onChange({
      search: "",
      studyForm: "",
      studyPace: "",
      location: "",
      category: "",
      startYear: "",
      applicationStatus: "",
    });
  }

  const studyForms = Array.from(
    new Set(
      courses
        .map((course) => course.studyForm)
        .filter(Boolean)
    )
  ).sort();

  const studyPaces = Array.from(
    new Set(
      courses
        .map((course) => course.studyPace)
        .filter(Boolean)
    )
  ).sort();

  const locations = Array.from(
    new Set(
      courses
        .map((course) => course.location)
        .filter(Boolean)
    )
  ).sort();

  const categories = Array.from(
    new Set(
      courses
        .map((course) => course.category)
        .filter(Boolean)
    )
  ).sort();

  const startYears = Array.from(
    new Set(
      courses
        .map((course) => course.startDate?.slice(0, 4))
        .filter(Boolean)
    )
  ).sort();

  const hasActiveFilters =
    filters.search !== "" ||
    filters.studyForm !== "" ||
    filters.studyPace !== "" ||
    filters.location !== "" ||
    filters.category !== "" ||
    filters.startYear !== "" ||
    filters.applicationStatus !== "";

  return (
    <section className="course-filters">
      <div className="course-filters-top">
        <div>
          <span className="course-filters-eyebrow">
            FILTRERA UTBILDNINGAR
          </span>

          <h2>Hitta rätt utbildning.</h2>
        </div>

        {hasActiveFilters && (
          <button
            className="course-filters-reset"
            type="button"
            onClick={resetFilters}
          >
            Rensa filter
          </button>
        )}
      </div>

      <div className="course-search">
        <label htmlFor="course-search">
          Sök utbildning
        </label>

        <input
          id="course-search"
          type="search"
          value={filters.search}
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
          placeholder="Sök utbildning"
        />
      </div>

      <div className="course-filter-grid">
        <div className="course-filter-group">
          <label htmlFor="study-form">
            Studieform
          </label>

          <select
            id="study-form"
            value={filters.studyForm}
            onChange={(event) =>
              updateFilter("studyForm", event.target.value)
            }
          >
            <option value="">Alla studieformer</option>

            {studyForms.map((studyForm) => (
              <option key={studyForm} value={studyForm}>
                {studyForm}
              </option>
            ))}
          </select>
        </div>

        <div className="course-filter-group">
          <label htmlFor="study-pace">
            Studietakt
          </label>

          <select
            id="study-pace"
            value={filters.studyPace}
            onChange={(event) =>
              updateFilter("studyPace", event.target.value)
            }
          >
            <option value="">Alla studietakter</option>

            {studyPaces.map((studyPace) => (
              <option key={studyPace} value={studyPace}>
                {studyPace}
              </option>
            ))}
          </select>
        </div>

        <div className="course-filter-group">
          <label htmlFor="location">
            Ort
          </label>

          <select
            id="location"
            value={filters.location}
            onChange={(event) =>
              updateFilter("location", event.target.value)
            }
          >
            <option value="">Alla orter</option>

            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="course-filter-group">
          <label htmlFor="category">
            Område
          </label>

          <select
            id="category"
            value={filters.category}
            onChange={(event) =>
              updateFilter("category", event.target.value)
            }
          >
            <option value="">Alla områden</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="course-filter-group">
          <label htmlFor="start-year">
            Startår
          </label>

          <select
            id="start-year"
            value={filters.startYear}
            onChange={(event) =>
              updateFilter("startYear", event.target.value)
            }
          >
            <option value="">Alla startår</option>

            {startYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="course-filter-group">
          <label htmlFor="application-status">
            Ansökan
          </label>

          <select
            id="application-status"
            value={filters.applicationStatus}
            onChange={(event) =>
              updateFilter(
                "applicationStatus",
                event.target.value
              )
            }
          >
            <option value="">Alla</option>
            <option value="open">Öppen för ansökan</option>
            <option value="closed">Stängd</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default CourseFilters;