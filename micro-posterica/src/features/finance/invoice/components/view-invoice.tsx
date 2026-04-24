import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';

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
      const response = await fetch(`/api/invoices/${invoiceId}`);
      const data = await response.json();
      setInvoice(data);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = async () => {
    if (!invoice) return;

    try {
      const response = await fetch(`/api/invoices/${invoice.id}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ advancePaid: invoice.advancePaid + paymentAmount }),
      });

      if (response.ok) {
        const updatedInvoice = await response.json();
        setInvoice(updatedInvoice);
        setPaymentAmount(0);
      }
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const handleDownloadPDF = () => {
    window.open(`/api/invoices/${id}/pdf`, '_blank');
  };

  if (loading) return <div>Loading...</div>;
  if (!invoice) return <div>Invoice not found</div>;

  return (
    <div>
      <h2>Invoice {invoice.invoiceNumber}</h2>
      <button onClick={handleDownloadPDF}>Download PDF</button>

      <div>
        <h3>Bill From</h3>
        <p>{invoice.billFrom.name}</p>
        <p>{invoice.billFrom.address}</p>
      </div>

      <div>
        <h3>Bill To</h3>
        <p>{invoice.billTo.name}</p>
        <p>{invoice.billTo.address}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description || item.name || 'Item'}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice.toFixed(2)}</td>
              <td>${item.discountAmount.toFixed(2)}</td>
              <td>${item.lineTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Subtotal: ${invoice.subtotal.toFixed(2)}</p>
        <p>Discount: ${invoice.discountAmount.toFixed(2)}</p>
        <p>Tax: ${invoice.taxAmount.toFixed(2)}</p>
        <p>Total: ${invoice.totalAmount.toFixed(2)}</p>
        <p>Advance Paid: ${invoice.advancePaid.toFixed(2)}</p>
        <p>Balance: ${invoice.balanceAmount.toFixed(2)}</p>
        <p>Payment Status: {invoice.paymentStatus}</p>
      </div>

      <div>
        <h3>Update Payment</h3>
        <input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(Number(e.target.value))}
          placeholder="Payment Amount"
        />
        <button onClick={handleUpdatePayment}>Add Payment</button>
      </div>
    </div>
  );
};

export default ViewInvoice;