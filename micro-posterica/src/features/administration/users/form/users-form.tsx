import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
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
import UserInfoFormApp from "./user-info/user-info-form";
import UserRolesFormApp from "./user-roles/user-roles-form";
import UserOrganisationUnitsFormApp from "./organisation-units/user-organisation-units-form";
import ToastApp, {
  type ToastAppProps,
} from "../../../../components/ui/toast/toast";

const serverErrorIcon = "/static/media/img/svg/server-error-1.svg";

type UsersFormAppProps = {
  mode: "add" | "edit";
  user: IUsersData | null;
  handleClose?: ({ refresh }: { refresh: boolean }) => void;
};

const UsersFormApp = ({ mode, user, handleClose }: UsersFormAppProps) => {
  const isEditMode = mode === "edit";
  const id = user?.id || null;
  const [toast, setToast] = useState<ToastAppProps>({
    show: false,
    message: "",
    variant: "info",
  });

  //#region RTK APIs
  const [
    updateUsers,
    { isLoading: isUpdateUsersLoading, isSuccess: isUpdateSuccess },
  ] = useUpdateUsersMutation();

  const [addUsers, { isLoading: isAddUsersLoading, isSuccess: isAddSuccess }] =
    useAddUsersMutation();

  const {
    data,
    isLoading: isUsersDetailLoading,
    isError,
  } = useGetUsersDetailQuery(id!, { refetchOnMountOrArgChange: true });

  const isSuccess = isAddSuccess || isUpdateSuccess;
  const isLoading = isAddUsersLoading || isUpdateUsersLoading;
  //#endregion

  //#region form
  const methods = useForm<IUserWithPermissions>({
    defaultValues: {
      user: {
        id: "",
        userName: "",
        name: "",
        surname: "",
        emailAddress: "",
        isEmailConfirmed: false,
        isActive: true,
        phoneNumber: "",
        profilePictureId: "",
        lockoutEndDateUtc: null,
        roles: [],
        creationTime: "",

        sendActivationEmail: false,
        setRandomPassword: true,
        shouldChangePasswordOnNextLogin: false,
        isLockoutEnabled: false,
      },
      grantedPermissionNames: [],
      permissions: [],
    },
  });

  const { reset } = methods;

  const onSubmit: SubmitHandler<IUserWithPermissions> = (formData) => {
    const request = mapUsersForApi(formData);

    console.log(request);

    if (!request) return;

    if (isEditMode) {
      updateUsers({ id: id!, data: request })
        .unwrap()
        .catch(() => {
          setToast({
            show: true,
            message: "Server error! Failed to save.",
            variant: "danger",
          });
        });
    } else {
      addUsers(request)
        .unwrap()
        .catch(() => {
          setToast({
            show: true,
            message: "Server error! Failed to save.",
            variant: "danger",
          });
        });
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

  useEffect(() => {
    if (isEditMode && data) {
      reset({
        user: {
          id: data?.user?.id ?? "",
          userName: data?.user?.userName ?? "",
          name: data?.user?.name ?? "",
          surname: data?.user?.surname ?? "",
          emailAddress: data?.user?.emailAddress ?? "",
          isEmailConfirmed: data?.user?.isEmailConfirmed ?? false,
          isActive: data?.user?.isActive ?? true,
          phoneNumber: data?.user?.phoneNumber ?? "",
          profilePictureId: data?.user?.profilePictureId ?? "",
          lockoutEndDateUtc: data?.user?.lockoutEndDateUtc ?? null,
          roles: data?.user?.roles || [],
          creationTime: data?.user?.creationTime ?? "",
          password: data?.user?.password ?? "",

          setRandomPassword: data?.user?.setRandomPassword && true,
          shouldChangePasswordOnNextLogin:
            data?.user?.shouldChangePasswordOnNextLogin || false,
          sendActivationEmail: data?.user?.sendActivationEmail || false,
          isLockoutEnabled: data?.user?.isLockoutEnabled || false,
        },
        grantedPermissionNames: data?.grantedPermissionNames || [],
        permissions: data?.permissions || [],
      });
    }
  }, [isEditMode, data, reset]);

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
            header={isEditMode ? "Edit User" : "Add User"}
            description={
              isEditMode
                ? "Update existing user details."
                : "Create a new user."
            }
          />

          <div className="form d-flex flex-column flex-lg-row p-5">
            <div className="d-flex flex-column gap-10 w-100">
              {/* Tabs */}
              <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link text-active-primary pb-4 active"
                    data-bs-toggle="tab"
                    href="#user_information"
                    aria-selected="true"
                    role="tab"
                  >
                    <i className="bi bi-info-circle me-2"></i> User Information
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link text-active-primary pb-4"
                    data-bs-toggle="tab"
                    href="#user_roles"
                    aria-selected="false"
                    role="tab"
                  >
                    <i className="bi bi-people me-2"></i> Roles
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link text-active-primary pb-4"
                    data-bs-toggle="tab"
                    href="#organization_units"
                    aria-selected="false"
                    role="tab"
                  >
                    <i className="bi bi-diagram-3 me-2"></i> Organization Units
                  </a>
                </li>
              </ul>

              {/* Tab contents */}
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="user_information"
                  role="tab-panel"
                >
                  <UserInfoFormApp />
                </div>
                <div className="tab-pane fade" id="user_roles" role="tab-panel">
                  <div className="d-flex flex-column gap-7 gap-lg-10">
                    <UserRolesFormApp data={data} />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="organization_units"
                  role="tab-panel"
                >
                  <div className="d-flex flex-column gap-7 gap-lg-10">
                    <UserOrganisationUnitsFormApp data={data} />
                  </div>
                </div>
              </div>

              <div className="separator separator-dashed"></div>
            </div>
          </div>

          {/* Footer buttons */}
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

        <ToastApp
          show={toast?.show}
          message={toast?.message}
          variant={toast?.variant}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </FormProvider>
    </div>
  );
};

export default UsersFormApp;
