interface DeleteConfirmationAppProps {
  show: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const DeleteConfirmationApp: React.FC<DeleteConfirmationAppProps> = ({
  show,
  handleConfirm,
  handleCancel,
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
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center py-10">
                <div className="py-10">
                  <div className="mb-10">
                    <i className="bi bi-exclamation-circle fs-1"></i>
                  </div>
                  Are you sure you want to discard the change ?
                </div>

                <div className="d-flex justify-content-center gap-4">
                  <button
                    type="button"
                    className="btn btn-danger fw-bold"
                    onClick={handleConfirm}
                  >
                    Yes, Discard!
                  </button>
                  <button
                    type="button"
                    className="btn btn-light fw-bold"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteConfirmationApp;
