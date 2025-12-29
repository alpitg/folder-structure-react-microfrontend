import type { IRolesData } from "../features/administration/interfaces/roles.model";

export const hasRole = (
  roles: IRolesData[] | null | undefined,
  role: string
): boolean => roles?.some((r) => r?.name === role) ?? false;

export const hasPermission = (
  roles: IRolesData[] | null | undefined,
  permissions?: string[]
): boolean => {
  if (!permissions || permissions.length === 0) return true; // no restriction
  if (!roles) return false;

  return (
    roles?.some((r) =>
      r?.grantedPermissionNames?.some((p) => permissions.includes(p))
    ) ?? false
  );
};
