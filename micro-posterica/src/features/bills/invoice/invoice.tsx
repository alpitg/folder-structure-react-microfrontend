
const InvoiceApp = () => {
  return (
    <div className="bill-calculation-app">
      <h3>Bill Calculation</h3>
      <p>Calculate the bill here.</p>

      <div className="row">
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
                  <h5>01 January 2021</h5>
                </div>
                <div className="col-md-6 mb-5">
                  <small className="d-block mb-1">Due Date:</small>
                  <h5 className="text-dark">
                    08 January 2021{" "}
                    <small className="text-brand">
                      <i className="bi bi-dot"></i>Due in 7 days
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
      </div>
    </div>
  );
};

export default InvoiceApp;
