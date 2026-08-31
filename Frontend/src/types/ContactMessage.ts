export type ContactMessageStatus =
  | "new"
  | "in_progress"
  | "resolved";

export type ContactMessage = {
  id?: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  subject: string;
  category: string;
  message: string;

  status: ContactMessageStatus;

  assignedTo: string | null;
  adminComment: string;

  createdAt: string;
  updatedAt: string;
};