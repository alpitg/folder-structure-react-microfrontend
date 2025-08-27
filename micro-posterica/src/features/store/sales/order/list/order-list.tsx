import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";

import PaymentBadge, {
  type PaymentStatus,
} from "../../../../../components/ui/payment-badges/payment-badges";
import { ROUTE_URL } from "../../../../../routes/constants/routes.const";
import ErrorPage from "../../../../../components/ui/error/error-page";
import OrderFilterApp from "./filter/order-filter";
import { useGetOrdersQuery } from "../../../../../app/redux/sales/order/order.api";
import PageHeaderApp from "../../../../../components/header/page-header/page-header";

type sortType = "newest" | "oldest";

const OrderListApp = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");

  // Main query hook — always called in the same order
  const {
    data: orderData,
    isLoading,
    error,
    refetch,
  } = useGetOrdersQuery({
    page,
    pageSize: 10,
    customerName: search || undefined,
    orderCode: search || undefined,
    sort,
  });

  // Sort change handler — triggers re-fetch automatically via query args
  const handleSortChange = (newSort: sortType) => {
    setSort(newSort);
    setPage(1);
  };

  // Manual refresh trigger when navigated with a state flag
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;

  return (
    <div className="order-list-app">
      <PageHeaderApp header="Order listing" description="All orders are here.">
        <NavLink
          to={ROUTE_URL.SALES.ORDER.ADD}
          className="btn btn-primary btn-sm"
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add New Order
        </NavLink>
      </PageHeaderApp>

      <div className="card">
        <div className="card-body">
          <OrderFilterApp
            page={page}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            pages={orderData?.pages || 1}
            onSearch={() => setPage(1)}
            pageSize={orderData?.pageSize || 0}
            total={orderData?.total || 0}
            sort={sort}
            setSort={handleSortChange}
          />

          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800">
                  <th>ORDER ID</th>
                  <th>CUSTOMER</th>
                  <th>DATE</th>
                  <th>ITEMS</th>
                  <th>PAYMENT STATUS</th>
                  <th>TOTAL</th>
                  <th>ORDER STATUS</th>
                </tr>
              </thead>
              <tbody className="fw-semibold text-gray-600">
                {orderData?.items?.map((order) => (
                  <tr key={order?.id}>
                    <td>
                      <NavLink
                        to={ROUTE_URL.SALES.ORDER.VIEW.replace(
                          ":orderId",
                          order?.id
                        )}
                        className="btn btn-sm"
                      >
                        {order?.orderCode}
                      </NavLink>
                    </td>
                    <td>
                      <span className="text-gray-800 text-hover-primary fs-5 fw-bold">
                        {order?.customerName}
                      </span>
                    </td>
                    <td>
                      {order?.createdAt
                        ? new Date(order?.createdAt).toLocaleDateString()
                        : null}
                    </td>
                    <td>{order?.itemCount}</td>
                    <td>
                      <PaymentBadge
                        status={order?.paymentStatus as PaymentStatus}
                      />
                    </td>
                    <td>{order?.total?.toFixed(2)}</td>
                    <td>{order?.orderStatus}</td>
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

export default OrderListApp;
