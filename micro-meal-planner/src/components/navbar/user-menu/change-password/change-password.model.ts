export interface IUpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface IUpdatePasswordResponse {
  success: boolean;
  message: string;
}
