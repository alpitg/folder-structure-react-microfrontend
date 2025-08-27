import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

import ModelApp from "../../../ui/model/model";
import PageHeaderApp from "../../../header/page-header/page-header";

type FormValues = {
  user: {
    currentPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
  };
};

const ChangePasswordApp: React.FC<{
  show: boolean;
  handleClose?: (args?: { refresh: boolean }) => void;
  isLoading?: boolean;
}> = ({ show, handleClose, isLoading }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      user: {
        currentPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
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
    console.log("Request =>", formData);

    if (!formData) return;
  };

  return (
    <ModelApp show={show} modelSize="sm">
      <div className="users-form-app">
        <FormProvider {...methods}>
          <form
            id="change_password_form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <PageHeaderApp
              header={"Change password"}
              description={"Change your current password here."}
            />

            <div className="form d-flex flex-column flex-lg-row p-5">
              <div className="d-flex flex-column gap-5 w-100">
                <div>
                  <label className="form-label fw-semibold">
                    <i className="bi bi-key me-2 text-primary"></i>
                    Current Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-solid ${
                      errors.user?.currentPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Enter current password"
                    {...register("user.currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                  {errors.user?.currentPassword && (
                    <div className="invalid-feedback">
                      {errors.user.currentPassword.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label fw-semibold">
                    <i className="bi bi-shield-lock me-2 text-success"></i>
                    New Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-solid ${
                      errors.user?.newPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Enter new password"
                    {...register("user.newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.user?.newPassword && (
                    <div className="invalid-feedback">
                      {errors.user.newPassword.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label fw-semibold">
                    <i className="bi bi-arrow-repeat me-2 text-warning"></i>
                    Repeat New Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-solid ${
                      errors.user?.newPasswordRepeat ? "is-invalid" : ""
                    }`}
                    placeholder="Repeat new password"
                    {...register("user.newPasswordRepeat", {
                      required: "Please repeat the new password",
                      validate: (value, formValues) =>
                        value === formValues.user.newPassword ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.user?.newPasswordRepeat && (
                    <div className="invalid-feedback">
                      {errors.user.newPasswordRepeat.message}
                    </div>
                  )}
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
    </ModelApp>
  );
};

export default ChangePasswordApp;
