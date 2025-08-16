const ProductMediaApp = () => {
  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Media</h2>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="fv-row mb-2">
          <div className="dropzone dz-clickable" id="catalog_add_product_media">
            <div className="dz-message needsclick">
              <i className="bi bi-upload text-primary fs-3x"></i>
              <div className="ms-4">
                <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                  Drop files here or click to upload.
                </h3>
                <span className="fs-7 fw-semibold text-gray-500">
                  Upload up to 10 files
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-muted fs-7">Set the product media gallery.</div>
      </div>
    </div>
  );
};

export default ProductMediaApp;
