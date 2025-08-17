import { NavLink, useParams } from "react-router";

import CustomerHeaderApp from "../../header/customer-header";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";

type CustomerFormAppProps = {
  mode: "add" | "edit";
};

const CustomerAddFormApp = ({ mode }: CustomerFormAppProps) => {
  const isEditMode = mode === "edit";
  const { id } = useParams<{ id?: string }>();

  return (
    <div className="customer-form-app">
      <CustomerHeaderApp
        header={isEditMode ? "Edit Customer" : "Add Customer"}
        description={
          isEditMode
            ? "Update existing customer details."
            : "Create a new customer."
        }
      >
        <NavLink to={ROUTE_URL.CUSTOMER.LIST}>
          <span className="btn btn-light btn-active-secondary btn-sm me-5">
            <i className="bi bi-chevron-left fs-5"></i>
            Back to Customer List
          </span>
        </NavLink>

        {/* <button
          type="submit"
          className="btn btn-sm btn-flex btn-primary"
          disabled={isaddCustomerLoading || isUpdateCustomerLoading}
        >
          {isaddCustomerLoading || isUpdateCustomerLoading ? (
            <span className="spinner-border spinner-border-sm align-middle me-2"></span>
          ) : (
            <i className="bi bi-check2 fs-3"></i>
          )}
          Save changes
        </button> */}
      </CustomerHeaderApp>

      <div className="form d-flex flex-column flex-xl-row">
        <div className="flex-column flex-lg-row-auto w-100 w-xl-350px mb-5">
          <div className="card mb-5 mb-xl-8">
            <div className="card-body pt-15">
              {/* Name */}
              <div className="fv-row mb-7">
                <label
                  htmlFor="name"
                  className="required fs-6 fw-semibold mb-2"
                >
                  <i className="bi bi-person me-2"></i> Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control form-control-solid"
                  name="name"
                  defaultValue="Sean Bean"
                />
              </div>

              {/* Email */}
              <div className="fv-row mb-7">
                <label htmlFor="email" className="fs-6 fw-semibold mb-2">
                  <i className="bi bi-envelope me-2"></i>
                  <span className="required">Email</span>
                  <span
                    className="ms-1"
                    data-bs-toggle="tooltip"
                    aria-label="Email address must be active"
                    data-bs-original-title="Email address must be active"
                  >
                    <i className="ki-duotone ki-information fs-7">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-solid"
                  name="email"
                  defaultValue="sean@dellito.com"
                />
              </div>

              {/* Description */}
              <div className="fv-row mb-15">
                <label htmlFor="description" className="fs-6 fw-semibold mb-2">
                  <i className="bi bi-card-text me-2"></i> Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control form-control-solid"
                  name="description"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="flex-lg-row-fluid ms-lg-10">
          <div className="card mb-5 mb-xl-8">
            <div className="card-body pt-15">
              <div id="kt_modal_add_customer_scroll" className="me-n7 pe-7">
                <a
                  className="fw-bold fs-3 rotate collapsible mb-7"
                  data-bs-toggle="collapse"
                  href="#kt_modal_add_customer_billing_info"
                  role="button"
                  aria-expanded="false"
                  aria-controls="kt_modal_add_customer_billing_info"
                >
                  <i className="bi bi-truck me-2"></i> Shipping Information
                  <span className="ms-2 rotate-180">
                    <i className="ki-duotone ki-down fs-3"></i>
                  </span>
                </a>

                <div
                  id="kt_modal_add_customer_billing_info"
                  className="collapse show"
                >
                  {/* Address Line 1 */}
                  <div className="d-flex flex-column mb-7">
                    <label
                      htmlFor="address1"
                      className="required fs-6 fw-semibold mb-2"
                    >
                      <i className="bi bi-geo-alt me-2"></i> Address Line 1
                    </label>
                    <input
                      id="address1"
                      className="form-control form-control-solid"
                      name="address1"
                      defaultValue="101, Collins Street"
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="d-flex flex-column mb-7">
                    <label htmlFor="address2" className="fs-6 fw-semibold mb-2">
                      <i className="bi bi-geo me-2"></i> Address Line 2
                    </label>
                    <input
                      id="address2"
                      className="form-control form-control-solid"
                      name="address2"
                    />
                  </div>

                  {/* Town */}
                  <div className="d-flex flex-column mb-7">
                    <label
                      htmlFor="city"
                      className="required fs-6 fw-semibold mb-2"
                    >
                      <i className="bi bi-building me-2"></i> Town
                    </label>
                    <input
                      id="city"
                      className="form-control form-control-solid"
                      name="city"
                      defaultValue="Melbourne"
                    />
                  </div>

                  {/* State & Postcode */}
                  <div className="row g-9 mb-7">
                    <div className="col-md-6">
                      <label
                        htmlFor="state"
                        className="required fs-6 fw-semibold mb-2"
                      >
                        <i className="bi bi-map me-2"></i> State / Province
                      </label>
                      <input
                        id="state"
                        className="form-control form-control-solid"
                        name="state"
                        defaultValue="Victoria"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="postcode"
                        className="required fs-6 fw-semibold mb-2"
                      >
                        <i className="bi bi-mailbox me-2"></i> Post Code
                      </label>
                      <input
                        id="postcode"
                        className="form-control form-control-solid"
                        name="postcode"
                        defaultValue="3000"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="d-flex flex-column mb-7">
                    <label htmlFor="country" className="fs-6 fw-semibold mb-2">
                      <i className="bi bi-flag me-2"></i>
                      <span className="required">Country</span>
                      <span
                        className="ms-1"
                        data-bs-toggle="tooltip"
                        aria-label="Country of origination"
                        data-bs-original-title="Country of origination"
                      >
                        <i className="ki-duotone ki-information fs-7">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </i>
                      </span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="form-select form-select-solid fw-bold"
                      defaultValue="US"
                    >
                      <option value="">Select a Country...</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AX">Aland Islands</option>
                      <option value="US">United States</option>
                    </select>
                  </div>

                  {/* Billing Address Toggle */}
                  <div className="fv-row mb-7">
                    <div className="d-flex flex-stack">
                      <div className="me-5">
                        <label className="fs-6 fw-semibold">
                          <i className="bi bi-credit-card me-2"></i> Use as a
                          billing address?
                        </label>
                        <div className="fs-7 fw-semibold text-muted">
                          If you need more info, please check budget planning
                        </div>
                      </div>
                      <label className="form-check form-switch form-check-custom form-check-solid">
                        <input
                          id="billing"
                          className="form-check-input"
                          name="billing"
                          type="checkbox"
                          value="1"
                          defaultChecked
                        />
                        <span className="form-check-label fw-semibold text-muted">
                          Yes
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAddFormApp;
