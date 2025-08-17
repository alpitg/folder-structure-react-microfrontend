import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductMetaOptionApp = () => {
  const { register } = useFormContext<IProductData>();

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Meta Options</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <div className="mb-10">
          <label htmlFor="metaTitle" className="form-label">
            Meta Tag Title
          </label>
          <input
            id="metaTitle"
            type="text"
            className="form-control mb-2"
            placeholder="Meta tag name"
            {...register("meta.metaTitle")}
          />
          <div className="text-muted fs-7">
            Set a meta tag title. Recommended to be simple and precise keywords.
          </div>
        </div>

        <div className="mb-10">
          <label htmlFor="metaDescription" className="form-label">
            Meta Tag Description
          </label>
          <input
            id="metaDescription"
            type="text"
            className="form-control mb-2"
            placeholder="Meta Description"
            {...register("meta.metaDescription")}
          />
          <div className="text-muted fs-7">
            Set a meta tag description to the product for increased SEO ranking.
          </div>
        </div>

        {/* <div>
          <label
            htmlFor="catalog_add_product_meta_keywords"
            className="form-label"
          >
            Meta Tag Keywords
          </label>
          <input
            id="catalog_add_product_meta_keywords"
            className="form-control mb-2"
            {...register("meta.metaKeywords")}
          />
          <div className="text-muted fs-7">
            Set a list of keywords that the product is related to. Separate the
            keywords by adding a comma <code>,</code> between each keyword.
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductMetaOptionApp;
