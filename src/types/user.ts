export enum UserRole {
  USER = "user",
  PARTNER = "partner",
  ADMIN = "admin",
}

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}
