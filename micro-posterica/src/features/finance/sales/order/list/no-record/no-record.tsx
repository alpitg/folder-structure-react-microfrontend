import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../../../../components/auth/constants/routes.const";
import noRecordImage from "/static/media/img/svg/add-new-1.svg";

const NoRecordApp = () => {
  return (
    <div className="no-record-app">
      <div className="container-xxl">
        <div className="card">
          <div className="card-body">
            <div className="card-px text-center pt-15 pb-15">
              <h2 className="fs-2x fw-bold mb-0">
                Oops! There's nothing here yet.
              </h2>

              <p className="text-gray-500 fs-4 fw-semibold py-7">
                You're all set to create your first record
                <br />
                just click the button below!
              </p>

              <NavLink
                to={ROUTE_URL.FINANCE.SALES.ADD}
                className="btn btn-primary btn-sm"
              >
                <i className="bi bi-plus-lg fs-3"></i>
                Add New Order
              </NavLink>
            </div>

            <div className="text-center pb-15 px-5">
              <img
                src={noRecordImage}
                alt=""
                className="mw-100 h-150px h-sm-325px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoRecordApp;
