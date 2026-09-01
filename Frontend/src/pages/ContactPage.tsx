import Header from "../components/layout/Header";
import ContactForm from "../components/contact/ContactForm";
import ContactPeople from "../components/contact/ContactPeople";
import "../styles/contact-page.css";
import Footer from "../components/layout/Footer";

function ContactPage() {
  return (
    <>
      <Header />

      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-page-container contact-centered">
            <span className="contact-eyebrow">
              KONTAKT
            </span>

            <h1>Hur kan vi hjälpa dig?</h1>

            <p>
              Har du frågor om våra utbildningar, ansökan,
              behörighet, LIA eller samarbeten med Chase?
              Kontakta oss så hjälper vi dig vidare.
            </p>
          </div>
        </section>

        <section className="contact-content">
          <div className="contact-page-container contact-centered">
            <ContactPeople />

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;