import type { IProductData } from "../../../interface/product/product.model";
import { uploadToAzureBlob } from "../../../../../blob/upload.helper";
import { useFormContext } from "react-hook-form";
import { useGetUploadUrlMutation } from "../../../../../../app/redux/blob/blob.api";
import { useState } from "react";

type UploadedFile = {
  file: File;
  blobUrl?: string;
  uploading: boolean;
  error?: string;
};

const ProductMediaApp = () => {
  const { setValue, getValues } = useFormContext<IProductData>();

  const [files, setFiles] = useState<UploadedFile[]>([]);

  const [getUploadUrl] = useGetUploadUrlMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    setFiles((prev) => [
      ...prev,

      ...selectedFiles.map((file) => ({
        file,
        uploading: true,
      })),
    ]);

    for (const file of selectedFiles) {
      try {
        const blobUrl = await uploadToAzureBlob(file, getUploadUrl);

        setFiles((prev) =>
          prev.map((item) =>
            item.file === file
              ? {
                  ...item,
                  uploading: false,
                  blobUrl,
                }
              : item,
          ),
        );

        const currentMedia = getValues("media") || [];

        setValue(
          "media",
          [
            ...currentMedia,
            {
              id: null,
              url: blobUrl,
              altText: file.name,
              fileName: file.name,
              isPrimary: currentMedia.length === 0,
              displayOrder: currentMedia.length,
            },
          ],
          {
            shouldDirty: true,
            shouldValidate: true,
          },
        );
      } catch (err) {
        console.error(err);

        setFiles((prev) =>
          prev.map((item) =>
            item.file === file
              ? {
                  ...item,
                  uploading: false,
                  error: "Upload failed",
                }
              : item,
          ),
        );
      }
    }

    e.target.value = "";
  };

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((item) => item.file !== file));
    const currentMedia = getValues("media") || [];
    const updatedMedia = currentMedia.filter(
      (item) => item.fileName !== file.name,
    );

    setValue(
      "media",
      updatedMedia.map((item, index) => ({
        ...item,

        displayOrder: index,

        isPrimary: index === 0,
      })),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
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
          >
            <input
              id="catalog_add_product_media"
              type="file"
              hidden
              multiple
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

        {files.length > 0 && (
          <div className="mt-4">
            {files.map((item) => (
              <div
                key={item.file.name}
                className="d-flex align-items-center mb-4"
              >
                <div className="symbol symbol-60px me-4">
                  <img
                    src={item.blobUrl || URL.createObjectURL(item.file)}
                    alt={item.file.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="flex-grow-1">
                  <div className="fw-bold">{item.file.name}</div>

                  <small className="text-muted">
                    {(item.file.size / 1024).toFixed(1)} KB
                  </small>

                  <br />

                  {item.uploading && (
                    <span className="text-primary">Uploading...</span>
                  )}

                  {item.blobUrl && (
                    <span className="text-success">Uploaded ✓</span>
                  )}

                  {item.error && (
                    <span className="text-danger">{item.error}</span>
                  )}
                </div>

                <button
                  className="btn btn-sm btn-icon btn-light-danger"
                  type="button"
                  onClick={() => removeFile(item.file)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMediaApp;
