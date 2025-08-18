import type { ICustomer } from "../../../interface/customer.model";
import { useFormContext } from "react-hook-form";

const CustomerAddressForm = () => {
  const { register } = useFormContext<ICustomer>();

  return (
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
                htmlFor="addressLine1"
                className="required fs-6 fw-semibold mb-2"
              >
                <i className="bi bi-geo-alt me-2"></i> Address Line 1
              </label>
              <input
                id="addressLine1"
                placeholder="Enter street address"
                {...register("shippingAddress.addressLine1")}
                className="form-control form-control-solid"
              />
            </div>

            {/* Address Line 2 */}
            <div className="d-flex flex-column mb-7">
              <label htmlFor="addressLine2" className="fs-6 fw-semibold mb-2">
                <i className="bi bi-geo me-2"></i> Address Line 2
              </label>
              <input
                id="addressLine2"
                placeholder="Apartment, suite, unit, etc. (optional)"
                {...register("shippingAddress.addressLine2")}
                className="form-control form-control-solid"
              />
            </div>

            {/* Town */}
            <div className="d-flex flex-column mb-7">
              <label htmlFor="city" className="required fs-6 fw-semibold mb-2">
                <i className="bi bi-building me-2"></i> Town
              </label>
              <input
                id="city"
                placeholder="Enter town or city"
                {...register("shippingAddress.city")}
                className="form-control form-control-solid"
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
                  placeholder="Enter state or province"
                  {...register("shippingAddress.state")}
                  className="form-control form-control-solid"
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
                  placeholder="Enter postal code"
                  {...register("shippingAddress.postcode")}
                  className="form-control form-control-solid"
                />
              </div>
            </div>

            {/* Country */}
            <div className="d-flex flex-column mb-7">
              <label htmlFor="country" className="fs-6 fw-semibold mb-2">
                <i className="bi bi-flag me-2"></i>
                <span className="required">Country</span>
              </label>
              <select
                id="country"
                {...register("shippingAddress.country")}
                className="form-select form-select-solid fw-bold"
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
                    <i className="bi bi-credit-card me-2"></i> Use as billing
                    address?
                  </label>
                </div>
                <label className="form-check form-switch form-check-custom form-check-solid">
                  <input
                    id="billing"
                    type="checkbox"
                    {...register("billingAddress.isDefault")}
                    className="form-check-input"
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
  );
};

export default CustomerAddressForm;
