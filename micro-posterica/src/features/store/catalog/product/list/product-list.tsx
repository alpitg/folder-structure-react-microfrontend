import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";

import PageHeaderApp from "../../../../../components/header/page-header/page-header";
import ProductFilterApp from "./filter/product-filter";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";
import { useGetProductsQuery } from "../../../../../app/redux/catalog/product/product.api";

type sortType = "newest" | "oldest";

const ProductListApp = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");

  // Query hook for products
  const {
    data: productData,
    isLoading,
    refetch,
  } = useGetProductsQuery({
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

  // Refresh if navigated with { state: { refresh: true } }
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  if (isLoading) return <p>Loading...</p>;
  //   if (error) return <ErrorPage />;

  return (
    <div className="product-list-app">
      <PageHeaderApp
        header="Product Listing"
        description="All products are listed here."
      >
        <NavLink
          to={ROUTE_URL.CATALOG.PRODUCT.ADD}
          className="btn btn-primary btn-sm"
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add New Product
        </NavLink>
      </PageHeaderApp>

      <div className="card">
        <div className="card-body">
          <ProductFilterApp
            page={page}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            pages={productData?.pages || 1}
            onSearch={() => setPage(1)}
            pageSize={productData?.pageSize || 0}
            total={productData?.total || 0}
            sort={sort}
            setSort={handleSortChange}
          />

          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800">
                  <th>NAME</th>
                  <th>SKU</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th>RATING</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody className="fw-semibold text-gray-600">
                {productData?.items?.map((product) => (
                  <tr key={product?.id}>
                    <td>
                      <NavLink
                        className="btn btn-sm fs-5 fw-bold"
                        to={ROUTE_URL.CATALOG.PRODUCT.EDIT.replace(
                          ":id",
                          product?.id
                        )}
                      >
                        {product?.name}
                      </NavLink>
                    </td>
                    <td>{product?.inventory?.sku}</td>
                    <td>{product?.inventory?.quantity}</td>
                    <td>{product?.price?.basePrice?.toFixed(2)}</td>
                    <td>{product?.rating}</td>
                    <td>{product?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListApp;
