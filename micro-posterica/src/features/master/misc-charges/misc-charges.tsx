import type { AppDispatch, AppState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchMiscCharges } from "../../../app/features/master/misc-charges/misc-charges.thunk";
import { useEffect } from "react";

const MiscChargesMasterApp = () => {
  const { miscCharges: charges } = useSelector(
    (state: AppState) => state?.master?.miscCharges
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMiscCharges());
  }, []);

  return (
    <div className="container my-4">
      <h3>Miscellaneous Charges Master</h3>

      {charges?.length === 0 && (
        <div className="alert alert-info" role="alert">
          No data available. Please add a new one.
        </div>
      )}

      <div className="row">
        {charges.map((charge) => (
          <div key={charge.id} className="col-sm-4 g-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{charge.name}</h5>
                <p className="card-text">Cost: ₹{charge.cost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiscChargesMasterApp;
