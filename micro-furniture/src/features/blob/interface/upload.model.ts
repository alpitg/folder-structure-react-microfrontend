export interface UploadUrlRequest {
  fileName: string;
  contentType: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  blobUrl: string;
  blobName: string;
}