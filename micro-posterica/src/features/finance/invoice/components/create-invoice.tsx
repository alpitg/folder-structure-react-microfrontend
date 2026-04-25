import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router";
import { useGetOrdersFilteredQuery } from "../../../../app/redux/sales/order/order.api";
import InvoiceService from "../../../../api/services/finance/invoice.service";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";

interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  total: number;
  invoiceId?: string;
}

const CreateInvoice: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data } = useGetOrdersFilteredQuery({
    status: "complete",
    invoiceId: "null",
  });

  useEffect(() => {
    setOrders(data?.items || []);
  }, [data]);

  const alreadyInvoicedCount = orders.filter(
    (order) => !!order.invoiceId,
  ).length;

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleCreateInvoice = async () => {
    if (selectedOrders.length === 0) return;

    setLoading(true);
    try {
      const response = await InvoiceService.create(selectedOrders);
      navigate(`/invoice/view/${response.data.id}`);
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-invoice-app">
      <PageHeaderApp
        header="Invoice Management"
        description="Create New Invoice."
      >
        <NavLink to={ROUTE_URL.INVOICE_MANAGER.BASE}>
          <span className="btn btn-light btn-active-secondary btn-sm me-5">
            <i className="bi bi-chevron-left fs-5"></i>
            Back to Invoice List
          </span>
        </NavLink>
      </PageHeaderApp>

      <div className="card shadow-sm">
        <div className="card-body">
          {alreadyInvoicedCount > 0 && (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {alreadyInvoicedCount} order{alreadyInvoicedCount > 1 ? "s" : ""}{" "}
              are already invoiced and cannot be selected.
            </div>
          )}

          <div className="mb-4">
            <h5 className="mb-3">Select Completed Orders</h5>
            {orders.length === 0 ? (
              <div className="alert alert-info mb-0" role="alert">
                No completed orders available for invoicing.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="w-50px">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrders(
                                orders
                                  .filter((o) => !o.invoiceId)
                                  .map((o) => o.id),
                              );
                            } else {
                              setSelectedOrders([]);
                            }
                          }}
                          checked={
                            selectedOrders.length ===
                              orders.filter((o) => !o.invoiceId).length &&
                            selectedOrders.length > 0
                          }
                        />
                      </th>
                      <th scope="col">Order Code</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                            disabled={!!order.invoiceId}
                          />
                        </td>
                        <td>{order.orderCode}</td>
                        <td>{order.customerName}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          {order.invoiceId ? (
                            <span className="badge bg-secondary">
                              Already Invoiced
                            </span>
                          ) : (
                            <span className="badge bg-success">Available</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleCreateInvoice}
              disabled={selectedOrders.length === 0 || loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating...
                </>
              ) : (
                "Create Invoice"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
