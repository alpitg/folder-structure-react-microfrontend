import ApexChartApp from "../../components/ui/charts/apex-chart/apex-chart";
import DoughnetCard from "../../components/ui/charts/doughnut-card/doughnet-card";
import { Link } from "react-router";
import { ROUTE_URL } from "../../routes/constants/routes.const";

const DashboardApp = () => {
  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4 mb-8">
        <div>
          <h1 className="fw-bold text-gray-800 mb-3">Meal Planner Dashboard</h1>
          <p className="text-gray-600 mb-0">
            Track weekly meal planning, ingredient inventory, maid-friendly
            recipes, and estimated grocery cost all from one view.
          </p>
          <p className="text-gray-600 mb-0">
            Daily cooking assistant for Indian homes
          </p>
        </div>
        <div className="d-flex flex-wrap gap-3">
          <Link
            to={ROUTE_URL.MEAL_PLANNER.MEAL_REQUEST}
            className="btn btn-primary btn-sm"
          >
            <i className="bi bi-plus-lg me-1"></i>
            Create Meal Request
          </Link>
          <Link
            to={ROUTE_URL.MEAL_PLANNER.WEEKLY_PLAN}
            className="btn btn-light btn-sm"
          >
            View Shopping List
          </Link>
        </div>
      </div>

      <div className="row g-5 mb-8">
        <div className="col-sm-6 col-xl-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <span className="fs-3 fw-bold text-gray-900">21</span>
                  <p className="text-gray-500 mb-0">Weekly meals planned</p>
                </div>
                <span className="badge bg-light-success text-success">
                  <i className="bi bi-calendar2-week me-1"></i>7 days
                </span>
              </div>
              <div className="progress h-6px bg-light-info">
                <div
                  className="progress-bar bg-info"
                  style={{ width: "84%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <span className="fs-3 fw-bold text-gray-900">8</span>
                  <p className="text-gray-500 mb-0">Maid mode recipes</p>
                </div>
                <span className="badge bg-light-warning text-warning">
                  <i className="bi bi-emoji-smile me-1"></i>Easy cook
                </span>
              </div>
              <div className="progress h-6px bg-light-warning">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "64%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <span className="fs-3 fw-bold text-gray-900">5</span>
                  <p className="text-gray-500 mb-0">Ingredients in stock</p>
                </div>
                <span className="badge bg-light-primary text-primary">
                  <i className="bi bi-box-seam me-1"></i>Ready
                </span>
              </div>
              <div className="progress h-6px bg-light-primary">
                <div
                  className="progress-bar bg-primary"
                  style={{ width: "71%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <span className="fs-3 fw-bold text-gray-900">₹592</span>
                  <p className="text-gray-500 mb-0">Estimated weekly cost</p>
                </div>
                <span className="badge bg-light-danger text-danger">
                  <i className="bi bi-currency-rupee me-1"></i>Budget
                </span>
              </div>
              <div className="progress h-6px bg-light-danger">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "52%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5 mb-8">
        <div className="col-xl-8">
          <div className="card h-100 shadow-sm">
            <div className="card-header border-0 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div>
                <h3 className="fw-bold text-gray-800 mb-1">
                  Weekly meal trend
                </h3>
                <p className="text-gray-600 mb-0">
                  Monitor meal preparation and planning activity through the
                  week.
                </p>
              </div>
              <div className="badge bg-light-success text-success">
                Planning on track
              </div>
            </div>
            <div className="card-body pb-4">
              <ApexChartApp />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header border-0">
              <h3 className="fw-bold text-gray-800 mb-0">Meal type mix</h3>
              <p className="text-gray-600 mb-0 fs-7">
                How this week's meals are distributed.
              </p>
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-center mb-6">
                <DoughnetCard />
              </div>
              <div className="row text-center">
                <div className="col-4">
                  <span className="d-block fs-3 fw-bold text-gray-900">
                    45%
                  </span>
                  <span className="fs-8 text-gray-600">Breakfast</span>
                </div>
                <div className="col-4">
                  <span className="d-block fs-3 fw-bold text-gray-900">
                    35%
                  </span>
                  <span className="fs-8 text-gray-600">Lunch</span>
                </div>
                <div className="col-4">
                  <span className="d-block fs-3 fw-bold text-gray-900">
                    20%
                  </span>
                  <span className="fs-8 text-gray-600">Dinner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5 mb-8">
        <div className="col-xl-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header border-0">
              <h3 className="fw-bold text-gray-800 mb-0">Today’s plan</h3>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h6 className="fw-semibold text-gray-900">Breakfast</h6>
                <p className="text-gray-600">
                  Aloo Paratha with chutney — easy and quick for maid
                  preparation.
                </p>
              </div>
              <div className="mb-4">
                <h6 className="fw-semibold text-gray-900">Lunch</h6>
                <p className="text-gray-600">
                  Paneer Tomato Rice — balanced protein and simple steps.
                </p>
              </div>
              <div>
                <h6 className="fw-semibold text-gray-900">Dinner</h6>
                <p className="text-gray-600">
                  Aloo Tomato Curry — mild spice and easy cooking.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header border-0">
              <h3 className="fw-bold text-gray-800 mb-0">
                Shopping highlights
              </h3>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <span className="badge bg-light-primary text-primary mb-2 d-inline-block">
                  Top ingredient
                </span>
                <p className="mb-0">
                  Paneer is the highest cost ingredient this week, budget ₹250.
                </p>
              </div>
              <div className="mb-4">
                <span className="badge bg-light-success text-success mb-2 d-inline-block">
                  Saver tip
                </span>
                <p className="mb-0">
                  Buy seasonal tomatoes and potatoes to keep cost lower.
                </p>
              </div>
              <div>
                <span className="badge bg-light-warning text-warning mb-2 d-inline-block">
                  Maid mode
                </span>
                <p className="mb-0">
                  5 recipes ready for maid-friendly cooking with simple steps.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header border-0">
              <h3 className="fw-bold text-gray-800 mb-0">Planner actions</h3>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                  Review recipes
                  <span className="badge bg-info text-white">7</span>
                </li>
                <li className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                  Add ingredients
                  <span className="badge bg-primary text-white">5 items</span>
                </li>
                <li className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                  Generate list
                  <span className="badge bg-success text-white">Done</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardApp;
