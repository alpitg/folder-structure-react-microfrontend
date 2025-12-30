import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductStatusApp = () => {
  const { register, watch } = useFormContext<IProductData>();
  const status = watch("status");

  const templates = [
    {
      id: 1,
      displayName: "Published",
      value: "published",
    },
    {
      id: 2,
      displayName: "Draft",
      value: "draft",
    },
    {
      id: 3,
      displayName: "Scheduled",
      value: "scheduled",
    },
    {
      id: 4,
      displayName: "Inactive",
      value: "inactive",
    },
  ];

  const statusColorMap = {
    published: "bg-success",
    inactive: "bg-danger",
    scheduled: "bg-warning",
    draft: "bg-primary",
  };

  const ProductStatusIndicator = ({
    status = "draft",
  }: {
    status: keyof typeof statusColorMap;
  }) => {
    return (
      <div
        className={`rounded-circle ${statusColorMap[status]} w-15px h-15px`}
        id="catalog_add_product_status"
      ></div>
    );
  };

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Status</h2>
        </div>
        <div className="card-toolbar">
          <ProductStatusIndicator status={status ?? "draft"} />
        </div>
      </div>

      <div className="card-body pt-0">
        <select
          id="catalog_add_product_status_select"
          className="form-select mb-2"
          defaultValue="published"
          {...register("status")}
        >
          {templates?.map((x) => {
            return (
              <option key={x?.id} value={x?.value}>
                {x?.displayName}
              </option>
            );
          })}
        </select>

        <div className="text-muted fs-7">Set the product status.</div>
      </div>
    </div>
  );
};

export default ProductStatusApp;
