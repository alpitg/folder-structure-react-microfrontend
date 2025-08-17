import { useNavigate } from "react-router";

const CustomerHeaderApp = ({
  back,
  header,
  description,
  children,
}: {
  back?: boolean;
  header: string;
  description: string;
  children?: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <div className="customer-header-app flex flex-col gap-4 mb-3">
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
        </div>
        <div className="d-flex align-items-center gap-2 gap-lg-3">
          <div className="d-flex">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeaderApp;
