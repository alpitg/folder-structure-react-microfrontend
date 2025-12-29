export interface IUpdateUserSettingRequest {
  name: string;
  surname: string;
  emailAddress: string;
  userName: string;
}

export interface IUpdateUserSettingResponse {
  success: boolean;
  message: string;
}
