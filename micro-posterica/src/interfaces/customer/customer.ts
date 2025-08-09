export interface ICustomer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  notes?: string;
}
