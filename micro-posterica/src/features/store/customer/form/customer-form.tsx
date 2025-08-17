import { NavLink, useParams } from "react-router";

import CustomerHeaderApp from "../header/customer-header";
import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";

type CustomerFormAppProps = {
  mode: "add" | "edit";
};

const CustomerFormApp = ({ mode }: CustomerFormAppProps) => {
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

      <div className="form d-flex flex-column flex-lg-row">
        <div className="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
          <div className="card mb-5 mb-xl-8">
            <div className="card-body pt-15">
              {/* Summary */}
              <div className="d-flex flex-center flex-column mb-5">
                {/* Avatar */}
                <div className="symbol symbol-150px symbol-circle mb-7">
                  <img
                    src="/keen/demo1/assets/media/avatars/300-1.jpg"
                    alt="Avatar of Max Smith"
                  />
                </div>

                {/* Name */}
                <a
                  href="#"
                  className="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
                >
                  Max Smith
                </a>

                {/* Email */}
                <a
                  href="#"
                  className="fs-5 fw-semibold text-muted text-hover-primary mb-6"
                >
                  max@kt.com
                </a>
              </div>

              {/* Details Toggle */}
              <div className="d-flex flex-stack fs-4 py-3">
                <div className="fw-bold">Details</div>

                {/* Badge */}
                <div className="badge badge-light-info d-inline">
                  Premium user
                </div>
              </div>

              <div className="separator separator-dashed my-3"></div>

              {/* Details Content */}
              <div className="pb-5 fs-6">
                {/* Account ID */}
                <div className="fw-bold mt-5">Account ID</div>
                <div className="text-gray-600">ID-45453423</div>

                {/* Billing Email */}
                <div className="fw-bold mt-5">Billing Email</div>
                <div className="text-gray-600">
                  <a href="#" className="text-gray-600 text-hover-primary">
                    info@keenthemes.com
                  </a>
                </div>

                {/* Delivery Address */}
                <div className="fw-bold mt-5">Delivery Address</div>
                <div className="text-gray-600">
                  101 Collin Street, <br />
                  Melbourne 3000 VIC
                  <br />
                  Australia
                </div>

                {/* Language */}
                <div className="fw-bold mt-5">Language</div>
                <div className="text-gray-600">English</div>

                {/* Latest Transaction */}
                <div className="fw-bold mt-5">Latest Transaction</div>
                <div className="text-gray-600">
                  <a
                    href="/keen/demo1/apps/ecommerce/sales/details.html"
                    className="text-gray-600 text-hover-primary"
                  >
                    #14534
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-lg-row-fluid ms-lg-15">
          <ul
            className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                className="nav-link text-active-primary pb-4 active"
                data-bs-toggle="tab"
                href="#kt_ecommerce_customer_overview"
                aria-selected="true"
                role="tab"
              >
                Overview
              </a>
            </li>

            <li className="nav-item" role="presentation">
              <a
                className="nav-link text-active-primary pb-4"
                data-bs-toggle="tab"
                href="#kt_ecommerce_customer_general"
                aria-selected="false"
                role="tab"
                tabIndex={-1}
              >
                General Settings
              </a>
            </li>

            {/* <li className="nav-item" role="presentation">
              <a
                className="nav-link text-active-primary pb-4"
                data-bs-toggle="tab"
                href="#kt_ecommerce_customer_advanced"
                aria-selected="false"
                role="tab"
                tabIndex={-1}
              >
                Advanced Settings
              </a>
            </li> */}
          </ul>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade active show"
              id="kt_ecommerce_customer_overview"
              role="tabpanel"
            >
              <div className="row row-cols-1 row-cols-md-2 mb-6 mb-xl-9">
                <div className="col">
                  <div className="card pt-4 h-md-100 mb-6 mb-md-0">
                    <div className="card-header border-0">
                      <div className="card-title">
                        <h2 className="fw-bold">Reward Points</h2>
                      </div>
                    </div>

                    <div className="card-body pt-0">
                      <div className="fw-bold fs-2">
                        <div className="d-flex">
                          <i className="ki-duotone ki-heart text-info fs-2x">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <div className="ms-2">
                            4,571{" "}
                            <span className="text-muted fs-4 fw-semibold">
                              Points earned
                            </span>
                          </div>
                        </div>
                        <div className="fs-7 fw-normal text-muted">
                          Earn reward points with every purchase.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <a href="#" className="card bg-info hoverable h-md-100">
                    <div className="card-body">
                      <i className="ki-duotone ki-award text-white fs-3x ms-n1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                      <div className="text-white fw-bold fs-2 mt-5">
                        Premium Member
                      </div>
                      <div className="fw-semibold text-white">
                        Tier Milestone Reached
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="card pt-4 mb-6 mb-xl-9">
                <div className="card-header border-0">
                  <div className="card-title">
                    <h2>Transaction History</h2>
                  </div>
                </div>

                <div className="card-body pt-0 pb-5">
                  <div
                    id="kt_table_customers_payment_wrapper"
                    className="dt-container dt-bootstrap5 dt-empty-footer"
                  >
                    <div className="table-responsive">
                      <table
                        className="table align-middle table-row-dashed gy-5 dataTable"
                        id="kt_table_customers_payment"
                        style={{ width: "100%" }}
                      >
                        <thead className="border-bottom border-gray-200 fs-7 fw-bold">
                          <tr
                            className="text-start text-muted text-uppercase gs-0"
                            role="row"
                          >
                            <th
                              className="min-w-100px dt-orderable-asc dt-orderable-desc"
                              data-dt-column="0"
                              rowSpan={1}
                              colSpan={1}
                            >
                              <span className="dt-column-title" role="button">
                                order No.
                              </span>
                              <span className="dt-column-order"></span>
                            </th>
                            <th
                              data-dt-column="1"
                              rowSpan={1}
                              colSpan={1}
                              className="dt-orderable-asc dt-orderable-desc"
                            >
                              <span className="dt-column-title" role="button">
                                Status
                              </span>
                              <span className="dt-column-order"></span>
                            </th>
                            <th
                              data-dt-column="2"
                              rowSpan={1}
                              colSpan={1}
                              className="dt-type-numeric dt-orderable-asc dt-orderable-desc"
                            >
                              <span className="dt-column-title" role="button">
                                Amount
                              </span>
                              <span className="dt-column-order"></span>
                            </th>
                            <th
                              className="min-w-100px dt-orderable-asc dt-orderable-desc"
                              data-dt-column="3"
                              rowSpan={1}
                              colSpan={1}
                            >
                              <span className="dt-column-title" role="button">
                                Rewards
                              </span>
                              <span className="dt-column-order"></span>
                            </th>
                            <th
                              className="min-w-100px dt-orderable-none"
                              data-dt-column="4"
                              rowSpan={1}
                              colSpan={1}
                            >
                              <span className="dt-column-title">Date</span>
                              <span className="dt-column-order"></span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="fs-6 fw-semibold text-gray-600">
                          <tr>
                            <td>
                              <a
                                href="/keen/demo1/apps/ecommerce/sales/details.html"
                                className="text-gray-600 text-hover-primary mb-1"
                              >
                                #15466
                              </a>
                            </td>
                            <td>
                              <span className="badge badge-light-success">
                                Successful
                              </span>
                            </td>
                            <td className="dt-type-numeric">$1,200.00</td>
                            <td data-order="2025-08-12T00:00:00+05:30">120</td>
                            <td>14 Dec 2020, 8:43 pm</td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                href="/keen/demo1/apps/ecommerce/sales/details.html"
                                className="text-gray-600 text-hover-primary mb-1"
                              >
                                #15337
                              </a>
                            </td>
                            <td>
                              <span className="badge badge-light-success">
                                Successful
                              </span>
                            </td>
                            <td className="dt-type-numeric">$79.00</td>
                            <td data-order="2025-08-07T00:00:00+05:30">7</td>
                            <td>01 Dec 2020, 10:12 am</td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                href="/keen/demo1/apps/ecommerce/sales/details.html"
                                className="text-gray-600 text-hover-primary mb-1"
                              >
                                #14664
                              </a>
                            </td>
                            <td>
                              <span className="badge badge-light-success">
                                Successful
                              </span>
                            </td>
                            <td className="dt-type-numeric">$5,500.00</td>
                            <td data-order="Invalid date">550</td>
                            <td>12 Nov 2020, 2:01 pm</td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                href="/keen/demo1/apps/ecommerce/sales/details.html"
                                className="text-gray-600 text-hover-primary mb-1"
                              >
                                #14405
                              </a>
                            </td>
                            <td>
                              <span className="badge badge-light-warning">
                                Pending
                              </span>
                            </td>
                            <td className="dt-type-numeric">$880.00</td>
                            <td data-order="Invalid date">88</td>
                            <td>21 Oct 2020, 5:54 pm</td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                href="/keen/demo1/apps/ecommerce/sales/details.html"
                                className="text-gray-600 text-hover-primary mb-1"
                              >
                                #14303
                              </a>
                            </td>
                            <td>
                              <span className="badge badge-light-success">
                                Successful
                              </span>
                            </td>
                            <td className="dt-type-numeric">$7,650.00</td>
                            <td data-order="Invalid date">765</td>
                            <td>19 Oct 2020, 7:32 am</td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </table>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start dt-toolbar"></div>
                      <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                        <div className="dt-paging paging_simple_numbers">
                          <nav>
                            <ul className="pagination">
                              <li className="dt-paging-button page-item disabled">
                                <button
                                  className="page-link previous"
                                  role="link"
                                  type="button"
                                  aria-controls="kt_table_customers_payment"
                                  aria-disabled="true"
                                  aria-label="Previous"
                                  data-dt-idx="previous"
                                  tabIndex={-1}
                                >
                                  <i className="previous" />
                                </button>
                              </li>
                              <li className="dt-paging-button page-item active">
                                <button
                                  className="page-link"
                                  role="link"
                                  type="button"
                                  aria-controls="kt_table_customers_payment"
                                  aria-current="page"
                                  data-dt-idx="0"
                                >
                                  1
                                </button>
                              </li>
                              <li className="dt-paging-button page-item">
                                <button
                                  className="page-link"
                                  role="link"
                                  type="button"
                                  aria-controls="kt_table_customers_payment"
                                  data-dt-idx="1"
                                >
                                  2
                                </button>
                              </li>
                              <li className="dt-paging-button page-item">
                                <button
                                  className="page-link next"
                                  role="link"
                                  type="button"
                                  aria-controls="kt_table_customers_payment"
                                  aria-label="Next"
                                  data-dt-idx="next"
                                >
                                  <i className="next" />
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade active"
              id="kt_ecommerce_customer_general"
              role="tabpanel"
            >
              <div className="card pt-4 mb-6 mb-xl-9">
                <div className="card-header border-0">
                  <div className="card-title">
                    <h2>Profile</h2>
                  </div>
                </div>

                <div className="card-body pt-0 pb-5">
                  <form
                    className="form fv-plugins-bootstrap5 fv-plugins-framework"
                    action="#"
                    id="kt_ecommerce_customer_profile"
                  >
                    <div className="mb-7">
                      <label className="fs-6 fw-semibold mb-2">
                        <span>Update Avatar</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Allowed file types: png, jpg, jpeg."
                          data-bs-original-title="Allowed file types: png, jpg, jpeg."
                        >
                          <i className="ki-duotone ki-information fs-7">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </span>
                      </label>

                      <div className="mt-1">
                        <style>{`
                .image-input-placeholder {
                  background-image: url('/keen/demo1/assets/media/svg/files/blank-image.svg');
                }
                [data-bs-theme="dark"] .image-input-placeholder {
                  background-image: url('/keen/demo1/assets/media/svg/files/blank-image-dark.svg');
                }
              `}</style>

                        <div
                          className="image-input image-input-outline image-input-placeholder"
                          data-kt-image-input="true"
                        >
                          <div
                            className="image-input-wrapper w-125px h-125px"
                            style={{
                              backgroundImage:
                                "url(/keen/demo1/assets/media/avatars/300-1.jpg)",
                            }}
                          ></div>

                          <label
                            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            data-kt-image-input-action="change"
                            data-bs-toggle="tooltip"
                            aria-label="Change avatar"
                            data-bs-original-title="Change avatar"
                          >
                            <i className="ki-duotone ki-pencil fs-7">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            <input
                              type="file"
                              name="avatar"
                              accept=".png, .jpg, .jpeg"
                            />
                            <input type="hidden" name="avatar_remove" />
                          </label>

                          <span
                            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            data-kt-image-input-action="cancel"
                            data-bs-toggle="tooltip"
                            aria-label="Cancel avatar"
                            data-bs-original-title="Cancel avatar"
                          >
                            <i className="ki-duotone ki-cross fs-2">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </span>

                          <span
                            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            data-kt-image-input-action="remove"
                            data-bs-toggle="tooltip"
                            aria-label="Remove avatar"
                            data-bs-original-title="Remove avatar"
                          >
                            <i className="ki-duotone ki-cross fs-2">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="fv-row mb-7 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                      <label className="fs-6 fw-semibold mb-2 required">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder=""
                        name="name"
                        defaultValue="Max Smith"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2">
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-6 fw-semibold mb-2">
                            <span className="required">General Email</span>
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
                            className="form-control form-control-solid"
                            placeholder=""
                            name="gen_email"
                            defaultValue="max@kt.com"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="col">
                        <div className="fv-row mb-7">
                          <label className="fs-6 fw-semibold mb-2">
                            <span>Billing Email</span>
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
                            className="form-control form-control-solid"
                            placeholder=""
                            name="bill_email"
                            defaultValue="info@keenthemes.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        id="kt_ecommerce_customer_profile_submit"
                        className="btn btn-light-primary"
                      >
                        <span className="indicator-label">Save</span>
                        <span className="indicator-progress">
                          Please wait...
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card pt-4 mb-6 mb-xl-9">
                <div className="card-header border-0">
                  <div className="card-title">
                    <h2>Address Book</h2>
                  </div>
                  <div className="card-toolbar">
                    <a
                      href="#"
                      className="btn btn-sm btn-flex btn-light-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_add_address"
                    >
                      <i className="ki-duotone ki-plus-square fs-3">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                      Add new address
                    </a>
                  </div>
                </div>

                <div
                  id="kt_ecommerce_customer_addresses"
                  className="card-body pt-0 pb-5"
                >
                  <div
                    className="accordion accordion-icon-toggle"
                    id="kt_ecommerce_customer_addresses_accordion"
                  >
                    {/* Address 1 */}
                    <div className="py-0">
                      <div className="py-3 d-flex flex-stack flex-wrap">
                        <a
                          className="accordion-header d-flex align-items-center collapsible collapsed rotate"
                          data-bs-toggle="collapse"
                          href="#kt_ecommerce_customer_addresses_1"
                          role="button"
                          aria-expanded="false"
                          aria-controls="kt_customer_view_payment_method_1"
                        >
                          <div className="accordion-icon me-3">
                            <i className="bi bi-chevron-right fs-4"></i>
                          </div>
                          <div className="me-3">
                            <div className="d-flex align-items-center">
                              <div className="fs-4 fw-bold">Home</div>
                              <div className="badge badge-light-primary ms-5">
                                Default Address
                              </div>
                            </div>
                            <div className="text-muted">101 Collin Street</div>
                          </div>
                        </a>

                        <div className="d-flex my-3 ms-9">
                          {/* Edit */}
                          <a
                            href="#"
                            className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                            data-bs-toggle="modal"
                            data-bs-target="#kt_modal_update_address"
                          >
                            <i className="bi bi-pencil fs-5"></i>
                          </a>

                          {/* Delete */}
                          <a
                            href="#"
                            className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                            data-bs-toggle="tooltip"
                            data-kt-customer-payment-method="delete"
                            aria-label="Delete"
                            data-bs-original-title="Delete"
                          >
                            <i className="bi bi-trash fs-5"></i>
                          </a>

                          {/* More Options */}
                          <div className="dropdown">
                            <a
                              href="#"
                              className="btn btn-icon btn-active-light-primary w-30px h-30px"
                              role="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bi bi-gear fs-5"></i>
                            </a>

                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a className="dropdown-item" href="#">
                                  Set as default address
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  Remove address
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div
                        id="kt_ecommerce_customer_addresses_1"
                        className="collapse fs-6 ps-9"
                        data-bs-parent="#kt_ecommerce_customer_addresses_accordion"
                      >
                        <div className="d-flex flex-column pb-5">
                          <div className="fw-bold text-gray-600">Max Smith</div>
                          <div className="text-muted">
                            101 Collin Street,
                            <br />
                            Melbourne, VIC 3000,
                            <br />
                            Australia
                          </div>
                        </div>
                      </div>
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

export default CustomerFormApp;
