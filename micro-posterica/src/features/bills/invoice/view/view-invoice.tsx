import "./view-invoice.scss";

import type { ITotalCalculationInput } from "../../../../interfaces/order/order.model";

interface ViewInvoiceAppProps {
  bill?: ITotalCalculationInput;
}

const ViewInvoiceApp = ({ bill }: ViewInvoiceAppProps) => {
  if (!bill) return <div>No bill data available.</div>;

  const daysRemaining = () => {
    const today = new Date();
    const dueDate = new Date(bill.likelyDateOfDelivery);

    // Strip time from both dates by resetting to midnight
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff > 0 ? daysDiff : 0;
  };

  const daysCompleted = () => {
    const today = new Date();
    const billDate = new Date(bill?.invoice?.billDate);

    // Strip time from both dates by resetting to midnight
    today.setHours(0, 0, 0, 0);
    billDate.setHours(0, 0, 0, 0);

    const timeDiff = today.getTime() - billDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff > 0 ? daysDiff : 0;
  };

  return (
    <div className="view-invoice-app">
      <h3>View Invoice</h3>
      <p>View invoice here.</p>

      <div className="card">
        <div className="card-body p-lg-20">
          <div className="d-flex flex-column flex-xl-row">
            <div className="flex-lg-row-fluid me-xl-18 mb-10 mb-xl-0">
              <div className="mt-n1">
                <div className="d-flex flex-stack pb-10">
                  <a href="#">
                    <img alt="Logo" src="/static/media/img/logo.png" />
                  </a>
                </div>

                <div className="m-0">
                  <div className="fw-bold fs-3 text-gray-800 mb-8">
                    Invoice #34782
                  </div>

                  <div className="row g-5 mb-11">
                    <div className="col-sm-6">
                      <div className="fw-semibold fs-7 text-gray-600 mb-1">
                        Bill Date:
                      </div>
                      <div className="fw-bold fs-6 text-gray-800">
                        {new Date(bill.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="fw-semibold fs-7 text-gray-600 mb-1">
                        Likely date of delivery:
                      </div>
                      <div className="fw-bold fs-6 text-gray-800 d-flex align-items-center flex-wrap">
                        <span className="pe-2">
                          {bill.likelyDateOfDelivery
                            ? new Date(
                                bill.likelyDateOfDelivery
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "--"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row g-5 mb-12">
                    <div className="col-sm-6">
                      <div className="fw-semibold fs-7 text-gray-600 mb-1">
                        Bill From:
                      </div>
                      <div className="fw-bold fs-6 text-gray-800">
                        {bill?.invoice?.billFrom?.name}
                      </div>
                      <div className="fw-semibold fs-7 text-gray-600">
                        {bill?.invoice?.billFrom?.detail}
                      </div>
                      <div className="fw-semibold fs-7 text-gray-600">
                        {bill?.invoice?.billFrom?.phone
                          ? `Phone: ${bill?.invoice?.billFrom?.phone}`
                          : null}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      {bill?.invoice?.billTo?.name && (
                        <>
                          <div className="fw-semibold fs-7 text-gray-600 mb-1">
                            Bill To:
                          </div>
                          <div className="fw-bold fs-6 text-gray-800">
                            {bill?.invoice?.billTo?.name}
                          </div>
                          <div className="fw-semibold fs-7 text-gray-600">
                            {bill?.invoice?.billTo?.detail}
                          </div>
                          <div className="fw-semibold fs-7 text-gray-600">
                            {bill?.invoice?.billTo?.phone
                              ? `Phone: ${bill?.invoice?.billTo?.phone}`
                              : null}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <div className="table-responsive border-bottom mb-9">
                      <table className="table mb-3">
                        <thead>
                          <tr className="border-bottom fs-6 fw-bold text-muted">
                            <th className="min-w-175px pb-2">Art Name</th>
                            <th className="min-w-70px text-end pb-2">
                              Quantity
                            </th>
                            <th className="min-w-80px text-end pb-2">Rate</th>
                            <th className="min-w-100px text-end pb-2">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {bill.artDetails.map((art, index) => (
                            <tr
                              key={index}
                              className="fw-bold text-gray-700 fs-5 text-end"
                            >
                              <td className="d-flex align-items-center pt-6">
                                <i className="bi bi-circle text-danger fs-6 me-2"></i>
                                {art?.artName}
                              </td>
                              <td className="pt-6">{art?.quantity}</td>
                              <td className="pt-6">
                                ₹
                                {(
                                  (art?.cost || 0) / art?.quantity || 0
                                ).toFixed(2)}
                              </td>
                              <td className="pt-6 text-gray-900 fw-bolder">
                                ₹{art?.cost?.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="mw-300px">
                        <div className="d-flex flex-stack mb-3">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">
                            Subtotal:
                          </div>
                          <div className="text-end fw-bold fs-6 text-gray-800">
                            ₹ {bill?.finalAmount?.toFixed(2)}
                          </div>
                        </div>

                        <div className="d-flex flex-stack mb-3">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">
                            Total:
                          </div>
                          <div className="text-end fw-bold fs-6 text-gray-800">
                            ₹ {bill?.finalAmount?.toFixed(2)}
                          </div>
                        </div>
                        <div className="d-flex flex-stack mb-3">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">
                            Advance Paid:
                          </div>
                          <div className="text-end fw-bold fs-6 text-gray-800">
                            ₹ {bill?.finalAmount?.toFixed(2)}
                          </div>
                        </div>
                        <div className="d-flex flex-stack">
                          <div className="fw-semibold pe-10 text-gray-600 fs-7">
                            Amount Due:
                          </div>
                          <div className="text-end fw-bold fs-6 text-gray-800">
                            ₹ {bill?.finalAmount?.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow-1 p-10">
                      <p className="text-gray-600">Terms & Conditions:</p>
                      <span className="text-gray-800">
                        Goods once sold will not be taken back or exchanged.
                        Please check all items and quantities before leaving the
                        counter. No warranty on items damaged due to misuse or
                        mishandling.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="m-0">
              <div className="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px p-9 bg-lighten">
                <div className="mb-8">
                  <span className="badge badge-light-success me-2">
                    Approved
                  </span>
                  <span className="badge badge-light-warning">
                    Pending Payment
                  </span>
                </div>

                <h6 className="mb-8 fw-bolder text-gray-600 text-hover-primary">
                  PAYMENT DETAILS
                </h6>

                <div className="mb-6">
                  <div className="fw-semibold text-gray-600 fs-7">
                    Payment Mode:
                  </div>
                  <div className="fw-bold text-gray-800 fs-6">
                    <span className="fs-7 text-success d-flex align-items-center">
                      <span className="bullet bullet-dot bg-success mx-2"></span>
                      {bill?.invoice?.paymentMode ?? "Cash"}
                    </span>
                  </div>
                </div>

                <div className="mb-15">
                  <div className="fw-semibold text-gray-600 fs-7">
                    Payment Term:
                  </div>
                  <div className="fw-bold fs-6 text-gray-800 d-flex align-items-center">
                    <span className="fs-7 text-danger d-flex align-items-center">
                      <span className="bullet bullet-dot bg-danger mx-2"></span>
                      Due in {daysRemaining()} days
                    </span>
                  </div>
                </div>

                <h6 className="mb-8 fw-bolder text-gray-600 text-hover-primary">
                  CUSTOMER DETAILS
                </h6>

                <div className="mb-6">
                  <div className="fw-semibold text-gray-600 fs-7">
                    Customer Name
                  </div>
                  <div className="fw-bold fs-6 text-gray-800">
                    {bill?.customerName || "--"}
                    {/* <a href="#" className="link-primary ps-1">
                      (View Detail)
                    </a> */}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="fw-semibold text-gray-600 fs-7">
                    Handled By:
                  </div>
                  <div className="fw-bold text-gray-800 fs-6">
                    {bill?.invoice?.handledBy || "--"}
                  </div>
                </div>

                <div className="m-0">
                  <div className="fw-semibold text-gray-600 fs-7">
                    Days Spent:
                  </div>
                  <div className="fw-bold fs-6 text-gray-800 d-flex align-items-center">
                    {daysCompleted()} Days completed
                    <span className="fs-7 text-success d-flex align-items-center">
                      <span className="bullet bullet-dot bg-success mx-2"></span>
                      {daysRemaining()} Days remaining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default ViewInvoiceApp;
