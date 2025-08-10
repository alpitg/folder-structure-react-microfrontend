import { NavLink, useParams } from "react-router";

import OrderHeaderApp from "../header/order-header";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";
import { useGetDetailQuery } from "../../../../../app/features/sales/order/order.api";

const OrderViewApp = () => {
  const { orderId } = useParams(); //
  const { data: order, isLoading, error } = useGetDetailQuery(orderId || "");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching order.</p>;

  return (
    <div className="order-header-app flex flex-col gap-4 mb-3">
      <OrderHeaderApp
        header="Order detail"
        description="Order details are here."
      >
        <NavLink to={ROUTE_URL.FINANCE.SALES.BASE}>
          <span className="btn btn-light btn-active-secondary btn-sm me-5">
            <i className="bi bi-chevron-left fs-5"></i>
            Back to Order List
          </span>
        </NavLink>

        <NavLink to={ROUTE_URL.FINANCE.SALES.ADD}>
          <span className="btn btn-primary btn-sm">
            <i className="bi bi-plus-lg fs-3"></i>
            Add New Order
          </span>
        </NavLink>
      </OrderHeaderApp>

      <div className="d-flex flex-column gap-7 gap-lg-10">
        <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
          <div className="card card-flush py-4 flex-row-fluid">
            <div className="card-header">
              <div className="card-title">
                <h2>Order Details</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-6">
                {/* Order ID */}
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-hash fs-4 me-2"></i>
                    Order ID
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    #{order?.id || "N/A"}
                  </div>
                </div>

                {/* Added Date */}
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-calendar-event fs-4 me-2"></i>
                    Added Date
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-credit-card fs-4 me-2"></i>
                    Payment Method
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    {order?.orderStatus || "Online"}
                  </div>
                </div>

                {/* Order Status */}
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-box-seam fs-4 me-2"></i>
                    Order Status
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    {order?.orderStatus || "Delivered"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-flush py-4 flex-row-fluid">
            <div className="card-header">
              <div className="card-title">
                <h2>Customer Details</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-6">
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    Customer
                  </div>
                  <div className="fw-bold text-gray-600 text-end d-flex align-items-center">
                    <span>{order?.customerName || "N/A"}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-envelope fs-4 me-2"></i>
                    Email
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    {order?.customerName ? (
                      <a
                        href={`mailto:${order?.customerName}`}
                        className="text-hover-primary"
                      >
                        {order?.customerName}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-telephone fs-4 me-2"></i>
                    Phone
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    {order?.customerName || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-flush py-4 flex-row-fluid">
            <div className="card-header">
              <div className="card-title">
                <h2>Documents</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-6">
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-receipt fs-4 me-2"></i>
                    Invoice
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    <a
                      href="/keen/demo1/apps/invoices/view/invoice-3.html"
                      className="text-hover-primary"
                    >
                      #INV-000414
                    </a>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-truck fs-4 me-2"></i>
                    Shipping
                  </div>
                  <div className="fw-bold text-gray-600 text-end">
                    <a href="#" className="text-hover-primary">
                      #SHP-0025410
                    </a>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="d-flex align-items-center text-muted">
                    <i className="bi bi-gift fs-4 me-2"></i>
                    Reward Points
                  </div>
                  <div className="fw-bold text-gray-600 text-end">600</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-7 gap-lg-10">
          <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
            <div className="card card-flush py-4 flex-row-fluid position-relative">
              <div className="position-absolute top-0 end-0 bottom-0 opacity-10 d-flex align-items-center me-5">
                <i
                  className="bi bi-credit-card-fill"
                  style={{ fontSize: "14em" }}
                ></i>
              </div>

              <div className="card-header">
                <div className="card-title">
                  <h2>Billing Address</h2>
                </div>
              </div>

              <div className="card-body pt-0">
                Unit 1/23 Hastings Road,
                <br />
                Melbourne 3000,
                <br />
                Victoria,
                <br />
                Australia.
              </div>
            </div>

            <div className="card card-flush py-4 flex-row-fluid position-relative">
              <div className="position-absolute top-0 end-0 bottom-0 opacity-10 d-flex align-items-center me-5">
                <i
                  className="bi bi-truck-flatbed"
                  style={{ fontSize: "13em" }}
                ></i>
              </div>

              <div className="card-header">
                <div className="card-title">
                  <h2>Shipping Address</h2>
                </div>
              </div>

              <div className="card-body pt-0">
                Unit 1/23 Hastings Road,
                <br />
                Melbourne 3000,
                <br />
                Victoria,
                <br />
                Australia.
              </div>
            </div>
          </div>
        </div>

        <div className="card card-flush py-4 flex-row-fluid overflow-hidden">
          <div className="card-header">
            <div className="card-title">
              <h2>Order #14534</h2>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-responsive">
              <table className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                <thead>
                  <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                    <th className="min-w-175px">Product</th>
                    <th className="min-w-100px text-end">SKU</th>
                    <th className="min-w-70px text-end">Qty</th>
                    <th className="min-w-100px text-end">Unit Price</th>
                    <th className="min-w-100px text-end">Total</th>
                  </tr>
                </thead>
                <tbody className="fw-semibold text-gray-600">
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <a
                          href="/keen/demo1/apps/ecommerce/catalog/edit-product.html"
                          className="symbol symbol-50px"
                        >
                          <span
                            className="symbol-label"
                            style={{
                              backgroundImage:
                                "url(/keen/demo1/assets/media//stock/ecommerce/1.png)",
                            }}
                          ></span>
                        </a>
                        <div className="ms-5">
                          <a
                            href="/keen/demo1/apps/ecommerce/catalog/edit-product.html"
                            className="fw-bold text-gray-600 text-hover-primary"
                          >
                            Product 1
                          </a>
                          <div className="fs-7 text-muted">
                            Delivery Date: 10/08/2025
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">01651007</td>
                    <td className="text-end">2</td>
                    <td className="text-end">$120.00</td>
                    <td className="text-end">$240.00</td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <a
                          href="/keen/demo1/apps/ecommerce/catalog/edit-product.html"
                          className="symbol symbol-50px"
                        >
                          <span
                            className="symbol-label"
                            style={{
                              backgroundImage:
                                "url(/keen/demo1/assets/media//stock/ecommerce/100.png)",
                            }}
                          ></span>
                        </a>
                        <div className="ms-5">
                          <a
                            href="/keen/demo1/apps/ecommerce/catalog/edit-product.html"
                            className="fw-bold text-gray-600 text-hover-primary"
                          >
                            Footwear
                          </a>
                          <div className="fs-7 text-muted">
                            Delivery Date: 10/08/2025
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">02893007</td>
                    <td className="text-end">1</td>
                    <td className="text-end">$24.00</td>
                    <td className="text-end">$24.00</td>
                  </tr>

                  <tr>
                    <td colSpan={4} className="text-end">
                      Subtotal
                    </td>
                    <td className="text-end">$264.00</td>
                  </tr>

                  <tr>
                    <td colSpan={4} className="text-end">
                      VAT (0%)
                    </td>
                    <td className="text-end">$0.00</td>
                  </tr>

                  <tr>
                    <td colSpan={4} className="text-end">
                      Shipping Rate
                    </td>
                    <td className="text-end">$5.00</td>
                  </tr>

                  <tr>
                    <td colSpan={4} className="fs-3 text-gray-900 text-end">
                      Grand Total
                    </td>
                    <td className="text-gray-900 fs-3 fw-bolder text-end">
                      $269.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-7 gap-lg-10">
          <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10 w-xl-50">
            <div className="card card-flush py-4 flex-row-fluid position-relative">
              <div className="card-header py-7">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold text-gray-800">
                    Shipment History
                  </span>
                  <span className="text-gray-500 mt-1 fw-semibold fs-6">
                    59 Active Shipments
                  </span>
                </h3>
              </div>

              <div className="position-absolute top-0 end-0 bottom-0 opacity-10 d-flex align-items-center me-5">
                <i
                  className="bi bi-clock-history"
                  style={{ fontSize: "14em" }}
                ></i>
              </div>

              <div className="card-body pt-0">
                <div className="timeline">
                  <div className="timeline-item align-items-center mb-7">
                    <div className="timeline-line mt-1 mb-n6 mb-sm-n7"></div>

                    <div className="timeline-icon">
                      <i className="bi bi-cart-check-fill fs-2 text-danger"></i>
                    </div>

                    <div className="timeline-content m-0">
                      <span className="fs-6 text-gray-500 fw-semibold d-block">
                        Delivered
                      </span>
                      <span className="fs-6 fw-bold text-gray-800">
                        <div className="badge badge-light-success">
                          Completed
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="timeline-item align-items-center mb-7">
                    <div className="timeline-line mt-1 mb-n6 mb-sm-n7"></div>

                    <div className="timeline-icon">
                      <i className="bi bi-rocket-takeoff-fill  fs-2 text-danger"></i>
                    </div>

                    <div className="timeline-content m-0">
                      <span className="fs-6 text-gray-500 fw-semibold d-block">
                        Shipped
                      </span>
                      <span className="fs-6 fw-bold text-gray-800">
                        <div className="badge badge-light-warning">Pending</div>
                      </span>
                    </div>
                  </div>

                  <div className="timeline-item align-items-center mb-7">
                    <div className="timeline-line mt-1 mb-n6 mb-sm-n7"></div>

                    <div className="timeline-icon">
                      <i className="bi bi-boxes fs-2 text-danger"></i>
                    </div>

                    <div className="timeline-content m-0">
                      <span className="fs-6 text-gray-500 fw-semibold d-block">
                        Packed
                      </span>
                      <span className="fs-6 fw-bold text-gray-800">
                        <div className="badge badge-light-warning">Pending</div>
                      </span>
                    </div>
                  </div>

                  <div className="timeline-item align-items-center">
                    <div className="timeline-line"></div>

                    <div className="timeline-icon">
                      <i className="bi bi-bag-check fs-2 text-danger"></i>
                    </div>

                    <div className="timeline-content m-0">
                      <span className="fs-6 text-gray-500 fw-semibold d-block">
                        Order placed
                      </span>
                      <span className="fs-6 fw-bold text-gray-800">
                        <div className="badge badge-light-warning">Pending</div>
                      </span>
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

export default OrderViewApp;
