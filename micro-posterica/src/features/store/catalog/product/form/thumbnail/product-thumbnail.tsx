const ProductThumbnailApp = () => {
  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Thumbnail</h2>
        </div>
      </div>

      <div className="card-body text-center pt-0">
        <style>
          {`
    .image-input-placeholder {
      background-image: url("/static/media/img/svg/blank-image.svg");
    }
    [data-bs-theme="dark"] .image-input-placeholder {
      background-image: url("/static/media/img/svg/blank-image.svg");
    }
  `}
        </style>

        <div
          className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
          data-kt-image-input="true"
        >
          <div className="image-input-wrapper w-150px h-150px"></div>

          {/* Change */}
          <label
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="change"
            data-bs-toggle="tooltip"
            title="Change avatar"
          >
            <i className="bi bi-pencil"></i>
            <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
            <input type="hidden" name="avatar_remove" />
          </label>

          {/* Cancel */}
          <span
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="cancel"
            data-bs-toggle="tooltip"
            title="Cancel avatar"
          >
            <i className="bi bi-x-lg"></i>
          </span>

          {/* Remove */}
          <span
            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
            data-kt-image-input-action="remove"
            data-bs-toggle="tooltip"
            title="Remove avatar"
          >
            <i className="bi bi-trash"></i>
          </span>
        </div>

        <div className="text-muted fs-7">
          Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
          files are accepted
        </div>
      </div>
    </div>
  );
};

export default ProductThumbnailApp;
