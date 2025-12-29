import { setToast } from "../../../app/redux/core/app-settings/app-settings.slice";
// import { useUpdateSecuritySettingsMutation } from "../../../../app/redux/administration/security/security.api";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface SecuritySettingsForm {
  useDefaultSettings: boolean;
  requireDigit: boolean;
  requireLowercase: boolean;
  requireNonAlphanumeric: boolean;
  requireUppercase: boolean;
  requiredLength: number;
  isEnabled: boolean;
  maxFailedAccessAttemptsBeforeLockout: number;
  defaultAccountLockoutSeconds: number;
}

const SecuritySettingApp = () => {
  const { register, handleSubmit, formState } = useForm<SecuritySettingsForm>();
  const [isSaving, setIsSaving] = useState(false);
  //   const [updateSecuritySettings, { isLoading }] =
  //     useUpdateSecuritySettingsMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data: SecuritySettingsForm) => {
    setIsSaving(true);
    try {
      //   await updateSecuritySettings(data).unwrap();
      dispatch(
        setToast({
          show: true,
          message: "Security settings updated successfully!",
          variant: "success",
        })
      );
    } catch (err) {
      console.error("Error updating security settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-header border-0" role="button">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0"> Security</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <h5 className="mb-5">Password complexity </h5>

              <label className="form-check form-check-custom form-check-solid py-1">
                <input
                  {...register("useDefaultSettings")}
                  type="checkbox"
                  className="form-check-input"
                />
                <span className="form-check-label">Use default settings</span>
              </label>
              <div className="px-5">
                <label className="form-check form-check-custom form-check-solid py-1">
                  <input
                    {...register("requireDigit")}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <span className="form-check-label">Require digit</span>
                </label>

                <label className="form-check form-check-custom form-check-solid py-1">
                  <input
                    {...register("requireLowercase")}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <span className="form-check-label">Require lowercase</span>
                </label>

                <label className="form-check form-check-custom form-check-solid py-1">
                  <input
                    {...register("requireNonAlphanumeric")}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <span className="form-check-label">
                    Require non-alphanumeric
                  </span>
                </label>

                <label className="form-check form-check-custom form-check-solid py-1">
                  <input
                    {...register("requireUppercase")}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <span className="form-check-label">Require uppercase</span>
                </label>

                <div className="mb-5">
                  <label className="form-label">Required length</label>
                  <input
                    {...register("requiredLength")}
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div>
              <h5 className="mb-5"> User Lock Out </h5>
              <label className="form-check form-check-custom form-check-solid py-1 mb-5">
                <input
                  {...register("isEnabled")}
                  type="checkbox"
                  className="form-check-input"
                />
                <span className="form-check-label">
                  Enable user account locking on failed login attempts
                </span>
              </label>

              <div className="mb-5">
                <label className="form-label">
                  Maximum number of failed login attempt count before locking
                  the account
                </label>
                <input
                  {...register("maxFailedAccessAttemptsBeforeLockout")}
                  type="number"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="form-label">
                  Account locking duration (as seconds)
                </label>
                <input
                  {...register("defaultAccountLockoutSeconds")}
                  type="number"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            //    disabled={isLoading || isSaving}
          >
            <i className="bi bi-check2 fs-3 me-2" />
            Save changes
            {/* {isLoading || isSaving ? "Saving..." : "Save"} */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettingApp;
