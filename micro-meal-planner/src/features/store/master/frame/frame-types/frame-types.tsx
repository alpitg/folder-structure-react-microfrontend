import { useEffect, useState } from "react";

import type { AppDispatch } from "../../../../../app/store";
import type { AppState } from "../../../../../app/store";
import { fetchFrameTypes } from "../../../../../app/redux/master/frame-types/frame-types.thunk";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const FrameTypesMasterApp = () => {
  const [editFrameType, setEditFrameType] = useState(false);

  const { frameTypes } = useSelector(
    (state: AppState) => state?.master?.frameTypes
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFrameTypes());
  }, []);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Frame Types Master</h3>
        <button
          className="btn btn-primary"
          onClick={() => setEditFrameType(!editFrameType)}
        >
          {editFrameType ? "Close Form" : "+ Add Frame Type"}
        </button>
      </div>
      {editFrameType && (
        <div className="edit-frame-type">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="container mt-4">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Frame Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Standard, Premium"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Multiplier</label>
                    <input type="number" className="form-control" step="0.01" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <br />
        </div>
      )}

      {frameTypes?.length === 0 && (
        <div className="alert alert-info" role="alert">
          No data available. Please add a new one.
        </div>
      )}

      <div className="row">
        {frameTypes?.map((frame) => (
          <div key={frame.id} className="col-md-4 g-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{frame.name}</h5>
                <p className="card-text">
                  <strong>Category:</strong> {frame.category}
                </p>
                <p className="card-text">
                  <strong>Base Cost:</strong> ₹{frame.baseCost}
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-sm btn-outline-secondary">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameTypesMasterApp;
