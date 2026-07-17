import { NavLink } from "react-router";
import "./shop-by-category.scss";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";

const ShopByCategoryApp = () => {
  const categories = [
    {
      id: "sofas",
      title: "Sofas",
      category: "sofa-sets",
      image: "/static/media/img/furniture/category/sofas.png",
      alt: "Category Sofa",
    },
    {
      id: "chest-of-drawers",
      title: "Chest of Drawers",
      category: "chest-of-drawers",
      image: "/static/media/img/furniture/category/chests-of-drawers.png",
      alt: "Category Chest of Drawers",
    },
    {
      id: "beds",
      title: "Beds",
      category: "beds",
      image: "/static/media/img/furniture/category/beds.png",
      alt: "Category Bed",
    },
    {
      id: "sideboards",
      title: "Sideboards",
      category: "cabinets-and-sideboards",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Sideboard-1781269680273.png",
      alt: "Category Sideboard",
    },
    {
      id: "sofa-cum-beds",
      title: "Sofa Cum Beds",
      category: "sofa-cum-beds",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Sofa-Beds-1781269364542.png",
      alt: "Category Sofa Cum Bed",
    },
    {
      id: "mattresses",
      title: "Mattresses",
      category: "mattresses",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Mattresses-1781269702725.png",
      alt: "Category Mattress",
    },
    {
      id: "coffee-tables",
      title: "Coffee Tables",
      category: "coffee-table",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Coffee-Tables-1781269387814.png",
      alt: "Category Coffee Table",
    },
    {
      id: "bedside-tables",
      title: "Bedside Tables",
      category: "bedside-tables",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Bedside-Tables-1781270223759.png",
      alt: "Category Bedside Table",
    },
    {
      id: "wardrobes",
      title: "Wardrobes",
      category: "wardrobes",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Wardrobes-1781269450722.png",
      alt: "Category Wardrobe",
    },
    {
      id: "study-chairs",
      title: "Study Chairs",
      category: "study-chairs",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Study-Chairs-1781270244175.png",
      alt: "Category Study Chair",
    },
    {
      id: "tv-units",
      title: "TV Units",
      category: "tv-units",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/TV-Unit-1781269474659.png",
      alt: "Category TV Unit",
    },
    {
      id: "bar-furniture",
      title: "Bar Furniture",
      category: "bar-furniture",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Bar-Furniture-1781270264797.png",
      alt: "Category Bar Furniture",
    },
  ];

  return (
    <div className="shop-by-category-app">
      <div className="container">
        <h2 className="mb-4 section-title">Shop by Categories.</h2>
        <ul className="shop-by-category-list">
          {categories.map(({ id, title, image, category, alt }) => (
            <li key={id} className="shop-by-category-item">
              <NavLink
                to={`${ROUTE_URL.WEBSITE.PRODUCTS}?category=${category}`}
                className="hover-ease-out"
              >
                <img className="shop-by-category-image" src={image} alt={alt} />
                <p className="text-uppercase fw-medium mt-2">{title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopByCategoryApp;
