interface ModelAppProps {
  show: boolean;
  children: any;
}

const ModelApp: React.FC<ModelAppProps> = ({ show, children }) => {
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
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ModelApp;
