import { ROUTE_URL } from "../../../../routes/constants/routes.const";
import { useNavigate } from "react-router";

const ShopByCategoryApp = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Sofas",
      category: "sofa",
      image: "/static/media/img/furniture/category/sofa.png",
    },
    {
      title: "Beds",
      category: "bed",
      image: "/static/media/img/furniture/category/bed1.png",
    },
    {
      title: "Dining",
      category: "dining",
      image: "/static/media/img/furniture/category/dinning-set.png",
    },
    {
      title: "TV unit",
      category: "tv-unit",
      image: "/static/media/img/furniture/category/tv-unit.png",
    },
    {
      title: "Chairs",
      category: "chairs",
      image: "/static/media/img/furniture/category/helen-chair.png",
    },
    {
      title: "Tables",
      category: "tables",
      image: "/static/media/img/furniture/category/tables.webp",
    },
    {
      title: "Storage",
      category: "storage",
      image: "/static/media/img/furniture/category/storages.webp",
    },
    {
      title: "Wardrobes",
      category: "wardrobe",
      image: "/static/media/img/furniture/category/wardrobe.png",
    },
    {
      title: "Home Decor",
      category: "home-decor",
      image: "/static/media/img/furniture/category/home-decor.webp",
    },
  ];

  return (
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
            onClick={() =>
              navigate(
                `${ROUTE_URL.WEBSITE.PRODUCTS}?category=${category?.category}`,
              )
            }
          >
            <div className="home-category-image">
              <img src={category.image} alt={category.title} />
            </div>

            <span>{category.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategoryApp;
