export interface IRolesMedia {
  url: string;
  alt: string;
}

export interface IRolesPrice {
  basePrice: number | null;
  discountType: "none" | "percentage" | "fixed";
  discountPercentage: number | null;
  fixedDiscountedPrice: number | null;
  taxClass: "tax_free" | "taxable_goods" | "non_taxable" | string;
  vatPercent: number | null;
}

export interface IRolesInventory {
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

export interface IRolesVariation {
  name: string;
  values: string[];
}

export interface IRolesShipping {
  isPhysical: boolean;
  weightInKg: number | null;
  lengthInCm: number | null;
  widthInCm: number | null;
  heightInCm: number | null;
}

export interface IRolesMeta {
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string[];
}

export interface IRolesScheduling {
  publishAt: string | null;
}

export interface IRolesData {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "published" | "inactive" | "scheduled" | "draft";
  template: string;
  categories: string[];
  tags: string[];
  media: IRolesMedia[];
  price: IRolesPrice;
  totalWishlistedCount: number;
  inventory: IRolesInventory;
  variations: IRolesVariation[];
  shipping: IRolesShipping;
  meta: IRolesMeta;
  scheduling: IRolesScheduling;
  rating: number;
  createdAt: string;
  updatedAt: string;
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