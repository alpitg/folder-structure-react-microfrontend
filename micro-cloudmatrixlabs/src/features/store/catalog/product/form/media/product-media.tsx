import { useState } from "react";

const ProductMediaApp = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Media</h2>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="fv-row mb-2">
          <label
            htmlFor="catalog_add_product_media"
            className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 cursor-pointer"
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              id="catalog_add_product_media"
              multiple
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />

            <div className="d-flex">
              <i className="bi bi-upload text-primary fs-3x"></i>
              <div className="ms-4">
                <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                  Drop files here or click to upload.
                </h3>
                <span className="fs-7 fw-semibold text-gray-500">
                  Upload up to 10 files
                </span>
              </div>
            </div>
          </label>
        </div>
        <div className="text-muted fs-7">Set the product media gallery.</div>

        <br />

        <>
          {files.length > 0 && (
            <div className="mt-4">
              {files.map((file) => (
                <div className="d-flex flex-column" key={file?.name}>
                  <div className="d-flex align-items-center mb-5">
                    <div className="symbol symbol-30px me-5">
                      <img
                        alt="Icon"
                        src="/static/media/img/svg/file-extension/img.svg"
                      />
                    </div>

                    <div className="fw-semibold">
                      <a
                        className="fs-6 fw-bold text-gray-900 text-hover-primary"
                        href="#"
                      >
                        {file?.name}
                      </a>
                      <div className="text-gray-500">
                        {`${(file?.size / 1024)?.toFixed(1)} KB `}
                        <span>Uploading..</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-clean btn-sm btn-icon btn-icon-danger btn-active-light-danger ms-auto"
                      onClick={() =>
                        setFiles((currentFiles) =>
                          currentFiles.filter((x) => x?.name !== file?.name)
                        )
                      }
                    >
                      <i className="bi bi-trash fs-3"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default ProductMediaApp;
