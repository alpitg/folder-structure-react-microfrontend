import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";

import PageHeaderApp from "../../../../components/header/page-header/page-header";
import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";
import RolesFilterApp from "./filter/roles-filter";
import { useGetRolesQuery } from "../../../../app/redux/administration/roles/roles.api";

type sortType = "newest" | "oldest";

const RoleListApp = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");

  // Query hook for roles
  const {
    data: roleData,
    isLoading,
    refetch,
  } = useGetRolesQuery({
    page,
    pageSize: 10,
    searchText: search,
    sort,
  });

  const handleSortChange = (newSort: sortType) => {
    setSort(newSort);
    setPage(1);
  };

  // Refresh on navigation with state
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="role-list-app">
      <PageHeaderApp
        header="Roles"
        description="Use roles to group permissions."
      >
        <NavLink
          to={ROUTE_URL.ADMINISTRATION.ROLES.ADD}
          className="btn btn-primary btn-sm"
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add New Role
        </NavLink>
      </PageHeaderApp>

      <div className="card">
        <div className="card-body">
          <RolesFilterApp
            page={page}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            pages={roleData?.pages || 1}
            onSearch={() => setPage(1)}
            pageSize={roleData?.pageSize || 0}
            total={roleData?.total || 0}
            sort={sort}
            setSort={handleSortChange}
          />

          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800">
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>PERMISSIONS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody className="fw-semibold text-gray-600">
                {roleData?.items?.map((role) => (
                  <tr key={role?.id}>
                    <td>
                      <NavLink
                        className="btn btn-sm fs-5 fw-bold"
                        to={ROUTE_URL.ADMINISTRATION.ROLES.EDIT.replace(
                          ":id",
                          role?.id
                        )}
                      >
                        {role?.name}
                      </NavLink>
                    </td>
                    <td>{role?.description || ""}</td>
                    {/* <td>{role?.permissions?.length || 0}</td> */}
                    <td>{role?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleListApp;
