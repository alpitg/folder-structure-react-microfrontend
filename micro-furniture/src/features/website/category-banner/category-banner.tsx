import "./category-banner.scss";

const CategoryBanner = () => {
  const banners = [
    {
      title: "Art Deco Home",
      category: "Decoration",
      image: "/static/media/img/furniture/category/art-deco-home.png",
      link: "/products/art-deco-home",
      col: "col-12 col-md-3",
    },
    {
      title: "Helen Chair",
      category: "Decoration",
      image: "/static/media/img/furniture/category/helen-chair.png",
      link: "/products/helen-chair",
      col: "col-12 col-md-6",
    },
    {
      title: "Vase Of Flowers",
      category: "Decoration",
      image: "/static/media/img/furniture/category/vase-of-flowers.png",
      link: "/products/vase-of-flowers",
      col: "col-12 col-md-3",
    },
    {
      title: "Wood Eggs",
      category: "Decoration",
      image: "/static/media/img/furniture/category/wood-eggs.png",
      link: "/products/wood-eggs",
      col: "col-12 col-md-6",
    },
    {
      title: "Table Wood Pine",
      category: "Furniture",
      image: "/static/media/img/furniture/category/table-wood-pine.png",
      link: "/products/table-wood-pine",
      col: "col-12 col-md-6",
    },
  ];

  return (
    <section className="category-banner-section p-12">
      <div className="container">
        <div className="row g-4">
          {banners.map((item) => (
            <div key={item.title} className={`${item.col} position-relative`}>
              <div className="category-banner-item position-relative overflow-hidden">
                <a href={item.link}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid w-100 hover-ease-out"
                  />
                </a>

                <div className="position-absolute top-0 start-0 p-4">
                  <h3 className="mb-2">
                    <a
                      href={item.link}
                      className="text-decoration-none text-dark fw-semibold"
                    >
                      {item.title}
                    </a>
                  </h3>

                  <span className="text-uppercase fw-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
