import { NavLink } from "react-router";
import OrderHeaderApp from "../header/order-header";
import PaymentBadge, {
  type PaymentStatus,
} from "../../../../../components/ui/payment-badges/payment-badges";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";
import { useGetOrdersQuery } from "../../../../../app/features/sales/order/order.api";
import ErrorPage from "../../../../../components/ui/error/error-page";
import NoRecordApp from "./no-record/no-record";

const OrderListApp = () => {
  const { data: orderDetail, isLoading, error } = useGetOrdersQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;
  if (!orderDetail) return <NoRecordApp />;

  return (
    <div className="order-list-app">
      <OrderHeaderApp header="Order listing" description="All orders are here.">
        <NavLink
          to={ROUTE_URL.FINANCE.SALES.ADD}
          className="btn btn-primary btn-sm"
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add New Order
        </NavLink>
      </OrderHeaderApp>

      <div className="card">
        <div className="card-body">
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
                {orderDetail?.map((order) => (
                  <tr key={order?.id}>
                    <td>
                      <NavLink
                        to={ROUTE_URL.FINANCE.SALES.VIEW.replace(
                          ":orderId",
                          order?.id
                        )}
                        className="btn btn-sm"
                      >
                        {order?.id}
                      </NavLink>
                    </td>
                    <td>
                      <span className="text-gray-800 text-hover-primary fs-5 fw-bold">
                        {order?.customerName}
                      </span>
                    </td>
                    <td>
                      {order?.createdAt
                        ? new Date(order?.createdAt)?.toLocaleDateString()
                        : null}
                    </td>
                    <td>{order?.itemCount}</td>
                    <td>
                      {
                        <PaymentBadge
                          status={order.paymentStatus as PaymentStatus}
                        />
                      }
                    </td>
                    <td>{order?.total.toFixed(2)}</td>
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
