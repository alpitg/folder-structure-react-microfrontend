import { GetEnvConfig } from "../../../app.config";
import { axiosInstance } from "../../axios-instance/axios";

export default class InvoiceService {
  private static getBaseUrl(): string {
    return GetEnvConfig()?.api?.baseUrl || "";
  }

  static fetchAll = () => {
    return axiosInstance.get(`${this.getBaseUrl()}/api/invoices`);
  };

  static fetchById = (invoiceId: string) => {
    return axiosInstance.get(`${this.getBaseUrl()}/api/invoices/${invoiceId}`);
  };

  static create = (orderIds: string[]) => {
    return axiosInstance.post(`${this.getBaseUrl()}/api/invoices`, { orderIds });
  };

  static updatePayment = (invoiceId: string, advancePaid: number) => {
    return axiosInstance.put(`${this.getBaseUrl()}/api/invoices/${invoiceId}/payment`, {
      advancePaid,
    });
  };

  static getPdfUrl = (invoiceId: string) => {
    return `${this.getBaseUrl()}/api/invoices/${invoiceId}/pdf`;
  };
}
