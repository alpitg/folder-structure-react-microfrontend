import "./order-details.scss";

import { NavLink, useParams } from "react-router";

import { ROUTE_URL } from "../../../../routes/constants/routes.const";
import { useGetWebsiteOrdersQuery } from "../../../../app/redux/website/order/website-order.api";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data, isLoading, isError, refetch } = useGetWebsiteOrdersQuery({
    page: 1,
    limit: 50,
  });

  const order = data?.orders?.find(
    (item) => item.id === orderId || item.orderCode === orderId,
  );

  const formatDate = (date?: string) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date?: string) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount?: number) => {
    return `₹${(amount ?? 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusLabel = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "placed":
        return "Order placed";
      case "confirmed":
        return "Confirmed";
      case "processing":
        return "Processing";
      case "packed":
        return "Packed";
      case "shipped":
        return "Shipped";
      case "out_for_delivery":
        return "Out for delivery";
      case "delivered":
        return "Delivered";
      case "cancelled":
      case "canceled":
        return "Cancelled";
      case "returned":
        return "Returned";
      case "refunded":
        return "Refunded";
      default:
        return status?.replace(/_/g, " ") || "Order placed";
    }
  };

  const getStatusClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "delivered";
      case "cancelled":
      case "canceled":
      case "returned":
      case "refunded":
        return "danger";
      default:
        return "active";
    }
  };

  if (isLoading) {
    return (
      <div className="profile-order-details">
        <div className="order-details-loading">
          <div className="order-details-loader">
            <i className="bi bi-box-seam" />
          </div>

          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="profile-order-details">
        <div className="order-details-error">
          <div className="order-details-error-icon">
            <i className="bi bi-exclamation-circle" />
          </div>

          <h2>Unable to load order</h2>

          <p>
            Something went wrong while loading your order details. Please try
            again.
          </p>

          <button
            type="button"
            className="order-details-primary-btn"
            onClick={() => refetch()}
          >
            <i className="bi bi-arrow-clockwise" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="profile-order-details">
        <div className="order-details-error">
          <div className="order-details-error-icon">
            <i className="bi bi-box-seam" />
          </div>

          <h2>Order not found</h2>

          <p>We couldn't find the order you're looking for.</p>

          <NavLink
            to={ROUTE_URL.WEBSITE.PROFILE.EDIT}
            className="order-details-primary-btn"
          >
            <i className="bi bi-arrow-left" />
            Back to Orders
          </NavLink>
        </div>
      </div>
    );
  }

  const items = order.items ?? [];
  const subtotal = items.reduce(
    (total, item) => total + (item.unitPrice ?? 0) * (item.quantity ?? 0),
    0,
  );

  const totalAmount = order.totalAmount ?? 0;
  const discount = Math.max(0, subtotal - totalAmount);

  const isDelivered = order.orderStatus?.toLowerCase() === "delivered";
  const isCancelled =
    order.orderStatus?.toLowerCase() === "cancelled" ||
    order.orderStatus?.toLowerCase() === "canceled";

  const paymentStatus =
    order.paymentStatus?.toLowerCase() === "paid"
      ? "Paid"
      : order.paymentStatus || "Pending";

  return (
    <div className="order-details">
      <div className="order-details-topbar">
        <NavLink
          to={ROUTE_URL.WEBSITE.PROFILE.EDIT}
          className="order-details-back"
        >
          <i className="bi bi-arrow-left" />
          <span>Back to Orders</span>
        </NavLink>

        <div className="order-details-order-id">
          <span>Order ID</span>
          <strong>{order.orderCode || order.id}</strong>
        </div>
      </div>

      <section className="order-details-status-card">
        <div className="order-details-status-heading">
          <div>
            <span className="order-details-eyebrow">Order status</span>

            <h1>{getStatusLabel(order.orderStatus)}</h1>

            <p>Order placed on {formatDate(order.createdAt)}</p>
          </div>

          <div
            className={`order-details-status-badge ${getStatusClass(
              order.orderStatus,
            )}`}
          >
            <span />
            {getStatusLabel(order.orderStatus)}
          </div>
        </div>

        {!isCancelled && (
          <div className="order-details-timeline">
            <OrderTimelineStep
              title="Order placed"
              description={formatDate(order.createdAt)}
              active
              completed
            />

            <OrderTimelineStep
              title="Confirmed"
              description="Order confirmed"
              active={[
                "confirmed",
                "processing",
                "packed",
                "shipped",
                "out_for_delivery",
                "delivered",
              ].includes(order.orderStatus?.toLowerCase() || "")}
              completed={[
                "processing",
                "packed",
                "shipped",
                "out_for_delivery",
                "delivered",
              ].includes(order.orderStatus?.toLowerCase() || "")}
            />

            <OrderTimelineStep
              title="Shipped"
              description="Package on the way"
              active={["shipped", "out_for_delivery", "delivered"].includes(
                order.orderStatus?.toLowerCase() || "",
              )}
              completed={["out_for_delivery", "delivered"].includes(
                order.orderStatus?.toLowerCase() || "",
              )}
            />

            <OrderTimelineStep
              title="Delivered"
              description="Package delivered"
              active={isDelivered}
              completed={isDelivered}
            />
          </div>
        )}

        {isCancelled && (
          <div className="order-details-cancelled">
            <i className="bi bi-x-circle" />

            <div>
              <strong>Order cancelled</strong>
              <p>This order has been cancelled and will not be delivered.</p>
            </div>
          </div>
        )}
      </section>

      <div className="order-details-layout">
        <div className="order-details-main">
          <section className="order-details-card">
            <div className="order-details-card-header">
              <div>
                <h2>Items in your order</h2>
                <p>
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="order-details-items">
              {items.map((item, index) => {
                const itemTotal = (item.unitPrice ?? 0) * (item.quantity ?? 0);

                return (
                  <div
                    className="order-details-item"
                    key={`${item.productId}-${index}`}
                  >
                    <div className="order-details-item-image">
                      <i className="bi bi-box-seam" />
                    </div>

                    <div className="order-details-item-info">
                      <h3>{item.name || "Product"}</h3>

                      {item.description && <p>{item.description}</p>}

                      <div className="order-details-item-meta">
                        <span>Qty: {item.quantity ?? 0}</span>

                        <span>Price: {formatAmount(item.unitPrice)}</span>
                      </div>
                    </div>

                    <strong className="order-details-item-price">
                      {formatAmount(itemTotal)}
                    </strong>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="order-details-card">
            <div className="order-details-card-header">
              <div>
                <h2>Delivery address</h2>
                <p>Shipping information</p>
              </div>

              <i className="bi bi-geo-alt" />
            </div>

            <div className="order-details-address">
              <strong>{order?.deliveryAddress?.name || "Customer"}</strong>

              <p>
                {order.deliveryAddress?.addressLine1 || ""}
                {order.deliveryAddress?.addressLine2
                  ? `, ${order.deliveryAddress.addressLine2}`
                  : ""}
              </p>

              <p>
                {order.deliveryAddress?.city || ""}
                {order.deliveryAddress?.state
                  ? `, ${order.deliveryAddress.state}`
                  : ""}
                {order.deliveryAddress?.pincode
                  ? ` - ${order.deliveryAddress.pincode}`
                  : ""}
              </p>

              {order.deliveryAddress?.mobile && (
                <p className="order-details-address-phone">
                  <i className="bi bi-telephone" />
                  {order.deliveryAddress?.mobile}
                </p>
              )}
            </div>
          </section>

          <section className="order-details-card">
            <div className="order-details-card-header">
              <div>
                <h2>Payment information</h2>
                <p>Payment details for this order</p>
              </div>
            </div>

            <div className="order-details-payment">
              <div>
                <span>Payment method</span>

                <strong>
                  {order.paymentMethod === "online"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </strong>
              </div>

              <div>
                <span>Payment status</span>

                <strong
                  className={paymentStatus === "Paid" ? "success" : "pending"}
                >
                  {paymentStatus}
                </strong>
              </div>

              {order?.id && (
                <div>
                  <span>Payment ID</span>
                  <strong>{order?.id}</strong>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="order-details-sidebar">
          <section className="order-details-card order-details-summary">
            <div className="order-details-card-header">
              <div>
                <h2>Price details</h2>
              </div>
            </div>

            <div className="order-details-summary-row">
              <span>Item total</span>
              <strong>{formatAmount(subtotal)}</strong>
            </div>

            {discount > 0 && (
              <div className="order-details-summary-row discount">
                <span>Discount</span>
                <strong>-{formatAmount(discount)}</strong>
              </div>
            )}

            <div className="order-details-summary-row">
              <span>Delivery fee</span>
              <strong className="success">FREE</strong>
            </div>

            <div className="order-details-summary-divider" />

            <div className="order-details-summary-total">
              <span>Total Amount</span>
              <strong>{formatAmount(totalAmount)}</strong>
            </div>
          </section>

          <section className="order-details-card order-details-info">
            <h2>Order information</h2>

            <div>
              <span>Order ID</span>
              <strong>{order.orderCode || order.id}</strong>
            </div>

            <div>
              <span>Placed on</span>
              <strong>{formatDateTime(order.createdAt)}</strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>{paymentStatus}</strong>
            </div>
          </section>

          <div className="order-details-actions">
            {isDelivered && (
              <button type="button">
                <i className="bi bi-arrow-counterclockwise" />
                Return Order
              </button>
            )}

            {!isCancelled && !isDelivered && (
              <button type="button" className="danger">
                <i className="bi bi-x-circle" />
                Cancel Order
              </button>
            )}

            <button type="button">
              <i className="bi bi-headset" />
              Need Help?
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

interface OrderTimelineStepProps {
  title: string;
  description: string;
  active: boolean;
  completed: boolean;
}

const OrderTimelineStep = ({
  title,
  description,
  active,
  completed,
}: OrderTimelineStepProps) => {
  return (
    <div
      className={`order-details-timeline-step ${
        active ? "active" : ""
      } ${completed ? "completed" : ""}`}
    >
      <div className="order-details-timeline-dot">
        {completed && <i className="bi bi-check" />}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default OrderDetails;
