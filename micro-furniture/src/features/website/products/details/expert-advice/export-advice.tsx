import { GetEnvConfig } from "../../../../../app.config";
import "./export-advice.scss";

const ExportAdviceApp = () => {
  const appSetting = GetEnvConfig();

  return (
    <div className="expert-advice-app bg-light rounded-3 p-4 p-md-4 shadow-sm">
      <div className="row align-items-center g-3">
        <div className="col-md-7">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center expert-icon">
              <i className="bi bi-telephone-fill text-danger fs-4"></i>
            </div>

            <div>
              <h5 className="mb-1 fw-bold">Need Expert Advice?</h5>
              <p className="mb-0 text-muted small">
                Get help from our furniture experts
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <a
            href={`tel:${appSetting?.homePage?.contactDetails?.whatsapp?.number}`}
            className="btn btn-warning w-100 rounded-pill fw-semibold py-2"
          >
            <i className="bi bi-telephone me-2"></i>
            Call {appSetting?.homePage?.contactDetails?.whatsapp?.number}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExportAdviceApp;
