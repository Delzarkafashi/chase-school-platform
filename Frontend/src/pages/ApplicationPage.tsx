import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import type { Course } from "../types/Course";
import { getCourseById } from "../api/coursesApi";
import { createApplication } from "../api/applicationsApi";
import "../styles/application-page.css";
import Footer from "../components/layout/Footer";

function ApplicationPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [highestEducation, setHighestEducation] = useState("");
  const [currentOccupation, setCurrentOccupation] = useState("");
  const [previousStudies, setPreviousStudies] = useState("");

  const [hasBasicEligibility, setHasBasicEligibility] = useState(false);
  const [eligibilityComment, setEligibilityComment] = useState("");

  const [motivation, setMotivation] = useState("");
  const [otherInformation, setOtherInformation] = useState("");

  const [acceptsPrivacyPolicy, setAcceptsPrivacyPolicy] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId) {
        setError("Utbildningen kunde inte hittas.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch {
        setError("Kunde inte hämta utbildningen.");
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!course) {
      return;
    }

    if (!acceptsPrivacyPolicy) {
      setError("Du måste godkänna integritetspolicyn.");
      return;
    }

    setSubmitting(true);
    setError("");

    const now = new Date().toISOString();

    try {
      const application = await createApplication({
        courseId: course.id,
        courseName: course.name,

        firstName,
        lastName,
        personalNumber,
        email,
        phone,

        streetAddress,
        postalCode,
        city,

        highestEducation,
        currentOccupation,
        previousStudies,

        hasBasicEligibility,
        eligibilityComment,

        motivation,
        otherInformation,

        acceptsPrivacyPolicy,

        status: "new",
        adminComment: "",

        createdAt: now,
        updatedAt: now,
      });

      navigate(`/ansokan-skickad/${application.id}`);
    } catch {
      setError("Något gick fel. Ansökan kunde inte skickas.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <main className="application-page">
        <section className="application-hero">
          <div className="application-container">
            <Link className="application-back-link" to="/utbildningar">
              ← Till utbildningarna
            </Link>

            <span>ANSÖKAN</span>

            <h1>
              {loading
                ? "Laddar..."
                : course
                  ? `Ansök till ${course.name}`
                  : "Ansökan"}
            </h1>

            {course && (
              <p>
                Fyll i uppgifterna nedan för att skicka in din ansökan till
                Chase.
              </p>
            )}
          </div>
        </section>

        <section className="application-content">
          <div className="application-container">
            {error && <div className="application-error">{error}</div>}

            {!loading && course && (
              <form className="application-form" onSubmit={handleSubmit}>
                <section className="form-section">
                  <div className="form-section-heading">
                    <span>01</span>
                    <div>
                      <h2>Personuppgifter</h2>
                      <p>Berätta vem du är och hur vi kan kontakta dig.</p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <label>
                      Förnamn
                      <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Efternamn
                      <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Personnummer
                      <input
                        type="text"
                        value={personalNumber}
                        onChange={(event) =>
                          setPersonalNumber(event.target.value)
                        }
                        placeholder="ÅÅÅÅMMDD-XXXX"
                        required
                      />
                    </label>

                    <label>
                      E-post
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Telefonnummer
                      <input
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                      />
                    </label>
                  </div>
                </section>

                <section className="form-section">
                  <div className="form-section-heading">
                    <span>02</span>
                    <div>
                      <h2>Adress</h2>
                      <p>Fyll i din nuvarande adress.</p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <label className="form-full-width">
                      Gatuadress
                      <input
                        type="text"
                        value={streetAddress}
                        onChange={(event) =>
                          setStreetAddress(event.target.value)
                        }
                        required
                      />
                    </label>

                    <label>
                      Postnummer
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(event) => setPostalCode(event.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Ort
                      <input
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        required
                      />
                    </label>
                  </div>
                </section>

                <section className="form-section">
                  <div className="form-section-heading">
                    <span>03</span>
                    <div>
                      <h2>Utbildning och bakgrund</h2>
                      <p>Berätta kort om din tidigare erfarenhet.</p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <label>
                      Högsta utbildningsnivå
                      <select
                        value={highestEducation}
                        onChange={(event) =>
                          setHighestEducation(event.target.value)
                        }
                        required
                      >
                        <option value="">Välj utbildningsnivå</option>
                        <option value="Grundskola">Grundskola</option>
                        <option value="Gymnasium">Gymnasium</option>
                        <option value="Yrkeshögskola">Yrkeshögskola</option>
                        <option value="Högskola eller universitet">
                          Högskola eller universitet
                        </option>
                        <option value="Annan utbildning">
                          Annan utbildning
                        </option>
                      </select>
                    </label>

                    <label>
                      Nuvarande sysselsättning
                      <select
                        value={currentOccupation}
                        onChange={(event) =>
                          setCurrentOccupation(event.target.value)
                        }
                        required
                      >
                        <option value="">Välj sysselsättning</option>
                        <option value="Arbetar">Arbetar</option>
                        <option value="Studerar">Studerar</option>
                        <option value="Arbetssökande">Arbetssökande</option>
                        <option value="Annat">Annat</option>
                      </select>
                    </label>

                    <label className="form-full-width">
                      Tidigare studier
                      <textarea
                        value={previousStudies}
                        onChange={(event) =>
                          setPreviousStudies(event.target.value)
                        }
                        placeholder="Beskriv kort tidigare utbildningar eller relevanta kurser."
                        rows={4}
                      />
                    </label>
                  </div>
                </section>

                <section className="form-section">
                  <div className="form-section-heading">
                    <span>04</span>
                    <div>
                      <h2>Behörighet</h2>
                      <p>
                        Bekräfta om du uppfyller grundläggande behörighet.
                      </p>
                    </div>
                  </div>

                  <label className="checkbox-field">
                    <input
                      type="checkbox"
                      checked={hasBasicEligibility}
                      onChange={(event) =>
                        setHasBasicEligibility(event.target.checked)
                      }
                    />

                    <span>
                      Jag bedömer att jag uppfyller grundläggande behörighet
                      till yrkeshögskolan.
                    </span>
                  </label>

                  <label>
                    Kommentar om behörighet
                    <textarea
                      value={eligibilityComment}
                      onChange={(event) =>
                        setEligibilityComment(event.target.value)
                      }
                      placeholder="Här kan du lämna ytterligare information om din behörighet."
                      rows={4}
                    />
                  </label>
                </section>

                <section className="form-section">
                  <div className="form-section-heading">
                    <span>05</span>
                    <div>
                      <h2>Din ansökan</h2>
                      <p>Berätta varför du vill läsa utbildningen.</p>
                    </div>
                  </div>

                  <label>
                    Motivation
                    <textarea
                      value={motivation}
                      onChange={(event) => setMotivation(event.target.value)}
                      placeholder="Varför söker du utbildningen och vad vill du göra efteråt?"
                      rows={7}
                      required
                    />
                  </label>

                  <label>
                    Övrig information
                    <textarea
                      value={otherInformation}
                      onChange={(event) =>
                        setOtherInformation(event.target.value)
                      }
                      placeholder="Övrig information som du vill att Chase ska känna till."
                      rows={5}
                    />
                  </label>
                </section>

                <section className="form-submit-section">
                  <label className="checkbox-field">
                    <input
                      type="checkbox"
                      checked={acceptsPrivacyPolicy}
                      onChange={(event) =>
                        setAcceptsPrivacyPolicy(event.target.checked)
                      }
                      required
                    />

                    <span>
                      Jag godkänner att Chase behandlar mina uppgifter för att
                      hantera min ansökan.
                    </span>
                  </label>

                  <button
                    className="application-submit-button"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Skickar ansökan..." : "Skicka ansökan"}
                  </button>
                </section>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ApplicationPage;