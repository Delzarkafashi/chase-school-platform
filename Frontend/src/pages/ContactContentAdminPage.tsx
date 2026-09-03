import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import type { ContactContent } from "../types/ContactContent";
import type { ContactPerson } from "../types/ContactPerson";
import {
  createContactPerson,
  deleteContactPerson,
  getContactContent,
  getContactPeople,
  updateContactContent,
  updateContactPerson,
} from "../api/contactApi";
import "../styles/content-admin.css";

type NewContactPerson = Omit<ContactPerson, "id">;

const emptyContactPerson: NewContactPerson = {
  name: "",
  role: "",
  area: "",
  email: "",
  phone: "",
  image: "",
};

function ContactContentAdminPage() {
  const { hasPermission } = useAuth();

  const [contactContent, setContactContent] =
    useState<ContactContent | null>(null);

  const [people, setPeople] = useState<ContactPerson[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savingContent, setSavingContent] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);

  const [savingPersonId, setSavingPersonId] =
    useState<string | null>(null);

  const [deletingPersonId, setDeletingPersonId] =
    useState<string | null>(null);

  const [showCreatePersonForm, setShowCreatePersonForm] =
    useState(false);

  const [creatingPerson, setCreatingPerson] = useState(false);

  const [newPerson, setNewPerson] =
    useState<NewContactPerson>(emptyContactPerson);

  const [personToDelete, setPersonToDelete] =
    useState<ContactPerson | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [contentData, peopleData] = await Promise.all([
          getContactContent(),
          getContactPeople(),
        ]);

        setContactContent(contentData[0] ?? null);
        setPeople(peopleData);
      } catch {
        setError("Kunde inte hämta kontaktinformationen.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function updateContentField(
    field: keyof ContactContent,
    value: string
  ) {
    setContactContent((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current
    );
  }

  function updatePersonField(
    id: string,
    field: keyof ContactPerson,
    value: string
  ) {
    setPeople((currentPeople) =>
      currentPeople.map((person) =>
        person.id === id
          ? {
              ...person,
              [field]: value,
            }
          : person
      )
    );
  }

  function updateNewPersonField(
    field: keyof NewContactPerson,
    value: string
  ) {
    setNewPerson((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSaveContent() {
    if (!contactContent) {
      return;
    }

    try {
      setSavingContent(true);
      setContentSaved(false);
      setError("");

      const updatedContent = await updateContactContent(
        contactContent.id,
        contactContent
      );

      setContactContent(updatedContent);
      setContentSaved(true);
    } catch {
      setError("Kunde inte spara kontaktinnehållet.");
    } finally {
      setSavingContent(false);
    }
  }

  async function handleSavePerson(person: ContactPerson) {
    try {
      setSavingPersonId(person.id);
      setError("");

      const updatedPerson = await updateContactPerson(
        person.id,
        person
      );

      setPeople((currentPeople) =>
        currentPeople.map((item) =>
          item.id === updatedPerson.id
            ? updatedPerson
            : item
        )
      );
    } catch {
      setError("Kunde inte spara kontaktpersonen.");
    } finally {
      setSavingPersonId(null);
    }
  }

  async function handleCreatePerson() {
    if (
      !newPerson.name.trim() ||
      !newPerson.role.trim() ||
      !newPerson.email.trim()
    ) {
      setError("Namn, roll och e-post måste fyllas i.");
      return;
    }

    try {
      setCreatingPerson(true);
      setError("");

      const createdPerson = await createContactPerson({
        name: newPerson.name.trim(),
        role: newPerson.role.trim(),
        area: newPerson.area.trim(),
        email: newPerson.email.trim(),
        phone: newPerson.phone.trim(),
        image: newPerson.image.trim(),
      });

      setPeople((currentPeople) => [
        ...currentPeople,
        createdPerson,
      ]);

      setNewPerson(emptyContactPerson);
      setShowCreatePersonForm(false);
    } catch {
      setError("Kunde inte skapa kontaktpersonen.");
    } finally {
      setCreatingPerson(false);
    }
  }

  async function handleDeletePerson() {
    if (!personToDelete) {
      return;
    }

    try {
      setDeletingPersonId(personToDelete.id);
      setError("");

      await deleteContactPerson(personToDelete.id);

      setPeople((currentPeople) =>
        currentPeople.filter(
          (person) => person.id !== personToDelete.id
        )
      );

      setPersonToDelete(null);
    } catch {
      setError("Kunde inte ta bort kontaktpersonen.");
    } finally {
      setDeletingPersonId(null);
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
              INNEHÅLL / KONTAKT
            </span>

            <h1>Redigera Kontakt</h1>

            <p>
              Här kan du ändra kontaktsidans introduktion och
              hantera vilka kontaktpersoner som visas.
            </p>
          </div>
        </div>

        {error && (
          <div className="content-admin-error">
            {error}
          </div>
        )}

        {loading && <p>Laddar kontaktinformation...</p>}

        {!loading && contactContent && (
          <article className="content-admin-card content-admin-create-card">
            <div className="content-admin-card-heading">
              <div>
                <span>KONTAKTSIDA</span>
                <h2>{contactContent.title}</h2>
              </div>

              {contentSaved && (
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
                  value={contactContent.eyebrow}
                  onChange={(event) =>
                    updateContentField(
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
                  value={contactContent.title}
                  onChange={(event) =>
                    updateContentField(
                      "title",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Text
                <textarea
                  value={contactContent.text}
                  onChange={(event) =>
                    updateContentField(
                      "text",
                      event.target.value
                    )
                  }
                />
              </label>

              <button
                type="button"
                className="content-admin-save"
                disabled={savingContent}
                onClick={handleSaveContent}
              >
                {savingContent
                  ? "Sparar..."
                  : "Spara ändringar"}
              </button>
            </div>
          </article>
        )}

        {!loading && (
          <section className="contact-people-admin-section">
            <div className="contact-people-admin-heading">
              <div>
                <span className="dashboard-eyebrow">
                  KONTAKTPERSONER
                </span>

                <h2>Hantera kontaktpersoner</h2>

                <p>
                  Dessa personer visas på den publika kontaktsidan.
                </p>
              </div>

              <button
                type="button"
                className="content-admin-create-button"
                onClick={() =>
                  setShowCreatePersonForm(
                    (current) => !current
                  )
                }
              >
                {showCreatePersonForm
                  ? "Avbryt"
                  : "+ Lägg till kontaktperson"}
              </button>
            </div>

            {showCreatePersonForm && (
              <article className="content-admin-card content-admin-create-card">
                <div className="content-admin-card-heading">
                  <div>
                    <span>NY KONTAKTPERSON</span>
                    <h2>Lägg till person</h2>
                  </div>
                </div>

                <div className="content-admin-form">
                  <label>
                    Namn
                    <input
                      type="text"
                      value={newPerson.name}
                      onChange={(event) =>
                        updateNewPersonField(
                          "name",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Roll
                    <input
                      type="text"
                      value={newPerson.role}
                      onChange={(event) =>
                        updateNewPersonField(
                          "role",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Område
                    <input
                      type="text"
                      value={newPerson.area}
                      onChange={(event) =>
                        updateNewPersonField(
                          "area",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    E-post
                    <input
                      type="email"
                      value={newPerson.email}
                      onChange={(event) =>
                        updateNewPersonField(
                          "email",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Telefon
                    <input
                      type="text"
                      value={newPerson.phone}
                      onChange={(event) =>
                        updateNewPersonField(
                          "phone",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Bild-URL
                    <input
                      type="text"
                      value={newPerson.image}
                      onChange={(event) =>
                        updateNewPersonField(
                          "image",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  {newPerson.image && (
                    <div className="content-admin-image-preview">
                      <img
                        src={newPerson.image}
                        alt="Förhandsvisning"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    className="content-admin-save"
                    disabled={creatingPerson}
                    onClick={handleCreatePerson}
                  >
                    {creatingPerson
                      ? "Skapar..."
                      : "Skapa kontaktperson"}
                  </button>
                </div>
              </article>
            )}

            <div className="content-admin-sections">
              {people.map((person) => (
                <article
                  key={person.id}
                  className="content-admin-card"
                >
                  <div className="content-admin-card-heading">
                    <div>
                      <span>KONTAKTPERSON</span>
                      <h2>{person.name}</h2>
                    </div>
                  </div>

                  <div className="content-admin-form">
                    <label>
                      Namn
                      <input
                        type="text"
                        value={person.name}
                        onChange={(event) =>
                          updatePersonField(
                            person.id,
                            "name",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      Roll
                      <input
                        type="text"
                        value={person.role}
                        onChange={(event) =>
                          updatePersonField(
                            person.id,
                            "role",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      Område
                      <input
                        type="text"
                        value={person.area}
                        onChange={(event) =>
                          updatePersonField(
                            person.id,
                            "area",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      E-post
                      <input
                        type="email"
                        value={person.email}
                        onChange={(event) =>
                          updatePersonField(
                            person.id,
                            "email",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      Telefon
                      <input
                        type="text"
                        value={person.phone}
                        onChange={(event) =>
                          updatePersonField(
                            person.id,
                            "phone",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      Bild-URL
                      <input
                        type="text"
                        value={person.image}
                        onChange={(event) =>
                          updatePersonField(
                            person.id,
                            "image",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    {person.image && (
                      <div className="content-admin-image-preview">
                        <img
                          src={person.image}
                          alt={`Förhandsvisning av ${person.name}`}
                        />
                      </div>
                    )}

                    <div className="content-admin-actions">
                      <button
                        type="button"
                        className="content-admin-save"
                        disabled={
                          savingPersonId === person.id ||
                          deletingPersonId === person.id
                        }
                        onClick={() =>
                          handleSavePerson(person)
                        }
                      >
                        {savingPersonId === person.id
                          ? "Sparar..."
                          : "Spara ändringar"}
                      </button>

                      <button
                        type="button"
                        className="content-admin-delete"
                        disabled={
                          deletingPersonId === person.id ||
                          savingPersonId === person.id
                        }
                        onClick={() =>
                          setPersonToDelete(person)
                        }
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {personToDelete && (
          <div className="content-admin-modal-backdrop">
            <div className="content-admin-modal">
              <span className="content-admin-modal-eyebrow">
                TA BORT KONTAKTPERSON
              </span>

              <h2>Är du säker?</h2>

              <p>
                Du håller på att ta bort{" "}
                <strong>{personToDelete.name}</strong>.
                Personen kommer inte längre visas på
                kontaktsidan.
              </p>

              <div className="content-admin-modal-actions">
                <button
                  type="button"
                  className="content-admin-modal-cancel"
                  onClick={() =>
                    setPersonToDelete(null)
                  }
                  disabled={
                    deletingPersonId === personToDelete.id
                  }
                >
                  Avbryt
                </button>

                <button
                  type="button"
                  className="content-admin-modal-delete"
                  onClick={handleDeletePerson}
                  disabled={
                    deletingPersonId === personToDelete.id
                  }
                >
                  {deletingPersonId === personToDelete.id
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

export default ContactContentAdminPage;