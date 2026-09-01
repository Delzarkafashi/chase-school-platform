import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import BusinessSection from "../components/business/BusinessSection";
import type { BusinessContent } from "../types/BusinessContent";
import { getBusinessContent } from "../api/businessApi";
import "../styles/business-page.css";
import Footer from "../components/layout/Footer";

function BusinessPage() {
  const [content, setContent] = useState<BusinessContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBusinessContent() {
      try {
        const data = await getBusinessContent();
        setContent(data);
      } catch {
        setError("Kunde inte hämta information för företag.");
      } finally {
        setLoading(false);
      }
    }

    loadBusinessContent();
  }, []);

  return (
    <>
      <Header />

      <main className="business-page">
        {loading && (
          <div className="business-page-container">
            <p>Laddar...</p>
          </div>
        )}

        {error && (
          <div className="business-page-container">
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          content.map((section, index) => (
            <BusinessSection
              key={section.id}
              content={section}
              index={index}
            />
          ))}
      </main>
      <Footer />
    </>
  );
}

export default BusinessPage;