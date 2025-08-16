export interface IProductMedia {
  url: string;
  alt: string;
}

export interface IProductPrice {
  basePrice: number | null;
  discountType: "none" | "percentage" | "fixed";
  discountPercentage: number | null;
  fixedDiscountedPrice: number | null;
  taxClass: "tax_free" | "taxable_goods" | "non_taxable" | string;
  vatPercent: number | null;
}

export interface IProductInventory {
  sku: string | null;
  barcode: string | null;
  quantityInShelf: number;
  quantityInWarehouse: number;
  /**
   * @readonly this is readonly property
   */
  quantity?: number | null;
  allowBackorders: boolean;
}

export interface IProductVariation {
  name: string;
  values: string[];
}

export interface IProductShipping {
  isPhysical: boolean;
  weightInKg: number | null;
  lengthInCm: number | null;
  widthInCm: number | null;
  heightInCm: number | null;
}

export interface IProductMeta {
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string[];
}

export interface IProductScheduling {
  publishAt: string | null;
}

export interface IProductData {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "draft" | "published" | string;
  template: string;
  categories: string[];
  tags: string[];
  media: IProductMedia[];
  price: IProductPrice;
  totalWishlistedCount: number;
  inventory: IProductInventory;
  variations: IProductVariation[];
  shipping: IProductShipping;
  meta: IProductMeta;
  scheduling: IProductScheduling;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  status?: string;
  sort?: string;
}

export interface IPaginatedProductResponse {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  items: IProductData[];
}

export interface PaginatedProducts {
  total: number; // total number of matching records
  page: number; // current page number
  pageSize: number; // number of items per page
  pages: number; // total pages
  items: IProductData[];
}
