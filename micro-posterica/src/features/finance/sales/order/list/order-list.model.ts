import type { PaymentStatusType } from "../../../../../interfaces/order/order.model";

export interface IOrderList {
  id: string;
  orderCode: string;
  customerName: string;
  createdAt?: string; // ISO datetime string from backend
  itemCount: number;
  paymentStatus?: PaymentStatusType; // "pending" | "paid" | "failed" | "refunded";
  total: number;
  orderStatus?: string; // "pending" | "fulfilled" | "partial" | "cancelled";
}

export interface PaginatedOrders {
  total: number; // total number of matching records
  page: number; // current page number
  pageSize: number; // number of items per page
  pages: number; // total pages
  items: IOrderList[];
}

export interface GetOrdersParams {
  page?: number;
  pageSize?: number;
  customerName?: string;
  orderCode?: string;
  sort?: string;
}
