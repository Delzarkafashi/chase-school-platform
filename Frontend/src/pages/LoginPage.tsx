import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import "../styles/login-page.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Inloggningen misslyckades.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <main className="login-page">
        <section className="login-section">
          <div className="login-container">
            <div className="login-intro">
              <span className="login-eyebrow">
                CHASE LÄRPLATTFORM
              </span>

              <h1>Välkommen tillbaka.</h1>

              <p>
                Logga in för att komma åt dina kurser, uppgifter,
                resultat och verktyg i Chase lärplattform.
              </p>
            </div>

            <div className="login-card">
              <div className="login-card-heading">
                <h2>Logga in</h2>

                <p>
                  Använd dina inloggningsuppgifter för Chase.
                </p>
              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <form
                className="login-form"
                onSubmit={handleSubmit}
              >
                <label>
                  E-post

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="namn@chase.se"
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  Lösenord

                  <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Ditt lösenord"
                    autoComplete="current-password"
                    required
                  />
                </label>

                <button
                  className="login-button"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Loggar in..."
                    : "Logga in"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LoginPage;