import "./create-invoice.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../../../../app/store";
import { fetchProfile } from "../../../../app/features/core/profile/profile-detail.thunk";
import {
  ArtDetail,
  TotalCalculationInput,
  type IArtDetail,
  type IInvoiceDetail,
  type ITotalCalculationInput,
} from "../../../../interfaces/total-calculation.model";
import { fetchFrameTypes } from "../../../../app/features/master/frame-types/frame-types.thunk";
import { fetchGlassTypes } from "../../../../app/features/master/glass-types/glass-types.thunk";
import { fetchMiscCharges } from "../../../../app/features/master/misc-charges/misc-charges.thunk";
import { BillCalculation } from "../../utils/bill-calculation.util";

const CreateInvoiceApp = () => {
  const {
    master: {
      glassTypes: { glassTypes },
      frameTypes: { frameTypes },
      miscCharges: { miscCharges },
    },
  } = useSelector((state: AppState) => state);

  const dispatch = useDispatch<AppDispatch>();

  const [bill, setBill] = useState<ITotalCalculationInput>(
    new TotalCalculationInput()
  );

  const paymentModes = [
    { name: "UPI", value: "upi" },
    { name: "Cash", value: "cash" },
    { name: "Card", value: "card" },
  ];

  //#region methods

  const calculateTotalAmount = (): number => {
    return bill.artDetails.reduce((cost, item) => cost + item.unitPrice, 0);
  };

  const handleAddItem = () => {
    setBill({
      ...bill,
      artDetails: [...bill.artDetails, new ArtDetail()],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedArtDetails = bill.artDetails.filter((_, i) => i !== index);

    setBill({
      ...bill,
      artDetails: updatedArtDetails,
    });
  };

  const handleInputChange = (
    index: number,
    field: keyof IArtDetail | "mounting" | "glass" | "frame" | "additional",
    value: object | string | number
  ) => {
    if (index < 0 || index >= bill.artDetails.length) return;

    const updatedArtDetails = [...bill.artDetails];
    updatedArtDetails[index] = {
      ...updatedArtDetails[index],
      [field]: value,
    };

    const unitCost = new BillCalculation(
      frameTypes,
      glassTypes,
      miscCharges
    ).unitCost(updatedArtDetails[index]);

    // Auto-calculate total for the item
    updatedArtDetails[index].unitPrice = unitCost;

    setBill({
      ...bill,
      artDetails: updatedArtDetails,
    });
  };

  const handlePaymentChange = (field: string, value: number) => {
    const validValue = isNaN(value) ? 0 : value;

    setBill({
      ...bill,
      [field]: validValue,
    });
  };

  const handleDateChange = (field: string, value: string) => {
    setBill({
      ...bill,
      [field]: value,
    });
  };

  const handleInvoiceChange = (
    field: keyof IInvoiceDetail,
    value: string | number | object
  ) => {
    setBill({
      ...bill,
      invoice: {
        ...bill.invoice,
        [field]: value,
      },
    });
  };
  const handleInvoice = () => {
    console.log(bill);
  };

  const chargableArea = (item: IArtDetail) => {
    const billDetails = new BillCalculation(
      frameTypes,
      glassTypes,
      miscCharges
    );

    const width = billDetails?.chargableWidth(item);
    const height = billDetails?.chargableHeight(item);

    const area = width * height;
    return `Chargable Area: width ${width} * height ${height} = ${area.toFixed(
      2
    )} cm²`;
  };

  //#endregion

  useEffect(() => {
    dispatch(fetchFrameTypes());
    dispatch(fetchGlassTypes());
    dispatch(fetchMiscCharges());
    dispatch(fetchProfile()).then((response) => {
      setBill((prevBill) => ({
        ...prevBill,
        artDetails: [new ArtDetail()], // Initialize with one art detail
        invoice: {
          ...prevBill.invoice,
          billFrom: {
            name: response?.payload?.name,
            detail: response?.payload?.address,
            phone: response?.payload?.phone,
          },
        },
      }));
    });
  }, []);

  useEffect(() => {
    // Calculate totals when bill changes
    const cost = calculateTotalAmount();

    const finalAmount = cost;
    const balanceAmount = cost - bill?.discountAmount - bill?.advancePayment;

    setBill((prevBill) => ({
      ...prevBill,
      cost,
      finalAmount,
      balanceAmount,
    }));
  }, [bill?.artDetails, bill?.discountAmount, bill?.advancePayment]);

  return (
    <div className="create-invoice-app">
      <h3>Create Invoice</h3>
      <p>Create invoice here.</p>

      <div className="d-flex flex-column flex-lg-row">
        <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
          <div className="card borcard-borderedder">
            <div className="ribbon ribbon-top ribbon-vertical">
              <div className="ribbon-label bg-success">
                <i className="bi bi-receipt text-inverse-success fs-1"></i>
              </div>
            </div>
            <div className="card-body p-12">
              <form action="">
                <div className="d-flex flex-center ">
                  <span className="fs-2 fw-bold text-gray-800">
                    Invoice #2021001
                  </span>
                </div>

                <div className="d-flex flex-column align-items-start flex-xxl-row">
                  <div className="d-flex align-items-center flex-equal fw-row me-4 order-2">
                    <div className="fs-6 fw-bold text-gray-600 text-nowrap">
                      Date:
                    </div>
                    <div className="position-relative d-flex align-items-center w-150px">
                      <input
                        className="form-control form-control-transparent fw-bold pe-5 flatpickr-input"
                        placeholder="Select date"
                        name="invoice_date"
                        type="date"
                        value={bill?.invoice?.billDate || ""}
                        onChange={(e) =>
                          handleInvoiceChange("billDate", e.target.value)
                        }
                      />
                      <i className="ki-duotone ki-down fs-4 position-absolute ms-4 end-0"></i>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-end flex-equal order-3 fw-row">
                    <div className="fs-6 fw-bold text-gray-600 text-nowrap">
                      Likely date of delivery:
                    </div>
                    <div className="position-relative d-flex align-items-center w-150px">
                      <input
                        className="form-control form-control-transparent fw-bold pe-5 flatpickr-input"
                        placeholder="Select date"
                        name="invoice_due_date"
                        type="date"
                        value={bill?.likelyDateOfDelivery || ""}
                        onChange={(e) =>
                          handleDateChange(
                            "likelyDateOfDelivery",
                            e.target.value
                          )
                        }
                      />
                      <i className="ki-duotone ki-down fs-4 position-absolute end-0 ms-4"></i>
                    </div>
                  </div>
                </div>
                <div className="separator separator-dashed my-10"></div>
                <div className="mb-0">
                  <div className="row gx-10 mb-5">
                    <div className="col-lg-6">
                      <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                        Bill From
                      </label>
                      <div className="mb-5">
                        <input
                          type="text"
                          className="form-control form-control-solid"
                          placeholder="Name"
                          value={bill?.invoice?.billFrom?.name}
                          readOnly
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          type="text"
                          className="form-control form-control-solid"
                          placeholder="Phone"
                          value={bill?.invoice?.billFrom?.phone}
                          readOnly
                        />
                      </div>
                      <div className="mb-5">
                        <textarea
                          name="notes"
                          className="form-control form-control-solid"
                          rows={3}
                          placeholder="Who is this invoice from?"
                          value={bill?.invoice?.billFrom?.detail}
                          readOnly
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                        Bill To
                      </label>
                      <div className="mb-5">
                        <input
                          type="text"
                          className="form-control form-control-solid"
                          placeholder="Name"
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          type="text"
                          className="form-control form-control-solid"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="mb-5">
                        <textarea
                          name="notes"
                          className="form-control form-control-solid"
                          rows={3}
                          placeholder="Customer details"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="separator separator-dashed my-10"></div>

                <div>
                  {bill?.artDetails?.map((item, index) => (
                    <div key={index}>
                      <div className="row g-3 d-flex mb-3">
                        <span className="text-gray-500 mt-1 text-end fw-semibold fs-6">
                          {chargableArea(item)}
                        </span>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control form-control-solid fs-6 fw-bold"
                            placeholder="Art Name"
                            name={"artName" + index + item?.artName}
                            value={item?.artName || `Art ${index + 1}`}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "artName",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="number"
                            min={0}
                            className="form-control form-control-solid"
                            placeholder="Quantity"
                            name="Quantity"
                            value={item.quantity}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-sm-2">
                          <a
                            className="btn btn-s btn-flex flex-center btn-light-danger"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <i className="bi bi-x-lg fs-3"></i>
                            Delete
                          </a>
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-4 mb-5">
                          <input
                            type="text"
                            className="form-control form-control-solid"
                            placeholder="Art Description"
                            name="artDescription"
                            value={item?.artDescription || ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "artDescription",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-md-4 mb-5">
                          <input
                            type="number"
                            min={0}
                            className="form-control form-control-solid"
                            placeholder="Width (cm)"
                            value={item.width}
                            onChange={(e) =>
                              handleInputChange(index, "width", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4 mb-5">
                          <input
                            type="number"
                            min={0}
                            className="form-control form-control-solid"
                            placeholder="Height (cm)"
                            value={item?.height}
                            onChange={(e) =>
                              handleInputChange(index, "height", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="flex d-flex flex-column flex-md-row mb-5">
                        <div className="col-md-6 mb-5 border border-gray-300 border-dashed rounded py-3 px-4 me-1">
                          <br />
                          <div className="row g-3">
                            <div className="col-md-12">
                              <label className="form-check form-switch form-check-custom form-check-solid">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="mounting"
                                  checked={item?.mounting?.isEnabled}
                                  onChange={(e) =>
                                    handleInputChange(index, "mounting", {
                                      ...item.mounting,
                                      isEnabled: e.target.checked,
                                    })
                                  }
                                />
                                <span className="form-check-label">
                                  Mounting
                                </span>
                              </label>
                            </div>

                            <div className="col-md-12 d-flex flex-center">
                              {item?.mounting?.isEnabled && (
                                <div className="outer-frame">
                                  <div className="inner-frame">
                                    <div className="label top-label">
                                      <input
                                        type="number"
                                        min={0}
                                        id="top-mounting"
                                        className="form-control form-control-solid side-input"
                                        placeholder="cm"
                                        value={item?.mounting?.top || ""}
                                        onChange={(e) =>
                                          handleInputChange(index, "mounting", {
                                            ...item.mounting,
                                            top: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="label right-label">
                                      <input
                                        type="number"
                                        min={0}
                                        id="right-mounting"
                                        className="form-control form-control-solid side-input"
                                        placeholder="cm"
                                        value={item?.mounting?.right || ""}
                                        onChange={(e) =>
                                          handleInputChange(index, "mounting", {
                                            ...item.mounting,
                                            right: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="label bottom-label">
                                      <input
                                        type="number"
                                        min={0}
                                        id="bottom-mounting"
                                        className="form-control form-control-solid side-input"
                                        placeholder="cm"
                                        value={item?.mounting?.bottom || ""}
                                        onChange={(e) =>
                                          handleInputChange(index, "mounting", {
                                            ...item.mounting,
                                            bottom: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="label left-label">
                                      <input
                                        type="number"
                                        min={0}
                                        id="left-mounting"
                                        className="form-control form-control-solid side-input"
                                        placeholder="cm"
                                        value={item?.mounting?.left || ""}
                                        onChange={(e) =>
                                          handleInputChange(index, "mounting", {
                                            ...item.mounting,
                                            left: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 mb-5 border border-gray-300 border-dashed rounded py-3 px-4 ms-1">
                          <br />
                          <div className="row g-3">
                            <div className="col-md-12">
                              <label className="form-check form-switch form-check-custom form-check-solid">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={"glass-" + index}
                                  checked={item?.glass?.isEnabled}
                                  onChange={(e) =>
                                    handleInputChange(index, "glass", {
                                      ...item.glass,
                                      isEnabled: e.target.checked,
                                    })
                                  }
                                />
                                <span className="form-check-label">Glass</span>
                              </label>
                            </div>

                            <div className="col-md-12">
                              {item?.glass?.isEnabled &&
                                glassTypes.map((glass) => (
                                  <label
                                    key={glass?.id + index}
                                    className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-6 mb-5 g-3 ${
                                      glass?.name === item?.glass?.type
                                        ? " active"
                                        : ""
                                    }`}
                                  >
                                    <div className="d-flex align-items-center me-2">
                                      <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          checked={
                                            glass?.name === item?.glass?.type
                                          }
                                          name={glass?.name + index}
                                          value={glass?.name}
                                          onChange={(e) =>
                                            handleInputChange(index, "glass", {
                                              ...item.glass,
                                              type: e.target.value,
                                            })
                                          }
                                        />
                                      </div>

                                      <div className="flex-grow-1">
                                        <h2 className="d-flex align-items-center fs-3 fw-bold flex-wrap">
                                          {glass?.name}
                                        </h2>
                                        <div className="fw-semibold opacity-50">
                                          ₹ {glass?.rate}/ {glass.rateIn}
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row g-2 mb-5">
                        <div className="col-md-4">
                          <select
                            className="form-select form-select-solid"
                            value={item?.frame?.type}
                            onChange={(e) =>
                              handleInputChange(index, "frame", {
                                ...item.frame,
                                type: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Frame Type</option>
                            {frameTypes.map((frame) => (
                              <option key={frame.id} value={frame.name + index}>
                                {frame.name} {frame.category} - (₹
                                {frame.baseCost})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-solid"
                            placeholder="Frame Color"
                            name="frameColor"
                            value={item?.frame?.color}
                            onChange={(e) =>
                              handleInputChange(index, "frame", {
                                ...item.frame,
                                color: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="row g-5">
                        <div className="col-sm-4">
                          <label className="form-check form-switch form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="varnish"
                              value="1"
                              checked={item?.additional?.varnish}
                              onChange={(e) =>
                                handleInputChange(index, "additional", {
                                  ...item.additional,
                                  varnish: e.target.checked,
                                })
                              }
                            />
                            <span className="form-check-label">Varnish</span>
                          </label>
                        </div>

                        <div className="col-sm-4">
                          <label className="form-check form-switch form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="lamination"
                              value="1"
                              checked={item?.additional?.lamination}
                              onChange={(e) =>
                                handleInputChange(index, "additional", {
                                  ...item.additional,
                                  lamination: e.target.checked,
                                })
                              }
                            />
                            <span className="form-check-label">Lamination</span>
                          </label>
                        </div>

                        <div className="col-sm-4">
                          <label className="form-check form-switch form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="routerCut"
                              value="1"
                              checked={item?.additional?.routerCut}
                              onChange={(e) =>
                                handleInputChange(index, "additional", {
                                  ...item.additional,
                                  routerCut: e.target.checked,
                                })
                              }
                            />
                            <span className="form-check-label">Router Cut</span>
                          </label>
                        </div>
                      </div>
                      <div className="separator separator-dashed my-10"></div>
                    </div>
                  ))}

                  <div className="mt-5">
                    <a
                      className="btn btn-flex flex-center btn-light-primary"
                      onClick={handleAddItem}
                    >
                      <i className="bi bi-plus-lg fs-3"></i> Add Art
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-lg-auto min-w-lg-300px">
          <div className="card">
            <div className="card-body p-10">
              <div>
                <h6 className="d-flex align-items-center mb-8 fw-bolder text-gray-600 text-hover-primary justify-content-between">
                  PAYMENT DETAILS
                  {bill?.balanceAmount > 0 && (
                    <span className="badge badge-light-warning">
                      Pending Payment
                    </span>
                  )}
                  {bill?.balanceAmount < 0 && (
                    <span className="badge badge-light-danger">Overpaid</span>
                  )}
                  {bill?.balanceAmount === 0 && (
                    <span className="badge badge-light-success">
                      No Payment Due
                    </span>
                  )}
                </h6>
              </div>

              <div className="mb-10">
                <label
                  className="form-label fw-bold fs-6 text-gray-700"
                  id="payment-mode"
                >
                  Payment mode
                </label>
                <select
                  className="form-select form-select-solid"
                  value={bill?.invoice?.paymentMode}
                  name="payment-mode"
                  onChange={(e) =>
                    handleInvoiceChange("paymentMode", e.target.value)
                  }
                >
                  <option value="">Select Payment Mode</option>
                  {paymentModes.map((mode) => (
                    <option key={mode.name} value={mode.value}>
                      {mode.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-flex justify-content-end mb-8">
                <div className="mw-300px">
                  <div className="d-flex flex-stack mb-3">
                    <div className="fw-semibold pe-10 text-gray-600 fs-7">
                      Total:
                    </div>
                    <div className="text-end fw-bold fs-6 text-gray-800">
                      ₹ {bill?.finalAmount?.toFixed(2)}
                    </div>
                  </div>
                  <div className="d-flex flex-stack mb-3">
                    <div className="fw-semibold pe-10 text-gray-600 fs-7">
                      Discount:
                    </div>
                    <div className="text-end fw-bold fs-6 text-gray-800">
                      <input
                        type="number"
                        min={0}
                        id="discountAmount"
                        className="form-control form-control-solid hide-spin-button text-end"
                        placeholder="Height (cm)"
                        value={bill?.discountAmount}
                        onChange={(e) =>
                          handlePaymentChange(
                            "discountAmount",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-stack mb-3">
                    <div className="fw-semibold pe-10 text-gray-600 fs-7">
                      Advance Paid:
                    </div>
                    <div className="text-end fw-bold fs-6 text-gray-800">
                      <input
                        type="number"
                        min={0}
                        id="advancePayment"
                        className="form-control form-control-solid hide-spin-button text-end"
                        placeholder="Height (cm)"
                        value={bill?.advancePayment}
                        onChange={(e) =>
                          handlePaymentChange(
                            "advancePayment",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-stack">
                    <div className="fw-semibold pe-10 text-gray-600 fs-7">
                      Amount Due:
                    </div>
                    <div className="text-end fw-bold fs-6 text-gray-800">
                      ₹ {bill?.balanceAmount?.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className="separator separator-dashed mb-8"></div>
              <div className="mb-8">
                <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5">
                  <span className="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                    Payment method
                  </span>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked
                  />
                </label>
                <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5">
                  <span className="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                    Late fees
                  </span>
                  <input className="form-check-input" type="checkbox" />
                </label>
                <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                  <span className="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                    Notes
                  </span>
                  <input className="form-check-input" type="checkbox" />
                </label>
              </div> */}
              <div className="separator separator-dashed mb-8"></div>
              <div className="mb-0">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  id="kt_invoice_submit_button"
                  onClick={handleInvoice}
                >
                  <i className="ki-duotone ki-triangle fs-3"></i> Create Bill
                  Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default CreateInvoiceApp;
