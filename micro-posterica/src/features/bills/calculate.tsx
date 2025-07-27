import "./calculate.scss";

import type { AppDispatch, AppState } from "../../app/store";
import type {
  IArtDetail,
  ITotalCalculationInput,
} from "../../interfaces/total-calculation.model";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import InvoiceApp from "./invoice/invoice";
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

  const chargableWidth = (item: IArtDetail) => {
    const width = parseFloat(item.width) || 0;
    const mountingLeft = parseFloat(String(item?.mounting?.left)) || 0;
    const mountingRight = parseFloat(String(item?.mounting?.right)) || 0;
    return width + mountingLeft + mountingRight;
  };

  const chargableHeight = (item: IArtDetail) => {
    const height = parseFloat(item.height) || 0;
    const mountingTop = parseFloat(String(item?.mounting?.top)) || 0;
    const mountingBottom = parseFloat(String(item?.mounting?.bottom)) || 0;
    return height + mountingTop + mountingBottom;
  };

  const totalItemArea = (item: IArtDetail) => {
    return item?.mounting?.isEnabled
      ? chargableWidth(item) * chargableHeight(item)
      : parseFloat(item.width) || 0 * parseFloat(item.height) || 0;
  };

  const totalItem = (item: IArtDetail): number => {
    const quantity = parseInt(String(item.quantity)) || 1;

    // Calculate area with mounting if enabled
    const area = totalItemArea(item);

    // const frame = item.frame.type
    //   ? frameTypes.find((frame) => frame.name === item.frame.type)
    //   : null;
    // const frameWidth = chargableWidth(item);
    // const frameHeight = chargableHeight(item);
    // const frameRate = frame ? frame.baseCost || 0 : 0;
    // const frameCostPerInch = frameRate / (frameWidth * frameHeight);

    // Calculate frame cost per inch
    const frameCostPerInch =
      frameTypes.find((frame) => frame.name === item.frame.type)?.baseCost || 0;

    // Calculate total frame cost based on area
    const totalFrameCost = frameCostPerInch;

    // Calculate glass cost if glass is enabled and type is selected
    const glassCost = item?.glass?.isEnabled
      ? glassTypes.find((glass) => glass.name === item?.glass?.type)?.rate || 0
      : 0;

    // Calculate additional costs
    const additionalCosts = Object.values(item.additional).reduce(
      (sum, value) => (value ? sum + 50 : sum), // Assuming each additional service costs ₹50
      0
    );

    return (
      parseFloat(
        (
          (area * glassCost + totalFrameCost + additionalCosts) *
          quantity
        ).toFixed(2)
      ) || 0
    );
  };

  const calculateTotalAmount = (): number => {
    return bill.artDetails.reduce((total, item) => total + item.total, 0);
  };

  const [bill, setBill] = useState<ITotalCalculationInput>({
    customerName: "",
    likelyDateOfDelivery: "",
    expectedDeliveryDate: "",
    artDetails: [
      {
        artName: "",
        width: "",
        height: "",
        mounting: {
          isEnabled: false,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: undefined,
          height: undefined,
        },
        frame: {
          type: "",
          width: 0,
          height: 0,
        },
        glass: {
          isEnabled: false,
          type: "",
          width: undefined,
          height: undefined,
        },
        additional: {
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
    parseInt(updatedArtDetails[index].quantity.toString()) || 1;
    updatedArtDetails[index].total = totalItem(updatedArtDetails[index]);

    const subtotal = calculateTotalAmount();

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
          mounting: {
            isEnabled: false,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: undefined,
            height: undefined,
          },
          frame: {
            type: "",
            width: 0,
            height: 0,
          },
          glass: {
            isEnabled: false,
            type: "",
            width: undefined,
            height: undefined,
          },
          additional: {
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

      {bill.artDetails.map((item, index) => (
        <div className="row mb-3">
          <div className="col-md-8">
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

                  <div className="row g-2">
                    <div className="col-md-2">
                      <label className="form-label pe-2">Mounting</label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item?.mounting?.isEnabled}
                        onChange={(e) =>
                          handleInputChange(index, "mounting", {
                            ...item.mounting,
                            isEnabled: e.target.checked,
                          })
                        }
                      />
                    </div>

                    {item?.mounting?.isEnabled && (
                      <div style={{ marginTop: "20px" }}>
                        <h3>Enter Dimensions (in square inches):</h3>
                        <div>
                          <label>
                            Top:
                            <input
                              type="number"
                              name="top"
                              value={item?.mounting?.top ?? 0}
                              onChange={(e) =>
                                handleInputChange(index, "mounting", {
                                  ...item.mounting,
                                  top: e.target.value,
                                })
                              }
                              placeholder="Top (sq in)"
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Right:
                            <input
                              type="number"
                              name="right"
                              value={item?.mounting?.right ?? 0}
                              onChange={(e) =>
                                handleInputChange(index, "mounting", {
                                  ...item.mounting,
                                  right: e.target.value,
                                })
                              }
                              placeholder="Right (sq in)"
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Bottom:
                            <input
                              type="number"
                              name="bottom"
                              value={item?.mounting?.bottom ?? 0}
                              onChange={(e) =>
                                handleInputChange(index, "mounting", {
                                  ...item.mounting,
                                  bottom: e.target.value,
                                })
                              }
                              placeholder="Bottom (sq in)"
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Left:
                            <input
                              type="number"
                              name="left"
                              value={item?.mounting?.left ?? 0}
                              onChange={(e) =>
                                handleInputChange(index, "mounting", {
                                  ...item.mounting,
                                  left: e.target.value,
                                })
                              }
                              placeholder="Left (sq in)"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="row g-2">
                    <div className="col-md-2">
                      <label className="form-label pe-2">Glass</label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item?.glass?.isEnabled}
                        onChange={(e) =>
                          handleInputChange(index, "glass", {
                            ...item.glass,
                            isEnabled: e.target.checked,
                          })
                        }
                      />
                    </div>

                    {item?.glass?.isEnabled && (
                      <div className="col-md-4">
                        <label className="form-label">Glass Type</label>
                        <select
                          className="form-select"
                          value={item?.glass?.type}
                          onChange={(e) =>
                            handleInputChange(index, "glass", {
                              ...item.glass,
                              type: e.target.value,
                            })
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
                    )}
                  </div>

                  <div className="row g-2">
                    <div className="col-md-4">
                      <label className="form-label">Frame Type</label>
                      <select
                        className="form-select"
                        value={item?.frame?.type}
                        onChange={(e) =>
                          handleInputChange(index, "frame", {
                            ...item.frame,
                            type: e.target.value,
                          })
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
                    <div className="col-md-2">
                      <label className="form-label">Frame Color</label>
                      <input
                        className="form-control"
                        type="text"
                        value={item?.frame?.color}
                        onChange={(e) =>
                          handleInputChange(index, "frame", {
                            ...item.frame,
                            color: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Frame width (Inches)</label>
                      <input
                        className="form-control"
                        type="number"
                        value={item?.frame?.width}
                        onChange={(e) =>
                          handleInputChange(index, "frame", {
                            ...item.frame,
                            width: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">
                        Frame height (Inches)
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={item?.frame?.height}
                        onChange={(e) =>
                          handleInputChange(index, "frame", {
                            ...item.frame,
                            height: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="row g-2">
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
          </div>
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <br />
                <span>
                  Chargable width:
                  <b>
                    {Number(item.width) +
                      (item?.mounting?.isEnabled
                        ? Number(item?.mounting?.top || 0) +
                          Number(item?.mounting?.bottom || 0)
                        : 0)}
                  </b>
                  (in)
                  <br />
                </span>
                <span>
                  Chargable height:
                  <b>
                    {Number(item.height) +
                      (item?.mounting?.isEnabled
                        ? Number(item?.mounting?.left || 0) +
                          Number(item?.mounting?.right || 0)
                        : 0)}
                  </b>
                  (in)
                </span>
                <br />
                <span>
                  Total area:
                  <b>{totalItemArea(item)}</b>
                  square inches
                </span>
                <br />
                <br />
                <div className="col-md-6 d-flex">
                  <label className="form-label">{"Total "} </label>
                  <h4>₹{totalItem(item)}</h4>
                </div>
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
            value={calculateTotalAmount()}
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
      <br />
      <InvoiceApp />
    </div>
  );
};

export default BillCalculationApp;
