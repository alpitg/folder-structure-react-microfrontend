import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useGetProductsQuery } from "../../../../../../app/redux/catalog/product/product.api";
import type { sortType } from "../../../../../../interfaces/sort";
import type { IProductData } from "../../../../catalog/interface/product/product.model";
import { calculateDiscountAmount } from "../../../../catalog/product/utils/costing.util";
import {
  InitializeOrderItem,
  type IOrderInvoiceData,
} from "../../../../../../interfaces/order/order.model";

type ProductAppProps = {};

const ProductApp: React.FC<ProductAppProps> = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<sortType>("newest");

  const { data: productData, isLoading } = useGetProductsQuery({
    page,
    pageSize: 10,
    searchText: search,
    status: "",
    sort,
  });

  const handleSortChange = (newSort: sortType) => {
    setSort(newSort);
    setPage(1);
  };

  const { control, getValues, setValue } = useFormContext<IOrderInvoiceData>();

  const { fields: orderItems, append } = useFieldArray({
    control,
    name: "order.items",
  });

  const totalCost = orderItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity - item.discountAmount,
    0
  );
  const handleAddProduct = (product: IProductData) => {
    const existingIndex = orderItems.findIndex(
      (i) => i?.productId === product?.id
    );

    if (existingIndex === -1) {
      const discountAmount = calculateDiscountAmount(product.price);

      append({
        ...new InitializeOrderItem(),
        _id: product?.id,
        productId: product?.id,
        productType: "physical",
        name: product?.name,
        description: product?.description,
        quantity: 1,
        unitPrice: product?.price?.basePrice || 0,
        discountAmount, // now it’s the actual ₹ off per unit
      });
    } else {
      // Product already in order -> remove
      removeItemByIndex(product.id);
    }
  };

  const removeItemByIndex = (_id: string) => {
    // Step 1: Get the current array
    const currentItems = getValues("order.items");

    // Step 2: Filter out the item you want to remove
    const updatedItems = currentItems.filter((item) => item?.productId !== _id);

    // Step 3: Set the updated array back to the form
    setValue("order.items", updatedItems, {
      shouldDirty: true,
    });

    // removeItem(index);
  };

  return (
    <div className="card card-flush">
      <div className="card-header">
        <div className="card-title">
          <h2>Select Products</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        {/* Add Products Section */}
        <div className="mb-5">
          <label className="form-label">Add products to this order</label>
          <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 border border-dashed rounded pt-1 pb-1 px-2 mb-5 min-h-100px overflow-scroll">
            {orderItems?.filter((x) => x?.productType !== "custom").length ===
              0 && (
              <div className="w-100 d-flex justify-content-center align-items-center py-5">
                <span className="text-muted text-center">
                  Select one or more products from the list below by ticking the
                  checkbox.
                </span>
              </div>
            )}

            {orderItems
              ?.filter((x) => x?.productType !== "custom")
              .map((item) => (
                <div key={item?.productId} className="col my-2">
                  <div className="card card-flush">
                    <div className="ribbon ribbon-top ribbon-vertical">
                      <div
                        className="ribbon-label bg-danger cursor-pointer"
                        onClick={() => removeItemByIndex(item?._id)}
                      >
                        <i className="bi bi-x-lg text-inverse-danger fs-1"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center border border-dashed rounded p-3 bg-body">
                      {/* Thumbnail */}
                      <a href="#" className="symbol symbol-50px">
                        <span className="symbol-label"></span>
                      </a>

                      {/* Product Info */}
                      <div className="ms-5 flex-grow-1">
                        {/* Title */}
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-5 fw-bold"
                        >
                          {item?.name}
                        </a>

                        {/* Price */}
                        <div className="fw-semibold fs-7">
                          Price: ₹
                          <span>
                            {(
                              item.unitPrice * item.quantity -
                              item.discountAmount
                            ).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="text-muted fs-7">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="fw-bold fs-4">
            Total Cost: ₹<span>{totalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="separator mb-5" />

        {/* Search & Add */}
        <div className="d-flex gap-5 mb-3">
          <div className="col-sm-6 d-flex align-items-center position-relative">
            <i className="bi bi-search fs-3 position-absolute ms-4"></i>
            <input
              type="text"
              className="form-control form-control-solid w-100 ps-12"
              placeholder="Search Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Products Table */}
        <div
          className="table-responsive"
          style={{ maxHeight: 400, overflow: "auto" }}
        >
          <table className="table align-middle table-row-dashed fs-6 gy-5">
            <thead>
              <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                <th />
                <th
                  onClick={() =>
                    handleSortChange(sort === "newest" ? "oldest" : "newest")
                  }
                >
                  Product
                  <i
                    className={`bi bi-arrow-${
                      sort === "newest" ? "down" : "up"
                    }`}
                  ></i>
                </th>
                <th className="text-end pe-5">Qty Remaining</th>
              </tr>
            </thead>
            <tbody className="fw-semibold text-gray-600">
              {isLoading ? (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              ) : (
                <>
                  {productData?.items?.map((product) => (
                    <tr key={product?.id}>
                      <td>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={orderItems?.some(
                              (i) => i.productId === product.id
                            )}
                            onChange={() => handleAddProduct(product)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-5">
                            <div className="text-gray-800 text-hover-primary fs-5 fw-bold">
                              {product?.name}
                            </div>
                            <div className="fw-semibold fs-7">
                              Price: ₹{product?.price?.basePrice?.toFixed(2)}
                            </div>
                            <div className="text-muted fs-7">
                              SKU: {product?.inventory?.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-end pe-5">
                        {product?.inventory?.quantity}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-end mt-3 gap-2">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setPage(page + 1)}
            disabled={page * 10 >= (productData?.total || 0)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductApp;
