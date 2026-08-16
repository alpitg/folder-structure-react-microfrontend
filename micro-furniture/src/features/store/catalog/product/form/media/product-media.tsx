import { useEffect, useState } from "react";

import type { IProductData } from "../../../interface/product/product.model";
import { uploadToAzureBlob } from "../../../../../blob/upload.helper";
import { useFormContext } from "react-hook-form";
import { useGetUploadUrlMutation } from "../../../../../../app/redux/crm/blob/blob.api";

type UploadedFile = {
  file: File;
  blobUrl: string;
  uploading: boolean;
  error?: string;
};

const ProductMediaApp = () => {
  const { watch, setValue, getValues } = useFormContext<IProductData>();

  const media = watch("media") || [];

  const [files, setFiles] = useState<UploadedFile[]>([]);

  const [getUploadUrl] = useGetUploadUrlMutation();

  /**
   * Cleanup blob URLs on component unmount
   */
  useEffect(() => {
    return () => {
      files.forEach((item) => {
        if (item.blobUrl) {
          URL.revokeObjectURL(item.blobUrl);
        }
      });
    };
  }, [files]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const temporaryFiles: UploadedFile[] = selectedFiles.map((file) => ({
      file,
      blobUrl: URL.createObjectURL(file),
      uploading: true,
    }));

    setFiles((prev) => [...prev, ...temporaryFiles]);

    for (const file of selectedFiles) {
      try {
        const blobUrl = await uploadToAzureBlob(file, getUploadUrl);

        const currentMedia = getValues("media") || [];

        const alreadyExists = currentMedia.some(
          (item) => item.fileName === file.name,
        );

        if (!alreadyExists) {
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
        }

        /**
         * Remove temporary upload item
         */
        setFiles((prev) => {
          const removed = prev.find((item) => item.file === file);

          if (removed?.blobUrl) {
            URL.revokeObjectURL(removed.blobUrl);
          }

          return prev.filter((item) => item.file !== file);
        });
      } catch (error) {
        console.error(error);

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

  const removeMedia = (fileName: string) => {
    const currentMedia = getValues("media") || [];

    const updatedMedia = currentMedia.filter(
      (item) => item.fileName !== fileName,
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

    setFiles((prev) => {
      const removed = prev.find((item) => item.file.name === fileName);

      if (removed?.blobUrl) {
        URL.revokeObjectURL(removed.blobUrl);
      }

      return prev.filter((item) => item.file.name !== fileName);
    });
  };

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>
            <i className="bi bi-images me-2"></i>
            Media
          </h2>
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

        {media.length > 0 && (
          <div className="mt-4">
            {media.map((item) => (
              <div
                key={item.id || item.fileName}
                className="d-flex align-items-center mb-4"
              >
                <div className="symbol symbol-60px me-4">
                  <img
                    src={item.url || "/static/media/img/svg/blank-image.svg"}
                    alt={item.altText || item.fileName || ""}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="flex-grow-1">
                  <div>{item.fileName}</div>

                  {item.id && (
                    <span className="text-muted d-inline-flex align-items-center gap-1">
                      <i className="bi bi-image text-muted"></i>
                      Existing image
                    </span>
                  )}

                  {!item.id && (
                    <span className="text-success d-inline-flex align-items-center gap-1 fw-semibold">
                      <i className="bi bi-check-circle-fill text-success"></i>
                      Uploaded
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-clean btn-sm btn-icon btn-icon-danger btn-active-light-danger ms-auto"
                  type="button"
                  onClick={() => removeMedia(item.fileName || "")}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-4">
            {files.map((item) => (
              <div
                key={item.file.name}
                className="d-flex align-items-center mb-4"
              >
                <div className="symbol symbol-60px me-4">
                  <img
                    src={item.blobUrl}
                    alt={item.file.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="flex-grow-1">
                  <div>{item.file.name}</div>

                  {item.uploading && (
                    <span className="text-primary d-inline-flex align-items-center gap-1">
                      <i className="bi bi-arrow-repeat text-primary"></i>
                      Uploading...
                    </span>
                  )}

                  {item.error && (
                    <span className="text-danger d-inline-flex align-items-center gap-1">
                      <i className="bi bi-exclamation-circle text-danger"></i>

                      {item.error}
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-clean btn-sm btn-icon btn-icon-danger btn-active-light-danger ms-auto"
                  type="button"
                  onClick={() => removeMedia(item.file.name)}
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
