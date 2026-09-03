import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import type { AboutContent } from "../types/AboutContent";
import {
  createAboutContent,
  getAboutContent,
  updateAboutContent,
  deleteAboutContent,
} from "../api/aboutApi";
import "../styles/content-admin.css";

type NewAboutContent = Omit<AboutContent, "id">;

const emptySection: NewAboutContent = {
  section: "",
  eyebrow: "",
  title: "",
  text: "",
  image: "",
  quote: "",
  quoteAuthor: "",
};

function AboutContentAdminPage() {
  const { hasPermission } = useAuth();

  const [content, setContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newSection, setNewSection] =
    useState<NewAboutContent>(emptySection);

  const [sectionToDelete, setSectionToDelete] =
    useState<AboutContent | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const data = await getAboutContent();
        setContent(data);
      } catch {
        setError("Kunde inte hämta innehållet.");
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  function updateField(
    id: string,
    field: keyof AboutContent,
    value: string
  ) {
    setContent((currentContent) =>
      currentContent.map((section) =>
        section.id === id
          ? {
              ...section,
              [field]: value,
            }
          : section
      )
    );
  }

  function updateNewField(
    field: keyof NewAboutContent,
    value: string
  ) {
    setNewSection((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave(section: AboutContent) {
    try {
      setSavingId(section.id);
      setSavedId(null);
      setError("");

      const updatedSection = await updateAboutContent(
        section.id,
        section
      );

      setContent((currentContent) =>
        currentContent.map((item) =>
          item.id === updatedSection.id
            ? updatedSection
            : item
        )
      );

      setSavedId(section.id);
    } catch {
      setError("Kunde inte spara ändringarna.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleCreate() {
    if (
      !newSection.section.trim() ||
      !newSection.title.trim() ||
      !newSection.text.trim()
    ) {
      setError("Sektion, rubrik och text måste fyllas i.");
      return;
    }

    try {
      setCreating(true);
      setError("");

      const createdSection = await createAboutContent({
        ...newSection,
        section: newSection.section.trim(),
        eyebrow: newSection.eyebrow.trim(),
        title: newSection.title.trim(),
        text: newSection.text.trim(),
        image: newSection.image.trim(),
        quote: newSection.quote?.trim() || undefined,
        quoteAuthor: newSection.quoteAuthor?.trim() || undefined,
      });

      setContent((currentContent) => [
        ...currentContent,
        createdSection,
      ]);

      setNewSection(emptySection);
      setShowCreateForm(false);
    } catch {
      setError("Kunde inte skapa den nya sektionen.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete() {
    if (!sectionToDelete) {
      return;
    }

    try {
      setDeletingId(sectionToDelete.id);
      setError("");

      await deleteAboutContent(sectionToDelete.id);

      setContent((currentContent) =>
        currentContent.filter(
          (item) => item.id !== sectionToDelete.id
        )
      );

      setSectionToDelete(null);
    } catch {
      setError("Kunde inte ta bort sektionen.");
    } finally {
      setDeletingId(null);
    }
  }

  if (!hasPermission("siteContent.manage")) {
    return (
      <DashboardLayout>
        <p>Du har inte behörighet att redigera innehållet.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <section className="content-admin-page">
        <div className="content-admin-page-heading">
          <div>
            <span className="dashboard-eyebrow">
              INNEHÅLL / OM CHASE
            </span>

            <h1>Redigera Om Chase</h1>

            <p>
              Ändringar som sparas här visas på den publika
              Om Chase-sidan.
            </p>
          </div>

          <button
            type="button"
            className="content-admin-create-button"
            onClick={() =>
              setShowCreateForm((current) => !current)
            }
          >
            {showCreateForm
              ? "Avbryt"
              : "+ Lägg till sektion"}
          </button>
        </div>

        {error && (
          <div className="content-admin-error">
            {error}
          </div>
        )}

        {showCreateForm && (
          <article className="content-admin-card content-admin-create-card">
            <div className="content-admin-card-heading">
              <div>
                <span>NY SEKTION</span>
                <h2>Lägg till innehåll</h2>
              </div>
            </div>

            <div className="content-admin-form">
              <label>
                Sektion
                <input
                  type="text"
                  value={newSection.section}
                  onChange={(event) =>
                    updateNewField(
                      "section",
                      event.target.value
                    )
                  }
                  placeholder="Exempel: vision"
                />
              </label>

              <label>
                Överrubrik
                <input
                  type="text"
                  value={newSection.eyebrow}
                  onChange={(event) =>
                    updateNewField(
                      "eyebrow",
                      event.target.value
                    )
                  }
                  placeholder="Exempel: VÅR VISION"
                />
              </label>

              <label>
                Rubrik
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(event) =>
                    updateNewField(
                      "title",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Bild-URL
                <input
                  type="text"
                  value={newSection.image}
                  onChange={(event) =>
                    updateNewField(
                      "image",
                      event.target.value
                    )
                  }
                />
              </label>

              {newSection.image && (
                <div className="content-admin-image-preview">
                  <img
                    src={newSection.image}
                    alt="Förhandsvisning"
                  />
                </div>
              )}

              <label>
                Text
                <textarea
                  value={newSection.text}
                  onChange={(event) =>
                    updateNewField(
                      "text",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Citat
                <textarea
                  value={newSection.quote ?? ""}
                  onChange={(event) =>
                    updateNewField(
                      "quote",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Citatperson
                <input
                  type="text"
                  value={newSection.quoteAuthor ?? ""}
                  onChange={(event) =>
                    updateNewField(
                      "quoteAuthor",
                      event.target.value
                    )
                  }
                />
              </label>

              <button
                type="button"
                className="content-admin-save"
                disabled={creating}
                onClick={handleCreate}
              >
                {creating
                  ? "Skapar..."
                  : "Skapa sektion"}
              </button>
            </div>
          </article>
        )}

        {loading && <p>Laddar innehåll...</p>}

        {!loading && (
          <div className="content-admin-sections">
            {content.map((section) => (
              <article
                key={section.id}
                className="content-admin-card"
              >
                <div className="content-admin-card-heading">
                  <div>
                    <span>
                      {section.section.toUpperCase()}
                    </span>

                    <h2>{section.title}</h2>
                  </div>

                  {savedId === section.id && (
                    <span className="content-admin-saved">
                      Sparat
                    </span>
                  )}
                </div>

                <div className="content-admin-form">
                  <label>
                    Överrubrik
                    <input
                      type="text"
                      value={section.eyebrow}
                      onChange={(event) =>
                        updateField(
                          section.id,
                          "eyebrow",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Rubrik
                    <input
                      type="text"
                      value={section.title}
                      onChange={(event) =>
                        updateField(
                          section.id,
                          "title",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Text
                    <textarea
                      value={section.text}
                      onChange={(event) =>
                        updateField(
                          section.id,
                          "text",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Bild-URL
                    <input
                      type="text"
                      value={section.image}
                      onChange={(event) =>
                        updateField(
                          section.id,
                          "image",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  {section.image && (
                    <div className="content-admin-image-preview">
                      <img
                        src={section.image}
                        alt={`Förhandsvisning av ${section.title}`}
                      />
                    </div>
                  )}

                  {"quote" in section && (
                    <label>
                      Citat
                      <textarea
                        value={section.quote ?? ""}
                        onChange={(event) =>
                          updateField(
                            section.id,
                            "quote",
                            event.target.value
                          )
                        }
                      />
                    </label>
                  )}

                  {"quoteAuthor" in section && (
                    <label>
                      Citatperson
                      <input
                        type="text"
                        value={section.quoteAuthor ?? ""}
                        onChange={(event) =>
                          updateField(
                            section.id,
                            "quoteAuthor",
                            event.target.value
                          )
                        }
                      />
                    </label>
                  )}

                  <div className="content-admin-actions">
                    <button
                      type="button"
                      className="content-admin-save"
                      disabled={
                        savingId === section.id ||
                        deletingId === section.id
                      }
                      onClick={() => handleSave(section)}
                    >
                      {savingId === section.id
                        ? "Sparar..."
                        : "Spara ändringar"}
                    </button>

                    <button
                      type="button"
                      className="content-admin-delete"
                      disabled={
                        deletingId === section.id ||
                        savingId === section.id
                      }
                      onClick={() =>
                        setSectionToDelete(section)
                      }
                    >
                      Ta bort
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {sectionToDelete && (
          <div className="content-admin-modal-backdrop">
            <div className="content-admin-modal">
              <span className="content-admin-modal-eyebrow">
                TA BORT SEKTION
              </span>

              <h2>Är du säker?</h2>

              <p>
                Du håller på att ta bort{" "}
                <strong>
                  {sectionToDelete.title}
                </strong>
                . Den här ändringen går inte att ångra.
              </p>

              <div className="content-admin-modal-actions">
                <button
                  type="button"
                  className="content-admin-modal-cancel"
                  onClick={() =>
                    setSectionToDelete(null)
                  }
                  disabled={
                    deletingId === sectionToDelete.id
                  }
                >
                  Avbryt
                </button>

                <button
                  type="button"
                  className="content-admin-modal-delete"
                  onClick={handleDelete}
                  disabled={
                    deletingId === sectionToDelete.id
                  }
                >
                  {deletingId === sectionToDelete.id
                    ? "Tar bort..."
                    : "Ta bort"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default AboutContentAdminPage;