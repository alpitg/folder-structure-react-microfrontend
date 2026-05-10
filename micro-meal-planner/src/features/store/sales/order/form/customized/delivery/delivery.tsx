const DeliveryApp = () => {
  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Delivery Details</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <div className="d-flex flex-column gap-5 gap-md-7">
          <div className="fs-3 fw-bold mb-n2">Billing Address</div>

          <div className="d-flex flex-column flex-md-row gap-5">
            <div className="fv-row flex-row-fluid fv-plugins-icon-container">
              <label className="required form-label">Address Line 1</label>
              <input
                className="form-control"
                name="billing_order_address_1"
                placeholder="Address Line 1"
                defaultValue=""
              />
              <div className="fv-plugins-message-container invalid-feedback" />
            </div>

            <div className="flex-row-fluid">
              <label className="form-label">Address Line 2</label>
              <input
                className="form-control"
                name="billing_order_address_2"
                placeholder="Address Line 2"
                defaultValue=""
              />
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row gap-5">
            <div className="flex-row-fluid">
              <label className="form-label">City</label>
              <input
                className="form-control"
                name="billing_order_city"
                defaultValue=""
              />
            </div>

            <div className="fv-row flex-row-fluid fv-plugins-icon-container">
              <label className="required form-label">Postcode</label>
              <input
                className="form-control"
                name="billing_order_postcode"
                defaultValue=""
              />
              <div className="fv-plugins-message-container invalid-feedback" />
            </div>

            <div className="fv-row flex-row-fluid fv-plugins-icon-container">
              <label className="required form-label">State</label>
              <input
                className="form-control"
                name="billing_order_state"
                defaultValue=""
              />
              <div className="fv-plugins-message-container invalid-feedback" />
            </div>
          </div>

          <div className="fv-row fv-plugins-icon-container">
            <label className="required form-label">Country</label>
            <select
              className="form-select"
              id="kt_ecommerce_edit_order_billing_country"
              name="billing_order_country"
              defaultValue=""
            >
              <option value="">Select an option</option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Aland Islands</option>
            </select>
            <div className="fv-plugins-message-container invalid-feedback" />
          </div>

          <div className="form-check form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              id="same_as_billing"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="same_as_billing">
              Shipping address is the same as billing address
            </label>
          </div>

          <div className="separator" />

          <div
            className="d-flex flex-column gap-5 gap-md-7"
            id="kt_ecommerce_edit_order_shipping_form"
          >
            <div className="fs-3 fw-bold mb-n2">Shipping Address</div>

            <div className="d-flex flex-column flex-md-row gap-5">
              <div className="fv-row flex-row-fluid">
                <label className="form-label">Address Line 1</label>
                <input
                  className="form-control"
                  name="kt_ecommerce_edit_order_address_1"
                  placeholder="Address Line 1"
                  defaultValue=""
                />
              </div>
              <div className="flex-row-fluid">
                <label className="form-label">Address Line 2</label>
                <input
                  className="form-control"
                  name="kt_ecommerce_edit_order_address_2"
                  placeholder="Address Line 2"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row gap-5">
              <div className="flex-row-fluid">
                <label className="form-label">City</label>
                <input
                  className="form-control"
                  name="kt_ecommerce_edit_order_city"
                  defaultValue=""
                />
              </div>

              <div className="fv-row flex-row-fluid">
                <label className="form-label">Postcode</label>
                <input
                  className="form-control"
                  name="kt_ecommerce_edit_order_postcode"
                  defaultValue=""
                />
              </div>

              <div className="fv-row flex-row-fluid">
                <label className="form-label">State</label>
                <input
                  className="form-control"
                  name="kt_ecommerce_edit_order_state"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="fv-row">
              <label className="form-label">Country</label>
              <select
                className="form-select"
                id="kt_ecommerce_edit_order_shipping_country"
                defaultValue=""
              >
                <option value="">Select an option</option>
                <option value="AF">Afghanistan</option>
                <option value="AX">Aland Islands</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryApp;
