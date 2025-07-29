import "./create-invoice.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../../../../app/store";
import { fetchProfile } from "../../../../app/features/core/profile/profile-detail.thunk";
import {
  ArtDetail,
  TotalCalculationInput,
  type IArtDetail,
  type ITotalCalculationInput,
} from "../../../../interfaces/total-calculation.model";
import { fetchFrameTypes } from "../../../../app/features/master/frame-types/frame-types.thunk";
import { fetchGlassTypes } from "../../../../app/features/master/glass-types/glass-types.thunk";
import { fetchMiscCharges } from "../../../../app/features/master/misc-charges/misc-charges.thunk";
import { ADDITIONAL_SERVICE_CODE } from "../../../../constants/global/global-key.const";

const CreateInvoiceApp = () => {
  const {
    master: {
      glassTypes: { glassTypes },
      frameTypes: { frameTypes },
      miscCharges: { miscCharges },
    },
    core: {
      profile: { profile },
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
    return bill.artDetails.reduce((cost, item) => cost + item.cost, 0);
  };

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

  /**
   * Cost of one item calcuated here
   * @param item
   * @returns
   */
  const unitCost = (item: IArtDetail): number => {
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

    // Calculate glass cost
    const glassCost = item?.glass?.isEnabled
      ? glassTypes.find((glass) => glass.name === item?.glass?.type)?.rate || 0
      : 0;

    // Calculate varnish cost
    const varnishCost = item?.additional?.varnish
      ? miscCharges.find((x) => x.code === ADDITIONAL_SERVICE_CODE.varnish)
          ?.cost || 0
      : 0;

    // Calculate routerCut cost
    const routerCutCost = item?.additional?.routerCut
      ? miscCharges.find(
          (x) => x.code === ADDITIONAL_SERVICE_CODE.mdf_router_cutting
        )?.cost || 0
      : 0;

    // Calculate lamination cost
    const laminationCost = item?.additional?.lamination
      ? miscCharges.find((x) => x.code === ADDITIONAL_SERVICE_CODE.lamination)
          ?.cost || 0
      : 0;

    // Calculate additional costs
    const additionalCosts = varnishCost + laminationCost + routerCutCost;

    return (
      parseFloat(
        (
          (area * glassCost + totalFrameCost + additionalCosts) *
          quantity
        ).toFixed(2)
      ) || 0
    );
  };

  const handleAddItem = () => {
    setBill({
      ...bill,
      artDetails: [...bill.artDetails, new ArtDetail()],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedArtDetails = bill.artDetails.filter((_, i) => i !== index);
    const cost = updatedArtDetails.reduce((sum, item) => sum + item.cost, 0);
    const discountAmount = (cost * bill.discountPercentage) / 100;
    const finalAmount = cost - discountAmount;

    const balanceAmount = finalAmount - bill.advancePayment;

    setBill({
      ...bill,
      artDetails: updatedArtDetails,
      cost,
      discountAmount,
      finalAmount,
      balanceAmount,
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

    // Auto-calculate total for the item
    updatedArtDetails[index].cost = unitCost(updatedArtDetails[index]);

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
    let discountAmount = (cost * bill.discountPercentage) / 100;

    const finalAmount = cost - discountAmount;
    const balanceAmount = finalAmount - bill.advancePayment;

    setBill((prevBill) => ({
      ...prevBill,
      cost,
      discountAmount,
      finalAmount,
      balanceAmount,
    }));
  }, [bill.artDetails, bill.discountPercentage, bill.advancePayment]);

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
                  <span className="fs-2 fw-bold text-gray-800">Invoice #</span>
                  <input
                    type="text"
                    className="form-control form-control-flush fw-bold text-muted fs-3 w-125px"
                    value="2021001"
                    placeholder="..."
                  />
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
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control form-control-solid fs-6 fw-bold"
                            placeholder="Art Name"
                            name="artName"
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
                              <div className="form-check form-check-sm">
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
                                <label htmlFor="mounting">Mounting</label>
                              </div>
                            </div>

                            <div className="col-md-12 d-flex flex-center">
                              {item?.mounting?.isEnabled && (
                                <div className="outer-frame">
                                  <div className="inner-frame">
                                    <div className="label top-label">
                                      <input
                                        type="number"
                                        min={0}
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
                              <div className="form-check form-check-sm">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="glass"
                                  checked={item?.glass?.isEnabled}
                                  onChange={(e) =>
                                    handleInputChange(index, "glass", {
                                      ...item.glass,
                                      isEnabled: e.target.checked,
                                    })
                                  }
                                />
                                <label htmlFor="glass">Glass</label>
                              </div>
                            </div>

                            <div className="col-md-12">
                              {item?.glass?.isEnabled &&
                                glassTypes.map((glass) => (
                                  <label
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
                                          name="glass"
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
                              <option key={frame.id} value={frame.name}>
                                {frame.name} {frame.category} - (₹{" "}
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

                      <div className="row g-3">
                        <div className="col-sm-4 border border-gray-300 border-dashed rounded py-3 px-4">
                          <div className="form-check form-check-sm">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="varnish"
                              checked={item?.additional?.varnish}
                              onChange={(e) =>
                                handleInputChange(index, "additional", {
                                  ...item.additional,
                                  varnish: e.target.checked,
                                })
                              }
                            />
                            <label htmlFor="varnish">Varnish</label>
                          </div>
                        </div>

                        <div className="col-sm-4 border border-gray-300 border-dashed rounded py-3 px-4">
                          <div className="form-check form-check-sm">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="Lamination"
                              checked={item?.additional?.lamination}
                              onChange={(e) =>
                                handleInputChange(index, "additional", {
                                  ...item.additional,
                                  lamination: e.target.checked,
                                })
                              }
                            />
                            <label htmlFor="Lamination">Lamination</label>
                          </div>
                        </div>

                        <div className="col-sm-4 border border-gray-300 border-dashed rounded py-3 px-4">
                          <div className="form-check form-check-sm">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="routerCut"
                              checked={item?.additional?.routerCut}
                              onChange={(e) =>
                                handleInputChange(index, "additional", {
                                  ...item.additional,
                                  routerCut: e.target.checked,
                                })
                              }
                            />
                            <label htmlFor="routerCut">Router Cut</label>
                          </div>
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
                <h6 className="mb-8 fw-bolder text-gray-600 text-hover-primary">
                  PAYMENT DETAILS
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
                    handlePaymentChange(
                      "invoice.paymentMode",
                      parseFloat(e.target.value)
                    )
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

              <div className="d-flex justify-content-end">
                <div className="mw-300px">
                  <div className="d-flex flex-stack mb-3">
                    <div className="fw-semibold pe-10 text-gray-600 fs-7">
                      Subtotal:
                    </div>
                    <div className="text-end fw-bold fs-6 text-gray-800">
                      ₹ {bill?.finalAmount?.toFixed(2)}
                    </div>
                  </div>

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
                      Advance Paid:
                    </div>
                    <div className="text-end fw-bold fs-6 text-gray-800">
                      ₹ {bill?.finalAmount?.toFixed(2)}
                    </div>
                  </div>
                  <div className="d-flex flex-stack">
                    <div className="fw-semibold pe-10 text-gray-600 fs-7">
                      Amount Due:
                    </div>
                    <div className="text-end fw-bold fs-6 text-gray-800">
                      ₹ {bill?.finalAmount?.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="separator separator-dashed mb-8"></div>
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
              </div>
              <div className="separator separator-dashed mb-8"></div>
              <div className="mb-0">
                <div className="row mb-5">
                  <div className="col">
                    <a
                      href="#"
                      className="btn btn-light btn-active-light-primary w-100"
                    >
                      Preview
                    </a>
                  </div>
                  <div className="col">
                    <a
                      href="#"
                      className="btn btn-light btn-active-light-primary w-100"
                    >
                      Download
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  id="kt_invoice_submit_button"
                >
                  <i className="ki-duotone ki-triangle fs-3"></i> Send Invoice
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
