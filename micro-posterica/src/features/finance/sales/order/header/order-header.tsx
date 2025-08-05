import { useNavigate } from "react-router";

const OrderHeaderApp = ({
  back,
  header,
  description,
  children,
}: {
  back?: boolean;
  header: string;
  description: string;
  children?: any;
}) => {
  const navigate = useNavigate();

  return (
    <div className="order-header-app flex flex-col gap-4 mb-3">
      <div className="d-flex flex-stack">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3 gap-1">
          <div className="d-flex">
            {back && (
              <button
                onClick={() => navigate(-1)}
                className="text-hover-primary fw-bold btn p-0 me-2"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
            )}
            <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
              {header}
            </h1>
          </div>

          <span className="text-muted">{description}</span>

          {/* <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li className="breadcrumb-item text-muted">
              <a
                href="/keen/demo1/index.html"
                className="text-muted text-hover-primary"
              >
                Sales
              </a>
            </li>
            <li className="breadcrumb-item">
              <span className="bullet bg-gray-500 w-5px h-2px"></span>
            </li>
            <li className="breadcrumb-item text-muted">Order </li>
          </ul> */}
        </div>
        <div className="d-flex align-items-center gap-2 gap-lg-3">
          <div className="d-flex">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeaderApp;
