import { Link } from "react-router-dom";
import "../../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-eyebrow">CHASE YRKESHÖGSKOLA</span>

          <h1>
            Utbildning som tar
            <span> dig vidare.</span>
          </h1>

          <p>
            Branschnära utbildningar med tydlig koppling till arbetslivet.
            Hos Chase bygger du kompetens som efterfrågas på riktigt.
          </p>

          <div className="hero-actions">
            <Link className="hero-primary-button" to="/utbildningar">
              Utforska utbildningar
            </Link>

            <Link className="hero-secondary-button" to="/om-chase">
              Läs om Chase
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <span>Din nästa möjlighet</span>

            <h2>Bygg framtidens kompetens.</h2>

            <p>
              Praktiskt lärande, nära arbetslivet och utbildningar skapade för
              nästa steg i karriären.
            </p>
          </div>

          <div className="hero-stat-card">
            <strong>100%</strong>
            <span>fokus på arbetslivet</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;