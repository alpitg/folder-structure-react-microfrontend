import React, { useMemo, useState } from "react";

// ==================================================
// TYPES
// ==================================================

type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "won"
  | "lost";

interface Lead {
  id: string;
  name: string;
  company: string;
  source: string;
  status: LeadStatus;
  value: number;
  owner: string;
  createdOn: string;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

interface FollowUp {
  id: string;
  title: string;
  lead: string;
  due: string;
  overdue?: boolean;
}

// ==================================================
// STATIC DATA (replace with API calls in week 2)
// ==================================================

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal sent",
  won: "Won",
  lost: "Lost",
};

// Maps each lead status to a badge class that already exists in _theme.scss
const STATUS_BADGES: Record<LeadStatus, string> = {
  new: "badge-light-info",
  contacted: "badge-light-warning",
  qualified: "badge-light-primary",
  proposal: "badge-light-dark",
  won: "badge-light-success",
  lost: "badge-light-danger",
};

const STATS: Stat[] = [
  {
    label: "Total leads",
    value: "1,284",
    change: "12.5%",
    trend: "up",
    icon: "bi-person-plus",
  },
  {
    label: "Qualified",
    value: "342",
    change: "8.1%",
    trend: "up",
    icon: "bi-patch-check",
  },
  {
    label: "Conversion rate",
    value: "18.4%",
    change: "2.3%",
    trend: "down",
    icon: "bi-graph-up-arrow",
  },
  {
    label: "Pipeline value",
    value: "₹48.6L",
    change: "15.2%",
    trend: "up",
    icon: "bi-currency-rupee",
  },
];

const LEADS: Lead[] = [
  {
    id: "L-1042",
    name: "Aarav Mehta",
    company: "Urban Nest Interiors",
    source: "Website",
    status: "new",
    value: 245000,
    owner: "Riya S.",
    createdOn: "01 Nov 2026",
  },
  {
    id: "L-1041",
    name: "Neha Kulkarni",
    company: "Kulkarni Residences",
    source: "Referral",
    status: "contacted",
    value: 480000,
    owner: "Karan P.",
    createdOn: "31 Oct 2026",
  },
  {
    id: "L-1040",
    name: "Rohan Deshmukh",
    company: "Casa Living",
    source: "Instagram",
    status: "qualified",
    value: 125000,
    owner: "Riya S.",
    createdOn: "30 Oct 2026",
  },
  {
    id: "L-1039",
    name: "Sana Sheikh",
    company: "Bluebell Hotels",
    source: "Trade show",
    status: "proposal",
    value: 920000,
    owner: "Meera J.",
    createdOn: "29 Oct 2026",
  },
  {
    id: "L-1038",
    name: "Vikram Joshi",
    company: "Joshi & Sons",
    source: "Website",
    status: "won",
    value: 310000,
    owner: "Karan P.",
    createdOn: "27 Oct 2026",
  },
  {
    id: "L-1037",
    name: "Pooja Nair",
    company: "Nair Studio",
    source: "Google Ads",
    status: "lost",
    value: 90000,
    owner: "Meera J.",
    createdOn: "26 Oct 2026",
  },
  {
    id: "L-1036",
    name: "Imran Qureshi",
    company: "Oak & Ivory",
    source: "Referral",
    status: "qualified",
    value: 560000,
    owner: "Riya S.",
    createdOn: "25 Oct 2026",
  },
  {
    id: "L-1035",
    name: "Tanvi Bhosale",
    company: "Home Hive",
    source: "Instagram",
    status: "contacted",
    value: 175000,
    owner: "Karan P.",
    createdOn: "24 Oct 2026",
  },
];

const FOLLOW_UPS: FollowUp[] = [
  {
    id: "f1",
    title: "Send revised quote",
    lead: "Sana Sheikh",
    due: "Today, 4:00 PM",
  },
  {
    id: "f2",
    title: "Call to confirm site visit",
    lead: "Neha Kulkarni",
    due: "Tomorrow, 11:00 AM",
  },
  {
    id: "f3",
    title: "Share catalogue",
    lead: "Rohan Deshmukh",
    due: "Yesterday",
    overdue: true,
  },
  {
    id: "f4",
    title: "Negotiate delivery timeline",
    lead: "Imran Qureshi",
    due: "05 Nov, 2:30 PM",
  },
];

const PIPELINE_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

// ==================================================
// HELPERS
// ==================================================

const formatCurrency = (value: number): string =>
  `₹${value.toLocaleString("en-IN")}`;

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// ==================================================
// COMPONENT
// ==================================================

