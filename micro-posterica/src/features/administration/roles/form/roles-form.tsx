const serverErrorIcon = "/static/media/img/svg/server-error-1.svg";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import {
  useAddRolesMutation,
  useGetRolesDetailQuery,
  useUpdateRolesMutation,
} from "../../../../app/redux/administration/roles/roles.api";
import type {
  IRolesData,
  IRoleWithPermissions,
} from "../../interfaces/roles.model";
import PermissionTreeApp from "./permission/tree/permission-tree";
import type { IRolesPermissionItem } from "../../interfaces/roles-permission.model";
import { buildPermissionTree, mapRolesForApi } from "./roles-tree.util";

type RolesFormAppProps = {
  mode: "add" | "edit";
  role: IRolesData | null;
  handleClose?: ({ refresh }: { refresh: boolean }) => void;
};

const RolesFormApp = ({ mode, role, handleClose }: RolesFormAppProps) => {
  const isEditMode = mode === "edit";
  const id = role?.id || null;

  const permissionItems: IRolesPermissionItem[] = [
    {
      name: "Pages",
      displayName: "Pages",
      description: "Access to all pages",
      parentName: "",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration",
      displayName: "Administration",
      description: "Access to all Administration pages",
      parentName: "Pages",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits",
      displayName: "Organization Units",
      description: "Access to organization units",
      parentName: "Pages.Administration",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Detail",
      displayName: "Organization Unit Details",
      description: "View organization unit details",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Create",
      displayName: "Create Organization Unit",
      description: "Create new organization units",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Edit",
      displayName: "Edit Organization Unit",
      description: "Edit existing organization units",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Delete",
      displayName: "Delete Organization Unit",
      description: "Delete organization units",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Roles",
      displayName: "Roles",
      description: "Manage application roles",
      parentName: "Pages.Administration",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Roles.Create",
      displayName: "Create Role",
      description: "Create new role",
      parentName: "Pages.Administration.Roles",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Roles.Edit",
      displayName: "Edit Role",
      description: "Edit role",
      parentName: "Pages.Administration.Roles",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Roles.Delete",
      displayName: "Delete Role",
      description: "Delete existing role",
      parentName: "Pages.Administration.Roles",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Users",
      displayName: "Users",
      description: "Manage users and their permissions",
      parentName: "Pages.Administration",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Users.Create",
      displayName: "Create User",
      description: "Create new user",
      parentName: "Pages.Administration.Users",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Users.Edit",
      displayName: "Edit User",
      description: "Edit user",
      parentName: "Pages.Administration.Users",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Users.Delete",
      displayName: "Delete User",
      description: "Delete existing user",
      parentName: "Pages.Administration.Users",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Catalog",
      displayName: "Catalog",
      description: "Manage access for Catalog",
      parentName: "Pages",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Catalog.Product",
      displayName: "Products",
      description: "Manage products in catalog",
      parentName: "Pages.Catalog",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Catalog.ProductCategory",
      displayName: "Product Categories",
      description: "Manage product categories",
      parentName: "Pages.Catalog",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Sales",
      displayName: "Sales",
      description: "Manage access for Sales",
      parentName: "Pages",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Sales.Order",
      displayName: "Orders",
      description: "Manage sales orders",
      parentName: "Pages.Sales",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Sales.Customers",
      displayName: "Customers",
      description: "Manage sales customers",
      parentName: "Pages.Sales",
      isGrantedByDefault: false,
    },
  ];

  const treeData = buildPermissionTree(permissionItems);

  //#region RTK APIs
  const [
    updateRoles,
    { isLoading: isUpdateRolesLoading, isSuccess: isAddSuccess },
  ] = useUpdateRolesMutation();

  const [
    addRoles,
    { isLoading: isaddRolesLoading, isSuccess: isUpdateSuccess },
  ] = useAddRolesMutation();

  const {
    data,
    isLoading: isRolesDetailLoading,
    isError,
  } = useGetRolesDetailQuery(id!, {
    skip: !isEditMode,
    refetchOnMountOrArgChange: true,
  });

  const isSuccess = isAddSuccess || isUpdateSuccess;
  const isLoading = isaddRolesLoading || isUpdateRolesLoading;

  //#endregion

  //#region form
  const methods = useForm<IRoleWithPermissions>();
  const {
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IRoleWithPermissions> = (
    data: IRoleWithPermissions
  ) => {
    const request = mapRolesForApi(data);

    console.log(request);
    if (!request) return;

    if (isEditMode) {
      updateRoles({ id: id!, data: request });
      // .unwrap()
      // .then(() => {
      //   // Go back to list and tell it to refresh
      //   navigate(ROUTE_URL.SALES.ORDER.LIST, { state: { refresh: true } });
      // });
    } else {
      addRoles(request);
    }
  };
  //#endregion

  //#region useEffect
  useEffect(() => {
    if (isSuccess) {
      reset();
      handleClose?.({ refresh: true });
    }
  }, [isSuccess]);

  // ✅ Populate form in edit mode
  useEffect(() => {
    if (isEditMode && data) {
      methods.reset({
        role: {
          id: data?.role?.id,
          name: data?.role?.name,
          displayName: data?.role?.displayName,
          description: null,
          isDefault: data?.role?.isDefault,
          isStatic: data?.role?.isStatic,
          creationTime: data?.role?.creationTime,
        },
        grantedPermissionNames: data?.grantedPermissionNames || [],
      });
    }
  }, [isEditMode, data, methods]);

  //#endregion

  if (isEditMode && isRolesDetailLoading) {
    return <p>Loading details...</p>;
  }

  if (isError) {
    return (
      <div className="text-center py-5">
        <img src={serverErrorIcon} style={{ maxHeight: "200px" }} />

        <p className="text-muted m-4">
          Something went wrong on our side. Please try again later.
        </p>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => handleClose?.({ refresh: false })}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="roles-form-app">
      <FormProvider {...methods}>
        <form
          id="catalog_add_roles_form"
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <PageHeaderApp
            header={isEditMode ? "Edit Roles" : "Add Roles"}
            description={
              isEditMode
                ? "Update existing roles details."
                : "Create a new roles."
            }
          ></PageHeaderApp>

          <div className="form d-flex flex-column flex-lg-row mb-5 p-5">
            <div className="d-flex flex-column gap-2">
              <div>
                <div className="mb-5">
                  <label
                    htmlFor="RoleDisplayName"
                    className="form-label required"
                  >
                    Role name
                  </label>
                  <input
                    id="RoleDisplayName"
                    type="text"
                    className={`form-control form-control-solid ${
                      errors?.role?.name ? "is-invalid" : ""
                    }`}
                    placeholder="Role Name"
                    {...register("role.displayName", {
                      required: "Role name is required",
                    })}
                  />
                  {errors?.role?.displayName?.message && (
                    <div className="text-danger mt-1">
                      {errors?.role?.displayName?.message}
                    </div>
                  )}
                </div>

                <div className="form-check form-check-custom form-check-solid py-1">
                  <input
                    id="EditRole_IsDefault"
                    type="checkbox"
                    name="IsDefault"
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="EditRole_IsDefault"
                  >
                    Default
                    <small className="form-text text-muted ms-3">
                      (Assign to new users by default.)
                    </small>
                  </label>
                </div>
              </div>

              <div className="separator separator-dashed"></div>

              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        title="Collapse All"
                      >
                        <i className="bi bi-chevron-double-down"></i>
                        <span className="ms-2 text-muted">Collapse All</span>
                      </button>
                    </div>

                    <div className="form-check form-switch">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" />
                        Only Show Enabled Permissions
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <PermissionTreeApp data={treeData} />
                </div>
              </div>
            </div>
          </div>

          <div className="model-footer d-flex justify-content-end gap-4">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                reset();
                handleClose?.({ refresh: false });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-flex btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm align-middle me-2"></span>
              ) : (
                <i className="bi bi-check2 fs-3"></i>
              )}
              Save changes
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RolesFormApp;
