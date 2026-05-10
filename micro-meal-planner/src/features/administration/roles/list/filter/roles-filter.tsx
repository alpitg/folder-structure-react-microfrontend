import { useAutoFocus } from "../../../../../hooks/use-auto-focus";

interface ProductFilterProps {
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
  handleRefresh?: () => void;
}

const RolesFilterApp = ({
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
  handleRefresh,
}: ProductFilterProps) => {
  const inputRef = useAutoFocus<HTMLInputElement>();

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const handlePreviousPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < pages && setPage(page + 1);

  return (
    <div className="roles-filter-app">
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
              placeholder="Search by role name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              aria-label="Search roles"
              tabIndex={0}
              ref={inputRef}
            />
          </div>
        </div>

        <div className="card-toolbar flex-row-fluid justify-content-end align-items-center gap-4 mt-3 mt-md-0 position-relative">
          <div className="dropdown">
            <button
              className="btn btn-link btn-color-gray-500 btn-active-color-primary"
              type="button"
              id="productSortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Sort roles"
            >
              {`${start} - ${end} of ${total || 0}`}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end p-0"
              aria-labelledby="productSortDropdown"
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
            aria-label="Previous page"
            title="Refresh"
          >
            <i className="bi bi-arrow-repeat" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolesFilterApp;
