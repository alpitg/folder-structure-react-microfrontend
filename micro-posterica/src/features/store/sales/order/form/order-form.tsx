import { useEffect } from "react";
import {
  InitializeOrderItem,
  type IOrderInvoiceData,
} from "../../../../../interfaces/order/order.model";
import OrderHeaderApp from "../header/order-header";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../../../../../app/store";
import { fetchProfile } from "../../../../../app/redux/core/profile/profile-detail.thunk";
import { fetchFrameTypes } from "../../../../../app/redux/master/frame-types/frame-types.thunk";
import { fetchGlassTypes } from "../../../../../app/redux/master/glass-types/glass-types.thunk";
import { fetchMiscCharges } from "../../../../../app/redux/master/misc-charges/misc-charges.thunk";
import { useGetPaginatedCustomersQuery } from "../../../../../app/redux/customer/customer.api";
import {
  useGetDetailQuery,
  usePlaceOrderMutation,
  useUpdateOrderMutation,
} from "../../../../../app/redux/sales/order/order.api";
import { NavLink, useNavigate, useParams } from "react-router";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import CustomizedArtApp from "./customized/customized-art";
import OrderSummaryApp from "./order-summary/order-summary";
import { mapOrderForApi } from "../../../catalog/product/utils/costing.util";

const OrderFormApp = () => {
  const { orderId } = useParams<{ orderId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isEditMode = Boolean(orderId);

  //#region RTK APIs
  const [
    placeOrder,
    { isLoading: isOrderPlacingInProgress, isSuccess: isOrderPlaced },
  ] = usePlaceOrderMutation();

  const [
    updateOrder,
    { isLoading: isOrderUpdateInProgress, isSuccess: isOrderUpdated },
  ] = useUpdateOrderMutation();

  const { data: customers } = useGetPaginatedCustomersQuery({});

  const { data: orderDetail, isLoading: isOrderLoading } = useGetDetailQuery(
    orderId!,
    {
      skip: !isEditMode,
    }
  );
  //#endregion

  // Selectors
  const {
    master: {
      glassTypes: { glassTypes },
      frameTypes: { frameTypes },
      miscCharges: { miscCharges },
    },
  } = useSelector((state: AppState) => state);

  //#region methods
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

  const onSubmit = (data: IOrderInvoiceData) => {
    const request = mapOrderForApi(data);
    if (!request) return;

    if (isEditMode) {
      updateOrder({ orderId: orderId!, data: request });
      // .unwrap()
      // .then(() => {
      //   // Go back to list and tell it to refresh
      //   navigate(ROUTE_URL.SALES.ORDER.LIST, { state: { refresh: true } });
      // });
    } else {
      placeOrder(request);
    }
  };
  //#endregion

  //#region useEffect
  // Fetch master data
  useEffect(() => {
    dispatch(fetchFrameTypes());
    dispatch(fetchGlassTypes());
    dispatch(fetchMiscCharges());
    dispatch(fetchProfile());
  }, [dispatch]);

  // Navigate after add or update
  useEffect(() => {
    if (isOrderPlaced || isOrderUpdated) {
      // Go back to list and tell it to refresh
      navigate(ROUTE_URL.SALES.ORDER.LIST, { state: { refresh: true } });
    }
  }, [isOrderPlaced, isOrderUpdated, navigate]);

  // Populate form in edit mode
  useEffect(() => {
    if (isEditMode && orderDetail) {
      methods.reset({
        order: {
          customerId: orderDetail?.order?.customerId,
          customerName: orderDetail.order?.customerName || "",
          discountAmount: orderDetail.order?.discountAmount || 0,
          items:
            orderDetail.order?.items?.length > 0
              ? orderDetail.order.items
              : [new InitializeOrderItem()],
          orderCode: orderDetail?.order?.orderCode,
          createdAt: orderDetail?.order?.createdAt,
          handledBy: orderDetail?.order?.handledBy,
          invoiceId: orderDetail?.order?.invoiceId,
          id: orderDetail?.order?.id,
          likelyDateOfDelivery: orderDetail?.order?.likelyDateOfDelivery,
          miscCharges: orderDetail?.order?.miscCharges,
          note: orderDetail?.order?.note,
          orderStatus: orderDetail?.order?.orderStatus,
        },
        invoice: {
          id: orderDetail?.invoice?.id,
          advancePaid: orderDetail.invoice?.advancePaid || 0,
          paymentStatus: orderDetail.invoice?.paymentStatus || "pending",
          billTo: {
            phone: orderDetail.invoice?.billTo?.phone || "",
            detail: orderDetail.invoice?.billTo?.detail || "",
          },
          generateInvoice: orderDetail.invoice?.generateInvoice,
          orderIds: orderDetail?.invoice?.orderIds,
          billDate: orderDetail?.invoice?.billDate,
          createdAt: orderDetail?.invoice?.createdAt,
          paymentMode: orderDetail?.invoice?.paymentMode,
          billFrom: {
            phone: orderDetail.invoice?.billFrom?.phone || "",
            detail: orderDetail.invoice?.billFrom?.detail || "",
          },
          balanceAmount: orderDetail?.invoice?.balanceAmount,
          totalAmount: orderDetail?.invoice?.totalAmount,
        },
      });
    }
  }, [isEditMode, orderDetail, methods]);

  //#endregion

  if (isEditMode && isOrderLoading) {
    return <p>Loading details...</p>;
  }

  return (
    <div className="order-list-app">
      <OrderHeaderApp
        header={isEditMode ? "Edit Order" : "Add Order"}
        description={
          isEditMode ? "Update existing order details." : "Create a new order."
        }
      >
        <NavLink to={ROUTE_URL.SALES.ORDER.LIST}>
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
          <div className="form d-flex flex-column flex-lg-row">
            {/* Sidebar */}
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
                  isOrderPlacingInProgress={
                    isOrderPlacingInProgress || isOrderUpdateInProgress
                  }
                  isEditMode={isEditMode}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
              {/* Customer Info */}
              <div className="card card-flush py-4">
                <div className="card-body">
                  <div className="d-flex flex-column flex-md-row gap-5 mb-10">
                    <div className="fv-row w-100">
                      <label className="required form-label">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-solid ${
                          errors?.order?.customerName ? "is-invalid" : ""
                        }`}
                        placeholder="Customer Name"
                        list="list-customer"
                        {...register("order.customerName", {
                          required: "Customer Name is required",
                        })}
                      />
                      <datalist id="list-customer">
                        {customers?.items?.map((customer) => (
                          <option key={customer.id} value={customer.name}>
                            {customer.name}
                          </option>
                        ))}
                      </datalist>
                      {errors?.order?.customerName?.message && (
                        <div className="invalid-feedback">
                          {errors?.order.customerName.message}
                        </div>
                      )}
                    </div>

                    <div className="fv-row w-100">
                      <label className="form-label">Phone</label>
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="Phone Number"
                        {...register("invoice.billTo.phone")}
                      />
                    </div>
                  </div>

                  <div className="fv-row">
                    <label className="form-label">Detail</label>
                    <textarea
                      className="form-control form-control-solid"
                      placeholder="Additional details about the order"
                      rows={3}
                      {...register("invoice.billTo.detail")}
                    />
                  </div>
                </div>
              </div>

              {/* Customized Products */}
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
                  {itemFields.map((item, index) => (
                    <CustomizedArtApp
                      key={item.id}
                      item={item}
                      index={index}
                      frameTypes={frameTypes}
                      glassTypes={glassTypes}
                      miscCharges={miscCharges}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrderFormApp;
