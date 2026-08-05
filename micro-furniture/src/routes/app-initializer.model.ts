import type { IUserWithPermissions } from "../features/administration/interfaces/users.model";

export interface IAppInitializer {
  user: IUserWithPermissions | null;
}
