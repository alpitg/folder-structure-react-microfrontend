import { useState } from "react";

const MiscChargesMasterApp = () => {
  const [charges] = useState([
    { id: 1, name: "Varnish (3 coats)", cost: 94.53 },
    { id: 2, name: "Lamination", cost: 127.0 },
    { id: 3, name: "MDF Router Cutting (8mm)", cost: 151.25 },
  ]);

  return (
    <div className="container my-4">
      <h3>Miscellaneous Charges Master</h3>
      <div className="row">
        {charges.map((charge) => (
          <div key={charge.id} className="col-md-4 mb-3">
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
