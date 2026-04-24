import React, { useEffect, useState } from 'react';

import { Link } from 'react-router';

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
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch invoices from API
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Invoice Management</h2>
      <Link to="create">Create New Invoice</Link>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Bill Date</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.billDate}</td>
              <td>{invoice.billTo.name}</td>
              <td>{invoice.totalAmount}</td>
              <td>{invoice.paymentStatus}</td>
              <td>
                <Link to={`view/${invoice.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;