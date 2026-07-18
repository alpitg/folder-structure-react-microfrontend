const NotFoundApp = () => {
  return (
    <div className="text-center py-20">
      <div className="display-1 mb-2">
        {/* <i className="bi bi-box-seam fs-1"></i> */}
        <i className="bi bi-exclamation-octagon fs-1"></i>
      </div>

      <h3 className="fw-semibold">Nothing Here Yet!</h3>

      <p className="text-muted mb-0">
        We don't have any products matching your selection right now.
      </p>
      <p className="text-muted mt-0">Try exploring another category.</p>
    </div>
  );
};

export default NotFoundApp;
