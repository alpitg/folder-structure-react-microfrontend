import type { ShoppingItem } from "./weekly-meal-planner";

interface EstimatedCostProps {
  items: ShoppingItem[];
}

const EstimatedCost = ({ items }: EstimatedCostProps) => {
  const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
  const days = 7;
  const averagePerDay = totalCost / days;
  const uniqueItems = new Set(items.map((item) => item.name)).size;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header border-0 bg-light">
        <h5 className="fw-bold text-gray-800 mb-0">Estimated Weekly Cost</h5>
      </div>
      <div className="card-body">
        <div className="row gy-4">
          <div className="col-12">
            <div className="rounded-3 bg-light-primary p-5">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <span className="fs-7 fw-semibold text-gray-600 d-block">
                    Total weekly expense
                  </span>
                  <span className="fs-2hx fw-bold text-primary">
                    ₹{totalCost.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="fs-7 fw-semibold text-gray-600 d-block">
                    Average per day
                  </span>
                  <span className="fs-3 fw-bold text-primary">
                    ₹{averagePerDay.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="rounded-3 bg-light-success p-4">
              <span className="fs-7 fw-semibold text-success d-block mb-2">
                Unique ingredients
              </span>
              <span className="fs-2 fw-bold text-success">{uniqueItems}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="rounded-3 bg-light-warning p-4">
              <span className="fs-7 fw-semibold text-warning d-block mb-2">
                Average item cost
              </span>
              <span className="fs-2 fw-bold text-warning">
                ₹{(totalCost / items.length).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedCost;
