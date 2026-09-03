import { Link } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function ContentManagementPage() {
  const { hasPermission } = useAuth();

  if (!hasPermission("siteContent.manage")) {
    return (
      <DashboardLayout>
        <p>Du har inte behörighet att hantera webbplatsens innehåll.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <section className="content-management">
        <span className="dashboard-eyebrow">
          INNEHÅLL
        </span>

        <h1>Hantera webbplatsens innehåll</h1>

        <p>
          Här kan du redigera innehållet som visas på Chase publika webbplats.
        </p>

        <div className="content-management-grid">
          <Link
            className="content-management-card"
            to="/dashboard/content/courses"
          >
            <span>UTBILDNINGAR</span>
            <h2>Utbildningar</h2>
            <p>
              Hantera utbildningar, ansökningsstatus, datum och information.
            </p>
          </Link>

          <Link
            className="content-management-card"
            to="/dashboard/content/about"
          >
            <span>OM CHASE</span>
            <h2>Om Chase</h2>
            <p>
              Redigera rubriker, texter, bilder och elevcitat.
            </p>
          </Link>

          <Link
            className="content-management-card"
            to="/dashboard/content/business"
          >
            <span>FÖR FÖRETAG</span>
            <h2>För företag</h2>
            <p>
              Hantera innehållet om LIA, samarbeten och rekrytering.
            </p>
          </Link>

          <Link
            className="content-management-card"
            to="/dashboard/content/contact"
          >
            <span>KONTAKT</span>
            <h2>Kontaktpersoner</h2>
            <p>
              Hantera kontaktpersoner och deras kontaktinformation.
            </p>
          </Link>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ContentManagementPage;