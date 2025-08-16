export interface IProductMedia {
  url: string;
  alt: string;
}

export interface IProductPrice {
  base_price: number;
  discount_type: "none" | "percentage" | "fixed";
  discount_percentage: number;
  fixed_discounted_price: number;
  tax_class: "taxable_goods" | "non_taxable" | string;
  vat_percent: number;
}

export interface IProductInventory {
  sku: string | null;
  barcode: string | null;
  quantity: number;
  allow_backorders: boolean;
}

export interface IProductVariation {
  name: string;
  values: string[];
}

export interface IProductShipping {
  is_physical: boolean;
  weight_kg: number | null;
  length_cm: number | null;
  width_cm: number | null;
  height_cm: number | null;
}

export interface IProductMeta {
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[];
}

export interface IProductScheduling {
  publish_at: string | null;
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
  created_at: string;
  updated_at: string;
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
