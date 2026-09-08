import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../api/usersApi";
import type { User } from "../types/User";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import "../styles/users-admin.css";

type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  roleId: number;
  isActive: boolean;
};

const emptyUser: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  roleId: 3,
  isActive: true,
};

function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>(emptyUser);
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();
      setUsers(data);
    } catch {
      setError("Kunde inte hämta användarna.");
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      fullName.includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue);

    const matchesRole =
      roleFilter === "all" || user.roleId === Number(roleFilter);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  function getRoleName(roleId: number) {
    if (roleId === 1) return "Admin";
    if (roleId === 2) return "Lärare";
    if (roleId === 3) return "Elev";
    if (roleId === 4) return "Viewer";

    return "Okänd roll";
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    if (name === "roleId") {
      setFormData((current) => ({
        ...current,
        roleId: Number(value),
      }));

      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleActiveChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((current) => ({
      ...current,
      isActive: event.target.checked,
    }));
  }

  function openCreateForm() {
    setEditingUserId(null);
    setFormData(emptyUser);
    setFormError("");
    setShowPassword(false);
    setShowForm(true);
  }

  function openEditForm(user: User) {
    setEditingUserId(user.id);

    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: "",
      roleId: user.roleId,
      isActive: user.isActive,
    });

    setFormError("");
    setShowPassword(false);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function closeForm() {
    setEditingUserId(null);
    setFormData(emptyUser);
    setFormError("");
    setShowPassword(false);
    setShowForm(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setFormError(
        "Förnamn, efternamn och e-post måste fyllas i."
      );

      return;
    }

    if (!editingUserId && !formData.password.trim()) {
      setFormError("Lösenord måste anges för en ny användare.");
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        user.id !== editingUserId
    );

    if (emailExists) {
      setFormError(
        "Det finns redan en användare med den e-postadressen."
      );

      return;
    }

    try {
      setSaving(true);
      setFormError("");

      if (editingUserId) {
        const changes: Partial<User> = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          roleId: formData.roleId,
          isActive: formData.isActive,
        };

        if (formData.password.trim()) {
          changes.password = formData.password;
        }

        const updatedUser = await updateUser(
          editingUserId,
          changes
        );

        setUsers((current) =>
          current.map((user) =>
            user.id === editingUserId ? updatedUser : user
          )
        );
      } else {
        const createdUser = await createUser({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          roleId: formData.roleId,
          isActive: formData.isActive,
        });

        setUsers((current) => [...current, createdUser]);
      }

      closeForm();
    } catch {
      setFormError(
        editingUserId
          ? "Kunde inte uppdatera användaren."
          : "Kunde inte skapa användaren."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(user: User) {
    try {
      setError("");

      const updatedUser = await updateUser(user.id, {
        isActive: !user.isActive,
      });

      setUsers((current) =>
        current.map((currentUser) =>
          currentUser.id === user.id ? updatedUser : currentUser
        )
      );
    } catch {
      setError("Kunde inte ändra användarens status.");
    }
  }

  async function handleDelete(user: User) {
    const confirmed = window.confirm(
      `Är du säker på att du vill ta bort ${user.firstName} ${user.lastName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteUser(user.id);

      setUsers((current) =>
        current.filter(
          (currentUser) => currentUser.id !== user.id
        )
      );

      if (editingUserId === user.id) {
        closeForm();
      }
    } catch {
      setError("Kunde inte ta bort användaren.");
    }
  }

  return (
    <DashboardLayout>
      <div className="users-admin-page">
        <div className="users-admin-top">
          <div className="users-admin-header">
            <p className="users-admin-eyebrow">
              ANVÄNDARE
            </p>

            <h1>Användare</h1>

            <p>
              Hantera administratörer, lärare och elever i Chase.
            </p>
          </div>

          <button
            className="users-admin-primary-button"
            type="button"
            onClick={openCreateForm}
          >
            + Lägg till användare
          </button>
        </div>

        {showForm && (
          <div className="users-admin-form-card">
            <div className="users-admin-form-header">
              <div>
                <p className="users-admin-eyebrow">
                  {editingUserId
                    ? "REDIGERA ANVÄNDARE"
                    : "NY ANVÄNDARE"}
                </p>

                <h2>
                  {editingUserId
                    ? "Redigera användare"
                    : "Lägg till användare"}
                </h2>

                <p>
                  {editingUserId
                    ? "Uppdatera användarens uppgifter, roll och kontostatus."
                    : "Skapa ett nytt konto och välj användarens roll."}
                </p>
              </div>

              <button
                className="users-admin-close-button"
                type="button"
                onClick={closeForm}
              >
                Stäng
              </button>
            </div>

            <form
              className="users-admin-form"
              onSubmit={handleSubmit}
            >
              <div className="users-admin-form-section">
                <h3>Personuppgifter</h3>

                <div className="users-admin-form-grid">
                  <label>
                    Förnamn
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Förnamn"
                    />
                  </label>

                  <label>
                    Efternamn
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Efternamn"
                    />
                  </label>

                  <label>
                    E-post
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="namn@chase.se"
                    />
                  </label>

                  <label>
                    Telefon
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0701234567"
                    />
                  </label>
                </div>
              </div>

              <div className="users-admin-form-section">
                <h3>Konto och behörighet</h3>

                <div className="users-admin-form-grid">
                  <label>
                    Roll
                    <select
                      name="roleId"
                      value={formData.roleId}
                      onChange={handleInputChange}
                    >
                      <option value={1}>
                        Admin
                      </option>

                      <option value={2}>
                        Lärare
                      </option>

                      <option value={3}>
                        Elev
                      </option>

                      <option value={4}>
                        Viewer
                      </option>
                    </select>
                  </label>

                  <label>
                    {editingUserId
                      ? "Nytt lösenord"
                      : "Lösenord"}

                    <div className="users-admin-password-field">
                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={
                          editingUserId
                            ? "Lämna tomt för att behålla nuvarande"
                            : "Ange lösenord"
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) => !current
                          )
                        }
                      >
                        {showPassword
                          ? "Dölj"
                          : "Visa"}
                      </button>
                    </div>

                    {editingUserId && (
                      <span className="users-admin-field-help">
                        Fyll bara i detta om lösenordet ska ändras.
                      </span>
                    )}
                  </label>
                </div>

                <label className="users-admin-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleActiveChange}
                  />

                  <span>
                    <strong>Aktiv användare</strong>

                    <small>
                      Användaren kan logga in och använda plattformen.
                    </small>
                  </span>
                </label>
              </div>

              {formError && (
                <p className="users-admin-form-error">
                  {formError}
                </p>
              )}

              <div className="users-admin-form-actions">
                <button
                  className="users-admin-secondary-button"
                  type="button"
                  onClick={closeForm}
                >
                  Avbryt
                </button>

                <button
                  className="users-admin-primary-button"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Sparar..."
                    : editingUserId
                      ? "Spara ändringar"
                      : "Skapa användare"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="users-admin-filters">
          <input
            type="text"
            placeholder="Sök på namn eller e-post..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
          >
            <option value="all">
              Alla roller
            </option>

            <option value="1">
              Admin
            </option>

            <option value="2">
              Lärare
            </option>

            <option value="3">
              Elev
            </option>

            <option value="4">
              Viewer
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="all">
              Alla statusar
            </option>

            <option value="active">
              Aktiva
            </option>

            <option value="inactive">
              Inaktiva
            </option>
          </select>
        </div>

        {loading && (
          <p className="users-admin-message">
            Laddar användare...
          </p>
        )}

        {error && (
          <p className="users-admin-message users-admin-error">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="users-admin-result-count">
              Visar {filteredUsers.length} av{" "}
              {users.length} användare
            </p>

            {filteredUsers.length === 0 ? (
              <p className="users-admin-message">
                Inga användare hittades.
              </p>
            ) : (
              <div className="users-admin-list">
                {filteredUsers.map((user) => (
                  <div
                    className="users-admin-card"
                    key={user.id}
                  >
                    <div className="users-admin-card-header">
                      <div>
                        <h3>
                          {user.firstName}{" "}
                          {user.lastName}
                        </h3>

                        <p>{user.email}</p>
                      </div>

                      <span
                        className={
                          user.isActive
                            ? "users-admin-status-badge users-admin-status-badge-active"
                            : "users-admin-status-badge users-admin-status-badge-inactive"
                        }
                      >
                        {user.isActive
                          ? "Aktiv"
                          : "Inaktiv"}
                      </span>
                    </div>

                    <div className="users-admin-card-details">
                      <p>
                        <strong>Roll:</strong>{" "}
                        {getRoleName(
                          user.roleId
                        )}
                      </p>

                      {user.phone && (
                        <p>
                          <strong>
                            Telefon:
                          </strong>{" "}
                          {user.phone}
                        </p>
                      )}
                    </div>

                    <div className="users-admin-card-actions">
                      <button
                        className="users-admin-secondary-button"
                        type="button"
                        onClick={() =>
                          openEditForm(user)
                        }
                      >
                        Redigera
                      </button>

                      <button
                        className="users-admin-secondary-button"
                        type="button"
                        onClick={() =>
                          handleToggleActive(
                            user
                          )
                        }
                      >
                        {user.isActive
                          ? "Inaktivera"
                          : "Aktivera"}
                      </button>

                      <button
                        className="users-admin-delete-button"
                        type="button"
                        onClick={() =>
                          handleDelete(user)
                        }
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default UsersAdminPage;