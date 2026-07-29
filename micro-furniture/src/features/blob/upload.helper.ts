// import type { useGetUploadUrlMutation } from "../../app/redux/blob/blob.api";

// export const uploadToAzureBlob = async (
//   file: File,
//   getUploadUrl: ReturnType<typeof useGetUploadUrlMutation>[0],
// ): Promise<string> => {
//   const { uploadUrl, blobUrl } = await getUploadUrl({
//     fileName: file.name,
//     contentType: file.type,
//   }).unwrap();

//   const response = await fetch(uploadUrl, {
//     method: "PUT",
//     headers: {
//       "x-ms-blob-type": "BlockBlob",
//       "Content-Type": file.type,
//     },
//     body: file,
//   });

//   if (!response.ok) {
//     throw new Error("Image upload failed");
//   }

//   return blobUrl;
// };

export const uploadToAzureBlob = async (
  file: File,
  getUploadUrl: any,
): Promise<string> => {
  const { uploadUrl, blobUrl } = await getUploadUrl({
    fileName: file.name,
    contentType: file.type,
  }).unwrap();

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return blobUrl;
};
