import "./product-gallery.scss";

interface ProductGalleryProps {
  images?: string[];
}

const ProductGallery = ({ images = [] }: ProductGalleryProps) => {
  const galleryImages = images.length > 0 ? images : [
    "/static/media/img/svg/blank-image.svg",
    "/static/media/img/svg/blank-image.svg",
    "/static/media/img/svg/blank-image.svg",
    "/static/media/img/svg/blank-image.svg",
    "/static/media/img/svg/blank-image.svg",
  ];

  return (
    <div className="product-gallery-app container py-4">
      {/* MAIN IMAGE */}
      <div className="mb-4">
        <div className="ratio ratio-1x1 product-main">
          <img src={galleryImages[0]} alt="Main Product" className="product-img" />
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="row g-3">
        {galleryImages.slice(1).map((img, i) => (
          <div key={i} className="col-6 col-md-3">
            <div className="ratio ratio-1x1 product-thumb">
              <img src={img} alt={`thumb-${i}`} className="product-img" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
