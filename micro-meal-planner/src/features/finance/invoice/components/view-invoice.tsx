import React, { useEffect, useState } from "react";

import { NavLink, useParams } from "react-router";
import InvoiceService from "../../../../api/services/finance/invoice.service";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";

interface Invoice {
  id: string;
  invoiceNumber: string;
  billDate: string;
  billFrom: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  billTo: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  items: Array<{
    productId?: string;
    name?: string;
    description?: string;
    quantity: number;
    unitPrice: number;
    discountAmount: number;
    cancelledQty: number;
    lineTotal: number;
  }>;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  advancePaid: number;
  balanceAmount: number;
  paymentMode: string;
  paymentStatus: string;
}

const ViewInvoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    if (id) fetchInvoice(id);
  }, [id]);

  const fetchInvoice = async (invoiceId: string) => {
    try {
      const response = await InvoiceService.fetchById(invoiceId);
      setInvoice(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = async () => {
    if (!invoice) return;

    try {
      const response = await InvoiceService.updatePayment(
        invoice.id,
        invoice.advancePaid + paymentAmount,
      );
      setInvoice(response.data);
      setPaymentAmount(0);
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const handleDownloadPDF = () => {
    if (!id) return;
    window.open(InvoiceService.getPdfUrl(id), "_blank");
  };

  if (loading)
    return <div className="text-center py-5">Loading invoice...</div>;
  if (!invoice)
    return (
      <div className="alert alert-danger text-center py-5">
        Invoice not found
      </div>
    );

  return (
    <div className="view-invoice-app">
      <PageHeaderApp header="Invoice Management" description="Review Invoice.">
        <NavLink to={ROUTE_URL.INVOICE_MANAGER.BASE}>
          <span className="btn btn-light btn-active-secondary btn-sm me-5">
            <i className="bi bi-chevron-left fs-5"></i>
            Back to Invoice List
          </span>
        </NavLink>
      </PageHeaderApp>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Invoice {invoice.invoiceNumber}</h2>
          <button
            className="btn btn-outline-primary"
            onClick={handleDownloadPDF}
          >
            <i className="bi bi-download me-2"></i>Download PDF
          </button>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">Bill From</h5>
                </div>
                <div className="card-body">
                  <p className="mb-1 fw-bold">{invoice.billFrom.name}</p>
                  {invoice.billFrom.address && (
                    <p className="mb-1">{invoice.billFrom.address}</p>
                  )}
                  {invoice.billFrom.phone && (
                    <p className="mb-1">
                      <i className="bi bi-telephone me-2"></i>
                      {invoice.billFrom.phone}
                    </p>
                  )}
                  {invoice.billFrom.email && (
                    <p className="mb-0">
                      <i className="bi bi-envelope me-2"></i>
                      {invoice.billFrom.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">Bill To</h5>
                </div>
                <div className="card-body">
                  <p className="mb-1 fw-bold">{invoice.billTo.name}</p>
                  {invoice.billTo.address && (
                    <p className="mb-1">{invoice.billTo.address}</p>
                  )}
                  {invoice.billTo.phone && (
                    <p className="mb-1">
                      <i className="bi bi-telephone me-2"></i>
                      {invoice.billTo.phone}
                    </p>
                  )}
                  {invoice.billTo.email && (
                    <p className="mb-0">
                      <i className="bi bi-envelope me-2"></i>
                      {invoice.billTo.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="mb-3">Invoice Items</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.description || item.name || "Item"}</td>
                      <td>{item.quantity}</td>
                      <td>${item.unitPrice.toFixed(2)}</td>
                      <td>${item.discountAmount.toFixed(2)}</td>
                      <td>${item.lineTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Invoice Summary</h6>
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-1">Subtotal:</p>
                      <p className="mb-1">Discount:</p>
                      <p className="mb-1">Tax:</p>
                      <p className="mb-1 fw-bold">Total:</p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-1">${invoice.subtotal.toFixed(2)}</p>
                      <p className="mb-1">
                        ${invoice.discountAmount.toFixed(2)}
                      </p>
                      <p className="mb-1">${invoice.taxAmount.toFixed(2)}</p>
                      <p className="mb-1 fw-bold">
                        ${invoice.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Payment Information</h6>
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-1">Advance Paid:</p>
                      <p className="mb-1">Balance:</p>
                      <p className="mb-1">Status:</p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-1">${invoice.advancePaid.toFixed(2)}</p>
                      <p className="mb-1">
                        ${invoice.balanceAmount.toFixed(2)}
                      </p>
                      <p className="mb-1">
                        <span
                          className={`badge ${invoice.paymentStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Update Payment</h5>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-md-6">
                  <label htmlFor="paymentAmount" className="form-label">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="paymentAmount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    placeholder="Enter payment amount"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdatePayment}
                  >
                    Add Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
