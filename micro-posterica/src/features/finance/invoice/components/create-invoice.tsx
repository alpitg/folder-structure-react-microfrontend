import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  invoiceId?: string;
}

const CreateInvoice: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const alreadyInvoicedCount = orders.filter((order) => !!order.invoiceId).length;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "/api/orders?status=completed&invoiceId=null",
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderIds: selectedOrders }),
      });

      if (response.ok) {
        const invoice = await response.json();
        navigate(`/invoice/view/${invoice.id}`);
      } else {
        console.error("Error creating invoice");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Invoice</h2>
      {alreadyInvoicedCount > 0 && (
        <div className="alert alert-warning" role="alert">
          {alreadyInvoicedCount} order{alreadyInvoicedCount > 1 ? "s" : ""} are
          already invoiced and cannot be selected.
        </div>
      )}
      <div>
        <h3>Select Orders</h3>
        {orders.map((order) => (
          <div key={order.id}>
            <input
              type="checkbox"
              checked={selectedOrders.includes(order.id)}
              onChange={() => handleSelectOrder(order.id)}
              disabled={!!order.invoiceId}
            />
            {order.orderNumber} - {order.customerName} - ${order.totalAmount}
            {order.invoiceId && " (Already invoiced)"}
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary"
        onClick={handleCreateInvoice}
        disabled={selectedOrders.length === 0 || loading}
      >
        {loading ? "Creating..." : "Create Invoice"}
      </button>
    </div>
  );
};

export default CreateInvoice;
