import "./home.scss";

import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { AppState } from "../../../app/store";
import { GetEnvConfig } from "../../../app.config";
import type { IProductData } from "../../store/catalog/interface/product/product.model";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { addItemToBag } from "../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useGetProductsQuery } from "../../../app/redux/website/product/website-product.api";

const blankImage = "/static/media/img/svg/blank-image.svg";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appSettings = GetEnvConfig();

  const categories = [
    {
      title: "Sofas",
      image: "/static/media/img/furniture/category/sofa.png",
    },
    {
      title: "Beds",
      image: "/static/media/img/furniture/category/bed1.png",
    },
    {
      title: "Dining",
      image: "/static/media/img/furniture/category/dinning-set.png",
    },
    {
      title: "TV unit",
      image: "/static/media/img/furniture/category/tv-unit.png",
    },
    {
      title: "Chairs",
      image: "/static/media/img/furniture/category/helen-chair.png",
    },
    {
      title: "Tables",
      image: "/static/media/img/furniture/category/tables.webp",
    },
    {
      title: "Storage",
      image: "/static/media/img/furniture/category/storages.webp",
    },
    {
      title: "Wardrobes",
      image: "/static/media/img/furniture/category/wardrobe.png",
    },
    {
      title: "Home Decor",
      image: "/static/media/img/furniture/category/home-decor.webp",
    },
  ];

  const offers = [
    {
      icon: "bi-lightning-charge-fill",
      title: "FLAT 50% OFF",
      subtitle: "On selected styles",
    },
    {
      icon: "bi-truck",
      title: "FREE SHIPPING",
      subtitle: "On orders above ₹999",
    },
    {
      icon: "bi-percent",
      title: "EXTRA 10% OFF",
      subtitle: "Use code: Artisan10",
    },
  ];

  const bagItems = useSelector(
    (state: AppState) => state.core.shoppingBag.items,
  );

  const { data: productsResponse, isLoading } = useGetProductsQuery({
    searchText: "",
    page: 1,
    pageSize: 12,
  });

  const productsFromStore = useSelector(
    (state: AppState) => state?.website?.websiteProducts?.websiteProducts,
  );

  const products =
    productsFromStore?.items?.length > 0
      ? productsFromStore.items
      : (productsResponse?.items ?? []);

  const handleAddToBag = (
    product: any,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(
      addItemToBag({
        id: product?.id,
        name: product?.name,
        image: product?.media?.[0]?.url ?? blankImage,
        price: product?.price?.sellingPrice ?? 0,
        quantity: 1,
      }),
    );
  };

  return (
    <main className="home-page">
      {/* PROMO STRIP */}

      <section className="home-offer-strip">
        <div className="home-offer-track">
          {offers.map((offer) => (
            <div className="home-offer-item" key={offer.title}>
              <i className={`bi ${offer.icon}`} />

              <div>
                <strong>{offer.title}</strong>
                <span>{offer.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HERO */}

      <section className="home-hero">
        <div className="home-hero-content">
          <span>BIG FASHION SALE</span>

          <h1>Styles you love.</h1>

          <p>Discover the latest trends at irresistible prices.</p>

          <button
            type="button"
            className="home-hero-btn"
            onClick={() => navigate(ROUTE_URL.WEBSITE.PRODUCTS)}
          >
            Shop Now
            <i className="bi bi-arrow-right" />
          </button>
        </div>

        <div className="home-hero-decoration">
          <span>UP TO</span>
          <strong>70%</strong>
          <small>OFF</small>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="home-section">
        <div className="home-section-header">
          <div>
            <span>SHOP BY</span>
            <h2>Categories</h2>
          </div>

          <button
            type="button"
            onClick={() => navigate(ROUTE_URL.WEBSITE.PRODUCTS)}
          >
            View All <i className="bi bi-arrow-right" />
          </button>
        </div>

        <div className="home-categories">
          {categories.map((category) => (
            <button
              type="button"
              className="home-category"
              key={category.title}
            >
              <div className="home-category-image">
                <img src={category.image} alt={category.title} />
              </div>

              <span>{category.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* DEAL BANNER */}

      <section className="home-deal-banner">
        <div>
          <span>LIMITED TIME OFFER</span>
          <h2>Up to 60% off</h2>
          <p>Fresh styles. Better prices.</p>
        </div>

        <NavLink
          to={ROUTE_URL.WEBSITE.PRODUCTS}
          type="button"
          className="home-hero-btn"
        >
          <button type="button">
            Shop Deals
            <i className="bi bi-arrow-right" />
          </button>
        </NavLink>
      </section>

      {/* PRODUCTS */}

      <section className="home-section home-products-section">
        <div className="home-section-header">
          <div>
            <span>TRENDING NOW</span>
            <h2>Latest Styles</h2>
          </div>

          <button
            type="button"
            onClick={() => navigate(ROUTE_URL.WEBSITE.PRODUCTS)}
          >
            View All <i className="bi bi-arrow-right" />
          </button>
        </div>

        {isLoading ? (
          <div className="home-product-loading">
            <span>Loading products...</span>
          </div>
        ) : (
          <div className="home-products">
            {products.map((product: IProductData) => {
              const image = product?.media?.[0]?.url ?? blankImage;

              const sellingPrice = product?.price?.sellingPrice ?? 0;

              const mrp = product?.price?.basePrice ?? 0;

              const discount =
                mrp > sellingPrice
                  ? Math.round(((mrp - sellingPrice) / mrp) * 100)
                  : 0;

              const isInBag = bagItems?.some(
                (item: any) => item?.id === product?.id,
              );

              return (
                <article className="home-product-card" key={product?.id}>
                  <div className="home-product-image">
                    <img src={image} alt={product?.name || "Product"} />

                    {discount > 0 && (
                      <span className="home-product-discount">
                        {discount}% OFF
                      </span>
                    )}

                    <button
                      type="button"
                      className="home-product-wishlist"
                      aria-label="Add to wishlist"
                    >
                      <i className="bi bi-heart" />
                    </button>
                  </div>

                  <div className="home-product-content">
                    <span className="home-product-brand">
                      By {appSettings?.name}
                    </span>

                    <h3>{product?.name}</h3>

                    <div className="home-product-price">
                      <strong>₹{sellingPrice}</strong>

                      {mrp > sellingPrice && <span>₹{mrp}</span>}

                      {discount > 0 && <em>{discount}% off</em>}
                    </div>

                    <button
                      type="button"
                      className={`home-product-bag ${isInBag ? "added" : ""}`}
                      onClick={(event) => handleAddToBag(product, event)}
                    >
                      <i className={`bi ${isInBag ? "bi-check2" : "bi-bag"}`} />

                      <span>{isInBag ? "Added to Bag" : "Add to Bag"}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="home-empty">
            <i className="bi bi-bag" />
            <span>No products available</span>
          </div>
        )}
      </section>

      {/* TRUST FEATURES */}

      <section className="home-features">
        <div className="home-feature">
          <i className="bi bi-truck" />
          <div>
            <strong>Free Shipping</strong>
            <span>On orders above ₹999</span>
          </div>
        </div>

        <div className="home-feature">
          <i className="bi bi-arrow-repeat" />
          <div>
            <strong>Easy Returns</strong>
            <span>Hassle-free returns</span>
          </div>
        </div>

        <div className="home-feature">
          <i className="bi bi-shield-check" />
          <div>
            <strong>Secure Payments</strong>
            <span>100% secure checkout</span>
          </div>
        </div>

        <div className="home-feature">
          <i className="bi bi-headset" />
          <div>
            <strong>24/7 Support</strong>
            <span>We're here to help</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
