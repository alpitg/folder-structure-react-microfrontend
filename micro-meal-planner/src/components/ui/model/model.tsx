interface ModelAppProps {
  show: boolean;
  modelSize?: "sm" | "md" | "lg" | "xl" | "fullscreen";
  children: React.ReactNode;
  onClose: () => void;
}

const ModelApp: React.FC<ModelAppProps> = ({
  show,
  modelSize = "lg",
  children,
  onClose,
}) => {
  return (
    <>
      {show && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
          role="dialog"
        >
          <div
            className={`modal-dialog modal-dialog-centered ${
              modelSize ? `modal-${modelSize}` : ""
            }`}
          >
            <div className="modal-content">
            <div className="ribbon ribbon-triangle ribbon-top-end border-primary">
                <div
                  className="ribbon-icon mt-n6 cursor-pointer"
                  onClick={() => onClose?.()}
                >
                  <i className="bi bi-x fs-1 text-white"></i>
                </div>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelApp;
