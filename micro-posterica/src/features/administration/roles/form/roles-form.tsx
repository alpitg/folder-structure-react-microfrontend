import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import {
  useAddRolesMutation,
  useGetPermissionsQuery,
  useGetRolesDetailQuery,
  useUpdateRolesMutation,
} from "../../../../app/redux/administration/roles/roles.api";
import type {
  IRolesData,
  IRoleWithPermissions,
} from "../../interfaces/roles.model";
import PermissionTreeApp from "./permission/tree/permission-tree";
import { buildPermissionTree, mapRolesForApi } from "./roles-tree.util";
import SomethingWentWrongPage from "../../../../components/ui/error/something-went-wrong/something-went-wrong";
import { useAutoFocus } from "../../../../hooks/use-auto-focus";

type RolesFormAppProps = {
  mode: "add" | "edit";
  role: IRolesData | null;
  handleClose?: ({ refresh }: { refresh: boolean }) => void;
};

const RolesFormApp = ({ mode, role, handleClose }: RolesFormAppProps) => {
  const isEditMode = mode === "edit";
  const id = role?.id || null;

  const inputRef = useAutoFocus<HTMLInputElement>();

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

  const { data: permissionItems } = useGetPermissionsQuery();
  const treeData = buildPermissionTree(permissionItems || []);

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
      <SomethingWentWrongPage>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => handleClose?.({ refresh: false })}
        >
          Close
        </button>
      </SomethingWentWrongPage>
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
            <div className="d-flex flex-column gap-4 w-100">
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
                    ref={(e) => {
                      register("role.displayName")?.ref(e), // connect RHF (React Hook Form)
                        (inputRef.current = e); // keep local ref
                    }}
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
                    className="form-check-input"
                    {...register("role.isDefault")}
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
                  <div className="text-muted fs-3 mb-3">Select Permissions</div>
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
