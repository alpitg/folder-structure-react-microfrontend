import { STATUS_LABELS, STATUS_ORDER } from "../leads.constants";

import type { LeadStatus } from "../interfaces/leads.model";
import { useAutoFocus } from "../../../../hooks/use-auto-focus";

interface LeadsFilterProps {
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (value: string) => void;
  pages: number;
  onSearch: () => void;
  pageSize: number;
  total: number;
  sort?: "newest" | "oldest";
  setSort?: (sort: "newest" | "oldest") => void;
  status?: LeadStatus | "all";
  setStatus?: (status: LeadStatus | "all") => void;
  handleRefresh?: () => void;
}

const LeadsFilterApp = ({
  page,
  setPage,
  search,
  setSearch,
  pages,
  onSearch,
  pageSize,
  total,
  sort = "newest",
  setSort = () => {},
  status = "all",
  setStatus = () => {},
  handleRefresh,
}: LeadsFilterProps) => {
  const inputRef = useAutoFocus<HTMLInputElement>();

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const handlePreviousPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < pages && setPage(page + 1);

  return (
    <div className="lead-filter-app">
      <div className="card-header align-items-center px-0 gap-2 gap-md-5 flex-wrap">
        <div className="card-title flex-grow-1">
          <div
            className="d-flex align-items-center position-relative my-1 w-100"
            style={{ maxWidth: "500px" }}
          >
            <i className="bi bi-search fs-3 position-absolute ms-4" />
            <input
              type="text"
              className="form-control form-control-solid ps-12"
              placeholder="Search by name, company or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              aria-label="Search leads"
              tabIndex={0}
              ref={inputRef}
            />
          </div>
        </div>

        <div className="card-toolbar flex-row-fluid justify-content-end align-items-center gap-4 mt-3 mt-md-0 position-relative">
          {/* ----- Status filter ----- */}
          <div className="dropdown">
            <button
              className="btn btn-link btn-color-gray-500 btn-active-color-primary"
              type="button"
              id="leadStatusDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Filter leads by status"
            >
              <i className="bi bi-funnel me-2" />
              {status === "all" ? "All statuses" : STATUS_LABELS[status]}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end p-0"
              aria-labelledby="leadStatusDropdown"
              role="menu"
            >
              <li>
                <button
                  className={`dropdown-item ${status === "all" ? "active" : ""}`}
                  onClick={() => setStatus("all")}
                  role="menuitem"
                >
                  All statuses
                </button>
              </li>
              {STATUS_ORDER.map((item) => (
                <li key={item}>
                  <button
                    className={`dropdown-item ${status === item ? "active" : ""}`}
                    onClick={() => setStatus(item)}
                    role="menuitem"
                  >
                    {STATUS_LABELS[item]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ----- Range + sort ----- */}
          <div className="dropdown">
            <button
              className="btn btn-link btn-color-gray-500 btn-active-color-primary"
              type="button"
              id="leadSortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Sort leads"
            >
              {`${start} - ${end} of ${total || 0}`}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end p-0"
              aria-labelledby="leadSortDropdown"
              role="menu"
            >
              <li>
                <button
                  className={`dropdown-item ${
                    sort === "newest" ? "active" : ""
                  }`}
                  onClick={() => setSort("newest")}
                  role="menuitem"
                >
                  Newest first
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${
                    sort === "oldest" ? "active" : ""
                  }`}
                  onClick={() => setSort("oldest")}
                  role="menuitem"
                >
                  Oldest first
                </button>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="btn btn-light btn-icon btn-sm"
            onClick={handlePreviousPage}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <i className="bi bi-chevron-left" />
          </button>

          <button
            type="button"
            className="btn btn-light btn-icon btn-sm"
            onClick={handleNextPage}
            disabled={page >= pages}
            aria-label="Next page"
          >
            <i className="bi bi-chevron-right" />
          </button>

          <button
            type="button"
            className="btn btn-light btn-icon btn-sm"
            onClick={handleRefresh}
            aria-label="Refresh leads"
            title="Refresh"
          >
            <i className="bi bi-arrow-repeat" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsFilterApp;
