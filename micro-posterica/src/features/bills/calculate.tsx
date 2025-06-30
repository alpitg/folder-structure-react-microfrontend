import { useState } from "react";

const BillCalculationApp = () => {
  const [isTableView, setIsTableView] = useState(false);

  const [items, setItems] = useState([
    {
      artName: "",
      width: "",
      height: "",
      frameType: "",
      glassType: "",
      mountType: "",
      quantity: 1,
      total: 0,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        artName: "",
        width: "",
        height: "",
        frameType: "",
        glassType: "",
        mountType: "",
        quantity: 1,
        total: 0,
      },
    ]);
  };

  const removeItem = (index: any) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div>
      <h3>Bill Calculation</h3>
      <p>Calculate the bill here.</p>

      {isTableView ? (
        <div className="p-4">
          {/* Customer and Date */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Customer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" />
            </div>
          </div>

          {/* Line Items */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Art Name</th>
                <th>Width (in)</th>
                <th>Height (in)</th>
                <th>Frame Type</th>
                <th>Glass Type</th>
                <th>Mount Type</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input className="form-control" type="text" />
                  </td>
                  <td>
                    <input className="form-control" type="number" />
                  </td>
                  <td>
                    <input className="form-control" type="number" />
                  </td>
                  <td>
                    <select className="form-select">
                      <option>Select</option>
                    </select>
                  </td>
                  <td>
                    <select className="form-select">
                      <option>Select</option>
                    </select>
                  </td>
                  <td>
                    <select className="form-select">
                      <option>Select</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      value={item.quantity}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={item.total}
                      disabled
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeItem(index)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-outline-primary mb-3" onClick={addItem}>
            + Add Item
          </button>

          {/* Totals */}
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Subtotal</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Discount %</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Discount Amount</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Final Amount</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-4">
            <button className="btn btn-success">Generate Bill</button>
          </div>
        </div>
      ) : (
        <div className="flex-grow-1 p-4">
          <h3>Generate Bill</h3>

          {/* Customer Info */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Customer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" />
            </div>
          </div>

          {/* Line Item Cards */}
          {items.map((item, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-md-4">
                    <label className="form-label">Art Name</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Width (in)</label>
                    <input className="form-control" type="number" />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Height (in)</label>
                    <input className="form-control" type="number" />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Frame Type</label>
                    <select className="form-select">
                      <option>0.5 inch moulding (4mm board)</option>
                      <option>1.25 inch ordinary</option>
                      <option>1.25 inch premium</option>
                      <option>2 inch flat 8mm board</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Glass Type</label>
                    <select className="form-select">
                      <option>None</option>
                      <option>Normal (₹0.35/in²)</option>
                      <option>Acrylic (₹1.39/in²)</option>
                      <option>NR Glass (₹2.78/in²)</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label className="form-label">Mounting</label>
                    <select className="form-select">
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label className="form-label pe-2">Varnish</label>
                    <input className="form-check-input" type="checkbox" />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label pe-2">Lamination</label>
                    <input className="form-check-input" type="checkbox" />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label pe-2">Router Cut</label>
                    <input className="form-check-input" type="checkbox" />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label">Quantity</label>
                    <input
                      className="form-control"
                      type="number"
                      value={item.quantity}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Total Area (in²)</label>
                    <input
                      className="form-control"
                      type="text"
                      value="auto"
                      disabled
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Total (₹)</label>
                    <input
                      className="form-control"
                      type="text"
                      value={item.total}
                      disabled
                    />
                  </div>

                  <div className="col-md-2 d-flex align-items-end">
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => removeItem(index)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="btn btn-outline-primary mb-4" onClick={addItem}>
            + Add Item
          </button>

          {/* Totals */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Subtotal</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Discount %</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Discount Amount</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Final Amount</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="text-end">
            <button className="btn btn-success">Generate Bill</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillCalculationApp;
