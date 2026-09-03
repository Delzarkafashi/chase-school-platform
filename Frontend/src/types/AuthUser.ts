import type { Role } from "./Role";
import type { Permission } from "./Permission";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  permissions: Permission[];
};