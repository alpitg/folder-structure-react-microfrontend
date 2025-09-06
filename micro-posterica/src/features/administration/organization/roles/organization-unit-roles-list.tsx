import { Controller, useForm } from "react-hook-form";
import {
  useAddRoleToOrganizationUnitMutation,
  useGetRolesFromOrganizationUnitQuery,
} from "../../../../app/redux/administration/organization-units/organization-units.api";
import { useEffect, useState } from "react";

interface OrganizationUnitRolesListAppProps {
  orgUnitId: string;
  onClose: () => void;
  refetchRoles?: () => void;
}

interface FormValues {
  selectedRoles: string[]; // role IDs
}

const OrganizationUnitRolesListApp = ({
  orgUnitId,
  onClose,
  refetchRoles,
}: OrganizationUnitRolesListAppProps) => {
  const { control, handleSubmit, watch, reset, setValue } = useForm<FormValues>(
    {
      defaultValues: { selectedRoles: [] },
    }
  );

  const [saving, setSaving] = useState(false);

  const { data: rolesData, isFetching } = useGetRolesFromOrganizationUnitQuery(
    {
      id: orgUnitId,
      page: 1,
      pageSize: 50,
      searchText: "",
      sort: "newest",
      isAssigned: false,
    },
    { skip: !orgUnitId, refetchOnMountOrArgChange: true }
  );

  const [addRoleToOrgUnit] = useAddRoleToOrganizationUnitMutation();

  const selectedRoles = watch("selectedRoles");

  // ✅ Toggle all selection
  const allIds: string[] =
    rolesData?.items?.map((r) => r.id).filter((id): id is string => !!id) || [];

  const allSelected =
    allIds.length > 0 && selectedRoles.length === allIds.length;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setValue("selectedRoles", allIds); // select all
    } else {
      setValue("selectedRoles", []); // deselect all
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.selectedRoles.length) return;

    setSaving(true);

    try {
      await addRoleToOrgUnit({
        roleIds: data.selectedRoles,
        organizationUnitId: orgUnitId,
      }).unwrap();

      if (refetchRoles) refetchRoles();
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to add roles:", error);
    } finally {
      setSaving(false);
    }
  };

  if (isFetching) return <div>Loading roles...</div>;
  if (!rolesData?.items?.length)
    return <div>No roles found for this unit.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="table-responsive">
        <table className="table table-row-dashed table-row-gray-300 gy-7">
          <thead>
            <tr className="fw-bold fs-6 text-gray-800">
              <th style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
              <th>NAME</th>
              <th>CREATED TIME</th>
            </tr>
          </thead>
          <tbody className="fw-semibold text-gray-600">
            {rolesData.items.map((role) => (
              <tr key={role.id}>
                <td>
                  <Controller
                    name="selectedRoles"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        value={role.id}
                        checked={field.value.includes(role.id ?? "")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, role.id]);
                          } else {
                            field.onChange(
                              field.value.filter((id) => id !== role.id)
                            );
                          }
                        }}
                      />
                    )}
                  />
                </td>
                <td>{role.displayName}</td>
                <td>
                  {role.creationTime
                    ? new Date(role.creationTime).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal-footer d-flex justify-content-end gap-4 mt-3">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            reset();
            onClose();
          }}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={saving}
        >
          {saving ? (
            <span className="spinner-border spinner-border-sm align-middle me-2"></span>
          ) : null}
          Save changes
        </button>
      </div>
    </form>
  );
};

export default OrganizationUnitRolesListApp;
