import type { BusinessContent } from "../../types/BusinessContent";

type BusinessSectionProps = {
  content: BusinessContent;
  index: number;
};

function BusinessSection({
  content,
  index,
}: BusinessSectionProps) {
  const isReversed = index % 2 !== 0;
  const isMuted = index % 2 !== 0;

  return (
    <section
      className={`business-section ${
        isMuted ? "business-section-muted" : ""
      }`}
    >
      <div
        className={`business-page-container business-section-grid ${
          isReversed ? "business-section-reverse" : ""
        }`}
      >
        <div className="business-section-content">
          <span className="business-eyebrow">
            {content.eyebrow}
          </span>

          <h2>{content.title}</h2>

          <p>{content.text}</p>
        </div>

        <div className="business-section-image-wrapper">
          <img
            className="business-section-image"
            src={content.image}
            alt={content.title}
          />
        </div>
      </div>
    </section>
  );
}

export default BusinessSection;