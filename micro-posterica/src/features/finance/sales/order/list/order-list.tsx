import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";

const OrderListApp = () => {
  return (
    <div className="order-list-app">
      <h1>Order Management</h1>
      <p>Manage your orders here.</p>
      {/* Add components and functionality related to sales management */}

      {/* itemSolid
  billName
  billId
  transactionType
  salesBy
  quantity
  unitPrice
  totalPrice
  paymentReceived
  saleType
  paymentMode
  pendingAmount
  remarks */}

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800">
                  <th>ORDER ID</th>
                  <th>CUSTOMER</th>
                  <th>STATUS</th>
                  <th>TOTAL</th>
                  <th>DATE ADDED</th>
                  <th>DATE MODIFIED</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <NavLink
                      to={ROUTE_URL.FINANCE.SALES.EDIT.replace(
                        ":orderId",
                        "O-12231"
                      )}
                      className="btn btn-sm bg-body"
                    >
                      O-12231
                    </NavLink>
                  </td>

                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011/07/25</td>
                  <td>$170,750</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListApp;
