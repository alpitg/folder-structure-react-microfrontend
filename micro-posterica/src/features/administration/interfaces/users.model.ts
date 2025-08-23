import type { IRolePermission } from "./role-permission.model";
import type { IRolesData } from "./roles.model";

export interface IUsersData {
  id: string; // Unique identifier for the user
  userName: string; // Username (login/account name)
  name: string; // First name
  surname: string; // Last name
  roles: IRolesData[]; // List of assigned roles
  emailAddress: string; // Email address
  isEmailConfirmed: boolean; // Whether the email is confirmed
  isActive: boolean; // Whether the account is active
  phoneNumber: string | null; // User's phone number (nullable)
  profilePictureId: string | null; // Profile picture identifier (nullable GUID/UUID)
  lockoutEndDateUtc: string | null; // Lockout end date if user is locked, otherwise null
  creationTime: string; // ISO timestamp of account creation
}

export interface IUserWithPermissions {
  user: IUsersData;
  //   roles: IUsersData;
  grantedPermissionNames: string[];
  permissions?: IRolePermission[];
}

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  status?: string;
  sort?: string;
}

export interface IPaginatedUsersResponse {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  items: IUsersData[];
}

export interface PaginatedUsers {
  total: number; // total number of matching records
  page: number; // current page number
  pageSize: number; // number of items per page
  pages: number; // total pages
  items: IUsersData[];
}
