import type { IUserWithPermissionsForm } from "../../interfaces/users.model";

export const mapUsersForApi = (
  data: IUserWithPermissionsForm
): IUserWithPermissionsForm => {
  const userWithPermissions: IUserWithPermissionsForm = {
    user: {
      id: data?.user?.id || "",
      userName: data?.user?.userName || "",
      name: data?.user?.name || "",
      surname: data?.user?.surname || "",
      emailAddress: data?.user?.emailAddress || "",
      isEmailConfirmed: data?.user?.isEmailConfirmed || false,
      password: data?.user?.setRandomPassword ? null : data?.user?.password,
      isActive: data?.user?.isActive ?? true,
      phoneNumber: data?.user?.phoneNumber || null,
      profilePictureId: data?.user?.profilePictureId || null,
      lockoutEndDateUtc: data?.user?.lockoutEndDateUtc || null,
      roles: data?.user?.roles || [],
      creationTime: data?.user?.creationTime || "",

      sendActivationEmail: data?.user?.sendActivationEmail,
      setRandomPassword: data?.user?.setRandomPassword,
      shouldChangePasswordOnNextLogin:
        data?.user?.shouldChangePasswordOnNextLogin,
      isLockoutEnabled: data?.user?.isLockoutEnabled,
      isDarkMode: data?.user?.isDarkMode,
    },
    roles: data?.roles || [],
    grantedRoles: data?.grantedRoles || [],
    memberedOrganisationUnits: data?.memberedOrganisationUnits || [],
    allOrganizationUnits: data?.allOrganizationUnits || [],
    grantedPermissionNames: data?.grantedPermissionNames || [],
    permissions: data?.permissions || [],
  };

  return userWithPermissions;
};
