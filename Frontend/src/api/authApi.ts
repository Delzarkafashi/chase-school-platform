import type { User } from "../types/User";
import type { Role } from "../types/Role";
import type { Permission } from "../types/Permission";
import type { RolePermission } from "../types/RolePermission";
import type { AuthUser } from "../types/AuthUser";

const BASE_URL = "http://localhost:3001";

async function buildAuthUser(user: User): Promise<AuthUser> {
  const [
    roleResponse,
    rolePermissionsResponse,
    permissionsResponse,
  ] = await Promise.all([
    fetch(`${BASE_URL}/roles/${user.roleId}`),
    fetch(`${BASE_URL}/rolePermissions?roleId=${user.roleId}`),
    fetch(`${BASE_URL}/permissions`),
  ]);

  if (
    !roleResponse.ok ||
    !rolePermissionsResponse.ok ||
    !permissionsResponse.ok
  ) {
    throw new Error(
      "Kunde inte hämta användarens behörigheter."
    );
  }

  const role: Role = await roleResponse.json();

  const rolePermissions: RolePermission[] =
    await rolePermissionsResponse.json();

  const allPermissions: Permission[] =
    await permissionsResponse.json();

  const permissionIds = new Set(
    rolePermissions.map((item) =>
      String(item.permissionId)
    )
  );

  const permissions = allPermissions.filter(
    (permission) =>
      permissionIds.has(String(permission.id))
  );

  return {
    id: String(user.id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role,
    permissions,
  };
}

export async function login(
  email: string,
  password: string
): Promise<AuthUser> {
  const usersResponse = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(email)}`
  );

  if (!usersResponse.ok) {
    throw new Error("Kunde inte ansluta till servern.");
  }

  const users: User[] = await usersResponse.json();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!user) {
    throw new Error("Fel e-postadress eller lösenord.");
  }

  if (!user.isActive) {
    throw new Error("Kontot är inte aktivt.");
  }

  return buildAuthUser(user);
}

export async function getAuthUserById(
  userId: string
): Promise<AuthUser> {
  const userResponse = await fetch(
    `${BASE_URL}/users/${userId}`
  );

  if (!userResponse.ok) {
    throw new Error("Kunde inte hämta användaren.");
  }

  const user: User = await userResponse.json();

  if (!user.isActive) {
    throw new Error("Kontot är inte aktivt.");
  }

  return buildAuthUser(user);
}