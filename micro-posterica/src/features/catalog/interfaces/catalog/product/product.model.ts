export interface IProductList {
  id: string;
  code: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  rating: number;
  status: string;
  isTouched: boolean;

  createdAt?: string; // ISO datetime string from backend
}

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  name?: string;
  code?: string;
  sort?: string;
}

export interface PaginatedProducts {
  total: number; // total number of matching records
  page: number; // current page number
  pageSize: number; // number of items per page
  pages: number; // total pages
  items: IProductList[];
}

export interface IProductData {}
