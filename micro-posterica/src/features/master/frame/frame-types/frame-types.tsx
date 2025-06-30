import { useState } from "react";

const FrameTypesMasterApp = () => {
  const [frameTypes, setFrameTypes] = useState([
    {
      id: 1,
      name: "0.5 inch moulding (4mm board)",
      category: "Standard Framing",
      baseCost: 0,
    },
    {
      id: 2,
      name: "1.25 inch moulding ordinary/plain",
      category: "Standard Framing",
      baseCost: 403.2,
    },
    {
      id: 3,
      name: "1.25 inch premium Black/Silver",
      category: "Standard Framing",
      baseCost: 491.62,
    },
    {
      id: 4,
      name: "2 inch Flat moulding (8mm board)",
      category: "Standard Framing",
      baseCost: 619.2,
    },
    {
      id: 5,
      name: "Double Box frame with glass",
      category: "Double Box Frame",
      baseCost: 1321.0,
    },
    {
      id: 6,
      name: "Basic Stretch Canvas",
      category: "Stretch Canvas",
      baseCost: 481.0,
    },
    {
      id: 7,
      name: "Sandwich glass with 0.5 inch frame",
      category: "Sandwich Glass Frame",
      baseCost: 1760.0,
    },
    {
      id: 8,
      name: "Floater frame",
      category: "Floater Frame",
      baseCost: 1200.0,
    },
    {
      id: 9,
      name: "Clip on LED frame",
      category: "Clip on LED Frame",
      baseCost: 1575.52,
    },
  ]);

  const [editFrameType, setEditFrameType] = useState(false);

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
      {frameTypes.length === 0 && (
        <div className="alert alert-info" role="alert">
          No frame types available. Please add a new frame type.
        </div>
      )}

      <div className="row">
        {frameTypes.map((frame) => (
          <div key={frame.id} className="col-md-4 mb-3">
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
