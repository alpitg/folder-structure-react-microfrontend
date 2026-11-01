import React, { useMemo, useState } from "react";

import { useGetLeadsDashboardQuery } from "../../../app/redux/crm/leads/leads.api";

type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "won"
  | "lost";

interface DashboardStat {
  value: number;
  changePercent: number;
}

interface DashboardStats {
  totalLeads: DashboardStat;
  qualifiedLeads: DashboardStat;
  conversionRate: DashboardStat;
  pipelineValue: DashboardStat;
}

interface PipelineItem {
  status: LeadStatus;
  count: number;
  value: number;
}

interface FollowUp {
  id: string;
  title: string;
  leadId: string;
  leadName: string;
  dueAt: string;
  isOverdue: boolean;
}

interface Lead {
  name: string;
  company: string;
  email: string;
  mobile: string;
  source: string;
  status: LeadStatus;
  value: number;
  owner: string;
  quoteDetails: string;
  description: string;
  isActive: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadsDashboardResponse {
  stats: DashboardStats;
  pipeline: PipelineItem[];
  followUps: FollowUp[];
  followUpsPending: number;
  recentLeads: Lead[];
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal sent",
  won: "Won",
  lost: "Lost",
};

const STATUS_BADGES: Record<LeadStatus, string> = {
  new: "badge-light-info",
  contacted: "badge-light-warning",
  qualified: "badge-light-primary",
  proposal: "badge-light-dark",
  won: "badge-light-success",
  lost: "badge-light-danger",
};

const PIPELINE_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

const formatCurrency = (value: number): string =>
  `₹${(value || 0).toLocaleString("en-IN")}`;

const getInitials = (name: string): string =>
  (name || "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatDate = (date: string): string => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatFollowUpDate = (date: string): string => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const LeadsDashboardApp: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  const {
    data: leadData,
    isLoading,
    isError,
    refetch,
  } = useGetLeadsDashboardQuery({
    recentLimit: 8,
    followUpLimit: 5,
  });

  const dashboardData = leadData as LeadsDashboardResponse | undefined;

  const stats = dashboardData?.stats;
  const leads = dashboardData?.recentLeads ?? [];
  const followUps = dashboardData?.followUps ?? [];
  const pipeline = dashboardData?.pipeline ?? [];
  const followUpsPending = dashboardData?.followUpsPending ?? 0;

