import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <NavLink className="logo" to="/" onClick={closeMenu}>
          Chase
        </NavLink>

        <nav className="main-nav">
          <NavLink to="/utbildningar">Utbildningar</NavLink>
          <NavLink to="/om-chase">Om Chase</NavLink>
          <NavLink to="/foretag">För företag</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
        </nav>

        <div className="header-actions">
          <NavLink className="login-link" to="/login">
            Logga in
          </NavLink>

          <NavLink className="apply-button" to="/utbildningar">
            Ansök nu
          </NavLink>

          <button
            className={`menu-button ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Öppna meny"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/utbildningar" onClick={closeMenu}>
          Utbildningar
        </NavLink>

        <NavLink to="/om-chase" onClick={closeMenu}>
          Om Chase
        </NavLink>

        <NavLink to="/foretag" onClick={closeMenu}>
          För företag
        </NavLink>

        <NavLink to="/kontakt" onClick={closeMenu}>
          Kontakt
        </NavLink>

        <NavLink
          className="mobile-login-link"
          to="/login"
          onClick={closeMenu}
        >
          Logga in
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;