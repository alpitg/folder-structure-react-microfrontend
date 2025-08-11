const ProductApp = () => {
  return (
    <div className="card card-flush">
      <div className="ribbon ribbon-top ribbon-vertical">
        <div className="ribbon-label bg-success">
          <i className="bi bi-receipt text-inverse-success fs-1"></i>
        </div>
      </div>
      <div className="card-header">
        <div className="card-title">
          <h2>Select Products</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <div className="d-flex flex-column gap-10 mb-5">
          <div>
            <label className="form-label">Add products to this order</label>

            <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 border border-dashed rounded pt-3 pb-1 px-2 mb-5 mh-300px overflow-scroll">
              <span className="w-100 text-muted">
                Select one or more products from the list below by ticking the
                checkbox.
              </span>
            </div>

            <div className="fw-bold fs-4">
              Total Cost: ₹<span> 0.00</span>
            </div>
          </div>

          <div className="separator" />

          <div className="d-flex gap-5">
            <div className="col-sm-6 d-flex align-items-center position-relative">
              <i className="bi bi-search fs-3 position-absolute ms-4"></i>
              <input
                type="text"
                className="form-control form-control-solid w-100 w-lg-100 ps-12"
                placeholder="Search Products"
              />
            </div>
            <div className="col-sm-6">
              <button className="btn btn-light-primary">
                <i className="bi bi-plus-lg fs-3"></i> Add Product
              </button>
            </div>
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
  );
};

export default ProductApp;
