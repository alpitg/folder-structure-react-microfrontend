import "./products.scss";

import type { AppDispatch, AppState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  useGetProductsQuery,
  websiteProductApi,
} from "../../../app/redux/website/product/website-product.api";
import { useLocation, useNavigate } from "react-router";

import type { IProductData } from "../../store/catalog/interface/product/product.model";
import NotFoundApp from "./not-found/not-found";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { addItemToBag } from "../../../app/redux/core/shopping-bag/shopping-bag.slice";

const Products = () => {
  // ==================================================
  // VARIABLES
  // ==================================================

  const blankImage = "/static/media/img/svg/blank-image.svg";

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  const bagItems = useSelector(
    (state: AppState) => state.core.shoppingBag.items,
  );

  // ==================================================
  // PAGINATION
  // ==================================================

  const [page, setPage] = useState(1);

  const pageSize = 12;

  // ==================================================
  // PRODUCTS
  // ==================================================

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery({
    searchText: "",
    categories: category ? [category] : null,
    page,
    pageSize,
    sort: "newest",
  });

  // ==================================================
  // PREFETCH NEXT PAGE
  // ==================================================

  useEffect(() => {
    dispatch(
      websiteProductApi.util.prefetch(
        "getProducts",
        {
          searchText: "",
          categories: category ? [category] : null,
          page: page + 1,
          pageSize,
          sort: "newest",
        },
        {
          force: false,
        },
      ),
    );
  }, [dispatch, page]);

  // ==================================================
  // PRODUCTS
  // ==================================================

  const products = productsResponse?.items ?? [];

  // ==================================================
  // BAG ITEM MAP
  // ==================================================

  const bagItemMap = useMemo(() => {
    return new Map(bagItems.map((item) => [item.id, item]));
  }, [bagItems]);

  // ==================================================
  // CATEGORY FILTER
  // ==================================================

  const filteredProducts = useMemo(() => {
    if (!category) {
      return products;
    }

    return products.filter((product) =>
      product?.categories?.includes(category),
    );
  }, [products, category]);

  // ==================================================
  // QUICK VIEW
  // ==================================================

  const handleQuickView = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  // ==================================================
  // BAG
  // ==================================================

  const addToCart = (product: IProductData) => {
    dispatch(
      addItemToBag({
        id: product.id,
        name: product.name,
        image: product.media?.[0]?.url ?? blankImage,
        price: product.price?.sellingPrice ?? 0,
        quantity: 1,
      }),
    );
  };

  const handleViewBag = () => {
    navigate(ROUTE_URL.WEBSITE.CART);
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <section className="products-app">
      {/* ================================================== */}
      {/* LOADING */}
      {/* ================================================== */}

      {isLoading && (
        <div className="products-loading">
          <div className="spinner-border spinner-border-sm text-dark me-2" />
          Loading products...
        </div>
      )}

      {/* ================================================== */}
      {/* FETCHING */}
      {/* ================================================== */}

      {isFetching && !isLoading && (
        <div className="products-updating">
          <div className="spinner-border spinner-border-sm me-2" />
          Updating products...
        </div>
      )}

      {/* ================================================== */}
      {/* ERROR */}
      {/* ================================================== */}

      {isError && (
        <div className="products-error">
          <i className="bi bi-exclamation-circle me-2"></i>
          Unable to load products right now.
        </div>
      )}

      {/* ================================================== */}
      {/* PRODUCTS */}
      {/* ================================================== */}

      {!isLoading && !isError && filteredProducts.length > 0 ? (
        <>
          <div className="row g-3 g-md-4">
            {filteredProducts.map((product) => {
              const bagItem = bagItemMap.get(product.id);
              const quantity = bagItem?.quantity ?? 0;

              return (
                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                  <div className="product-card">
                    {/* ================================================== */}
                    {/* IMAGE */}
                    {/* ================================================== */}

                    <div className="product-img">
                      <img
                        loading="lazy"
                        src={
                          product?.media?.[0]?.url
                            ? product.media[0].url
                            : blankImage
                        }
                        alt={product?.name || "Product"}
                        className="product-image"
                      />

                      {/* ================================================== */}
                      {/* NEW BADGE */}
                      {/* ================================================== */}

                      {product?.isNewArrival && (
                        <span className="product-badge">
                          <i className="bi bi-stars"></i>
                          New
                        </span>
                      )}

                      {/* ================================================== */}
                      {/* WISHLIST */}
                      {/* ================================================== */}

                      <button
                        type="button"
                        className="wishlist-btn"
                        aria-label={`Add ${product?.name} to wishlist`}
                      >
                        <i className="bi bi-heart"></i>
                      </button>

                      {/* ================================================== */}
                      {/* PRODUCT ACTIONS */}
                      {/* ================================================== */}

                      <div className="product-actions">
                        {quantity === 0 ? (
                          <button
                            type="button"
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product)}
                          >
                            <i className="bi bi-bag-plus"></i>
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="view-cart-btn"
                            onClick={handleViewBag}
                          >
                            Go to Bag
                            <i className="bi bi-arrow-right"></i>
                          </button>
                        )}

                        {/* Quick View */}
                        <button
                          type="button"
                          className="quick-view-btn"
                          onMouseEnter={() =>
                            dispatch(
                              websiteProductApi.util.prefetch(
                                "getProductDetail",
                                product.id,
                                {
                                  force: false,
                                },
                              ),
                            )
                          }
                          onClick={() => handleQuickView(product.id)}
                        >
                          <i className="bi bi-eye"></i>
                          View
                        </button>
                      </div>
                    </div>

                    {/* ================================================== */}
                    {/* PRODUCT DETAILS */}
                    {/* ================================================== */}

                    <div className="product-content">
                      <h6 className="product-name">{product?.name}</h6>

                      {product?.description && (
                        <p className="product-description">
                          {product.description}
                        </p>
                      )}

                      {/* ================================================== */}
                      {/* PRICE */}
                      {/* ================================================== */}

                      <div className="product-price">
                        <span className="sale-price">
                          ₹
                          {(product?.price?.sellingPrice ?? 0).toLocaleString(
                            "en-IN",
                          )}
                        </span>

                        {product?.price?.basePrice &&
                          product.price.basePrice >
                            (product?.price?.sellingPrice ?? 0) && (
                            <>
                              <span className="mrp-price">
                                ₹
                                {product.price.basePrice.toLocaleString(
                                  "en-IN",
                                )}
                              </span>

                              {product?.price?.discount?.value && (
                                <span className="discount">
                                  {product.price.discount.value}% OFF
                                </span>
                              )}
                            </>
                          )}
                      </div>

                      {/* ================================================== */}
                      {/* RATING */}
                      {/* ================================================== */}

                      {product?.reviews > 0 && (
                        <div className="product-rating">
                          <span className="rating-value">
                            {product?.rating ?? 0}
                            <i className="bi bi-star-fill"></i>
                          </span>

                          <span className="rating-divider">|</span>

                          <span>{product?.reviews ?? 0} reviews</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================================================== */}
          {/* PAGINATION */}
          {/* ================================================== */}

          <div className="pagination-wrapper">
            <button
              type="button"
              className="pagination-btn"
              disabled={page === 1 || isFetching}
              onClick={() => setPage((previous) => previous - 1)}
            >
              <i className="bi bi-chevron-left"></i>
              Previous
            </button>

            <span className="pagination-page">Page {page}</span>

            <button
              type="button"
              className="pagination-btn"
              disabled={products.length < pageSize || isFetching}
              onClick={() => setPage((previous) => previous + 1)}
            >
              Next
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      ) : (
        !isLoading && !isError && <NotFoundApp />
      )}
    </section>
  );
};

export default Products;
