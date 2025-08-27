import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import ModelApp from "../../../ui/model/model";
import PageHeaderApp from "../../../header/page-header/page-header";
import ToastApp, { type ToastAppProps } from "../../../ui/toast/toast";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/use-auth";
import { useUpdateCurrentUserProfileMutation } from "../../../../app/redux/administration/auth/auth.api";

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
  initialData?: FormValues;
}> = ({ show, handleClose, initialData }) => {
  const [toast, setToast] = useState<ToastAppProps>({
    show: false,
    message: "",
    variant: "info",
  });

  const [updateCurrentUserProfile, { isLoading }] =
    useUpdateCurrentUserProfileMutation();
  const { user } = useAuth();

  //#region form
  const methods = useForm<FormValues>({
    defaultValues: initialData || {
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

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log("Submitted user data:", formData);

    updateCurrentUserProfile({
      id: user?.user?.id || "",
      data: {
        name: formData?.user?.name,
        surname: formData?.user?.surname,
        emailAddress: formData?.user?.emailAddress,
        userName: formData?.user?.userName,
      },
    })
      .unwrap()
      .then((response) => {
        handleClose?.({ refresh: true });
        setToast({
          show: true,
          message: response?.message || "User info updated successfully.",
          variant: "success",
        });
      })
      .catch((response) => {
        setToast({
          show: true,
          message:
            response?.data?.detail || "Server error! Failed to update detail.",
          variant: "danger",
        });
      });
  };

  //#endregion

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      reset(
        initialData || {
          user: {
            name: user?.user?.name || "",
            surname: user?.user?.surname || "",
            emailAddress: user?.user?.emailAddress || "",
            userName: user?.user?.userName || "",
          },
        }
      );
    }
  }, [show, reset, initialData]);

  return (
    <>
      <ModelApp show={show} modelSize="md">
        <div className="users-form-app">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <PageHeaderApp
                header="Edit User"
                description="Update the user's personal information."
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
                      Cannot change username of the admin.
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
      </ModelApp>

      <ToastApp
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};

export default UserSettingApp;
