export interface IOrganizationUnitsMedia {
  url: string;
  alt: string;
}

export interface IOrganizationUnitsPrice {
  basePrice: number | null;
  discountType: "none" | "percentage" | "fixed";
  discountPercentage: number | null;
  fixedDiscountedPrice: number | null;
  taxClass: string;
  taxPercent: number | null;
}

export interface IOrganizationUnitsInventory {
  sku: string | null;
  barcode: string | null;
  quantityInShelf: number | null;
  quantityInWarehouse: number | null;
  /**
   * @readonly this is readonly property
   */
  quantity?: number | null;
  allowBackorders: boolean;
}

export interface IOrganizationUnitsVariation {
  name: string;
  values: string[];
}

export interface IOrganizationUnitsShipping {
  isPhysical: boolean;
  weightInKg: number | null;
  lengthInCm: number | null;
  widthInCm: number | null;
  heightInCm: number | null;
}

export interface IOrganizationUnitsMeta {
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string[];
}

export interface IOrganizationUnitsScheduling {
  publishAt: string | null;
}

export interface IOrganizationUnitsData {
  id?: string;
  parentId?: string | null;
  code?: string;
  displayName: string;
  memberCount?: number;
  roleCount?: number;
  creationTime?: string | null; // use string since dates come as ISO string from API
  creatorUserId?: number | null;
  lastModificationTime?: string | null;
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
}

export interface GetOrganizationUnitsParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  status?: string;
  sort?: string;
}

export interface IPaginatedOrganizationUnitsResponse {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  items: IOrganizationUnitsData[];
}

export interface PaginatedOrganizationUnits {
  total: number; // total number of matching records
  page: number; // current page number
  pageSize: number; // number of items per page
  pages: number; // total pages
  items: IOrganizationUnitsData[];
}

export interface IOrganizationUnitTree {
  id: string;
  label: string;
  members: number;
  roles: number;
  children: IOrganizationUnitTree[];
}

export interface GetOrganizationUnitsParamsAssignRole
  extends GetOrganizationUnitsParams {
  id: string;
  isAssigned: boolean;
}
