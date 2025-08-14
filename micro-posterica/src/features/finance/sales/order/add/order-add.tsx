import { useEffect } from "react";
import {
  InitializeOrderItem,
  type IOrderInvoiceData,
} from "../../../../../interfaces/order/order.model";
import OrderHeaderApp from "../header/order-header";
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
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import CustomizedArtApp from "./customized/customized-art";
import OrderSummaryApp from "./order-summary/order-summary";
import { mapOrderForApi } from "../../../../bills/utils/bill-calculation.util";

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
      isSuccess: isOrderPlaced,
      // error: errorInOrderPlace,
    },
  ] = usePlaceOrderMutation();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const methods = useForm<IOrderInvoiceData>({
    mode: "onSubmit",
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
    register,
    formState: { errors },
    control,
  } = methods;

  const {
    fields: itemFields,
    remove: removeItem,
    append: appendItem,
  } = useFieldArray({
    control,
    name: "order.items",
  });

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);

    const request = mapOrderForApi(data);
    console.log("Submitted request:", request);

    request && placeOrder(request);
  };

  //#region useEffect

  useEffect(() => {
    dispatch(fetchFrameTypes());
    dispatch(fetchGlassTypes());
    dispatch(fetchMiscCharges());
    dispatch(fetchProfile());
  }, []);

  useEffect(() => {
    if (isOrderPlaced) {
      navigate(ROUTE_URL.SALES.ORDER.BASE);
    }
  }, [isOrderPlaced]);

  //#endregion

  return (
    <div className="order-list-app">
      <OrderHeaderApp
        header="Order Details"
        description="Order details are here."
      >
        <NavLink to={ROUTE_URL.SALES.ORDER.BASE}>
          <span className="btn btn-light btn-active-secondary btn-sm me-5">
            <i className="bi bi-chevron-left fs-5"></i>
            Back to Order List
          </span>
        </NavLink>
      </OrderHeaderApp>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
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
                  <div className="d-flex flex-column flex-md-row gap-5 mb-10">
                    <div className="fv-row w-100">
                      <label
                        htmlFor="order-customer-name"
                        className="required form-label"
                      >
                        Customer Name
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-solid ${
                          errors.order?.customerName ? "is-invalid" : ""
                        }`}
                        placeholder="Customer Name"
                        list="list-customer"
                        id="order-customer-name"
                        {...register("order.customerName", {
                          required: "Customer Name is required",
                        })}
                      />
                      <datalist id="list-customer">
                        {customers?.map((customer) => (
                          <option key={customer?.id} value={customer?.name}>
                            {customer?.name}
                          </option>
                        ))}
                      </datalist>
                      {errors.order?.customerName?.message && (
                        <div className="invalid-feedback">
                          {errors.order?.customerName?.message}
                        </div>
                      )}
                    </div>

                    <div className="fv-row w-100">
                      <label
                        htmlFor="order-customer-phone"
                        className="form-label"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        id="order-customer-phone"
                        className="form-control form-control-solid"
                        placeholder="Phone Number"
                        {...register("invoice.billTo.phone")}
                      />
                    </div>
                  </div>

                  <div className="fv-row">
                    <label htmlFor="order-more-details" className="form-label">
                      Detail
                    </label>
                    <textarea
                      id="order-more-details"
                      className="form-control form-control-solid"
                      placeholder="Additional details about the order"
                      rows={3}
                      {...register("invoice.billTo.detail")}
                    />
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
                    <div key={item?.id}>
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
