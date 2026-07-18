import "./product-details.scss";

import {
  addItemToBag,
  decreaseBagItemQuantity,
  removeBagItem,
} from "../../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import type { AppState } from "../../../../app/store";
import BenefitsApp from "./benefits/benefits";
import ExportAdviceApp from "./expert-advice/export-advice";
import { GetEnvConfig } from "../../../../app.config";
import MoreDetailApp from "./more-detail/more-detail";
import NewArrivals from "./new-arrivals/new-arrivals";
import PricingApp from "./pricing/pricing";
import ProductGallery from "./gallery/product-gallery";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";
import { useGetProductsQuery } from "../../../../app/redux/catalog/product/product.api";
import { useMemo } from "react";

const ProductDetails = () => {
  const blankImage = "/static/media/img/svg/blank-image.svg";
  const appSettings = GetEnvConfig();

  const { id } = useParams();
  const route = useNavigate();
  const dispatch = useDispatch();
  const bagItems = useSelector(
    (state: AppState) => state.core.shoppingBag.items,
  );

  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetProductsQuery({
    page: 1,
    pageSize: 10,
  });

  const productsFromStore = useSelector(
    (state: AppState) => state.catalog.products.products,
  );

  const product = useMemo(() => {
    const products =
      productsFromStore.length > 0
        ? productsFromStore
        : (productsResponse?.items ?? []);

    return products.find((item) => String(item.id) === String(id)) ?? null;
  }, [productsFromStore, productsResponse, id]);

  if (isLoading) {
    return <div className="container py-5 text-center">Loading product...</div>;
  }

  if (isError || !product) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">404</h2>
        <p className="text-muted mb-4">Product not found.</p>
        <button
          className="btn btn-dark"
          onClick={() => route(ROUTE_URL.WEBSITE.PRODUCTS)}
        >
          Back to products
        </button>
      </div>
    );
  }

  const quantityInBag =
    bagItems.find((item) => item.id === product.id)?.quantity ?? 0;

  const productImages = product?.media
    ?.map((mediaItem) => mediaItem.url)
    .filter(Boolean) as string[];

  return (
    <div className="product-details-app container py-5 mb-20 mt-5">
      <div className="row g-5">
        <div className="col-lg-6 position-relative">
          <ProductGallery images={productImages} />
        </div>

        <div className="col-lg-6">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small mb-2">
              <li className="breadcrumb-item">
                <a
                  href={ROUTE_URL.WEBSITE.PRODUCTS}
                  onClick={(e) => {
                    e.preventDefault();
                    route(ROUTE_URL.WEBSITE.PRODUCTS);
                  }}
                  className="text-decoration-none text-dark"
                >
                  Products
                </a>
              </li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>

          <div className="d-flex align-items-center gap-3 mt-4">
            <h1 className="h3 fw-semibold mb-0">{product.name}</h1>
            {product.isNewArrival && (
              <div className="badge">
                <span>
                  <i className="bi bi-stars me-1"></i>
                </span>
                <span className="fw-semibold me-1">New in</span>
              </div>
            )}
          </div>
          <span className="text-muted">By {appSettings?.name}.</span>
          <div className="d-flex justify-start align-items-center gap-3">
            {product.rating && (
              <div className="text-warning small d-flex align-items-center gap-1">
                <i className="bi bi-star-fill text-warning"></i>
                {product.rating ?? 4.5}
                <span className="text-muted">
                  · {product.reviews ?? 0} reviews
                </span>
              </div>
            )}
            <div className="text-success small fw-medium">
              <i className="bi bi-check-circle text-success me-1"></i>
              In Stock
            </div>
          </div>

          <PricingApp product={product} />

          <div className="mt-4">
            <label className="form-label fw-semibold">Color</label>
            <div className="d-flex gap-2">
              {(
                product?.variations?.[0]?.values?.split(",") ?? [
                  "var(--bs-dark)",
                  "var(--bs-success)",
                ]
              ).map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  className="rounded-circle border border-secondary"
                  style={{ width: 32, height: 32, backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mt-4 mb-12 product-details-actions">
            {quantityInBag === 0 ? (
              <button
                className="btn btn-dark btn-sm rounded-pill shadow px-3 detail-bag-btn"
                onClick={() =>
                  dispatch(
                    addItemToBag({
                      id: product?.id,
                      name: product?.name,
                      image: product?.media?.[0]?.url ?? blankImage,
                      price: product?.price?.basePrice ?? 0,
                      quantity: 1,
                    }),
                  )
                }
              >
                <i className="bi bi-cart"></i> Add to Cart
              </button>
            ) : (
              <div className="d-flex align-items-center justify-content-between bg-dark rounded-pill px-3 py-1 shadow quantity-pill">
                <button
                  className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                  style={{ width: 28, height: 28 }}
                  onClick={() =>
                    quantityInBag > 1
                      ? dispatch(decreaseBagItemQuantity(product.id))
                      : dispatch(removeBagItem(product.id))
                  }
                >
                  -
                </button>

                <span className="fw-semibold text-light">{quantityInBag}</span>

                <button
                  className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                  style={{ width: 28, height: 28 }}
                  onClick={() =>
                    dispatch(
                      addItemToBag({
                        id: product?.id,
                        name: product?.name,
                        image:
                          product?.media?.[0]?.url ??
                          "/static/media/img/product-1.png",
                        price: product?.price?.basePrice ?? 0,
                        quantity: 1,
                      }),
                    )
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>

          <BenefitsApp />
        </div>
      </div>

      <div className="row mt-10">
        <ExportAdviceApp />
      </div>

      <div className="row mt-10">
        <div className="col-12">
          <MoreDetailApp product={product} />
        </div>
      </div>

      <div className="row mt-4">
        <NewArrivals />
      </div>
    </div>
  );
};

export default ProductDetails;
