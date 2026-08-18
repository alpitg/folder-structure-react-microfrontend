// ============================================================
// TYPES
// ============================================================

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: "Home" | "Work" | "Other";
}

// ============================================================
// COMPONENT
// ============================================================

const ProfileAddresses = () => {
  // Replace with API data later.
  const addresses: Address[] = [];

  return (
    <div className="profile-addresses">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="profile-content-header">
        <div>
          <h2>Saved Addresses</h2>

          <p>Manage your delivery addresses.</p>
        </div>

        <button type="button" className="profile-primary-btn">
          <i className="bi bi-plus" />
          Add New Address
        </button>
      </div>

      {/* ==================================================
          ADDRESS LIST
      ================================================== */}

      {addresses.length === 0 ? (
        <div className="profile-empty-state">
          <div className="profile-empty-icon">
            <i className="bi bi-geo-alt" />
          </div>

          <h3>No saved addresses</h3>

          <p>Add an address for faster checkout.</p>

          <button type="button" className="profile-primary-btn">
            <i className="bi bi-plus" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="profile-address-list">
          {addresses.map((address) => (
            <div key={address.id} className="profile-address-card">
              <div className="profile-address-top">
                <div>
                  <span className="profile-address-type">{address.type}</span>

                  <h3>{address.name}</h3>
                </div>

                <button type="button" className="profile-address-menu">
                  <i className="bi bi-three-dots-vertical" />
                </button>
              </div>

              <p>{address.address}</p>

              <p>
                {address.city}, {address.state} - {address.pincode}
              </p>

              <strong>Mobile: {address.phone}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileAddresses;
