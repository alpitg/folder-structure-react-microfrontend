import { Controller, useFormContext } from "react-hook-form";
import type {
  IUserWithPermissions,
  IUserWithPermissionsForm,
} from "../../../interfaces/users.model";

const UserRolesFormApp = ({ data }: { data?: IUserWithPermissions }) => {
  const { control } = useFormContext<IUserWithPermissionsForm>();

  return (
    <div className="users-form-app">
      <div className="row g-4">
        {data?.roles?.map((role) => (
          <div className="col-12 col-md-6 col-lg-4" key={role?.id}>
            <div className="d-flex flex-column gap-2 p-4 border rounded h-100">
              <div>
                <div className="form-check d-flex align-items-center mb-2">
                  <Controller
                    name="grantedRoles"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id={`role-${role?.id}`}
                        value={role?.id}
                        checked={field.value?.includes(role?.id)} // ✅ controlled
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          let newValue = [...(field.value || [])];
                          if (checked) {
                            newValue.push(value);
                          } else {
                            newValue = newValue.filter((v) => v !== value);
                          }
                          field.onChange(newValue);
                        }}
                      />
                    )}
                  />

                  <label
                    className="form-check-label fw-semibold"
                    htmlFor={`role-${role?.id}`}
                  >
                    {role?.displayName}
                  </label>
                </div>
                {role?.description && (
                  <p className="text-muted small mb-0">{role?.description}</p>
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