  const statCards = [
    {
      label: "Total leads",
      value: (stats?.totalLeads?.value ?? 0).toLocaleString("en-IN"),
      change: stats?.totalLeads?.changePercent ?? 0,
      icon: "bi-person-plus",
    },
    {
      label: "Qualified",
      value: (stats?.qualifiedLeads?.value ?? 0).toLocaleString("en-IN"),
      change: stats?.qualifiedLeads?.changePercent ?? 0,
      icon: "bi-patch-check",
    },
    {
      label: "Conversion rate",
      value: `${stats?.conversionRate?.value ?? 0}%`,
      change: stats?.conversionRate?.changePercent ?? 0,
      icon: "bi-graph-up-arrow",
    },
    {
      label: "Pipeline value",
      value: formatCurrency(stats?.pipelineValue?.value ?? 0),
      change: stats?.pipelineValue?.changePercent ?? 0,
      icon: "bi-currency-rupee",
    },
  ];

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      const matchesSearch =
        !query ||
        lead.name?.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query) ||
        lead.id?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.mobile?.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [leads, search, statusFilter]);

  const maxPipelineCount = useMemo(
    () => Math.max(...pipeline.map((item) => item.count), 1),
    [pipeline],
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-20">
        <span className="spinner-border text-primary me-3"></span>
        <span className="text-gray-600 fw-semibold">Loading dashboard...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card">
        <div className="card-body text-center py-10">
          <i className="bi bi-exclamation-circle fs-2x text-danger"></i>
          <p className="text-danger mt-3">
            We couldn't load your leads. Check your connection and try again.
          </p>
          <button className="btn btn-primary" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="crm-dashboard d-flex">
      <main className="flex-grow-1 p-4 p-lg-6" style={{ minWidth: 0 }}>
        {/* STATS */}

        <section className="row g-5 mb-5">
          {statCards.map((stat) => (
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
                      className={`fs-8 fw-semibold mt-1 ${
                        stat.change >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      <i
                        className={`bi ${
                          stat.change >= 0
                            ? "bi-arrow-up-short"
                            : "bi-arrow-down-short"
                        }`}
                      ></i>
                      {Math.abs(stat.change)}% vs last week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* PIPELINE + FOLLOW UPS */}

        <section className="row g-5 mb-5">
          {/* PIPELINE */}

          <div className="col-12 col-xl-7 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h2 className="card-title fs-3 mb-0">Lead pipeline</h2>

                <div className="card-toolbar fs-7 text-gray-500">
                  {pipeline.reduce((total, item) => total + item.count, 0)}{" "}
                  leads
                </div>
              </div>

              <div className="card-body d-flex flex-column gap-4">
                {PIPELINE_ORDER.map((status) => {
                  const item = pipeline.find(
                    (pipelineItem) => pipelineItem.status === status,
                  );

                  const count = item?.count ?? 0;
                  const percent = (count / maxPipelineCount) * 100;

                  return (
                    <div className="dashboard-pipeline-item" key={status}>
                      <span className="fs-6 fw-semibold text-gray-600">
                        {STATUS_LABELS[status]}
                      </span>

                      <div className="progress h-10px bg-light">
                        <div
                          className={`dashboard-pipeline-bar ${status}`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>

                      <span className="fs-6 fw-bold text-gray-900 text-end">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FOLLOW UPS */}

          <div className="col-12 col-xl-5 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h2 className="card-title fs-3 mb-0">Follow-ups</h2>

                <div className="card-toolbar fs-7 text-gray-500">
                  {followUpsPending} pending
                </div>
              </div>

              <div className="card-body">
                {followUps.length > 0 ? (
                  followUps.map((task) => (
                    <div
                      className="d-flex align-items-start gap-3 p-3 border-bottom border-dashed"
                      key={task.id}
                    >
                      <i
                        className={`bi ${
                          task.isOverdue
                            ? "bi-exclamation-circle-fill text-danger"
                            : "bi-clock text-gray-500"
                        } fs-5`}
                      ></i>

                      <div>
                        <div className="fs-6 fw-bold text-gray-900">
                          {task.title}
                        </div>

                        <div className="fs-7 text-gray-500">
                          {task.leadName} •{" "}
                          <span
                            className={
                              task.isOverdue ? "text-danger fw-semibold" : ""
                            }
                          >
                            {formatFollowUpDate(task.dueAt)}
                          </span>
                        </div>

                        {task.isOverdue && (
                          <span className="badge badge-light-danger mt-2">
                            Overdue
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-5">
                    <i className="bi bi-check-circle fs-2x"></i>
                    <p className="mt-2 mb-0">No pending follow-ups.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* RECENT LEADS */}

        <section className="card">
          <div className="card-header flex-wrap gap-3 py-4">
            <h2 className="card-title fs-3 mb-0">Recent leads</h2>

            <div className="card-toolbar d-flex flex-wrap gap-2">
              <input
                type="text"
                className="form-control form-control-sm w-150px"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                type="button"
                className={`dashboard-chip btn btn-sm ${
                  statusFilter === "all" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>

              {PIPELINE_ORDER.map((status) => (
                <button
                  type="button"
                  key={status}
                  className={`dashboard-chip btn btn-sm ${
                    statusFilter === status ? "btn-primary" : "btn-light"
                  }`}
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

                            <div className="fs-8 text-gray-500">
                              {lead.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>{lead.source || "-"}</td>

                      <td>
                        <span
                          className={`badge ${
                            STATUS_BADGES[lead.status] ??
                            "badge-light-secondary"
                          }`}
                        >
                          {STATUS_LABELS[lead.status] ?? lead.status}
                        </span>
                      </td>

                      <td className="text-end fw-bold text-gray-900">
                        {formatCurrency(lead.value)}
                      </td>

                      <td>{lead.owner || "-"}</td>

                      <td>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  <i className="bi bi-inbox fs-2x"></i>
                  <p className="mt-2 mb-0 fs-6">No leads match your search.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LeadsDashboardApp;
