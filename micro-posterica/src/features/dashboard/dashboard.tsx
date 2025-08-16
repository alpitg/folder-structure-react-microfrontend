const DashboardApp = () => {
  return (
    <div>
      <h1>DashboardApp</h1>
      <p>This is the DashboardApp section of the application.</p>
      <br />

      <div className="d-flex flex-column w-50">
        <div className="card card-flush h-md-50 mb-5 mb-xl-10">
          {/* Header */}
          <div className="card-header pt-5">
            <div className="card-title d-flex flex-column">
              {/* Info */}
              <div className="d-flex align-items-center">
                <span className="fs-4 fw-semibold text-gray-500 me-1 align-self-start">
                  $
                </span>
                <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  69,700
                </span>
                <span className="badge bg-light-success fs-base d-flex align-items-center gap-1">
                  <i className="bi bi-arrow-up text-success fs-5" /> 2.2%
                </span>
              </div>

              {/* Subtitle */}
              <span className="text-gray-500 pt-1 fw-semibold fs-6">
                Projects Earnings in April
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
            {/* Chart placeholder */}
            <div className="d-flex flex-center me-5 pt-2">
              <div
                id="kt_card_widget_17_chart"
                style={{ minWidth: "70px", minHeight: "70px" }}
                data-kt-size="70"
                data-kt-line="11"
              >
                {/* Replace with chart component or library if needed */}
                <canvas width="70" height="70" />
              </div>
            </div>

            {/* Labels */}
            <div className="d-flex flex-column justify-content-center flex-grow-1">
              {/* Leaf CRM */}
              <div className="d-flex fw-semibold align-items-center">
                <div className="bullet w-8px h-3px rounded-2 bg-success me-3" />
                <div className="text-gray-500 flex-grow-1 me-4">Leaf CRM</div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  $7,660
                </div>
              </div>

              {/* Mivy App */}
              <div className="d-flex fw-semibold align-items-center my-3">
                <div className="bullet w-8px h-3px rounded-2 bg-primary me-3" />
                <div className="text-gray-500 flex-grow-1 me-4">Mivy App</div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  $2,820
                </div>
              </div>

              {/* Others */}
              <div className="d-flex fw-semibold align-items-center">
                <div
                  className="bullet w-8px h-3px rounded-2 me-3"
                  style={{ backgroundColor: "#E4E6EF" }}
                />
                <div className="text-gray-500 flex-grow-1 me-4">Others</div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  $45,257
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="row g-6 g-xl-9">
        <div className="col-sm-6 col-xl-4">
          <div className="card h-100">
            <div className="card-header flex-nowrap border-0 pt-9">
              <div className="card-title m-0">
                <div className="symbol symbol-45px w-45px bg-light me-5">
                  {/* <img
                    src="/keen/demo1/assets/media/svg/brand-logos/twitch.svg"
                    alt="Twitch"
                    className="p-3"
                  /> */}

                  <i className="bi bi-graph-up"></i>
                </div>
                <a
                  href="#"
                  className="fs-4 fw-semibold text-hover-primary text-gray-600 m-0"
                >
                  Total Orders
                </a>
              </div>
            </div>

            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
              <div className="fs-2tx fw-bold mb-3">500.00</div>

              <div className="d-flex align-items-center flex-wrap mb-5 mt-auto fs-6">
                <i className="ki-duotone ki-Up-right fs-3 me-1 text-danger"></i>
                <div className="fw-bold text-danger me-2">+40.5%</div>
                <div className="fw-semibold text-gray-500">
                  more impressions
                </div>
              </div>

              <div className="d-flex align-items-center fw-semibold">
                <span className="badge bg-light text-gray-700 px-3 py-2 me-2">
                  0.5%
                </span>
                <span className="text-gray-500 fs-7">MRR</span>
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Recurring"
                >
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="card h-100">
            <div className="card-header flex-nowrap border-0 pt-9">
              <div className="card-title m-0">
                <div className="symbol symbol-45px w-45px bg-light me-5">
                  {/* <img
                    src="/keen/demo1/assets/media/svg/brand-logos/twitch.svg"
                    alt="Twitch"
                    className="p-3"
                  /> */}

                  <i className="bi bi-graph-up"></i>
                </div>
                <a
                  href="#"
                  className="fs-4 fw-semibold text-hover-primary text-gray-600 m-0"
                >
                  Total Customers
                </a>
              </div>
            </div>

            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
              <div className="fs-2tx fw-bold mb-3">500.00</div>

              <div className="d-flex align-items-center flex-wrap mb-5 mt-auto fs-6">
                <i className="ki-duotone ki-Up-right fs-3 me-1 text-danger"></i>
                <div className="fw-bold text-danger me-2">+40.5%</div>
                <div className="fw-semibold text-gray-500">
                  more impressions
                </div>
              </div>

              <div className="d-flex align-items-center fw-semibold">
                <span className="badge bg-light text-gray-700 px-3 py-2 me-2">
                  0.5%
                </span>
                <span className="text-gray-500 fs-7">MRR</span>
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Recurring"
                >
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardApp;
