import type {
  IOrganizationUnitTree,
  IOrganizationUnitsData,
} from "../../../interfaces/organization-units.model";

import { useAddOrganizationUnitsMutation } from "../../../../../app/redux/administration/organization-units/organization-units.api";
import { useAutoFocus } from "../../../../../hooks/use-auto-focus";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const OrganizationTreeFormApp = ({
  parent,
  onClose,
  onSuccess,
}: {
  parent?: IOrganizationUnitTree;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const inputRef = useAutoFocus<HTMLInputElement>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useFormContext<IOrganizationUnitsData>();

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

  useEffect(() => {
    setValue("parentId", parent?.id ?? null);
  }, [parent]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {parent && (
        <div className="fv-row w-100 py-5">
          <label className="form-label" htmlFor="parentOrganizationUnits">
            Add sub unit for:
          </label>
          <input
            id="parentOrganizationUnits"
            type="text"
            className="form-control form-control-flush fw-bold"
            placeholder="Parent Organization unit name"
            readOnly={true}
            value={parent?.label}
          />
        </div>
      )}
      <div className="fv-row w-100 py-5">
        <label className="form-label" htmlFor="organizationName">
          Name <span className="text-danger">*</span>
        </label>
        <input
          id="organizationName"
          type="text"
          className={`form-control form-control-solid ${
            errors?.displayName?.message ? "is-invalid" : ""
          }`}
          placeholder="Organization unit name"
          {...register("displayName", {
            required: "Organization unit name is required",
          })}
          ref={(e) => {
            register("displayName")?.ref(e); // connect RHF (React Hook Form)
            inputRef.current = e; // keep local ref
          }}
        />
        {errors?.displayName?.message && (
          <div className="invalid-feedback">{errors?.displayName?.message}</div>
        )}
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
