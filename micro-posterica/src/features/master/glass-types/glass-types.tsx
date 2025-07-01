import type { AppDispatch, AppState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchGlassTypes } from "../../../app/features/master/glass-types/glass-types.thunk";
import { useEffect } from "react";

const GlassTypesMasterApp = () => {
  const { glassTypes } = useSelector(
    (state: AppState) => state?.master?.glassTypes
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGlassTypes());
  }, []);

  return (
    <div className="container my-4">
      <h3>Glass Types Master</h3>

      <div className="row">
        {glassTypes.map((glass) => (
          <div key={glass.id} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{glass.name}</h5>
                <p className="card-text">Rate: ₹{glass?.rate} {glass?.rateIn}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlassTypesMasterApp;
