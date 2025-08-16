const ProductMetaOptionApp = () => {
  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Meta Options</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <div className="mb-10">
          <label className="form-label">Meta Tag Title</label>
          <input
            type="text"
            className="form-control mb-2"
            name="meta_title"
            placeholder="Meta tag name"
          />
          <div className="text-muted fs-7">
            Set a meta tag title. Recommended to be simple and precise keywords.
          </div>
        </div>

        <div className="mb-10">
          <label className="form-label">Meta Tag Description</label>
          <div role="toolbar" className="ql-toolbar ql-snow">
            <span className="ql-formats">
              <select className="ql-header form-select form-select-sm w-auto d-inline-block">
                <option value="1">H1</option>
                <option value="2">H2</option>
                <option selected={true}>Normal</option>
              </select>
            </span>
            <span className="ql-formats">
              <button type="button" className="btn btn-sm btn-light">
                <i className="bi bi-type-bold"></i>
              </button>
              <button type="button" className="btn btn-sm btn-light">
                <i className="bi bi-type-italic"></i>
              </button>
              <button type="button" className="btn btn-sm btn-light">
                <i className="bi bi-type-underline"></i>
              </button>
            </span>
            <span className="ql-formats">
              <button type="button" className="btn btn-sm btn-light">
                <i className="bi bi-image"></i>
              </button>
              <button type="button" className="btn btn-sm btn-light">
                <i className="bi bi-code-slash"></i>
              </button>
            </span>
          </div>
          <div
            id="catalog_add_product_meta_description"
            className="min-h-100px mb-2 ql-container ql-snow"
          >
           dump here
          </div>
          <div className="text-muted fs-7">
            Set a meta tag description to the product for increased SEO ranking.
          </div>
        </div>

        <div>
          <label className="form-label">Meta Tag Keywords</label>
          <input
            id="catalog_add_product_meta_keywords"
            name="catalog_add_product_meta_keywords"
            className="form-control mb-2"
          />
          <div className="text-muted fs-7">
            Set a list of keywords that the product is related to. Separate the
            keywords by adding a comma <code>,</code> between each keyword.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMetaOptionApp;
