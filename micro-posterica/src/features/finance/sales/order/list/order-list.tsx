import { NavLink } from "react-router";
import OrderHeaderApp from "../header/order-header";
import PaymentBadge, {
  type PaymentStatus,
} from "../../../../../components/ui/payment-badges/payment-badges";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";
import { useGetOrdersQuery } from "../../../../../app/features/sales/order/order.api";

const OrderListApp = () => {
  const { data } = useGetOrdersQuery();

  return (
    <div className="order-list-app">
      <OrderHeaderApp header="Order listing" description="Order listing page">
        <NavLink
          to={ROUTE_URL.FINANCE.SALES.ADD}
          className="btn btn-primary btn-sm d-flex align-items-center mb-3 ms-2"
        >
          <i className="bi bi-plus"></i>
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
              <tbody>
                {data?.map((order) => (
                  <tr key={order?.orderId}>
                    <td>
                      <NavLink
                        to={ROUTE_URL.FINANCE.SALES.EDIT.replace(
                          ":orderId",
                          order?.orderId
                        )}
                        className="btn btn-sm bg-body"
                      >
                        {order?.orderId}
                      </NavLink>
                    </td>
                    <td>{order?.customerName}</td>
                    <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
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
