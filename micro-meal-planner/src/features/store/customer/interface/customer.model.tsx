export interface IAddress {
  id?: string; // unique id for address
  label: string; // "home" | "office" | "other"; // type of address
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  isDefault?: boolean; // mark as default
}

export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  description?: string;

  // multiple saved addresses
  addresses: IAddress[];
  shippingAddress?: IAddress; // optional for custom shipping address
  billingAddress?: IAddress;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Listing

export interface GetCustomersParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  status?: string;
  sort?: string;
}

export interface IPaginatedCustomerResponse {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  items: ICustomer[];
}

export interface PaginatedCustomers {
  total: number; // total number of matching records
  page: number; // current page number
  pageSize: number; // number of items per page
  pages: number; // total pages
  items: ICustomer[];
}
