import { Link } from "react-router-dom";
import type { Course } from "../../types/Course";

type CourseCardProps = {
  course: Course;
};

function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="course-card">
      {course.image && (
        <div className="course-card-image-wrapper">
          <img
            className="course-card-image"
            src={course.image}
            alt={course.name}
            onError={(event) => {
              event.currentTarget.parentElement?.remove();
            }}
          />
        </div>
      )}

      <div className="course-card-content">
        <span className="course-category">{course.category}</span>

        <h3>{course.name}</h3>

        <p>{course.shortDescription}</p>

        <div className="course-info">
          <span>{course.duration}</span>
          <span>{course.studyPace}</span>
          <span>{course.location}</span>
        </div>

        <Link
          className="course-card-link"
          to={`/utbildningar/${course.id}`}
        >
          Läs mer
        </Link>
      </div>
    </article>
  );
}

export default CourseCard;