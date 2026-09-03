import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <section className="dashboard-overview">
        <span className="dashboard-eyebrow">
          ÖVERSIKT
        </span>

        <h1>
          Välkommen tillbaka, {user?.firstName}.
        </h1>

        <p>
          Här hittar du de funktioner och verktyg som är
          tillgängliga för din roll i Chase.
        </p>

        <div className="dashboard-overview-grid">
          <article className="dashboard-overview-card">
            <span>Roll</span>
            <strong>{user?.role.name}</strong>
          </article>

          <article className="dashboard-overview-card">
            <span>Behörigheter</span>
            <strong>{user?.permissions.length}</strong>
          </article>

          <article className="dashboard-overview-card">
            <span>Status</span>
            <strong>Aktiv</strong>
          </article>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default DashboardPage;