import type { LeadStatus } from "./interfaces/leads.model";

export const PAGE_SIZE = 10;

export const SOURCE_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal sent",
  won: "Won",
  lost: "Lost",
};

// Badge classes that already exist in _theme.scss
export const STATUS_BADGES: Record<LeadStatus, string> = {
  new: "badge-light-info",
  contacted: "badge-light-warning",
  qualified: "badge-light-primary",
  proposal: "badge-light-dark",
  won: "badge-light-success",
  lost: "badge-light-danger",
};

export const STATUS_ORDER = Object.keys(STATUS_LABELS) as LeadStatus[];

export const SORT_OPTIONS = [
  { value: "createdAt desc", label: "Newest first" },
  { value: "createdAt asc", label: "Oldest first" },
  { value: "value desc", label: "Highest value" },
  { value: "value asc", label: "Lowest value" },
  { value: "name asc", label: "Name A–Z" },
];
