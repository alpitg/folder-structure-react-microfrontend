import type { IRolePermission } from "./role-permission.model";

export interface IRolesData {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  isDefault: boolean;
  isStatic: boolean; // If system/static role
  isActive: boolean;
  creationTime: string;
  grantedPermissionNames?: string[] | null;
  organisationUnitIds?: string[] | null;
  isAssigned?: boolean;
}

export interface IRoleWithPermissions {
  role: IRolesData;
  grantedPermissionNames: string[];
  permissions?: IRolePermission[];
}

export interface GetRolesParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  status?: string;
  sort?: string;
}

export interface IPaginatedRolesResponse {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  items: IRolesData[];
}

export interface PaginatedRoles {
  total: number; // total number of matching records
  page: number; // current page number
  pageSize: number; // number of items per page
  pages: number; // total pages
  items: IRolesData[];
}
