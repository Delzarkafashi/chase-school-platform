import type { ReactNode } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
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

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-top">
          <NavLink
            className="dashboard-logo"
            to="/"
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
          <NavLink to="/dashboard">
            Översikt
          </NavLink>

          {hasPermission("users.view") && (
            <NavLink to="/dashboard/users">
              Användare
            </NavLink>
          )}

          {hasPermission("courses.view") && (
            <NavLink to="/dashboard/courses">
              Utbildningar
            </NavLink>
          )}

          {hasPermission("applications.view") && (
            <NavLink to="/dashboard/applications">
              Ansökningar
            </NavLink>
          )}

          {hasPermission("contactMessages.view") && (
            <NavLink to="/dashboard/contact-messages">
              Kontaktärenden
            </NavLink>
          )}

          {hasPermission("students.view") && (
            <NavLink to="/dashboard/students">
              Elever
            </NavLink>
          )}

          {hasPermission("assignments.view") && (
            <NavLink to="/dashboard/assignments">
              Uppgifter
            </NavLink>
          )}

          {hasPermission("quizzes.view") && (
            <NavLink to="/dashboard/quizzes">
              Quiz
            </NavLink>
          )}

          {hasPermission("warnings.view") && (
            <NavLink to="/dashboard/warnings">
              Varningar
            </NavLink>
          )}

          {hasPermission("reports.view") && (
            <NavLink to="/dashboard/reports">
              Rapporter
            </NavLink>
          )}

        {hasPermission("siteContent.manage") && (
        <NavLink to="/dashboard/content">
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