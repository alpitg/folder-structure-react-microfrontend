import React, { useEffect } from "react";

import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../../../../app/store";
import { fetchInvoices } from "../../../../app/redux/finance/invoice/invoice.thunk";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";
import noRecordImage from "/static/media/img/svg/add-new-1.svg";

interface Invoice {
  id: string;
  invoiceNumber: string;
  billDate: string;
  billTo: {
    name: string;
  };
  totalAmount: number;
  paymentStatus: string;
}

const InvoiceList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { invoices, loading } = useSelector(
    (state: AppState) =>
      state.invoice as { invoices: Invoice[]; loading: boolean },
  );

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  if (loading)
    return <div className="text-center py-5">Loading invoices...</div>;

  return (
    <div className="invoice-list-app">
      <PageHeaderApp
        header="Invoice Management"
        description=" Review and manage generated invoices."
      >
        <Link className="btn btn-primary btn-sm" to="create">
          <i className="bi bi-plus-lg"></i>
          Create New Invoice
        </Link>
      </PageHeaderApp>

      {invoices.length === 0 ? (
        <div className="container-xxl">
          <div className="card-px text-center pt-15 pb-15">
            <p className="text-gray-500 py-7">
              You're all set to create your first record
              <br />
              No invoices available yet. Use the button above to create one.
            </p>
          </div>

          <div className="text-center pb-15 px-5">
            <img
              src={noRecordImage}
              alt=""
              className="mw-100 h-100px h-sm-200px"
            />
          </div>
        </div>
      ) : (
        // <div className="alert alert-info mb-0" role="alert">
        //   No invoices available yet. Use the button above to create one.
        // </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Invoice Number</th>
                    <th scope="col">Bill Date</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.billDate}</td>
                      <td>{invoice.billTo.name}</td>
                      <td>${invoice.totalAmount.toFixed(2)}</td>
                      <td>
                        <span
                          className={`badge ${invoice.paymentStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <Link
                          className="btn btn-sm btn-outline-primary"
                          to={`view/${invoice.id}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
