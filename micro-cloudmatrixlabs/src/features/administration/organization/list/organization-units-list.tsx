import OrganizationTreeApp from "../tree/organization-tree";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import { useEffect } from "react";
import { useGetOrganizationUnitsQuery } from "../../../../app/redux/administration/organization-units/organization-units.api";
import { useLocation } from "react-router";

const OrganizationUnitsListApp = () => {
  const location = useLocation();
  // Query hook for organization-units-list
  const { data, isLoading, refetch } = useGetOrganizationUnitsQuery();

  // Refresh on navigation with state
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="organization-units-list-app">
      <PageHeaderApp
        header="Organisation Units"
        description="Use organisation units to organise users and entities."
      >
        {/* <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShowAddModel(!showAddModel)}
            >
              <i className="bi bi-plus-lg fs-3"></i>
              Add Root unit
            </button> */}
      </PageHeaderApp>

      <OrganizationTreeApp data={data?.items} refetch={refetch} />

      {/* <div className="card">
            <div className="card-body">
              <OrganizationUnitsFilterApp
                page={page}
                setPage={setPage}
                search={search}
                setSearch={setSearch}
                pages={data?.pages || 1}
                onSearch={() => setPage(1)}
                pageSize={data?.pageSize || 0}
                total={data?.total || 0}
                sort={sort}
                setSort={handleSortChange}
              />

              <br />


               <div className="table-responsive">
                <table className="table table-row-dashed table-row-gray-300 gy-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800">
                      <th>NAME</th>
                      <th>MEMBER COUNT</th>
                      <th>Role Count</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="fw-semibold text-gray-600">
                    {data?.items?.map((item) => (
                      <tr key={item?.id}>
                        <td>
                          <NavLink
                            className="btn btn-sm fs-5 fw-bold"
                            to={ROUTE_URL.ADMINISTRATION.ORGANIZATION_UNIT.EDIT.replace(
                              ":id",
                              item?.id ?? ""
                            )}
                          >
                            {item?.displayName}
                          </NavLink>
                        </td>
                        <td>{item?.memberCount}</td>
                        <td>{item?.roleCount}</td>
                        <td>{item?.isDeleted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> 
            </div>
          </div> */}
    </div>
  );
};

export default OrganizationUnitsListApp;
