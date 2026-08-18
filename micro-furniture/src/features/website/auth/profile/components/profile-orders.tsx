// ============================================================
// COMPONENT
// ============================================================

const ProfileOrders = () => {
  // Replace this with your orders API later.
  const orders: unknown[] = [];

  return (
    <div className="profile-orders">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="profile-content-header">
        <div>
          <h2>My Orders</h2>

          <p>View and manage your recent orders.</p>
        </div>
      </div>

      {/* ==================================================
          ORDERS
      ================================================== */}

      {orders.length === 0 ? (
        <div className="profile-empty-state">
          <div className="profile-empty-icon">
            <i className="bi bi-bag" />
          </div>

          <h3>No orders yet</h3>

          <p>When you place an order, it will appear here.</p>

          <button type="button" className="profile-primary-btn">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="profile-orders-list">
          {/* Orders will be rendered here */}
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;
