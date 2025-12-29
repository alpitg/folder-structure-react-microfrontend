import ApexChartApp from "../../components/ui/charts/apex-chart/apex-chart";
import DoughnetCard from "../../components/ui/charts/doughnut-card/doughnet-card";

const DashboardApp = () => {
  return (
    <div>
      <h1>DashboardApp</h1>
      <p>This is the Dashboard section of the application.</p>

      <div className="row gy-5">
        <div className="col-xl-4">
          <div className="card h-md-100" dir="ltr">
            <div className="card-body d-flex flex-column flex-center">
              <div className="mb-2">
                <h1 className="fw-semibold text-gray-800 text-center lh-lg">
                  Quick form to <br />
                  <span className="fw-bolder"> Bid a New Shipment</span>
                </h1>

                <div className="py-10 text-center">
                  <img
                    src="/keen/demo1/assets/media/svg/illustrations/easy/3.svg"
                    className="theme-light-show w-200px"
                    alt=""
                  />
                  <img
                    src="/keen/demo1/assets/media/svg/illustrations/easy/3-dark.svg"
                    className="theme-dark-show w-200px"
                    alt=""
                  />
                </div>
              </div>

              <div className="text-center mb-1">
                <a
                  className="btn btn-sm btn-primary me-2"
                  data-bs-target="#kt_modal_bidding"
                  data-bs-toggle="modal"
                >
                  Start Now{" "}
                </a>
                <a
                  className="btn btn-sm btn-light"
                  href="/keen/demo1/apps/invoices/view/invoice-2.html"
                >
                  Quick Guide
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="row gy-5">
            <div className="col-md-6 col-xl-6">
              <div className="card overflow-hidden h-md-100 mb-5">
                <div className="card-body d-flex justify-content-between flex-column px-0 pb-0">
                  <div className="mb-4 px-9">
                    <div className="d-flex align-items-center mb-2">
                      <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">
                        47,769,700
                      </span>

                      <span className="d-flex align-items-end text-gray-500 fs-6 fw-semibold">
                        Tons
                      </span>
                    </div>

                    <span className="fs-6 fw-semibold text-gray-500">
                      Total Online Sales
                    </span>
                  </div>
                  <ApexChartApp />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-6">
              <div className="card overflow-hidden h-md-100 mb-5">
                <div className="card-body d-flex justify-content-between flex-column px-0 pb-0">
                  <div className="mb-4 px-9">
                    <div className="d-flex align-items-center mb-2">
                      <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">
                        47,769,700
                      </span>

                      <span className="d-flex align-items-end text-gray-500 fs-6 fw-semibold">
                        Tons
                      </span>
                    </div>

                    <span className="fs-6 fw-semibold text-gray-500">
                      Total Online Sales
                    </span>
                  </div>
                  <ApexChartApp />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-6">
              <div className="card card-flush h-md-100 mb-5">
                <div className="card-header pt-5">
                  <div className="card-title d-flex flex-column">
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

                    <span className="text-gray-500 pt-1 fw-semibold fs-6">
                      Projects Earnings in April
                    </span>
                  </div>
                </div>

                <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
                  <div className="d-flex flex-center me-5 pt-2">
                    <DoughnetCard />
                  </div>

                  <div className="d-flex flex-column justify-content-center flex-grow-1">
                    <div className="d-flex fw-semibold align-items-center">
                      <div className="bullet w-8px h-3px rounded-2 bg-success me-3" />
                      <div className="text-gray-500 flex-grow-1 me-4">
                        Leaf CRM
                      </div>
                      <div className="fw-bolder text-gray-700 text-xxl-end">
                        $7,660
                      </div>
                    </div>

                    <div className="d-flex fw-semibold align-items-center my-3">
                      <div className="bullet w-8px h-3px rounded-2 bg-primary me-3" />
                      <div className="text-gray-500 flex-grow-1 me-4">
                        Mivy App
                      </div>
                      <div className="fw-bolder text-gray-700 text-xxl-end">
                        $2,820
                      </div>
                    </div>

                    <div className="d-flex fw-semibold align-items-center">
                      <div
                        className="bullet w-8px h-3px rounded-2 me-3"
                        style={{ backgroundColor: "#E4E6EF" }}
                      />
                      <div className="text-gray-500 flex-grow-1 me-4">
                        Others
                      </div>
                      <div className="fw-bolder text-gray-700 text-xxl-end">
                        $45,257
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-6">
              <div className="card overflow-hidden h-md-100">
                <div className="card-header pt-5">
                  <div className="card-title d-flex flex-column">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
                      604
                    </span>

                    <span className="text-gray-500 pt-1 fw-semibold fs-6">
                      New Customers This Month
                    </span>
                  </div>
                </div>

                <div className="card-body d-flex flex-column justify-content-end pe-0">
                  <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                    Today's Heroes
                  </span>

                  <div className="symbol-group symbol-hover flex-nowrap">
                    <div
                      className="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      data-bs-original-title="Alan Warden"
                      data-kt-initialized="1"
                    >
                      <span className="symbol-label bg-warning text-inverse-warning fw-bold">
                        A
                      </span>
                    </div>
                    <div
                      className="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      aria-label="Michael Eberon"
                      data-bs-original-title="Michael Eberon"
                      data-kt-initialized="1"
                    >
                      {/* <img
                        alt="Pic"
                        src="/keen/demo1/assets/media/avatars/300-11.jpg"
                      /> */}
                    </div>
                    <div
                      className="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      data-bs-original-title="Susan Redwood"
                      data-kt-initialized="1"
                    >
                      <span className="symbol-label bg-primary text-inverse-primary fw-bold">
                        S
                      </span>
                    </div>
                    <div
                      className="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      aria-label="Melody Macy"
                      data-bs-original-title="Melody Macy"
                      data-kt-initialized="1"
                    >
                      {/* <img
                        alt="Pic"
                        src="/keen/demo1/assets/media/avatars/300-2.jpg"
                      /> */}
                    </div>
                    <div
                      className="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      data-bs-original-title="Perry Matthew"
                      data-kt-initialized="1"
                    >
                      <span className="symbol-label bg-danger text-inverse-danger fw-bold">
                        P
                      </span>
                    </div>
                    <div
                      className="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      aria-label="Barry Walter"
                      data-bs-original-title="Barry Walter"
                      data-kt-initialized="1"
                    >
                      {/* <img
                        alt="Pic"
                        src="/keen/demo1/assets/media/avatars/300-12.jpg"
                      /> */}
                    </div>
                    <a
                      href="#"
                      className="symbol symbol-35px symbol-circle"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_view_users"
                    >
                      <span className="symbol-label bg-light text-gray-400 fs-8 fw-bold">
                        +42
                      </span>
                    </a>
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

export default DashboardApp;
