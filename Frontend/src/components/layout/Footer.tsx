import { Link } from "react-router-dom";
import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="footer-logo" to="/">
              Chase
            </Link>

            <p>
              Chase Yrkeshögskola utbildar framtidens IT-kompetens med tydlig
              koppling till arbetslivet.
            </p>
          </div>

          <div className="footer-navigation">
            <div className="footer-column">
              <h3>Utbildningar</h3>

              <Link to="/utbildningar">
                Alla utbildningar
              </Link>

              <Link to="/utbildningar">
                Sök utbildning
              </Link>

              <Link to="/kontakt">
                Frågor om ansökan
              </Link>
            </div>

            <div className="footer-column">
              <h3>Om Chase</h3>

              <Link to="/om-chase">
                Om oss
              </Link>

              <Link to="/om-chase">
                Vår historia
              </Link>

              <Link to="/kontakt">
                Kontakt
              </Link>
            </div>

            <div className="footer-column">
              <h3>För företag</h3>

              <Link to="/foretag">
                Samarbeta med oss
              </Link>

              <Link to="/foretag">
                LIA
              </Link>

              <Link to="/foretag">
                Rekrytering
              </Link>
            </div>

            <div className="footer-column footer-contact">
              <h3>Kontakt</h3>

              <a href="mailto:info@chase.se">
                info@chase.se
              </a>

              <a href="tel:+46114102000">
                011-410 20 00
              </a>

              <span>Norrköping</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Chase Yrkeshögskola
          </span>

          <div className="footer-bottom-links">
            <Link to="/integritet">
              Integritetspolicy
            </Link>

            <Link to="/tillganglighet">
              Tillgänglighet
            </Link>

            <Link to="/kontakt">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;