import type { PaymentStatusType } from "../../../../../interfaces/order/order.model";

export interface IOrderList {
  id: string;
  orderCode: string;
  customerName: string;
  itemCount: number;
  total: number;
  orderStatus: string; // "placed" | "shipped" | "delivered" | "cancelled"; // extend as needed
  paymentStatus: PaymentStatusType; // extend as needed
  createdAt: string; // ISO date string (e.g., "2025-08-14T17:39:40.061000")
}
