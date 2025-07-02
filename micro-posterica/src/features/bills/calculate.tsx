import "./calculate.scss";

import type { AppDispatch, AppState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import type { ITotalCalculationInput } from "../../interfaces/total-calculation.model";
import { fetchFrameTypes } from "../../app/features/master/frame-types/frame-types.thunk";
import { fetchGlassTypes } from "../../app/features/master/glass-types/glass-types.thunk";
import { generateQRCode } from "../../utils/qrcode.util";

const BillCalculationApp = () => {
  const {
    glassTypes: { glassTypes },
    frameTypes: { frameTypes },
    miscCharges: { miscCharges },
  } = useSelector((state: AppState) => state?.master);

  const dispatch = useDispatch<AppDispatch>();
  // const [isTableView, setIsTableView] = useState(false);
  const [qrCode, setQRCode] = useState("");

  const [bill, setBill] = useState<ITotalCalculationInput>({
    customerName: "",
    likelyDateOfDelivery: "",
    expectedDeliveryDate: "",
    artDetails: [
      {
        artName: "",
        width: "",
        height: "",
        frameType: "",
        glassType: "",
        additional: {
          mounting: false,
          varnish: false,
          lamination: false,
          routerCut: false,
        },
        quantity: 1,
        total: 0,
      },
    ],
    subtotal: 0,
    discountPercentage: 0,
    discountAmount: 0,
    finalAmount: 0,
    miscCharges: [],
    miscChargesAmount: 0,
    totalAmount: 0,
    advancePayment: 0,
    balanceAmount: 0,
    paymentStatus: "Pending",
    createdAt: new Date().toISOString(),
  });

  const handleInputChange = (
    index: number,
    field: string,
    value: object | string | number
  ) => {
    const updatedArtDetails = [...bill.artDetails];
    updatedArtDetails[index] = {
      ...updatedArtDetails[index],
      [field]: value,
    };

    // Auto-calculate total for the item
    if (field === "width" || field === "height" || field === "quantity") {
      const width = parseFloat(updatedArtDetails[index].width) || 0;
      const height = parseFloat(updatedArtDetails[index].height) || 0;
      const quantity =
        parseInt(updatedArtDetails[index].quantity.toString()) || 1;
      updatedArtDetails[index].total = width * height * quantity;
    }

    const subtotal = updatedArtDetails.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const discountAmount = (subtotal * bill.discountPercentage) / 100;
    const finalAmount = subtotal - discountAmount;
    const balanceAmount = finalAmount - bill.advancePayment;

    setBill({
      ...bill,
      artDetails: updatedArtDetails,
      subtotal,
      discountAmount,
      finalAmount,
      balanceAmount,
    });
  };

  const handleDiscountChange = (field: string, value: number) => {
    const discountPercentage =
      field === "discountPercentage" ? value : bill.discountPercentage;
    const discountAmount =
      field === "discountAmount" ? value : (bill.subtotal * value) / 100;
    const finalAmount = bill.subtotal - discountAmount;

    setBill({
      ...bill,
      discountPercentage,
      discountAmount,
      finalAmount,
    });
  };

  const handleAdvancePaymentChange = (field: string, value: number) => {
    const advancePayment =
      field === "advancePayment" ? value : bill.advancePayment;
    const balanceAmount = bill.finalAmount - advancePayment;

    setBill({
      ...bill,
      [field]: advancePayment,
      balanceAmount,
    });
  };

  const handleAddItem = () => {
    setBill({
      ...bill,
      artDetails: [
        ...bill.artDetails,
        {
          artName: "",
          width: "",
          height: "",
          frameType: "",
          glassType: "",
          additional: {
            mounting: false,
            varnish: false,
            lamination: false,
            routerCut: false,
          },
          quantity: 1,
          total: 0,
        },
      ],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedArtDetails = bill.artDetails.filter((_, i) => i !== index);
    const subtotal = updatedArtDetails.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const discountAmount = (subtotal * bill.discountPercentage) / 100;
    const finalAmount = subtotal - discountAmount;

    const balanceAmount = finalAmount - bill.advancePayment;

    setBill({
      ...bill,
      artDetails: updatedArtDetails,
      subtotal,
      discountAmount,
      finalAmount,
      balanceAmount,
    });
  };

  const generateBill = () => {
    // Logic to generate the bill, e.g., save to database or print
    console.log("Bill Generated:", bill);

    generateQRCode(bill)?.then((qrCode) => {
      if (qrCode) {
        setQRCode(qrCode);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchFrameTypes());
    dispatch(fetchGlassTypes());
  }, []);

  return (
    <div className="bill-calculation-app">
      <h3>Bill Calculation</h3>
      <p>Calculate the bill here.</p>

      {/* Customer Info */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="row mb-3 g-2">
            <div className="col-md-12">
              <label className="form-label">Customer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer name"
                value={bill.customerName}
                onChange={(e) =>
                  setBill({ ...bill, customerName: e.target.value })
                }
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Likely date of delivery</label>
              <input
                type="date"
                className="form-control"
                value={bill.likelyDateOfDelivery}
                onChange={(e) =>
                  setBill({ ...bill, likelyDateOfDelivery: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {qrCode && (
            <div className="qrcode">
              <div className="card mb-3">
                <div className="card-body">
                  <img id="qrcode" alt="QR Code" src={qrCode} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Line Item Cards */}
      {bill.artDetails.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <div className="row g-2">
              <div className="col-md-4">
                <label className="form-label">Art Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={item.artName}
                  onChange={(e) =>
                    handleInputChange(index, "artName", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Width (in)</label>
                <input
                  className="form-control"
                  type="number"
                  value={item.width}
                  onChange={(e) =>
                    handleInputChange(index, "width", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Height (in)</label>
                <input
                  className="form-control"
                  type="number"
                  value={item.height}
                  onChange={(e) =>
                    handleInputChange(index, "height", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Frame Type</label>
                <select
                  className="form-select"
                  value={item.frameType}
                  onChange={(e) =>
                    handleInputChange(index, "frameType", e.target.value)
                  }
                >
                  <option value="">None</option>
                  {frameTypes.map((frame) => (
                    <option key={frame.id} value={frame.name}>
                      {frame.name} {frame.category} - (₹ {frame.baseCost})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Glass Type</label>
                <select
                  className="form-select"
                  value={item.glassType}
                  onChange={(e) =>
                    handleInputChange(index, "glassType", e.target.value)
                  }
                >
                  <option value="">None</option>
                  {glassTypes.map((glass) => (
                    <option key={glass.id} value={glass.name}>
                      {glass.name} (₹{glass.rate} {glass.rateIn})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label pe-2">Mounting</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item?.additional?.mounting}
                  onChange={(e) =>
                    handleInputChange(index, "additional", {
                      ...item.additional,
                      mounting: e.target.checked,
                    })
                  }
                />
              </div>
              <div className="col-md-2">
                <label className="form-label pe-2">Varnish</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item?.additional?.varnish}
                  onChange={(e) =>
                    handleInputChange(index, "additional", {
                      ...item.additional,
                      varnish: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="col-md-2">
                <label className="form-label pe-2">Lamination</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item?.additional?.lamination}
                  onChange={(e) =>
                    handleInputChange(index, "additional", {
                      ...item.additional,
                      lamination: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="col-md-2">
                <label className="form-label pe-2">Router Cut</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item?.additional?.routerCut}
                  onChange={(e) =>
                    handleInputChange(index, "additional", {
                      ...item.additional,
                      routerCut: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Quantity</label>
                <input
                  className="form-control"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                />
              </div>

              {/* <div className="col-md-3">
                <label className="form-label">Total Area (in²)</label>
                <input
                  className="form-control"
                  type="text"
                  value="auto"
                  disabled
                />
              </div> */}

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
                  onClick={() => handleRemoveItem(index)}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-outline-primary mb-4" onClick={handleAddItem}>
        + Add Item
      </button>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Subtotal</label>
          <input
            type="text"
            className="form-control"
            value={bill.subtotal}
            disabled
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Discount %</label>
          <input
            type="number"
            className="form-control"
            value={bill.discountPercentage}
            onChange={(e) =>
              handleDiscountChange(
                "discountPercentage",
                parseFloat(e.target.value)
              )
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Discount Amount</label>
          <input
            type="number"
            className="form-control"
            value={bill.discountAmount}
            onChange={(e) =>
              handleDiscountChange("discountAmount", parseFloat(e.target.value))
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Final Amount</label>
          <input
            type="text"
            className="form-control"
            value={bill.finalAmount}
            disabled
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Advance Payment</label>
          <input
            type="number"
            className="form-control"
            value={bill.advancePayment}
            onChange={(e) =>
              handleAdvancePaymentChange(
                "advancePayment",
                parseFloat(e.target.value)
              )
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Balance Amount</label>
          <input
            type="text"
            className="form-control"
            value={bill.balanceAmount}
            disabled
          />
        </div>
      </div>

      <div className="text-end">
        <button className="btn btn-success" onClick={generateBill}>
          Generate Bill
        </button>
      </div>
    </div>
  );
};

export default BillCalculationApp;
