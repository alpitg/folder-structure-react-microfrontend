const Sample1App = () => {
  return (
    <div className="container">
      <div className="col-sm-12">
        <h2>File upload - items list - </h2>
        <br />
        <div className="d-flex flex-column mb-9">
          <div className="d-flex align-items-center mb-5">
            <div className="symbol symbol-30px me-5">
              <img
                alt="Icon"
                src="/static/media/img/svg/file-extension/img.svg"
              />
            </div>
            <div className="fw-semibold">
              <a
                className="fs-6 fw-bold text-gray-900 text-hover-primary"
                href="#"
              >
                Project tech requirements
              </a>
              <div className="text-gray-500">
                2 days ago <a href="#">Karina Clark</a>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-clean btn-sm btn-icon btn-icon-danger btn-active-light-danger ms-auto"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-trash fs-3"></i>
            </button>
          </div>
          <div className="d-flex align-items-center mb-5">
            <div className="symbol symbol-30px me-5">
              <img
                alt="Icon"
                src="/static/media/img/svg/file-extension/pdf.svg"
              />
            </div>
            <div className="fw-semibold">
              <a
                className="fs-6 fw-bold text-gray-900 text-hover-primary"
                href="#"
              >
                Project tech requirements
              </a>
              <div className="text-gray-500">
                2 days ago <a href="#">Karina Clark</a>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-clean btn-sm btn-icon btn-icon-danger btn-active-light-danger ms-auto"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-trash fs-3"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-sm-12">
        <h2>Dropdown menu - For filter this can be used</h2>
        <button
          type="button"
          className="btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary ms-auto"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-plus-lg fs-3"></i>
        </button>

        <div className="dropdown-menu dropdown-menu-end p-4 shadow w-250px w-md-300px">
          <div className="mb-3">
            <div className="fs-5 text-gray-900 fw-bold">Filter Options</div>
          </div>

          <div className="border-bottom mb-3"></div>

          <div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Status:</label>
              <select className="form-select" multiple>
                <option></option>
                <option value="1">Approved</option>
                <option value="2">Pending</option>
                <option value="3">In Process</option>
                <option value="4">Rejected</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Member Type:</label>
              <div className="d-flex">
                <div className="form-check me-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="1"
                    id="authorCheck"
                  />
                  <label className="form-check-label" htmlFor="authorCheck">
                    Author
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="2"
                    id="customerCheck"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="customerCheck">
                    Customer
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Notifications:</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notificationsSwitch"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="notificationsSwitch"
                >
                  Enabled
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="reset" className="btn btn-sm btn-light me-2">
                Reset
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold">Designed for engineers</h1>
          <h3 className="fw-normal text-muted mb-3">
            Build anything you want with Aperture
          </h3>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">
            <a className="icon-link" href="#">
              Learn more
              <svg className="bi" aria-hidden="true">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
            <a className="icon-link" href="#">
              Buy
              <svg className="bi" aria-hidden="true">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-body-tertiary shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-dark shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-dark shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="text-bg-primary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-body-tertiary shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-body shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-body shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-body shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">Another headline</h2>
            <p className="lead">And an even wittier subheading.</p>
          </div>
          <div
            className="bg-body shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "300px",
              borderRadius: "21px 21px 0 0",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Sample1App;
