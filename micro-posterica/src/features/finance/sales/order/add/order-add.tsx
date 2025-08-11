import { useEffect, useState } from "react";
import {
  InitializeOrderInvoice,
  InitializeOrderItem,
  type ICustomizedDetails,
  type IInvoice,
  type IOrderInvoiceData,
  type IOrderItem,
} from "../../../../../interfaces/order/order.model";
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
import { NavLink, useNavigate } from "react-router";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";
import DeleteConfirmationApp from "../../../../../components/ui/delete-confirmation/delete-confirmation";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import CustomizedArtApp from "./customized/art/customized-art";
import OrderSummaryApp from "./order-summary/order-summary";

const OrderAddApp = () => {
  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IOrderInvoiceData>({
    mode: "onSubmit", // validation triggers on submit
    defaultValues: {
      order: {
        customerName: "",
        discountAmount: 0,
        items: [new InitializeOrderItem()],
      },
      invoice: {
        advancePaid: 0,
        paymentStatus: "pending",
      },
    },
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "order.items",
  });

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
  };

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
      isSuccess: isOrderPlaced,
      // error: errorInOrderPlace,
    },
  ] = usePlaceOrderMutation();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [bill, setBill] = useState<IOrderInvoiceData>(
    new InitializeOrderInvoice()
  );
  const [isDiscard, setIsDiscard] = useState<boolean>(false);

  //#region methods

  const calculateUnitCost = () => {
    if (!bill?.order?.items) return;

    setBill((prev) => ({
      ...prev,
      order: {
        ...prev?.order,
        items: prev?.order?.items?.map((x) => ({
          ...x,
          unitPrice: new BillCalculation(
            frameTypes,
            glassTypes,
            miscCharges
          ).unitCost(x),
        })),
      },
    }));
  };

  const handleAddItem = () => {
    setBill((prev) => {
      const existingItems = prev?.order?.items ?? [];
      return {
        ...prev,
        order: {
          ...prev?.order,
          items: [...existingItems, new InitializeOrderItem()],
        },
      };
    });
  };

  const handleRemoveItem = (index: number) => {
    const items = bill?.order?.items?.filter((_, i) => i !== index);

    setBill({
      ...bill,
      // artDetails: updatedArtDetails,
      order: {
        ...bill?.order,
        items,
      },
    });
  };

  const handleInputChange = (
    index: number,
    field:
      | keyof ICustomizedDetails
      | "mounting"
      | "glass"
      | "frame"
      | "additional",
    value: object | string | number
  ) => {
    if (index < 0 || index >= (bill?.order?.items?.length || 0)) return;

    const items = [...(bill?.order?.items || [])];
    items[index] = {
      ...items[index],
      [field]: value,
    };

    const unitCost = new BillCalculation(
      frameTypes,
      glassTypes,
      miscCharges
    ).unitCost(items[index]);

    // Auto-calculate total for the item
    items[index].unitPrice = unitCost;

    setBill({
      ...bill,
      order: {
        ...bill?.order,
        items,
      },
    });
  };

  const handleItemChange = (
    index: number,
    field: keyof IOrderItem,
    value: object | string | number
  ) => {
    const items = [...(bill?.order?.items || [])];
    items[index] = {
      ...items[index],
      [field]: value,
    };

    setBill({
      ...bill,
      order: { ...bill?.order, items },
    });
  };

  const handleInvoiceChange = (
    field: keyof IInvoice,
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

  const chargableArea = (item: ICustomizedDetails) => {
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
    if (isOrderPlaced) {
      navigate(ROUTE_URL?.FINANCE?.SALES?.BASE);
    }
  }, [isOrderPlaced]);
  
  //#endregion

  return (
    <div className="order-list-app">
      <OrderHeaderApp
        header="Order Details"
        description="Order details are here."
      >
        <NavLink to={ROUTE_URL.FINANCE.SALES.BASE}>
          <span className="btn btn-light btn-active-secondary btn-sm me-5">
            <i className="bi bi-chevron-left fs-5"></i>
            Back to Order List
          </span>
        </NavLink>
      </OrderHeaderApp>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="container mt-4"
        >
          <div className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework">
            <div className="w-100 flex-lg-row-auto w-lg-300px mb-7 me-7 me-lg-10">
              <div className="card card-flush py-4">
                <div className="ribbon ribbon-top ribbon-vertical">
                  <div className="ribbon-label bg-success">
                    <i className="bi bi-receipt text-inverse-success fs-1"></i>
                  </div>
                </div>
                <div className="card-header">
                  <div className="card-title">
                    <h2>Order Details</h2>
                  </div>
                </div>

                <OrderSummaryApp
                  isOrderPlacingInProgress={isOrderPlacingInProgress}
                />
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
                          className={`form-control form-control-solid fs-3 ${
                            errors.order?.customerName ? "is-invalid" : ""
                          }`}
                          placeholder="Customer Name"
                          list="list-customer"
                          id="input-datalist-customer"
                          {...register("order.customerName", {
                            required: "Customer Name is required",
                          })}
                        />
                        <div className="invalid-feedback">
                          {errors.order?.customerName?.message}
                        </div>
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

              {/* <ProductApp /> */}

              <div className="card py-4">
                <div className="card-header border-0">
                  <div className="card-title">
                    <h2 className="fw-bold mb-0">Customized Product</h2>
                  </div>

                  <div className="card-toolbar">
                    <button
                      type="button"
                      className="btn btn-sm btn-flex btn-light-primary"
                      onClick={() => appendItem(new InitializeOrderItem())}
                    >
                      <i className="bi bi-plus fs-3"></i> Add Customized Product
                    </button>
                  </div>
                </div>
                <div className="card-body py-0">
                  {itemFields?.map((item, index) => (
                    <div key={`'custom' + ${index}`}>
                      <div className="separator" />
                      <CustomizedArtApp
                        item={item}
                        index={index}
                        frameTypes={frameTypes}
                        glassTypes={glassTypes}
                        miscCharges={miscCharges}
                        removeItem={removeItem}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* <DeliveryApp /> */}
            </div>
          </div>
        </form>
      </FormProvider>
      <>
        {isOrderPlaced && (
          <div className="toast-container">
            <div
              className={
                "toast align-items-center position-fixed top-0 end-0 p-3 border-0" +
                `${isOrderPlaced && " show"}`
              }
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">Order placed!</div>
                <button
                  type="button"
                  className="btn-close me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default OrderAddApp;
