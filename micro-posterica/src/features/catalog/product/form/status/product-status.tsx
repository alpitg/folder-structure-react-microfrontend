const ProductStatusApp = () => {
  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Status</h2>
        </div>
        <div className="card-toolbar">
          <div
            className="rounded-circle bg-success w-15px h-15px"
            id="catalog_add_product_status"
          ></div>
        </div>
      </div>

      <div className="card-body pt-0">
        <select
          className="form-select mb-2"
          defaultValue="published"
          id="catalog_add_product_status_select"
        >
          <option value=""></option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="text-muted fs-7">Set the product status.</div>
      </div>
    </div>
  );
};

export default ProductStatusApp;
