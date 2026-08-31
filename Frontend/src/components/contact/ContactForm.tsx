import { useState } from "react";
import type { FormEvent } from "react";
import { createContactMessage } from "../../api/contactApi";

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setSuccess(false);
    setError("");

    const now = new Date().toISOString();

    try {
      await createContactMessage({
        firstName,
        lastName,
        email,
        phone,
        subject,
        category,
        message,

        status: "new",
        assignedTo: null,
        adminComment: "",

        createdAt: now,
        updatedAt: now,
      });

      setSuccess(true);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setCategory("");
      setMessage("");
    } catch {
      setError("Meddelandet kunde inte skickas. Försök igen.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact-form-section">
      <div className="contact-form-heading">
        <span>KONTAKTA OSS</span>
        <h2>Har du en fråga?</h2>
        <p>
          Fyll i formuläret så återkommer vi så snart vi kan.
        </p>
      </div>

      {success && (
        <div className="contact-form-success">
          Tack! Ditt meddelande har skickats.
        </div>
      )}

      {error && (
        <div className="contact-form-error">
          {error}
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-grid">
          <label>
            Förnamn
            <input
              type="text"
              value={firstName}
              onChange={(event) =>
                setFirstName(event.target.value)
              }
              required
            />
          </label>

          <label>
            Efternamn
            <input
              type="text"
              value={lastName}
              onChange={(event) =>
                setLastName(event.target.value)
              }
              required
            />
          </label>

          <label>
            E-post
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label>
            Telefonnummer
            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
            />
          </label>

          <label>
            Ärende
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              required
            >
              <option value="">Välj ärende</option>
              <option value="Utbildning">Utbildning</option>
              <option value="Ansökan">Ansökan</option>
              <option value="Behörighet">Behörighet</option>
              <option value="LIA">LIA</option>
              <option value="Företagssamarbete">
                Företagssamarbete
              </option>
              <option value="Övrigt">Övrigt</option>
            </select>
          </label>

          <label>
            Ämne
            <input
              type="text"
              value={subject}
              onChange={(event) =>
                setSubject(event.target.value)
              }
              required
            />
          </label>

          <label className="contact-form-full-width">
            Meddelande
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              rows={7}
              required
            />
          </label>
        </div>

        <button
          className="contact-form-button"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Skickar..." : "Skicka meddelande"}
        </button>
      </form>
    </section>
  );
}

export default ContactForm;