import type { IOrganizationUnitsData } from "./organization-units.model";
import type { IRolePermission } from "./role-permission.model";
import type { IRolesData } from "./roles.model";

export interface IUsersData {
  id: string;
  userName: string;
  name: string;
  surname: string;
  roles: IRolesData[];
  emailAddress: string;
  isEmailConfirmed: boolean;
  password: string | null;
  isActive: boolean;
  phoneNumber: string | null;
  profilePictureId: string | null;
  lockoutEndDateUtc: string | null; // Lockout end date if user is locked, otherwise null
  creationTime: string;

  setRandomPassword: boolean;
  shouldChangePasswordOnNextLogin: boolean;
  sendActivationEmail: boolean;
  isLockoutEnabled: boolean;
  isDarkMode: boolean;
}

export interface IUserWithPermissions {
  user: IUsersData;
  grantedRoles: string[];
  roles: IRolesData[];
  memberedOrganisationUnits: string[];
  allOrganizationUnits: IOrganizationUnitsData[];
  grantedPermissionNames?: string[];
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
