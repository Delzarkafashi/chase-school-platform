import { useEffect, useState } from "react";
import type { ContactPerson } from "../../types/ContactPerson";
import { getContactPeople } from "../../api/contactApi";

function ContactPeople() {
  const [people, setPeople] = useState<ContactPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPeople() {
      try {
        const data = await getContactPeople();
        setPeople(data);
      } catch {
        setError("Kunde inte hämta kontaktpersonerna.");
      } finally {
        setLoading(false);
      }
    }

    loadPeople();
  }, []);

  return (
    <section className="contact-people-section">
      <div className="contact-people-heading">
        <span>KONTAKTPERSONER</span>

        <h2>Kontakta rätt person direkt.</h2>

        <p>
          Har du en specifik fråga kan du kontakta någon av våra
          ansvariga direkt.
        </p>
      </div>

      {loading && <p>Laddar kontaktpersoner...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="contact-people-grid">
          {people.map((person) => (
            <article
              className="contact-person-card"
              key={person.id}
            >
              <div className="contact-person-image-wrapper">
                <img
                  className="contact-person-image"
                  src={person.image}
                  alt={person.name}
                />
              </div>

              <div className="contact-person-content">
                <span className="contact-person-role">
                  {person.role}
                </span>

                <h3>{person.name}</h3>

                <p className="contact-person-area">
                  {person.area}
                </p>

                <div className="contact-person-links">
                  <a href={`mailto:${person.email}`}>
                    {person.email}
                  </a>

                  <a href={`tel:${person.phone}`}>
                    {person.phone}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ContactPeople;