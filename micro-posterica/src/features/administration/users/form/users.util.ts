import type { IUserWithPermissions } from "../../interfaces/users.model";

export const mapUsersForApi = (
  data: IUserWithPermissions
): IUserWithPermissions => {
  const userWithPermissions: IUserWithPermissions = {
    user: {
      id: data?.user?.id || "",
      userName: data?.user?.userName || "",
      name: data?.user?.name || "",
      surname: data?.user?.surname || "",
      emailAddress: data?.user?.emailAddress || "",
      isEmailConfirmed: data?.user?.isEmailConfirmed || false,
      isActive: data?.user?.isActive ?? true,
      phoneNumber: data?.user?.phoneNumber || null,
      profilePictureId: data?.user?.profilePictureId || null,
      lockoutEndDateUtc: data?.user?.lockoutEndDateUtc || null,
      roles: data?.user?.roles || [],
      creationTime: data?.user?.creationTime || "",
    },
    grantedPermissionNames: data?.grantedPermissionNames || [],
    permissions: data?.permissions || [],
  };

  return userWithPermissions;
};
