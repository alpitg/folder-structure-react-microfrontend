import OrderHeaderApp from "../header/order-header";

const OrderAddApp = () => {
  return (
    <div className="order-list-app">
      <OrderHeaderApp
        back={true}
        header="Order Details"
        description="Order Details page"
      ></OrderHeaderApp>

      <div className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework">
        <div className="w-100 flex-lg-row-auto w-lg-300px mb-7 me-7 me-lg-10">
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Order Details</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-10">
                <div className="fv-row">
                  <label className="form-label">Order ID</label>
                  <div className="fw-bold fs-3">#13860</div>
                </div>

                <div className="fv-row fv-plugins-icon-container">
                  <label className="required form-label">Payment Method</label>
                  <select className="form-select mb-2" name="payment_method">
                    <option value="">Select an option</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="visa">Credit Card (Visa)</option>
                    <option value="mastercard">Credit Card (Mastercard)</option>
                    <option value="paypal">Paypal</option>
                  </select>
                  <div className="text-muted fs-7">
                    Set the date of the order to process.
                  </div>
                  <div className="fv-plugins-message-container invalid-feedback" />
                </div>

                <div className="fv-row fv-plugins-icon-container">
                  <label className="required form-label">Shipping Method</label>
                  <select className="form-select mb-2" name="shipping_method">
                    <option value="">Select an option</option>
                    <option value="none">N/A - Virtual Product</option>
                    <option value="standard">Standard Rate</option>
                    <option value="express">Express Rate</option>
                    <option value="speed">Speed Overnight Rate</option>
                  </select>
                  <div className="text-muted fs-7">
                    Set the date of the order to process.
                  </div>
                  <div className="fv-plugins-message-container invalid-feedback" />
                </div>

                <div className="fv-row fv-plugins-icon-container">
                  <label className="required form-label">Order Date</label>
                  <input
                    name="order_date"
                    placeholder="Select a date"
                    type="hidden"
                  />
                  <input
                    className="form-control mb-2 form-control input"
                    placeholder="Select a date"
                    type="text"
                    readOnly
                  />
                  <div className="text-muted fs-7">
                    Set the date of the order to process.
                  </div>
                  <div className="fv-plugins-message-container invalid-feedback" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Select Products</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-10">
                <div>
                  <label className="form-label">
                    Add products to this order
                  </label>

                  <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 border border-dashed rounded pt-3 pb-1 px-2 mb-5 mh-300px overflow-scroll">
                    <span className="w-100 text-muted">
                      Select one or more products from the list below by ticking
                      the checkbox.
                    </span>
                  </div>

                  <div className="fw-bold fs-4">
                    Total Cost: $<span>0.00</span>
                  </div>
                </div>

                <div className="separator" />

                <div className="d-flex align-items-center position-relative mb-n7">
                  <i className="ki-duotone ki-magnifier fs-3 position-absolute ms-4">
                    <span className="path1" />
                    <span className="path2" />
                  </i>
                  <input
                    type="text"
                    className="form-control form-control-solid w-100 w-lg-50 ps-12"
                    placeholder="Search Products"
                  />
                </div>

                <div className="dt-container dt-bootstrap5 dt-empty-footer">
                  <div className="table-responsive">
                    <div className="dt-scroll">
                      <div
                        className="dt-scroll-body"
                        style={{
                          overflow: "auto",
                          maxHeight: 400,
                          position: "relative",
                        }}
                      >
                        <table
                          className="table align-middle table-row-dashed fs-6 gy-5 dataTable"
                          style={{ width: "100%" }}
                        >
                          <colgroup>
                            <col style={{ width: "29.89px" }} />
                            <col style={{ width: "442.203px" }} />
                            <col style={{ width: "278.906px" }} />
                          </colgroup>
                          <thead>
                            <tr
                              className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0"
                              role="row"
                            >
                              <th />
                              <th>Product</th>
                              <th className="text-end pe-5">Qty Remaining</th>
                            </tr>
                          </thead>
                          <tbody className="fw-semibold text-gray-600">
                            <tr>
                              <td>
                                <div className="form-check form-check-sm form-check-custom form-check-solid">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="1"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <a
                                    href="/sales/products"
                                    className="symbol symbol-50px"
                                  >
                                    <span className="symbol-label"></span>
                                  </a>

                                  <div className="ms-5">
                                    <a
                                      href="/sales/products"
                                      className="text-gray-800 text-hover-primary fs-5 fw-bold"
                                    >
                                      Product 1
                                    </a>

                                    <div className="fw-semibold fs-7">
                                      Price: $<span>172.00</span>
                                    </div>

                                    <div className="text-muted fs-7">
                                      SKU: 02981006
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                className="text-end pe-5 dt-type-numeric"
                                data-order="36"
                              >
                                <span className="fw-bold ms-3">36</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start dt-toolbar" />
                    <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end" />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    <label className="required form-label">
                      Address Line 1
                    </label>
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

          <div className="d-flex justify-content-end">
            <a
              href="/keen/demo1/apps/ecommerce/catalog/products.html"
              id="kt_ecommerce_edit_order_cancel"
              className="btn btn-light me-5"
            >
              Cancel
            </a>
            <button
              type="submit"
              id="kt_ecommerce_edit_order_submit"
              className="btn btn-primary"
            >
              <span className="indicator-label">Save Changes</span>
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAddApp;
