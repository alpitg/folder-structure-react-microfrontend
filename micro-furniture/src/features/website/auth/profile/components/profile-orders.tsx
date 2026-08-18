import { useState } from "react";

import {
  useGetWebsiteOrdersQuery,
  type WebsiteOrder,
} from "../../../../../app/redux/website/order/website-order.api";

// ============================================================
// COMPONENT
// ============================================================

const ProfileOrders = () => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [page, setPage] = useState(1);

  const limit = 10;

  // ==========================================================
  // API
  // ==========================================================

  const { data, isLoading, isFetching, isError, refetch } =
    useGetWebsiteOrdersQuery({
      page,
      limit,
    });

  const orders = data?.orders ?? [];

  const pagination = data?.pagination;

  // ==========================================================
  // HELPERS
  // ==========================================================

  const getOrderStatusLabel = (status?: string) => {
    if (!status) {
      return "Order placed";
    }

    switch (status.toLowerCase()) {
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
        return status.replace(/_/g, " ");
    }
  };

  const getOrderStatusClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "delivered";

      case "cancelled":
      case "canceled":
      case "returned":
        return "cancelled";

      case "shipped":
      case "out_for_delivery":
        return "shipped";

      default:
        return "active";
    }
  };

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

  const formatAmount = (amount?: number) => {
    return `₹${(amount ?? 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading) {
    return (
      <div className="profile-orders">
        <div className="profile-content-header">
          <div>
            <h2>My Orders</h2>

            <p>View and manage your recent orders.</p>
          </div>
        </div>

        <div className="profile-orders-loading">
          <div className="profile-orders-loader">
            <i className="bi bi-box-seam" />
          </div>

          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isError) {
    return (
      <div className="profile-orders">
        <div className="profile-content-header">
          <div>
            <h2>My Orders</h2>

            <p>View and manage your recent orders.</p>
          </div>
        </div>

        <div className="profile-empty-state">
          <div className="profile-empty-icon">
            <i className="bi bi-exclamation-circle" />
          </div>

          <h3>Unable to load orders</h3>

          <p>
            Something went wrong while loading your orders. Please try again.
          </p>

          <button
            type="button"
            className="profile-primary-btn"
            onClick={() => refetch()}
          >
            <i className="bi bi-arrow-clockwise" />

            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (orders.length === 0) {
    return (
      <div className="profile-orders">
        <div className="profile-content-header">
          <div>
            <h2>My Orders</h2>

            <p>View and manage your recent orders.</p>
          </div>
        </div>

        <div className="profile-empty-state">
          <div className="profile-empty-icon">
            <i className="bi bi-bag" />
          </div>

          <h3>No orders yet</h3>

          <p>When you place an order, it will appear here.</p>

          <button type="button" className="profile-primary-btn">
            <span>Start Shopping</span>

            <i className="bi bi-arrow-right" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="profile-orders">
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="profile-content-header">
        <div>
          <h2>My Orders</h2>

          <p>View and manage your recent orders.</p>
        </div>

        {isFetching && (
          <div className="profile-orders-fetching">
            <i className="bi bi-box-seam profile-orders-spin" />

            <span>Updating...</span>
          </div>
        )}
      </div>

      {/* ====================================================
          ORDER LIST
      ==================================================== */}

      <div className="profile-orders-list">
        {orders.map((order) => (
          <ProfileOrderCard
            key={order?.id}
            order={order}
            getOrderStatusLabel={getOrderStatusLabel}
            getOrderStatusClass={getOrderStatusClass}
            formatDate={formatDate}
            formatAmount={formatAmount}
          />
        ))}
      </div>

      {/* ====================================================
          PAGINATION
      ==================================================== */}

      {pagination && pagination.pages > 1 && (
        <div className="profile-orders-pagination">
          <button
            type="button"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((previous) => previous - 1)}
          >
            <i className="bi bi-chevron-left" />

            <span>Previous</span>
          </button>

          <span>
            Page <strong>{pagination.page}</strong> of{" "}
            <strong>{pagination.pages}</strong>
          </span>

          <button
            type="button"
            disabled={page >= pagination.pages || isFetching}
            onClick={() => setPage((previous) => previous + 1)}
          >
            <span>Next</span>

            <i className="bi bi-chevron-right" />
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================
// ORDER CARD
// ============================================================

interface ProfileOrderCardProps {
  order: WebsiteOrder;

  getOrderStatusLabel: (status?: string) => string;

  getOrderStatusClass: (status?: string) => string;

  formatDate: (date?: string) => string;

  formatAmount: (amount?: number) => string;
}

const ProfileOrderCard = ({
  order,
  getOrderStatusLabel,
  getOrderStatusClass,
  formatDate,
  formatAmount,
}: ProfileOrderCardProps) => {
  const items = order.items ?? [];

  return (
    <article className="profile-order-card">
      {/* ====================================================
          ORDER HEADER
      ==================================================== */}

      <div className="profile-order-header">
        <div className="profile-order-header-left">
          <div>
            <span>Order ID</span>

            <strong>{order?.orderCode || order?.id}</strong>
          </div>

          <div>
            <span>Placed on</span>

            <strong>{formatDate(order.createdAt)}</strong>
          </div>
        </div>

        <div
          className={`profile-order-status ${getOrderStatusClass(
            order.orderStatus,
          )}`}
        >
          <span />

          {getOrderStatusLabel(order.orderStatus)}
        </div>
      </div>

      {/* ====================================================
          ITEMS
      ==================================================== */}

      <div className="profile-order-items">
        {items.map((item, index) => (
          <div
            className="profile-order-item"
            key={`${item.productId}-${index}`}
          >
            <div className="profile-order-item-image">
              <i className="bi bi-box-seam" />
            </div>

            <div className="profile-order-item-content">
              <h3>{item.name || "Product"}</h3>

              {item.description && <p>{item.description}</p>}

              <div className="profile-order-item-meta">
                <span>Qty: {item.quantity}</span>

                {item.unitPrice !== undefined && (
                  <span>{formatAmount(item.unitPrice)}</span>
                )}
              </div>
            </div>

            <div className="profile-order-item-total">
              {item.unitPrice !== undefined && (
                <strong>{formatAmount(item.unitPrice * item.quantity)}</strong>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================
          FOOTER
      ==================================================== */}

      <div className="profile-order-footer">
        <div className="profile-order-payment">
          <span>Payment</span>

          <strong>
            {order.paymentStatus === "paid"
              ? "Paid"
              : order.paymentStatus || "Pending"}
          </strong>
        </div>

        <div className="profile-order-total">
          <span>Total</span>

          <strong>{formatAmount(order.totalAmount)}</strong>
        </div>

        <button type="button" className="profile-order-view-btn">
          <span>View Details</span>

          <i className="bi bi-chevron-right" />
        </button>
      </div>
    </article>
  );
};

export default ProfileOrders;
