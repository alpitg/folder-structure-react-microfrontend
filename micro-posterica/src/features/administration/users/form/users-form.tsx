const serverErrorIcon = "/static/media/img/svg/server-error-1.svg";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import {
  useAddUsersMutation,
  useGetUsersDetailQuery,
  useUpdateUsersMutation,
} from "../../../../app/redux/administration/users/users.api";
import type {
  IUsersData,
  IUserWithPermissions,
} from "../../interfaces/users.model";
import { mapUsersForApi } from "./users.util";

type UsersFormAppProps = {
  mode: "add" | "edit";
  user: IUsersData | null;
  handleClose?: ({ refresh }: { refresh: boolean }) => void;
};

const UsersFormApp = ({ mode, user, handleClose }: UsersFormAppProps) => {
  const isEditMode = mode === "edit";
  const id = user?.id || null;

  //#region RTK APIs
  const [
    updateUsers,
    { isLoading: isUpdateUsersLoading, isSuccess: isAddSuccess },
  ] = useUpdateUsersMutation();

  const [
    addUsers,
    { isLoading: isaddUsersLoading, isSuccess: isUpdateSuccess },
  ] = useAddUsersMutation();

  const {
    data,
    isLoading: isUsersDetailLoading,
    isError,
  } = useGetUsersDetailQuery(id!, {
    skip: !isEditMode,
    refetchOnMountOrArgChange: true,
  });

  // const { data: permissionItems } = useGetPermissionsQuery();

  const isSuccess = isAddSuccess || isUpdateSuccess;
  const isLoading = isaddUsersLoading || isUpdateUsersLoading;

  //#endregion

  //#region form
  const methods = useForm<IUserWithPermissions>();
  const {
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IUserWithPermissions> = (
    data: IUserWithPermissions
  ) => {
    const request = mapUsersForApi(data);

    console.log(request);
    if (!request) return;

    if (isEditMode) {
      updateUsers({ id: id!, data: request });
      // .unwrap()
      // .then(() => {
      //   // Go back to list and tell it to refresh
      //   navigate(ROUTE_URL.SALES.ORDER.LIST, { state: { refresh: true } });
      // });
    } else {
      addUsers(request);
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
        user: {
          id: data?.user?.id,
          userName: data?.user?.userName,
          name: data?.user?.name,
          surname: data?.user?.surname,
          emailAddress: data?.user?.emailAddress,
          isEmailConfirmed: data?.user?.isEmailConfirmed,
          isActive: data?.user?.isActive,
          phoneNumber: data?.user?.phoneNumber,
          profilePictureId: data?.user?.profilePictureId,
          lockoutEndDateUtc: data?.user?.lockoutEndDateUtc,
          roles: data?.user?.roles || [],
          creationTime: data?.user?.creationTime,
        },
        grantedPermissionNames: data?.grantedPermissionNames || [],
        permissions: data?.permissions || [], // optional, only if you need to bind available perms
      });
    }
  }, [isEditMode, data, methods]);

  //#endregion

  if (isEditMode && isUsersDetailLoading) {
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
    <div className="users-form-app">
      <FormProvider {...methods}>
        <form
          id="catalog_add_users_form"
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <PageHeaderApp
            header={isEditMode ? "Edit Users" : "Add Users"}
            description={
              isEditMode
                ? "Update existing users details."
                : "Create a new users."
            }
          ></PageHeaderApp>

          <div className="form d-flex flex-column flex-lg-row mb-5 p-5">
            <div className="d-flex flex-column gap-4 w-100">
              Usser edit
              <div className="separator separator-dashed"></div>
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

export default UsersFormApp;
