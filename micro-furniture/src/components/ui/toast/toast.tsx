import React, { useEffect, useRef } from "react";

export interface ToastAppProps {
  message: string;
  show: boolean;
  delay?: number;
  variant?:
    | "success"
    | "danger"
    | "info"
    | "primary"
    | "secondary"
    | "warning"
    | "light"
    | "dark";
  onClose?: () => void;
}

const ToastApp: React.FC<ToastAppProps> = ({
  message,
  show,
  delay = 3000,
  variant = "success",
  onClose,
}) => {
  const toastRef = useRef<HTMLDivElement | null>(null);
  const isLightBackground = variant === "warning" || variant === "light";

  useEffect(() => {
    if (show && toastRef.current) {
      const bsToast = new (window as any).bootstrap.Toast(toastRef.current, {
        delay,
        autohide: true,
      });
      bsToast.show();

      toastRef.current.addEventListener("hidden.bs.toast", () => {
        onClose?.();
      });
    }
  }, [show, delay, onClose]);

  return (
    show && (
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 1080 }}
      >
        <div
          ref={toastRef}
          className={`toast bg-${variant} ${
            isLightBackground ? "text-dark" : "text-white"
          } border-0`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{message}</div>
            <button
              type="button"
              className={`btn-close ${
                !isLightBackground ? "btn-close-white" : ""
              } me-2 m-auto`}
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    )
  );
};

export default ToastApp;
