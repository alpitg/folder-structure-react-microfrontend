import type { IRolesPermissionItem } from "./roles-permission.model";

export interface IRolesData {
  id: string; // Unique identifier
  name: string; // Internal role name (e.g., "Admin")
  displayName: string; // Display label (e.g., "Admin")
  description: string | null;
  isDefault: boolean; // If assigned by default
  isStatic: boolean; // If system/static role
  isActive: boolean;
  creationTime: string; // ISO timestamp, e.g. "2025-08-23T10:44:20.5455664"
}

export interface IRoleWithPermissions {
  role: IRolesData;
  grantedPermissionNames: string[];
  permissions?: IRolesPermissionItem[];
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
