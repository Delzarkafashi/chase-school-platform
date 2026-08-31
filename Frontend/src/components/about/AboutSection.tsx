import type { AboutContent } from "../../types/AboutContent";

type AboutSectionProps = {
  content: AboutContent;
  index: number;
};

function AboutSection({
  content,
  index,
}: AboutSectionProps) {
  const isReversed = index % 2 !== 0;

  return (
    <section className="about-section">
      <div
        className={`about-page-container about-section-grid ${
          isReversed ? "about-section-reverse" : ""
        }`}
      >
        <div className="about-section-content">
          <span className="about-eyebrow">
            {content.eyebrow}
          </span>

          <h2>{content.title}</h2>

          <p>{content.text}</p>

          {content.quote && (
            <blockquote className="about-quote">
              <p>“{content.quote}”</p>

              {content.quoteAuthor && (
                <footer>{content.quoteAuthor}</footer>
              )}
            </blockquote>
          )}
        </div>

        <div className="about-section-image-wrapper">
          <img
            className="about-section-image"
            src={content.image}
            alt={content.title}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;