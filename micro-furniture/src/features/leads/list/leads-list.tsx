import "./leads-list.scss";

import type { ILead, LeadStatus } from "./interfaces/leads.model";
import React, { useEffect, useState } from "react";
import { STATUS_BADGES, STATUS_LABELS } from "./leads.constants";
import {
  useDeleteLeadMutation,
  useGetLeadsQuery,
} from "../../../app/redux/crm/leads/leads.api";

import DeleteModelApp from "../../../components/delete-model/delete-model";
import LeadsFilterApp from "./filter/leads-filter";
import LeadsFormApp from "../form/leads-form";
import ModelApp from "../../../components/ui/model/model";
import { PERMISSION } from "../../../routes/constants/permission.const";
import PageHeaderApp from "../../../components/header/page-header/page-header";
import { formattedDate } from "../../../utils/date.util";
import { hasPermission } from "../../../utils/permission.util";
import type { sortType } from "../../../interfaces/sort";
import { useAuth } from "../../../hooks/use-auth";

// ==================================================
// HELPERS
// ==================================================

const formatCurrency = (value: number): string =>
  `₹${value.toLocaleString("en-IN")}`;

const useDebouncedValue = <T,>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

// ==================================================
// COMPONENT
// ==================================================

const LeadsApp: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [sort, setSort] = useState<sortType>("newest");

  const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
  const [showFormModel, setShowFormModel] = useState(false);
  const [showDeleteConfirmationModel, setShowDeleteConfirmationModel] =
    useState(false);

  const debouncedSearch = useDebouncedValue(search);

  //#region RTK APIs
  const {
    data: leadData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetLeadsQuery({
    page,
    pageSize: 10,
    searchText: debouncedSearch,
    sort,
    ...(status !== "all" && { status }),
  });

  const [deleteLead] = useDeleteLeadMutation();
  const user = useAuth();
  const userClaims = user?.user?.grantedRoles || [];
  //#endregion

  //#region Handlers
  const handleSortChange = (value: sortType) => {
    setSort(value);
    setPage(1);
  };

  const handleStatusChange = (value: LeadStatus | "all") => {
    setStatus(value);
    setPage(1);
  };

  const handleFormClose = () => {
    setShowFormModel(false);
    setSelectedLead(null);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteLead(id).unwrap(); // list refetches via tag invalidation
      // Deleted the last row on this page, so step back one page
      if ((leadData?.items?.length ?? 0) === 1 && page > 1) setPage(page - 1);
    } catch (error) {
      console.error("Failed to delete lead", error);
    } finally {
      setShowDeleteConfirmationModel(false);
      setSelectedLead(null);
    }
  };
  //#endregion

  const leads = leadData?.items ?? [];

  return (
    <div className="lead-list-app">
      <PageHeaderApp
        header="Leads"
        description="Manage leads and track your sales pipeline."
      >
        {hasPermission(userClaims, [PERMISSION.PAGES.LEADS.CREATE]) && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setSelectedLead(null); // reset
              setShowFormModel(true);
            }}
          >
            <i className="bi bi-plus-lg fs-3"></i>
            Add New Lead
          </button>
        )}
      </PageHeaderApp>

      <div className="card">
        <div className="card-body">
          <LeadsFilterApp
            page={page}
            setPage={setPage}
            search={search}
            setSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            pages={leadData?.pages || 1}
            onSearch={() => setPage(1)}
            pageSize={leadData?.pageSize || 0}
            total={leadData?.total || 0}
            sort={sort}
            setSort={handleSortChange}
            status={status}
            setStatus={handleStatusChange}
            handleRefresh={refetch}
          />

          {isError ? (
            <div className="lead-list-state text-center py-10">
              <i className="bi bi-exclamation-triangle fs-2x text-danger"></i>
              <p className="mt-2 mb-4 fs-6 text-gray-600">
                We couldn't load your leads. Check your connection and try
                again.
              </p>
              <button
                type="button"
                className="btn btn-light-primary btn-sm"
                onClick={() => refetch()}
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <div className="lead-list-state text-center py-10">
              <span
                className="spinner-border text-primary"
                role="status"
                aria-label="Loading leads"
              ></span>
            </div>
          ) : (
            <div
              className={`table-responsive ${isFetching ? "lead-list-fetching" : ""}`}
            >
              <table className="table table-row-dashed table-row-gray-300 gy-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800">
                    <th>LEAD NAME</th>
                    <th>COMPANY</th>
                    <th>EMAIL ADDRESS</th>
                    <th>SOURCE</th>
                    <th>STATUS</th>
                    <th className="text-end">VALUE</th>
                    <th>OWNER</th>
                    <th>CREATION TIME</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="fw-semibold text-gray-600">
                  {leads.map((lead) => (
                    <tr key={lead?.id}>
                      <td className="align-middle">
                        <button
                          className="btn btn-link text-gray-800 text-hover-primary fs-5 fw-bold p-0"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowFormModel(true);
                          }}
                        >
                          {lead?.name}
                        </button>
                      </td>
                      <td className="align-middle">{lead?.company}</td>
                      <td className="align-middle">{lead?.email}</td>
                      <td className="align-middle">{lead?.source}</td>
                      <td className="align-middle">
                        <span
                          className={`badge ${STATUS_BADGES[lead?.status]}`}
                        >
                          {STATUS_LABELS[lead?.status]}
                        </span>
                      </td>
                      <td className="align-middle text-end fw-bold text-gray-900">
                        {formatCurrency(lead?.value ?? 0)}
                      </td>
                      <td className="align-middle">{lead?.owner}</td>
                      <td className="align-middle">
                        {formattedDate(lead?.createdAt ?? "")}
                      </td>
                      <td className="align-content-center">
                        {hasPermission(userClaims, [
                          PERMISSION.PAGES.LEADS.DELETE,
                        ]) && (
                          <button
                            type="button"
                            className="btn btn-light text-hover-danger btn-icon btn-sm"
                            onClick={() => {
                              setSelectedLead(lead); // store which lead to delete
                              setShowDeleteConfirmationModel(true);
                            }}
                            aria-label="Delete lead"
                          >
                            <i className="bi bi-trash3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {leads.length === 0 && (
                <div className="text-muted lead-list-state text-center py-10">
                  <i className="bi bi-inbox fs-2x"></i>
                  <p className="mt-2 mb-0 fs-6">
                    No leads match your search. Clear the filter or add a new
                    lead.
                  </p>
                </div>
              )}
            </div>
          )}

          <ModelApp
            show={showFormModel}
            modelSize="lg"
            onClose={() => handleFormClose()}
          >
            <LeadsFormApp
              mode={selectedLead ? "edit" : "add"}
              lead={selectedLead}
              handleClose={handleFormClose}
            />
          </ModelApp>

          <DeleteModelApp
            handleCancel={() => setShowDeleteConfirmationModel(false)}
            handleConfirm={() => {
              if (selectedLead?.id) handleDeleteConfirm(selectedLead.id);
            }}
            show={showDeleteConfirmationModel}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsApp;
