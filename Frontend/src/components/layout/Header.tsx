import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
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
          {isAuthenticated && user ? (
            <>
              <span className="header-user-name">
                {user.firstName} {user.lastName}
              </span>

              <Link className="login-link" to="/dashboard">
                Dashboard
              </Link>

              <button
                className="logout-button"
                type="button"
                onClick={handleLogout}
              >
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link className="login-link" to="/login">
                Logga in
              </Link>

              <Link
                className="apply-button"
                to="/utbildningar"
              >
                Ansök nu
              </Link>
            </>
          )}
        </div>

        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label="Öppna meny"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
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

        {isAuthenticated && user ? (
          <>
            <NavLink to="/dashboard" onClick={closeMenu}>
              Dashboard
            </NavLink>

            <button
              className="mobile-logout-button"
              type="button"
              onClick={handleLogout}
            >
              Logga ut
            </button>
          </>
        ) : (
          <NavLink
            className="mobile-login-link"
            to="/login"
            onClick={closeMenu}
          >
            Logga in
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;