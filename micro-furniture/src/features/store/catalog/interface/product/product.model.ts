import type { DiscountType } from "../../../../../interfaces/order/order.model";

export interface IProductMedia {
  url: string;
  alt: string;
}

export interface ProductTax {
  /**
   * Whether the product price already includes tax.
   */
  included: boolean;

  /**
   * Tax class/category.
   * Examples:
   * - taxable_goods
   * - non_taxable
   * - digital_goods
   * - services
   */
  className: string;

  /**
   * Tax percentage.
   * Example: 18 = 18%
   */
  rate: number;
}

export interface ProductDiscount {
  isActive: boolean;
  /**
   * Type of discount applied to the product.
   * - "none": No discount applied.
   * - "percentage": Discount is a percentage of the base price.
   * - "fixed": Discount is a fixed amount subtracted from the base price.
   */
  type: DiscountType;

  /**
   * Value of the discount.
   * - If type is "percentage", this represents the percentage value (e.g., 10 for 10%).
   * - If type is "fixed", this represents the fixed amount to be subtracted from the base price.
   */
  value: number;
}

export interface IProductPrice {
  basePrice: number | null;
  sellingPrice: number | null;
  discount: ProductDiscount | null;
  tax: ProductTax;
}

export interface IProductInventory {
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

export interface IProductVariation {
  name: string;
  values: string;
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
  status: "published" | "inactive" | "scheduled" | "draft";
  template: string;
  categories: string[];
  tags: string[];
  media: IProductMedia[];
  price: IProductPrice;
  isNewArrival: boolean;
  totalWishlistedCount: number;
  inventory: IProductInventory;
  variations: IProductVariation[];
  shipping: IProductShipping;
  meta: IProductMeta;
  scheduling: IProductScheduling;
  rating: number;
  reviews: number;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  status?: string;
  sort?: string;
  isFeatured?: boolean;
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
