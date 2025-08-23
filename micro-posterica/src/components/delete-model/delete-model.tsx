const deleteIcon = "/static/media/img/svg/delete-1.svg";

interface DeleteModelAppProps {
  show: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const DeleteModelApp: React.FC<DeleteModelAppProps> = ({
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
                    <img src={deleteIcon} style={{ maxHeight: "200px" }} />
                  </div>
                  <p className="fs-5 mb-0">Are you sure you want to delete ?</p>
                </div>

                <div className="d-flex justify-content-center gap-4">
                  <button
                    type="button"
                    className="btn btn-danger fw-bold"
                    onClick={handleConfirm}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-light fw-bold"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                  >
                    No
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
export default DeleteModelApp;
