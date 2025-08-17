import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";

import CustomerFilterApp from "./filter/customer-filter";
import CustomerHeaderApp from "../header/customer-header";
import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";
import { useGetPaginatedCustomersQuery } from "../../../../app/redux/customer/customer.api";

type sortType = "newest" | "oldest";

const CustomerListApp = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");

  // Query hook for customers
  const { data, isLoading, refetch } = useGetPaginatedCustomersQuery({
    page,
    pageSize: 10,
    searchText: search,
    status: "",
    sort,
  });

  const handleSortChange = (newSort: sortType) => {
    setSort(newSort);
    setPage(1);
  };

  // Refresh if navigated with { state: { refresh: true } }
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  if (isLoading) return <p>Loading...</p>;
  //   if (error) return <ErrorPage />;

  return (
    <div className="customer-list-app">
      <CustomerHeaderApp
        header="Customer Listing"
        description="All customers are listed here."
      >
        <NavLink to={ROUTE_URL.CUSTOMER.ADD} className="btn btn-primary btn-sm">
          <i className="bi bi-plus-lg fs-3"></i>
          Add New Customer
        </NavLink>
      </CustomerHeaderApp>

      <div className="card">
        <div className="card-body">
          <CustomerFilterApp
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

          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800">
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>STATUS</th>
                  <th>CREATED DATE</th>
                </tr>
              </thead>
              <tbody className="fw-semibold text-gray-600">
                {data?.items?.map((item) => (
                  <tr key={item?.id}>
                    <td>
                      <NavLink
                        className="btn btn-sm fs-5 fw-bold"
                        to={ROUTE_URL.CUSTOMER.EDIT.replace(
                          ":id",
                          item?.id ?? ""
                        )}
                      >
                        {item?.name}
                      </NavLink>
                    </td>
                    <td>{item?.email}</td>
                    <td>{item?.isActive ? "Active" : "Locked"}</td>
                    <td>{item?.createdAt}</td>
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

export default CustomerListApp;
