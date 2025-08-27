import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../../../hooks/use-auth";
import {
  useGetCurrentUserProfileQuery,
  useUpdateCurrentUserProfileMutation,
} from "../../../../app/redux/administration/auth/auth.api";

import ModelApp from "../../../ui/model/model";
import PageHeaderApp from "../../../header/page-header/page-header";
import SomethingWentWrongPage from "../../../ui/error/something-went-wrong/something-went-wrong";
import { useDispatch } from "react-redux";
import { setToast } from "../../../../app/redux/core/app-settings/app-settings.slice";

type FormValues = {
  user: {
    name: string;
    surname: string;
    emailAddress: string;
    userName: string;
  };
};

const UserSettingApp: React.FC<{
  show: boolean;
  handleClose?: (args?: { refresh: boolean }) => void;
}> = ({ show, handleClose }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [updateCurrentUserProfile, { isLoading: isUpdateLoading }] =
    useUpdateCurrentUserProfileMutation();

  const {
    data,
    isLoading: isGetLoading,
    isError,
    refetch,
  } = useGetCurrentUserProfileQuery(user?.user?.id ?? "", {
    skip: !user?.user?.id,
  });

  //#region form
  const methods = useForm<FormValues>({
    defaultValues: {
      user: {
        name: "",
        surname: "",
        emailAddress: "",
        userName: "",
      },
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const response = await updateCurrentUserProfile({
        id: user?.user?.id ?? "",
        data: formData.user,
      }).unwrap();

      dispatch(
        setToast({
          show: true,
          message: response?.message || "User info updated successfully.",
          variant: "success",
        })
      );
      handleClose?.({ refresh: true });
    } catch (error: any) {
      dispatch(
        setToast({
          show: true,
          message:
            (typeof error?.data?.detail === "object"
              ? error?.data?.detail?.[0]?.msg
              : error?.data?.detail) ||
            "Server error! Failed to update detail.",
          variant: "danger",
        })
      );
    }
  };
  //#endregion

  /**
   * Refetch when modal opens
   */
  useEffect(() => {
    if (show) refetch();
  }, [show, refetch]);

  /**
   * Sync fetched data into form
   */
  useEffect(() => {
    if (data) {
      reset({ user: data });
    }
  }, [data, reset]);

  // Handle loading
  if (isGetLoading) {
    return (
      <ModelApp show={show} modelSize="md" onClose={() => {}}>
        <div className="p-5 text-center">Loading details...</div>
      </ModelApp>
    );
  }

  // Handle error
  if (isError) {
    return (
      <ModelApp
        show={show}
        modelSize="md"
        onClose={() => {
          handleClose?.({ refresh: false });
        }}
      >
        <SomethingWentWrongPage>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleClose?.()}
          >
            Close
          </button>
        </SomethingWentWrongPage>
      </ModelApp>
    );
  }

  return (
    <>
      <ModelApp
        show={show}
        modelSize="md"
        onClose={() => {
          reset();
          handleClose?.({ refresh: false });
        }}
      >
        <div className="users-form-app">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <PageHeaderApp
                header="My settings"
                description="Update your personal information."
              />

              <div className="form d-flex flex-column flex-lg-row p-5">
                <div className="d-flex flex-column gap-5 w-100">
                  {/* First Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-person-fill me-2 text-primary"></i>
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-solid ${
                        errors.user?.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter first name"
                      maxLength={64}
                      {...register("user.name", {
                        required: "First name is required",
                      })}
                    />
                    {errors.user?.name && (
                      <div className="invalid-feedback">
                        {errors.user.name.message}
                      </div>
                    )}
                  </div>

                  {/* Surname */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-person-badge-fill me-2 text-success"></i>
                      Surname
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-solid ${
                        errors.user?.surname ? "is-invalid" : ""
                      }`}
                      placeholder="Enter surname"
                      maxLength={64}
                      {...register("user.surname", {
                        required: "Surname is required",
                      })}
                    />
                    {errors.user?.surname && (
                      <div className="invalid-feedback">
                        {errors.user.surname.message}
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-envelope-fill me-2 text-warning"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-solid ${
                        errors.user?.emailAddress ? "is-invalid" : ""
                      }`}
                      placeholder="Enter email"
                      maxLength={256}
                      {...register("user.emailAddress", {
                        required: "Email address is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.user?.emailAddress && (
                      <div className="invalid-feedback">
                        {errors.user.emailAddress.message}
                      </div>
                    )}
                  </div>

                  {/* User Name (disabled) */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-person-check-fill me-2 text-muted"></i>
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="User name"
                      maxLength={256}
                      {...register("user.userName")}
                      disabled
                    />
                    <span className="form-text text-muted">
                      Cannot change username.
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
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
                  disabled={isUpdateLoading}
                >
                  {isUpdateLoading ? (
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
      </ModelApp>
    </>
  );
};

export default UserSettingApp;
