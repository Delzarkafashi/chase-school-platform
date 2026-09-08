export type User = {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  password: string;

  roleId: number;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};