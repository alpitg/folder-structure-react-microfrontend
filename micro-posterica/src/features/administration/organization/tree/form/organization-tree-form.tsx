import type { IOrganizationUnitsData } from "../../../interfaces/organization-units.model";
import { useAddOrganizationUnitsMutation } from "../../../../../app/redux/administration/organization-units/organization-units.api";
import { useFormContext } from "react-hook-form";

const OrganizationTreeFormApp = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { register, handleSubmit, reset } =
    useFormContext<IOrganizationUnitsData>();

  const [addOrganizationUnits, { isLoading }] =
    useAddOrganizationUnitsMutation();

  const onSubmit = async (values: IOrganizationUnitsData) => {
    try {
      await addOrganizationUnits(values).unwrap();
      reset();
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to add unit", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fv-row w-100 py-5">
        <label className="form-label">
          Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control form-control-solid"
          placeholder="Organization unit name"
          {...register("displayName", { required: true })}
        />
      </div>

      <div className="model-footer d-flex justify-content-end gap-4">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm align-middle me-2"></span>
          ) : (
            <i className="bi bi-check2 fs-3"></i>
          )}
          Save
        </button>
      </div>
    </form>
  );
};

export default OrganizationTreeFormApp;