const DashboardApp: React.FC = () => {
  const search = '';
  // const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return LEADS.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      const matchesSearch =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.id.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const pipeline = useMemo(() => {
    const counts = PIPELINE_ORDER.map((status) => ({
      status,
      count: LEADS.filter((lead) => lead.status === status).length,
    }));
    const max = Math.max(...counts.map((item) => item.count), 1);
    return counts.map((item) => ({
      ...item,
      percent: (item.count / max) * 100,
    }));
  }, []);

  return (
    <div className="crm-dashboard d-flex">
      {/* ================= MAIN ================= */}
      <main className="flex-grow-1 p-4 p-lg-6" style={{ minWidth: 0 }}>
        {/* ----- Stats ----- */}
        <section className="row g-5 mb-5">
          {STATS.map((stat) => (
            <div className="col-12 col-sm-6 col-xl-3" key={stat.label}>
              <div className="card h-100">
                <div className="card-body d-flex align-items-start gap-4">
                  <div className="symbol symbol-45px">
                    <span className="symbol-label bg-light-primary">
                      <i className={`bi ${stat.icon} fs-2 text-primary`}></i>
                    </span>
                  </div>
                  <div>
                    <div className="fs-7 fw-semibold text-gray-500">
                      {stat.label}
                    </div>
                    <div className="fs-2x fw-bolder text-gray-900 lh-sm">
                      {stat.value}
                    </div>
                    <div
                      className={`fs-8 fw-semibold mt-1 ${stat.trend === "up" ? "text-success" : "text-danger"}`}
                    >
                      <i
                        className={`bi ${stat.trend === "up" ? "bi-arrow-up-short" : "bi-arrow-down-short"}`}
                      ></i>
                      {stat.change} vs last week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ----- Pipeline + Follow-ups ----- */}
        <section className="row g-5 mb-5">
          <div className="col-12 col-xl-7 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h2 className="card-title fs-3 mb-0">Lead pipeline</h2>
                <div className="card-toolbar fs-7 text-gray-500">
                  {LEADS.length} leads
                </div>
              </div>
              <div className="card-body d-flex flex-column gap-4">
                {pipeline.map((item) => (
                  <div className="dashboard-pipeline-item" key={item.status}>
                    <span className="fs-6 fw-semibold text-gray-600">
                      {STATUS_LABELS[item.status]}
                    </span>
                    <div className="progress h-10px bg-light">
                      <div
                        className={`dashboard-pipeline-bar ${item.status}`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <span className="fs-6 fw-bold text-gray-900 text-end">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-5 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h2 className="card-title fs-3 mb-0">Follow-ups</h2>
                <div className="card-toolbar fs-7 text-gray-500">
                  {FOLLOW_UPS.length} pending
                </div>
              </div>
              <div className="card-body">
                {FOLLOW_UPS.map((task) => (
                  <div
                    className="d-flex align-items-start gap-3 p-3 border-bottom border-dashed"
                    key={task.id}
                  >
                    <i
                      className={`bi ${
                        task.overdue
                          ? "bi-exclamation-circle-fill text-danger"
                          : "bi-clock text-gray-500"
                      } fs-5`}
                    ></i>
                    <div>
                      <div className="fs-6 fw-bold text-gray-900">
                        {task.title}
                      </div>
                      <div className="fs-7 text-gray-500">
                        {task.lead} •{" "}
                        <span
                          className={
                            task.overdue ? "text-danger fw-semibold" : ""
                          }
                        >
                          {task.due}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----- Leads table ----- */}
        <section className="card">
          <div className="card-header flex-wrap gap-3 py-4">
            <h2 className="card-title fs-3 mb-0">Recent leads</h2>

            <div className="card-toolbar d-flex flex-wrap gap-2">
              <button
                type="button"
                className={`dashboard-chip btn btn-sm ${statusFilter === "all" ? "btn-primary" : "btn-light"}`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              {PIPELINE_ORDER.map((status) => (
                <button
                  type="button"
                  key={status}
                  className={`dashboard-chip btn btn-sm ${statusFilter === status ? "btn-primary" : "btn-light"}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {STATUS_LABELS[status]}
                </button>
              ))}
            </div>
          </div>

          <div className="card-body py-4">
            <div className="table-responsive">
              <table className="table table-row-dashed align-middle gs-0 gy-4 mb-0">
                <thead>
                  <tr className="fs-7 fw-bold text-gray-500">
                    <th>Lead</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th className="text-end">Value</th>
                    <th>Owner</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody className="fs-6 text-gray-600">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div className="symbol symbol-35px symbol-circle">
                            <span className="symbol-label bg-light-primary text-primary fs-7 fw-bold">
                              {getInitials(lead.name)}
                            </span>
                          </div>
                          <div>
                            <div className="fw-bold text-gray-900">
                              {lead.name}
                            </div>
                            <div className="fs-8 text-gray-500">
                              {lead.company} • {lead.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{lead.source}</td>
                      <td>
                        <span className={`badge ${STATUS_BADGES[lead.status]}`}>
                          {STATUS_LABELS[lead.status]}
                        </span>
                      </td>
                      <td className="text-end fw-bold text-gray-900">
                        {formatCurrency(lead.value)}
                      </td>
                      <td>{lead.owner}</td>
                      <td>{lead.createdOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  <i className="bi bi-inbox fs-2x"></i>
                  <p className="mt-2 mb-0 fs-6">
                    No leads match your search. Clear the filter or add a new
                    lead.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardApp;
