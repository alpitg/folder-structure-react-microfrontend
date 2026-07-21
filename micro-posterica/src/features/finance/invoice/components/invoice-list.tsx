import type { AppDispatch, AppState } from "../../../../app/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { Invoice } from "../../../../app/redux/finance/invoice/invoice.slice";
import InvoiceFilterApp from "./filter/invoice-filter";
import { Link } from "react-router";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import { fetchInvoices } from "../../../../app/redux/finance/invoice/invoice.thunk";
import noRecordImage from "/static/media/img/svg/add-new-1.svg";

const InvoiceList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { invoices, total, limit } = useSelector(
    (state: AppState) =>
      state.invoice as {
        invoices: Invoice[];
        loading: boolean;
        total: number;
        page: number;
        limit: number;
      },

    //   state.invoice as {
    //     invoices: InvoiceResponse;
    //     loading: boolean;
    //     total: number;
    //     page: number;
    //     limit: number;
    //   },
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInvoices({ search, page: currentPage, limit: 10 }));
  }, [dispatch, search, currentPage]);

  //   if (loading)
  //     return <div className="text-center py-5">Loading invoices...</div>;

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

      <div className="card shadow-sm">
        <div className="card-body">
          <InvoiceFilterApp
            page={currentPage}
            search={search}
            setSearch={setSearch}
            pages={Math.ceil(total / limit)}
            setPage={setCurrentPage}
            onSearch={() => setCurrentPage(1)}
            handleRefresh={() => setCurrentPage(1)}
            pageSize={limit}
            total={total}
          />
          {invoices?.length === 0 ? (
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
            <>
              <div className="table-responsive">
                <table className="table table-row-dashed table-row-gray-300 gy-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800">
                      <th>Invoice Number</th>
                      <th>Bill Date</th>
                      <th>Customer</th>
                      <th>Total Amount</th>
                      <th>Payment Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="fw-semibold text-gray-600">
                    {invoices?.map((invoice) => (
                      <tr key={invoice?.id}>
                        <td>{invoice?.invoiceNumber}</td>
                        <td>{invoice?.billDate}</td>
                        <td>{invoice?.billTo?.name}</td>
                        <td>${invoice?.totalAmount?.toFixed(2)}</td>
                        <td>
                          <span
                            className={`badge ${invoice?.paymentStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}
                          >
                            {invoice?.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <Link
                            className="btn btn-sm btn-outline-primary"
                            to={`view/${invoice?.id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {total > limit && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from(
                        { length: Math.ceil(total / limit) },
                        (_, i) => i + 1,
                      ).map((pageNum) => (
                        <li
                          key={pageNum}
                          className={`page-item ${pageNum === currentPage ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${currentPage === Math.ceil(total / limit) ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === Math.ceil(total / limit)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
