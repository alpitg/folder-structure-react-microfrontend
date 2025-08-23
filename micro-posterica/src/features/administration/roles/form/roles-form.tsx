import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import {
  useAddRolesMutation,
  useGetRolesDetailQuery,
  useUpdateRolesMutation,
} from "../../../../app/redux/administration/roles/roles.api";
import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";
import type { IRolesData } from "../../interfaces/roles.model";
import PermissionTreeApp from "./permission/tree/permission-tree";
import type { IRolesPermissionItem } from "../../interfaces/roles-permission.model";
import { buildPermissionTree } from "./roles-tree.util";

type RolesFormAppProps = {
  mode: "add" | "edit";
  onClose?: () => void;
};

const RolesFormApp = ({ mode, onClose }: RolesFormAppProps) => {
  const isEditMode = mode === "edit";
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const permissionItems: IRolesPermissionItem[] = [
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

  const { data, isLoading: isOrderLoading } = useGetRolesDetailQuery(id!, {
    skip: !isEditMode,
    refetchOnMountOrArgChange: true,
  });

  const isSuccess = isAddSuccess || isUpdateSuccess;
  const isLoading = isaddRolesLoading || isUpdateRolesLoading;

  //#endregion

  const methods = useForm<IRolesData>();
  const {
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IRolesData> = (data: IRolesData) => {
    // const request = mapOrderForApi(data);
    const request = data;

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

  // Navigate after add or update
  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTE_URL.CATALOG.PRODUCT.LIST, { state: { refresh: true } });
    }
  }, [isSuccess, navigate]);

  // ✅ Populate form in edit mode
  useEffect(() => {
    if (isEditMode && data) {
      methods.reset({
        id: data.id,
        name: data.name,
        displayName: data.displayName,
        isDefault: data.isDefault,
        isStatic: data.isStatic,
        creationTime: data.creationTime,
      });
    }
  }, [isEditMode, data, methods]);

  if (isEditMode && isOrderLoading) {
    return <p>Loading details...</p>;
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

          <div className="form d-flex flex-column flex-lg-row mb-5">
            <div className="d-flex flex-column gap-7">
              <div
                className="tab-pane active p-5"
                role="tabpanel"
                aria-labelledby=""
              >
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
                      errors?.name ? "is-invalid" : ""
                    }`}
                    placeholder="Role Name"
                    {...register("displayName", {
                      required: "Role name is required",
                    })}
                  />
                  {errors?.displayName?.message && (
                    <div className="text-danger mt-1">
                      {errors?.displayName?.message}
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
                onClose?.();
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
