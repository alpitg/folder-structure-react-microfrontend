import DeleteConfirmationApp from "../../../../../../components/ui/delete-confirmation/delete-confirmation";
import { ROUTE_URL } from "../../../../../../components/auth/constants/routes.const";
import { calculateTotalAmount } from "../../../../../bills/utils/bill-calculation.util";
import { paymentModes } from "../../../../../../constants/app.const";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";

const OrderSummaryApp = ({
  isOrderPlacingInProgress,
}: {
  isOrderPlacingInProgress: boolean;
}) => {
  const { register, watch } = useFormContext();

  const [order, invoice] = watch(["order", "invoice"]) || [];

  const total = calculateTotalAmount(order);
  const discount = watch("order.discountAmount") || 0;
  const paid = watch("invoice.advancePaid") || 0;
  const balance = total - discount - paid;

  const navigate = useNavigate();

  const [isDiscard, setIsDiscard] = useState<boolean>(false);
  const handleOnDiscard = () => {
    navigate(ROUTE_URL.FINANCE.SALES.BASE);
  };

  return (
    <div className="card-body pt-0">
      <div className="d-flex flex-column gap-5">
        <div className="fv-row d-flex align-items-center">
          <label className="pe-2">Order ID</label>
          <div className="fw-bold fs-3">#13860</div>
        </div>

        <div className="fv-row">
          <h6 className="d-flex align-items-center text-gray-600 text-hover-primary justify-content-between">
            PAYMENT DETAILS
            {balance > 0 && (
              <span className="badge badge-light-warning">Pending Payment</span>
            )}
            {balance < 0 && (
              <span className="badge badge-light-danger">Overpaid</span>
            )}
            {balance === 0 && (
              <span className="badge badge-light-success">No Payment Due</span>
            )}
          </h6>
        </div>

        <div className="fv-row">
          <label className="required form-label">Payment Method</label>
          <select
            className="form-select form-select-solid"
            {...register("invoice.paymentMode")}
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
              <div className="fw-semibold pe-10 text-gray-600 fs-7">Total:</div>
              <div className="text-end fw-bold fs-6 text-gray-800">
                ₹ {total.toFixed(2)}
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
                  className="form-control form-control-solid hide-spin-button text-end"
                  {...register("order.discountAmount", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="separator separator-dashed"></div>

            <div className="d-flex flex-stack py-4">
              <div className="fw-semibold pe-10 text-gray-600 fs-7">
                Balance After Discount:
              </div>
              <div className="text-end fw-bold fs-2 text-gray-800">
                ₹ {(total - discount).toFixed(2)}
              </div>
            </div>

            <div className="separator separator-dashed"></div>

            <div className="d-flex flex-stack py-4">
              <div className="fw-semibold pe-10 text-gray-600 fs-7">Paid:</div>
              <div className="text-end fw-bold fs-6 text-gray-800">
                <input
                  type="number"
                  min={0}
                  className="form-control form-control-solid hide-spin-button text-end"
                  {...register("invoice.advancePaid", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="d-flex flex-stack">
              <div className="fw-semibold pe-10 text-gray-600 fs-7">
                Amount Due:
              </div>
              <div className="text-end fw-bold fs-6 text-gray-800">
                ₹ {balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isOrderPlacingInProgress}
        >
          {isOrderPlacingInProgress ? (
            <span className="spinner-border spinner-border-sm align-middle me-2"></span>
          ) : (
            <i className="bi bi-save fs-3 me-2"></i>
          )}
          Place Order
        </button>

        <button
          className="btn btn-light w-100"
          onClick={() => setIsDiscard(!isDiscard)}
        >
          <i className="bi bi-x-lg fs-3"></i> Cancel
        </button>

        {isDiscard && (
          <DeleteConfirmationApp
            show={isDiscard}
            handleConfirm={handleOnDiscard}
            handleCancel={() => setIsDiscard(!isDiscard)}
          />
        )}
      </div>
    </div>
  );
};

export default OrderSummaryApp;
