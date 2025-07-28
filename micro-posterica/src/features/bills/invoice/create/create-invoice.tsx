const CreateInvoiceApp = () => {
  return (
    <div className="create-invoice-app">
      <h3>Create Invoice</h3>
      <p>Create invoice here.</p>

      <div
        id="kt_app_content"
        className="app-content  flex-column-fluid "
        data-select2-id="select2-data-kt_app_content"
      >
        <div
          id="kt_app_content_container"
          className="app-container  container-xxl "
          data-select2-id="select2-data-kt_app_content_container"
        >
          <div
            className="d-flex flex-column flex-lg-row"
            data-select2-id="select2-data-138-dhqy"
          >
            <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
              <div className="card">
                <div className="card-body p-12">
                  <form action="" id="kt_invoice_form">
                    <div className="d-flex flex-column align-items-start flex-xxl-row">
                      <div
                        className="d-flex align-items-center flex-equal fw-row me-4 order-2"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-original-title="Specify invoice date"
                        data-kt-initialized="1"
                      >
                        <div className="fs-6 fw-bold text-gray-700 text-nowrap">
                          Date:
                        </div>
                        <div className="position-relative d-flex align-items-center w-150px">
                          <input
                            className="form-control form-control-transparent fw-bold pe-5 flatpickr-input"
                            placeholder="Select date"
                            name="invoice_date"
                            type="date"
                          />
                          <i className="ki-duotone ki-down fs-4 position-absolute ms-4 end-0"></i>
                        </div>
                      </div>
                      <div
                        className="d-flex flex-center flex-equal fw-row text-nowrap order-1 order-xxl-2 me-4"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-original-title="Enter invoice number"
                        data-kt-initialized="1"
                      >
                        <span className="fs-2x fw-bold text-gray-800">
                          Invoice #
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-flush fw-bold text-muted fs-3 w-125px"
                          value="2021001"
                          placeholder="..."
                        />
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-end flex-equal order-3 fw-row"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-original-title="Specify invoice due date"
                        data-kt-initialized="1"
                      >
                        <div className="fs-6 fw-bold text-gray-700 text-nowrap">
                          Due Date:
                        </div>
                        <div className="position-relative d-flex align-items-center w-150px">
                          <input
                            className="form-control form-control-transparent fw-bold pe-5 flatpickr-input"
                            placeholder="Select date"
                            name="invoice_due_date"
                            type="date"
                          />
                          <i className="ki-duotone ki-down fs-4 position-absolute end-0 ms-4"></i>
                        </div>
                      </div>
                    </div>
                    <div className="separator separator-dashed my-10"></div>
                    <div className="mb-0">
                      <div className="row gx-10 mb-5">
                        <div className="col-lg-6">
                          <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                            Bill From
                          </label>
                          <div className="mb-5">
                            <input
                              type="text"
                              className="form-control form-control-solid"
                              placeholder="Name"
                            />
                          </div>
                          <div className="mb-5">
                            <input
                              type="text"
                              className="form-control form-control-solid"
                              placeholder="Email"
                            />
                          </div>
                          <div className="mb-5">
                            <textarea
                              name="notes"
                              className="form-control form-control-solid"
                              rows={3}
                              placeholder="Who is this invoice from?"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                            Bill To
                          </label>
                          <div className="mb-5">
                            <input
                              type="text"
                              className="form-control form-control-solid"
                              placeholder="Name"
                            />
                          </div>
                          <div className="mb-5">
                            <input
                              type="text"
                              className="form-control form-control-solid"
                              placeholder="Email"
                            />
                          </div>
                          <div className="mb-5">
                            <textarea
                              name="notes"
                              className="form-control form-control-solid"
                              rows={3}
                              placeholder="What is this invoice for?"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="flex-lg-auto min-w-lg-300px"
              data-select2-id="select2-data-137-r3ds"
            >
              <div
                className="card"
                data-kt-sticky="true"
                data-kt-sticky-name="invoice"
                data-kt-sticky-offset="{default: false, lg: '200px'}"
                data-kt-sticky-width="{lg: '250px', lg: '300px'}"
                data-kt-sticky-left="auto"
                data-kt-sticky-top="150px"
                data-kt-sticky-animation="false"
                data-kt-sticky-zindex="95"
              >
                <div className="card-body p-10">
                  <div className="mb-10">
                    <label className="form-label fw-bold fs-6 text-gray-700">
                      Currency
                    </label>
                    <select
                      name="currnecy"
                      aria-label="Select a Timezone"
                      data-control="select2"
                      data-placeholder="Select currency"
                      className="form-select form-select-solid select2-hidden-accessible"
                    >
                      <option value=""></option>
                      <option value="USD">
                        <b>USD</b> - USA dollar
                      </option>
                      <option value="GBP">
                        <b>GBP</b> - British pound
                      </option>
                      <option value="AUD">
                        <b>AUD</b> - Australian dollar
                      </option>
                      <option value="JPY">
                        <b>JPY</b> - Japanese yen
                      </option>
                      <option value="SEK">
                        <b>SEK</b> - Swedish krona
                      </option>
                      <option value="CAD">
                        <b>CAD</b> - Canadian dollar
                      </option>
                      <option value="CHF">
                        <b>CHF</b> - Swiss franc
                      </option>
                    </select>
                  </div>
                  <div className="separator separator-dashed mb-8"></div>
                  <div className="mb-8">
                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5">
                      <span className="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                        Payment method
                      </span>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked
                      />
                    </label>
                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5">
                      <span className="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                        Late fees
                      </span>
                      <input className="form-check-input" type="checkbox" />
                    </label>
                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                      <span className="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                        Notes
                      </span>
                      <input className="form-check-input" type="checkbox" />
                    </label>
                  </div>
                  <div className="separator separator-dashed mb-8"></div>
                  <div className="mb-0">
                    <div className="row mb-5">
                      <div className="col">
                        <a
                          href="#"
                          className="btn btn-light btn-active-light-primary w-100"
                        >
                          Preview
                        </a>
                      </div>
                      <div className="col">
                        <a
                          href="#"
                          className="btn btn-light btn-active-light-primary w-100"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      id="kt_invoice_submit_button"
                    >
                      <i className="ki-duotone ki-triangle fs-3"></i> Send
                      Invoice
                    </button>
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

export default CreateInvoiceApp;
