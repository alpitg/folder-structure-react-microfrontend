// ==================================================
// LEADS MODEL
// Mirrors the backend (leads.py): PaginatedLeads returns
// total / pages like PaginatedUsers.
// ==================================================

// #region leads dashboard

interface StatOut {
  value: number;
  changePercent: number | null;
}

export interface LeadsDashboardResponse {
  stats: {
    totalLeads: StatOut;
    qualifiedLeads: StatOut;
    conversionRate: StatOut;
    pipelineValue: StatOut;
  };
  pipeline: {
    status: LeadStatus;
    count: number;
    value: number;
  }[];
  followUps: {
    id: string;
    title: string;
    leadId: string;
    leadName: string | null;
    dueAt: string;
    isOverdue: boolean;
  }[];
  followUpsPending: number;
  recentLeads: ILead[];
}

// #endregion

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
