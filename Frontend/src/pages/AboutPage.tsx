import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import AboutSection from "../components/about/AboutSection";
import type { AboutContent } from "../types/AboutContent";
import { getAboutContent } from "../api/aboutApi";
import "../styles/about-page.css";

function AboutPage() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAboutContent() {
      try {
        const data = await getAboutContent();
        setContent(data);
      } catch {
        setError("Kunde inte hämta information om Chase.");
      } finally {
        setLoading(false);
      }
    }

    loadAboutContent();
  }, []);

  return (
    <>
      <Header />

      <main className="about-page">
        {loading && (
          <div className="about-page-container">
            <p>Laddar...</p>
          </div>
        )}

        {error && (
          <div className="about-page-container">
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          content.map((section, index) => (
            <AboutSection
              key={section.id}
              content={section}
              index={index}
            />
          ))}
      </main>
    </>
  );
}

export default AboutPage;