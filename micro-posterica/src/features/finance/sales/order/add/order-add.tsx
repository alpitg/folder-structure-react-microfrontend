import { useEffect, useState } from "react";
import {
  ArtDetail,
  type IArtDetail,
  type IInvoiceDetail,
  type ITotalCalculationInput,
  TotalCalculationInput,
} from "../../../../../interfaces/total-calculation.model";
import OrderHeaderApp from "../header/order-header";
import { paymentModes } from "../../../../../constants/app.const";
import {
  BillCalculation,
  mapOrderForApi,
} from "../../../../bills/utils/bill-calculation.util";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../../../../../app/store";
import { fetchProfile } from "../../../../../app/features/core/profile/profile-detail.thunk";
import { fetchFrameTypes } from "../../../../../app/features/master/frame-types/frame-types.thunk";
import { fetchGlassTypes } from "../../../../../app/features/master/glass-types/glass-types.thunk";
import { fetchMiscCharges } from "../../../../../app/features/master/misc-charges/misc-charges.thunk";
import { useGetcustomersQuery } from "../../../../../app/features/customer/list/customer.api";
import { usePlaceOrderMutation } from "../../../../../app/features/sales/order/order.api";

const OrderAddApp = () => {
  const {
    master: {
      glassTypes: { glassTypes },
      frameTypes: { frameTypes },
      miscCharges: { miscCharges },
    },
  } = useSelector((state: AppState) => state);
  const { data: customers } = useGetcustomersQuery();
  const [
    placeOrder,
    {
      isLoading: isOrderPlacingInProgress,
      // isSuccess: isOrderPlaced,
      // error: errorInOrderPlace,
    },
  ] = usePlaceOrderMutation();

  const dispatch = useDispatch<AppDispatch>();

  const [bill, setBill] = useState<ITotalCalculationInput>(
    new TotalCalculationInput()
  );

  //#region methods

  const calculateTotalAmount = (): number => {
    return bill.artDetails.reduce(
      (cost, item) => cost + item?.unitPrice * item?.quantity,
      0
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

  const handlePlaceOrder = async () => {
    const payload = mapOrderForApi(bill);
    if (!payload) {
      return;
    }
    console.log(payload);

    try {
      const response = await placeOrder(payload).unwrap();
      console.log("Order placed:", response);
    } catch (err) {
      console.error("Failed to place order:", err);
    }
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

  //#region useEffect

  useEffect(() => {
    dispatch(fetchFrameTypes());
    dispatch(fetchGlassTypes());
    dispatch(fetchMiscCharges());
    dispatch(fetchProfile()).then((response) => {
      setBill((prevBill) => ({
        ...prevBill,
        artDetails: [], // Initialize with one art detail
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
    // let discountAmount = (cost * bill.discountPercentage) / 100;

    const finalAmount = cost;
    const balanceAmount = cost - bill?.discountAmount - bill?.advancePayment;

    setBill((prevBill) => ({
      ...prevBill,
      cost,
      finalAmount,
      balanceAmount,
    }));
  }, [
    bill?.artDetails,
    bill?.discountAmount,
    bill?.discountPercentage,
    bill?.advancePayment,
  ]);
  //#endregion

  return (
    <div className="order-list-app">
      <OrderHeaderApp
        back={true}
        header="Order Details"
        description="Order Details page"
      ></OrderHeaderApp>

      <div className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework">
        <div className="w-100 flex-lg-row-auto w-lg-300px mb-7 me-7 me-lg-10">
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Order Details</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-5">
                <div className="fv-row d-flex align-items-center">
                  <label className="pe-2">Order ID</label>
                  <div className="fw-bold fs-3">#13860</div>
                </div>
                <div className="fv-row">
                  <div>
                    <h6 className="d-flex align-items-center text-gray-600 text-hover-primary justify-content-between">
                      PAYMENT DETAILS
                      {bill?.balanceAmount > 0 && (
                        <span className="badge badge-light-warning">
                          Pending Payment
                        </span>
                      )}
                      {bill?.balanceAmount < 0 && (
                        <span className="badge badge-light-danger">
                          Overpaid
                        </span>
                      )}
                      {bill?.balanceAmount === 0 && (
                        <span className="badge badge-light-success">
                          No Payment Due
                        </span>
                      )}
                    </h6>
                  </div>
                </div>

                <div className="fv-row">
                  <label className="required form-label">Payment Method</label>
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
                  <div className="text-muted fs-7">
                    Select the payment mode for this order.
                  </div>
                </div>

                <div className="d-flex justify-content-end">
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

                    <div className="separator separator-dashed"></div>

                    <div className="d-flex flex-stack py-4">
                      <div className="fw-semibold pe-10 text-gray-600 fs-7">
                        Discount Amount :
                      </div>
                      <div className="text-end fw-bold fs-2 text-gray-800">
                        ₹
                        {(
                          bill?.finalAmount - bill?.discountAmount || 0
                        )?.toFixed(2)}
                      </div>
                    </div>

                    <div className="separator separator-dashed"></div>

                    <div className="d-flex flex-stack py-4">
                      <div className="fw-semibold pe-10 text-gray-600 fs-7">
                        Paid:
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

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={handlePlaceOrder}
                  disabled={isOrderPlacingInProgress}
                >
                  {isOrderPlacingInProgress ? (
                    <span className="spinner-border spinner-border-sm align-middle me-2"></span>
                  ) : (
                    <i className="bi bi-save fs-3 me-2"></i>
                  )}
                  Place Order
                </button>

                <button className="btn btn-light w-100">
                  <i className="bi bi-x-lg fs-3"></i> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
          <div className="card card-flush py-4">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row gap-5">
                <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                  <div className="position-relative">
                    <div className="required position-absolute top-0"></div>
                    <input
                      type="text"
                      className="form-control form-control-flush fs-3"
                      placeholder="Customer Name"
                      list="list-customer"
                      id="input-datalist-customer"
                      onChange={(e) =>
                        setBill((prev) => ({
                          ...prev,
                          customerName: e.target.value,
                        }))
                      }
                    />
                    <datalist id="list-customer">
                      {customers?.map((customer) => (
                        <option key={customer?.id} value={customer?.name}>
                          {customer?.name}
                        </option>
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-flush" style={{ display: "none" }}>
            <div className="ribbon ribbon-top ribbon-vertical">
              <div className="ribbon-label bg-success">
                <i className="bi bi-receipt text-inverse-success fs-1"></i>
              </div>
            </div>
            <div className="card-header">
              <div className="card-title">
                <h2>Select Products</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-10 mb-5">
                <div>
                  <label className="form-label">
                    Add products to this order
                  </label>

                  <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 border border-dashed rounded pt-3 pb-1 px-2 mb-5 mh-300px overflow-scroll">
                    <span className="w-100 text-muted">
                      Select one or more products from the list below by ticking
                      the checkbox.
                    </span>
                  </div>

                  <div className="fw-bold fs-4">
                    Total Cost: ₹<span> {bill?.finalAmount?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="separator" />

                <div className="d-flex gap-5">
                  <div className="col-sm-6 d-flex align-items-center position-relative">
                    <i className="bi bi-search fs-3 position-absolute ms-4"></i>
                    <input
                      type="text"
                      className="form-control form-control-solid w-100 w-lg-100 ps-12"
                      placeholder="Search Products"
                    />
                  </div>
                  <div className="col-sm-6">
                    <button
                      className="btn btn-light-primary"
                      onClick={handleAddItem}
                    >
                      <i className="bi bi-plus-lg fs-3"></i> Add Product
                    </button>
                  </div>
                </div>

                {/* <div className="dt-container dt-bootstrap5 dt-empty-footer">
                  <div className="table-responsive">
                    <div className="dt-scroll">
                      <div
                        className="dt-scroll-body"
                        style={{
                          overflow: "auto",
                          maxHeight: 400,
                          position: "relative",
                        }}
                      >
                        <table
                          className="table align-middle table-row-dashed fs-6 gy-5 dataTable"
                          style={{ width: "100%" }}
                        >
                          <colgroup>
                            <col style={{ width: "29.89px" }} />
                            <col style={{ width: "442.203px" }} />
                            <col style={{ width: "278.906px" }} />
                          </colgroup>
                          <thead>
                            <tr
                              className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0"
                              role="row"
                            >
                              <th />
                              <th>Product</th>
                              <th className="text-end pe-5">Qty Remaining</th>
                            </tr>
                          </thead>
                          <tbody className="fw-semibold text-gray-600">
                            <tr>
                              <td>
                                <div className="form-check form-check-sm form-check-custom form-check-solid">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="1"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <a
                                    href="/sales/products"
                                    className="symbol symbol-50px"
                                  >
                                    <span className="symbol-label"></span>
                                  </a>

                                  <div className="ms-5">
                                    <a
                                      href="/sales/products"
                                      className="text-gray-800 text-hover-primary fs-5 fw-bold"
                                    >
                                      Product 1
                                    </a>

                                    <div className="fw-semibold fs-7">
                                      Price: $<span>172.00</span>
                                    </div>

                                    <div className="text-muted fs-7">
                                      SKU: 02981006
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                className="text-end pe-5 dt-type-numeric"
                                data-order="36"
                              >
                                <span className="fw-bold ms-3">36</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start dt-toolbar" />
                    <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="card py-4">
            <div className="card-header border-0">
              <div className="card-title">
                <h2 className="fw-bold mb-0">Customized Product</h2>
              </div>

              <div className="card-toolbar">
                <button
                  className="btn btn-sm btn-flex btn-light-primary"
                  onClick={handleAddItem}
                >
                  <i className="bi bi-plus fs-3"></i> Add Customized Product
                </button>
              </div>
            </div>
            <div
              className="card-body py-0"
              style={{ overflowY: "auto", maxHeight: "600px" }}
            >
              {bill?.artDetails?.map((item, index) => (
                <div key={`'custom' + ${index}`}>
                  <div className="py-3 d-flex flex-stack flex-wrap">
                    <a
                      className="d-flex align-items-center collapsible rotate collapsed w-75"
                      data-bs-toggle="collapse"
                      href={`#${"art-0" + index}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`${"art-0" + index}`}
                    >
                      <div className="me-3 rotate-90">
                        <i className="bi-chevron-right fs-3"></i>
                      </div>

                      <span
                        className="symbol symbol-50px me-3"
                        aria-label="no-image"
                      >
                        <span className="symbol-label"></span>
                      </span>

                      <div className="me-3">
                        <div className="d-flex align-items-center">
                          <div className="text-gray-800 fw-bold">
                            {item?.artName || `Art ${index + 1}`}
                          </div>

                          <div className="badge badge-light-primary ms-5">
                            {`Quantity: ` + item?.quantity}
                          </div>
                          <div className="badge badge-light-primary ms-5">
                            {`Cost: ` + item?.unitPrice?.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-muted">{item?.artDescription}</div>
                      </div>
                    </a>

                    <div className="d-flex my-3 ms-9">
                      <button
                        className="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                        aria-label="Delete"
                        data-kt-initialized="1"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <i className="bi bi-trash3 fs-3"></i>
                      </button>
                      <div
                        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-150px py-3"
                        data-kt-menu="true"
                      >
                        <div className="menu-item px-3">
                          <a
                            href="#"
                            className="menu-link px-3"
                            data-kt-payment-mehtod-action="set_as_primary"
                          >
                            Set as Primary
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    id={`${"art-0" + index}`}
                    className="fs-6 ps-10 py-4 collapse"
                  >
                    <div className="row g-3 d-flex mb-3">
                      <span className="text-gray-500 text-end fw-semibold fs-6">
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
                            handleInputChange(index, "artName", e.target.value)
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
                            handleInputChange(index, "quantity", e.target.value)
                          }
                        />
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
                            handleInputChange(
                              index,
                              "width",
                              parseFloat(e.target.value) || 0
                            )
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
                            handleInputChange(
                              index,
                              "height",
                              parseFloat(e.target.value) || 0
                            )
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
                              <span className="form-check-label">Mounting</span>
                            </label>
                          </div>

                          <div className="col-md-12 d-flex flex-center">
                            {item?.mounting?.isEnabled && (
                              <div className="mounting-component">
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
                                            top:
                                              parseFloat(e.target.value) || 0,
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
                                            right:
                                              parseFloat(e.target.value) || 0,
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
                                            bottom:
                                              parseFloat(e.target.value) || 0,
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
                                            left:
                                              parseFloat(e.target.value) || 0,
                                          })
                                        }
                                      />
                                    </div>
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
                            <option key={frame.id} value={frame.name}>
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
                  </div>
                  {index !== bill.artDetails.length - 1 && (
                    <div className="separator separator-dashed"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Delivery Details</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="d-flex flex-column gap-5 gap-md-7">
                <div className="fs-3 fw-bold mb-n2">Billing Address</div>

                <div className="d-flex flex-column flex-md-row gap-5">
                  <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                    <label className="required form-label">
                      Address Line 1
                    </label>
                    <input
                      className="form-control"
                      name="billing_order_address_1"
                      placeholder="Address Line 1"
                      defaultValue=""
                    />
                    <div className="fv-plugins-message-container invalid-feedback" />
                  </div>

                  <div className="flex-row-fluid">
                    <label className="form-label">Address Line 2</label>
                    <input
                      className="form-control"
                      name="billing_order_address_2"
                      placeholder="Address Line 2"
                      defaultValue=""
                    />
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row gap-5">
                  <div className="flex-row-fluid">
                    <label className="form-label">City</label>
                    <input
                      className="form-control"
                      name="billing_order_city"
                      defaultValue=""
                    />
                  </div>

                  <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                    <label className="required form-label">Postcode</label>
                    <input
                      className="form-control"
                      name="billing_order_postcode"
                      defaultValue=""
                    />
                    <div className="fv-plugins-message-container invalid-feedback" />
                  </div>

                  <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                    <label className="required form-label">State</label>
                    <input
                      className="form-control"
                      name="billing_order_state"
                      defaultValue=""
                    />
                    <div className="fv-plugins-message-container invalid-feedback" />
                  </div>
                </div>

                <div className="fv-row fv-plugins-icon-container">
                  <label className="required form-label">Country</label>
                  <select
                    className="form-select"
                    id="kt_ecommerce_edit_order_billing_country"
                    name="billing_order_country"
                    defaultValue=""
                  >
                    <option value="">Select an option</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Aland Islands</option>
                  </select>
                  <div className="fv-plugins-message-container invalid-feedback" />
                </div>

                <div className="form-check form-check-custom form-check-solid">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="same_as_billing"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="same_as_billing">
                    Shipping address is the same as billing address
                  </label>
                </div>

                <div className="separator" />

                <div
                  className="d-flex flex-column gap-5 gap-md-7"
                  id="kt_ecommerce_edit_order_shipping_form"
                >
                  <div className="fs-3 fw-bold mb-n2">Shipping Address</div>

                  <div className="d-flex flex-column flex-md-row gap-5">
                    <div className="fv-row flex-row-fluid">
                      <label className="form-label">Address Line 1</label>
                      <input
                        className="form-control"
                        name="kt_ecommerce_edit_order_address_1"
                        placeholder="Address Line 1"
                        defaultValue=""
                      />
                    </div>
                    <div className="flex-row-fluid">
                      <label className="form-label">Address Line 2</label>
                      <input
                        className="form-control"
                        name="kt_ecommerce_edit_order_address_2"
                        placeholder="Address Line 2"
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-md-row gap-5">
                    <div className="flex-row-fluid">
                      <label className="form-label">City</label>
                      <input
                        className="form-control"
                        name="kt_ecommerce_edit_order_city"
                        defaultValue=""
                      />
                    </div>

                    <div className="fv-row flex-row-fluid">
                      <label className="form-label">Postcode</label>
                      <input
                        className="form-control"
                        name="kt_ecommerce_edit_order_postcode"
                        defaultValue=""
                      />
                    </div>

                    <div className="fv-row flex-row-fluid">
                      <label className="form-label">State</label>
                      <input
                        className="form-control"
                        name="kt_ecommerce_edit_order_state"
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="fv-row">
                    <label className="form-label">Country</label>
                    <select
                      className="form-select"
                      id="kt_ecommerce_edit_order_shipping_country"
                      defaultValue=""
                    >
                      <option value="">Select an option</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AX">Aland Islands</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <a
              href="/keen/demo1/apps/ecommerce/catalog/products.html"
              id="kt_ecommerce_edit_order_cancel"
              className="btn btn-light me-5"
            >
              Cancel
            </a>
            <button
              type="submit"
              id="kt_ecommerce_edit_order_submit"
              className="btn btn-primary"
            >
              <span className="indicator-label">Save Changes</span>
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAddApp;
