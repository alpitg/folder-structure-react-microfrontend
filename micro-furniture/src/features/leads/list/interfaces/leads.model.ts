// ==================================================
// LEADS MODEL
// Mirrors the backend (leads.py): PaginatedLeads returns
// total / pages like PaginatedUsers.
// ==================================================

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "won"
  | "lost";

export interface ILead {
  id: string;
  name: string;
  company?: string;
  email?: string;
  mobile?: string;
  source?: string;
  status: LeadStatus;
  value: number;
  owner?: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetLeadsParams {
  page: number; // 1-based
  pageSize: number;
  searchText?: string;
  sort?: string;
  status?: LeadStatus;
}

export interface PaginatedLeads {
  items: ILead[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

// Fields the add / edit form sends (matches backend LeadIn)
export type ILeadForm = Omit<ILead, "id" | "createdAt" | "updatedAt">;
