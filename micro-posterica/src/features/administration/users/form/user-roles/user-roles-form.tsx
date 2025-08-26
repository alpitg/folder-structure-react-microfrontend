import type { IUserWithPermissions } from "../../../interfaces/users.model";
import { useFormContext } from "react-hook-form";

const UserRolesFormApp = ({ data }: { data?: IUserWithPermissions }) => {
  const { register } = useFormContext<IUserWithPermissions>();

  return (
    <div className="users-form-app">
      <div className="row g-4">
        {data?.roles?.map((role) => (
          <div className="col-12 col-md-6 col-lg-4" key={role?.id}>
            <div className="d-flex flex-column gap-2 p-4 border rounded h-100">
              <div>
                <div className="form-check d-flex align-items-center mb-2">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id={`role-${role?.id}`}
                    value={role?.id}
                    defaultChecked={role?.isAssigned} // ✅ works with register
                    {...register("grantedRoles")}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor={`role-${role?.id}`}
                  >
                    {role?.displayName}
                  </label>
                </div>
                {role?.description && (
                  <p className="text-muted small mb-0">{role.description}</p>
                )}
              </div>

              <div className="mt-auto d-flex gap-2">
                {role?.isStatic && (
                  <span className="badge bg-light-primary text-primary">
                    Static
                  </span>
                )}
                {role?.isDefault && (
                  <span className="badge bg-secondary">Default</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRolesFormApp;
