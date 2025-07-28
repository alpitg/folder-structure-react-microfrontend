import "./invoice.scss";

import type { ITotalCalculationInput } from "../../../interfaces/total-calculation.model";

interface InvoiceAppProps {
  bill: ITotalCalculationInput;
}

const InvoiceApp = ({ bill }: InvoiceAppProps) => {
  const dueDays = () => {
    const today = new Date();
    const dueDate = new Date(bill.likelyDateOfDelivery);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  return (
    <div className="invoice-app">
      <h3>Bill Calculation</h3>
      <p>Calculate the bill here.</p>

      <div className="card">
        <div className="card-body p-5">
          <div className="row">
            <div className="col-md-8">
              <div className="p-5">
                <div className="header-section">
                  <a href="#">
                    <img alt="Logo" src="/static/media/img/logo.png" />
                  </a>
                  <div className="fs-4 mt-4 mb-4">Invoice #34782</div>
                </div>
                <div className="invoice-overview">
                  <div className="m-0">
                    <div className="row g-5 mb-5">
                      <div className="col-sm-6">
                        <div className="fs-7 text-muted mb-1">Issue Date:</div>
                        <div className="fw-bold fs-6 text-gray-800">
                          12 Apr 2021
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="fs-7 text-muted mb-1">Due Date:</div>
                        <div className="fw-bold fs-6 d-flex align-items-center flex-wrap">
                          <span className="pe-2">02 May 2021</span>
                          <span className="fs-7 text-danger d-flex align-items-center">
                            <span className="bullet bullet-dot bg-danger me-2"></span>
                            Due in 7 days
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row g-5 mb-5">
                      <div className="col-sm-6">
                        <div className="fs-7 text-muted mb-1">Issue For:</div>
                        <div className="fw-bold fs-6 text-gray-800">
                          KeenThemes Inc.
                        </div>
                        <div className="fs-7 text-muted">
                          8692 Wild Rose Drive <br />
                          Livonia, MI 48150
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="fs-7 text-muted mb-1">Issued By:</div>
                        <div className="fw-bold fs-6 text-gray-800">
                          CodeLab Inc.
                        </div>
                        <div className="fs-7 text-muted">
                          9858 South 53rd Ave.
                          <br />
                          Matthews, NC 28104
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-breakout">
                  <div className="flex-grow-1">
                    <div className="table-responsive border-bottom mb-9">
                      <table className="table mb-3">
                        <thead>
                          <tr className="border-bottomfs-6 fw-bold text-muted">
                            <th className="min-w-175px pb-2">Description</th>
                            <th className="min-w-70px text-end pb-2">Hours</th>
                            <th className="min-w-80px text-end pb-2">Rate</th>
                            <th className="min-w-100px text-end pb-2">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="fw-bold text-gray-700fs-5 text-end">
                            <td className="d-flex align-items-center pt-6">
                              <i className="fa fa-genderless text-dangerfs-2 me-2"></i>
                              Creative Design
                            </td>
                            <td className="pt-6">80</td>
                            <td className="pt-6">$40.00</td>
                            <td className="pt-6 text-gray-900 fw-bolder">
                              $3200.00
                            </td>
                          </tr>
                          <tr className="fw-bold text-gray-700fs-5 text-end">
                            <td className="d-flex align-items-center">
                              <i className="fa fa-genderless text-successfs-2 me-2"></i>
                              Logo Design
                            </td>
                            <td>120</td>
                            <td>$40.00</td>
                            <td className="fs-5 text-gray-900 fw-bolder">
                              $4800.00
                            </td>
                          </tr>
                          <tr className="fw-bold text-gray-700fs-5 text-end">
                            <td className="d-flex align-items-center">
                              <i className="fa fa-genderless text-primaryfs-2 me-2"></i>
                              Web Development
                            </td>
                            <td>210</td>
                            <td>$60.00</td>
                            <td className="fs-5 text-gray-900 fw-bolder">
                              $12600.00
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="invoice-cost">
                  <div className="d-flex justify-content-end">
                    <div className="mw-300px">
                      <div className="d-flex flex-stack mb-3">
                        <div className=" pe-10text-muted fs-7">Subtotal:</div>
                        <div className="text-end fw-bold fs-6 text-gray-800">
                          $ 20,600.00
                        </div>
                      </div>
                      <div className="d-flex flex-stack mb-3">
                        <div className=" pe-10text-muted fs-7">VAT 0%</div>
                        <div className="text-end fw-bold fs-6 text-gray-800">
                          0.00
                        </div>
                      </div>
                      <div className="d-flex flex-stack mb-3">
                        <div className=" pe-10text-muted fs-7">
                          Subtotal + VAT
                        </div>
                        <div className="text-end fw-bold fs-6 text-gray-800">
                          $ 20,600.00
                        </div>
                      </div>
                      <div className="d-flex flex-stack">
                        <div className=" pe-10text-muted fs-7">Total</div>
                        <div className="text-end fw-bold fs-6 text-gray-800">
                          $ 20,600.00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="m-0">
                <div className="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px bg-lighten p-4">
                  <div className="mb-5">
                    <span className="badge badge-light-success me-2">
                      Approved
                    </span>
                    <span className="badge badge-light-warning">
                      Pending Payment
                    </span>
                  </div>
                  <h6 className="mb-4 fw-bolder text-muted">PAYMENT DETAILS</h6>
                  <div className="mb-3">
                    <div className="text-muted fs-7">Paypal:</div>
                    <div className="fw-bold fs-6">codelabpay@codelab.co</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted fs-7">Account:</div>
                    <div className="fw-bold fs-6">
                      Nl24IBAN34553477847370033 <br />
                      AMB NLANBZTC
                    </div>
                  </div>
                  <div className="mb-15">
                    <div className="text-muted fs-7">Payment Term:</div>
                    <div className="fw-bold fs-6 d-flex align-items-center">
                      14 days
                      <span className="fs-7 text-danger d-flex align-items-center">
                        <span className="bullet bullet-dot bg-danger mx-2"></span>
                        Due in 7 days
                      </span>
                    </div>
                  </div>
                  <h6 className="mb-4 fw-bolder text-gray-600 text-muted">
                    PROJECT OVERVIEW
                  </h6>
                  <div className="mb-3">
                    <div className="text-muted fs-7">Project Name</div>
                    <div className="fw-bold fs-6 text-gray-800">
                      SaaS App Quickstarter
                      <a href="#" className="link-primary ps-1">
                        View Project
                      </a>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted fs-7">Completed By:</div>
                    <div className="fw-bold fs-6">Mr. Dewonte Paul</div>
                  </div>
                  <div className="m-0">
                    <div className="text-muted fs-7">Time Spent:</div>
                    <div className="fw-bold fs-6 d-flex align-items-center">
                      230 Hours
                      <span className="fs-7 text-success d-flex align-items-center">
                        <span className="bullet bullet-dot bg-success mx-2"></span>
                        35$/h Rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
        </div>
      </div>

      {/* <div className="row">
        <div className="col-12 col-xl-9">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-8">
                  <h2 className="card-title">Invoice 123-3455</h2>
                </div>
                <div className="col-md-4">
                  <div className="lpx-brand-logo"></div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row pb-5">
                <div className="col-md-6 mb-5">
                  <small className="d-block mb-1">Issue Date:</small>
                  <h5>{bill?.createdAt}</h5>
                </div>
                <div className="col-md-6 mb-5">
                  <small className="d-block mb-1">Due Date:</small>
                  <h5 className="text-dark">
                    {bill?.likelyDateOfDelivery}
                    <small className="text-brand">
                      <i className="bi bi-dot"></i>Due in {dueDays()} days
                    </small>
                  </h5>
                </div>
                <div className="col-md-6">
                  <small className="d-block mb-1">Issue For:</small>
                  <h5 className="text-dark">Aliquam Cursus Company</h5>
                  <small>
                    Sherlock Holmes Museum 221b Baker Street
                    <br />
                    London England UK
                  </small>
                </div>
                <div className="col-md-6">
                  <small className="d-block mb-1">Issue By:</small>
                  <h5 className="text-dark">Valiquam Morsis Company</h5>
                  <small>
                    Hobbitton Shire 501 Buckland Road
                    <br />
                    Matamata, New Zealand
                  </small>
                </div>
              </div>

              <table className="table mb-5">
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-end">
                      Hours
                    </th>
                    <th scope="col" className="text-end">
                      Rate
                    </th>
                    <th scope="col" className="text-end">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="align-items-center d-flex">
                        <span className="me-2 p-1 border rounded-circle bg-primary"></span>
                        Lorem ipsum
                      </div>
                    </td>
                    <td className="text-end">12</td>
                    <td className="text-end">$ 50,00</td>
                    <td className="text-end">$ 1,500.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="align-items-center d-flex">
                        <span className="me-2 p-1 border rounded-circle bg-brand"></span>
                        Lorem ipsum
                      </div>
                    </td>
                    <td className="text-end">12</td>
                    <td className="text-end">$ 50,00</td>
                    <td className="text-end">$ 1,500.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="align-items-center d-flex">
                        <span className="me-2 p-1 border rounded-circle bg-info"></span>
                        Lorem ipsum
                      </div>
                    </td>
                    <td className="text-end">12</td>
                    <td className="text-end">$ 50,00</td>
                    <td className="text-end">$ 1,500.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="row justify-content-end">
                <div className="col-md-6">
                  <div className="border-bottom mb-1 pb-1">Invoice Summary</div>
                  <ul className="d-flex flex-wrap lh-lg ps-0 mb-0 list-unstyled">
                    <li className="w-50">Subtotal</li>
                    <li className="w-50 text-end">$ 4,500.00</li>
                    <li className="w-50">VAT 0%</li>
                    <li className="w-50 text-end">$ 0,00</li>
                    <li className="w-50">Subtotal + VAT 0%</li>
                    <li className="w-50 text-end">$ 4,500.00</li>
                  </ul>
                  <div className="d-flex justify-content-between border-top mt-2 pt-2">
                    <div>TOTAL</div>
                    <div>$ 4,500.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Payment Details</div>
                </div>
                <div className="card-body">
                  <small className="d-block text-muted">Paypal:</small>
                  <div className="mb-3">johndoe@company.com</div>

                  <small className="d-block text-muted">Account:</small>
                  <div className="mb-3">
                    NI24IBAN34553477847370033AMB NLANBZTC
                  </div>

                  <small className="d-block text-muted">Payment Term:</small>
                  <div className="mb-3">01 February 2021</div>

                  <small className="d-block text-muted">Status:</small>
                  <span className="badge bg-info">Approved</span>
                  <span className="badge bg-primary">Pending Payment</span>

                  <button className="btn bg-brand text-white w-100 mt-3">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Project Overview</div>
                </div>
                <div className="card-body">
                  <small className="d-block text-muted">Project Name:</small>
                  <div className="mb-3">Books Project</div>

                  <small className="d-block text-muted">Completed By:</small>
                  <div className="mb-3">Mr. Dewonte Paul</div>

                  <small className="d-block text-muted">Time Spent:</small>
                  <div>
                    36 Hours{" "}
                    <small className="text-info">
                      <i className="bi bi-dot"></i>50$/h Rate
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <br />
    </div>
  );
};

export default InvoiceApp;
