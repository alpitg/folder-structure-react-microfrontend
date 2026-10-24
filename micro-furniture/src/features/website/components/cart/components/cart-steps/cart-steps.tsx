import "./cart-steps.scss";

export type CartCheckoutStep = "bag" | "address" | "payment";

interface CartStepsProps {
  currentStep: CartCheckoutStep;

  /**
   * Optional callback when the user clicks a completed step.
   *
   * Example:
   * Bag → Address → Payment
   *
   * When on Payment, clicking Bag can take the user back
   * to the bag step.
   */
  onStepChange?: (step: CartCheckoutStep) => void;

  /**
   * Prevent navigation to previous steps.
   */
  disabled?: boolean;
}

interface Step {
  id: CartCheckoutStep;
  label: string;
  icon: string;
}

const steps: Step[] = [
  {
    id: "bag",
    label: "Bag",
    icon: "bi-bag",
  },
  {
    id: "address",
    label: "Address",
    icon: "bi-geo-alt",
  },
  {
    id: "payment",
    label: "Payment",
    icon: "bi-credit-card",
  },
];

const CartSteps = ({
  currentStep,
  onStepChange,
  disabled = false,
}: CartStepsProps) => {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  const handleStepClick = (step: CartCheckoutStep, stepIndex: number) => {
    if (disabled || !onStepChange) {
      return;
    }

    /**
     * Only allow navigation to steps that have already
     * been completed.
     *
     * Example:
     *
     * current = payment
     * allowed = bag + address
     *
     * current = address
     * allowed = bag
     */
    if (stepIndex < currentStepIndex) {
      onStepChange(step);
    }
  };

  return (
    <nav className="cart-steps" aria-label="Checkout progress">
      <div className="cart-steps-list">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;

          const isCompleted = index < currentStepIndex;

          const isClickable = !disabled && !!onStepChange && isCompleted;

          return (
            <div
              key={step.id}
              className={`cart-step ${
                isActive ? "cart-step-active" : ""
              } ${isCompleted ? "cart-step-completed" : ""} ${
                isClickable ? "cart-step-clickable" : ""
              }`}
            >
              {/* ================================================== */}
              {/* STEP */}
              {/* ================================================== */}

              <button
                type="button"
                className="cart-step-button"
                onClick={() => handleStepClick(step.id, index)}
                disabled={!isClickable}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${step.label}${
                  isCompleted ? ", completed" : isActive ? ", current step" : ""
                }`}
              >
                {/* Number / Check */}
                <span className="cart-step-number">
                  {isCompleted ? (
                    <i className="bi bi-check-lg" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>

                {/* Icon */}
                <span className="cart-step-icon">
                  <i className={`bi ${step.icon}`} />
                </span>

                {/* Label */}
                <span className="cart-step-label">{step.label}</span>
              </button>

              {/* ================================================== */}
              {/* CONNECTOR */}
              {/* ================================================== */}

              {index < steps.length - 1 && (
                <span
                  className={`cart-step-connector ${
                    index < currentStepIndex
                      ? "cart-step-connector-completed"
                      : ""
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default CartSteps;
