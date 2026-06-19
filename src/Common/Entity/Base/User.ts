import { BaseFilter, Language, ServiceFile, UUID } from "./Common";
import { PointWallet } from "./Point";

export enum UserRole {
  ADMIN = "admin",
  DIRECTOR = "director",
  MANAGER = "manager",
  METHODIST = "methodist",
  TEACHER = "teacher",
  CLIENT = "client",
}

export interface User {
  id: UUID;
  clientId?: UUID;
  username: string;
  description?: string;
  firstName: string;
  lastName: string;
  avatar?: ServiceFile;
  roles: UserRole[];
  schoolId?: UUID;
  notificationCount: number;
  language: Language;
}

export interface UserStudent {
  id: UUID;
  username: string;
  description?: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatar?: ServiceFile;
  schoolId: UUID;
  clientId: UUID;
  totalPoints: number;
  pointWallets: PointWallet[];
  notificationCount: number;
  language: Language;
}

export interface MiniUser {
  id: UUID;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: ServiceFile;
  schoolId?: UUID;
}

export interface UserNames {
  usernames: string[];
}

export const hasRole = (roles?: UserRole[], userRoles?: UserRole[]) => {
  if (!roles) return true;
  return roles.some((role) => userRoles?.includes(role));
};

export interface UserFilter extends BaseFilter {
  schoolId: UUID;
  groupId?: UUID;
  role?: UserRole;
  search?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  language?: Language;
}
