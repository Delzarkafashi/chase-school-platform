import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/dashboard.css";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const {
    user,
    hasPermission,
    logout,
  } = useAuth();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  function navLinkClass({
    isActive,
  }: {
    isActive: boolean;
  }) {
    return isActive
      ? "dashboard-nav-link active"
      : "dashboard-nav-link";
  }

  return (
    <div className="dashboard-layout">
      <header className="dashboard-mobile-header">
        <NavLink
          className="dashboard-mobile-logo"
          to="/"
          onClick={closeMenu}
        >
          Chase
        </NavLink>

        <button
          type="button"
          className={`dashboard-menu-button ${
            menuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label={
            menuOpen ? "Stäng meny" : "Öppna meny"
          }
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="dashboard-overlay"
          onClick={closeMenu}
          aria-label="Stäng meny"
        />
      )}

      <aside
        className={`dashboard-sidebar ${
          menuOpen ? "open" : ""
        }`}
      >
        <div className="dashboard-sidebar-top">
          <NavLink
            className="dashboard-logo"
            to="/"
            onClick={closeMenu}
          >
            Chase
          </NavLink>

          <div className="dashboard-user">
            <span className="dashboard-user-name">
              {user?.firstName} {user?.lastName}
            </span>

            <span className="dashboard-user-role">
              {user?.role.name}
            </span>
          </div>
        </div>

        <nav className="dashboard-nav">
          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={navLinkClass}
            end
          >
            Översikt
          </NavLink>

          {hasPermission("users.view") && (
            <NavLink
              to="/dashboard/users"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Användare
            </NavLink>
          )}

          {hasPermission("courses.view") && (
            <NavLink
              to="/dashboard/courses"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Utbildningar
            </NavLink>
          )}

          {hasPermission("applications.view") && (
            <NavLink
              to="/dashboard/applications"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Ansökningar
            </NavLink>
          )}

          {hasPermission("contactMessages.view") && (
            <NavLink
              to="/dashboard/contact-messages"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Kontaktärenden
            </NavLink>
          )}

          {hasPermission("students.view") && (
            <NavLink
              to="/dashboard/students"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Elever
            </NavLink>
          )}

          {hasPermission("assignments.view") && (
            <NavLink
              to="/dashboard/assignments"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Uppgifter
            </NavLink>
          )}

          {hasPermission("quizzes.view") && (
            <NavLink
              to="/dashboard/quizzes"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Quiz
            </NavLink>
          )}

          {hasPermission("warnings.view") && (
            <NavLink
              to="/dashboard/warnings"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Varningar
            </NavLink>
          )}

          {hasPermission("reports.view") && (
            <NavLink
              to="/dashboard/reports"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Rapporter
            </NavLink>
          )}

          {hasPermission("siteContent.manage") && (
            <NavLink
              to="/dashboard/content"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Innehåll
            </NavLink>
          )}
        </nav>

        <button
          className="dashboard-logout"
          type="button"
          onClick={handleLogout}
        >
          Logga ut
        </button>
      </aside>

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;