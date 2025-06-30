import { useState } from "react";

const GlassTypesMasterApp = () => {
  const [glassTypes] = useState([
    { id: 1, name: "Normal", rate: 0.35 },
    { id: 2, name: "Acrylic", rate: 1.39 },
    { id: 3, name: "NR Glass", rate: 2.78 },
  ]);

  return (
    <div className="container my-4">
      <h3>Glass Types Master</h3>
      <div className="row">
        {glassTypes.map((glass) => (
          <div key={glass.id} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{glass.name}</h5>
                <p className="card-text">Rate: ₹{glass.rate} per sq. inch</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlassTypesMasterApp;
