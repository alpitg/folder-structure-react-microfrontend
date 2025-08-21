import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type {
  IOrganizationUnitTree,
  IOrganizationUnitsData,
} from "../../interfaces/organization-units.model";
import { useEffect, useState } from "react";

import ModelApp from "../../../../components/ui/model/model";
import { useAddOrganizationUnitsMutation } from "../../../../app/redux/administration/organization-units/organization-units.api";

// ---------------- TreeNode ----------------
const TreeNode = ({
  label,
  members,
  roles,
  children,
}: IOrganizationUnitTree) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = children && children.length > 0;

  return (
    <li className="list-unstyled">
      <div
        className="d-flex align-items-center py-2 gap-3"
        style={{ cursor: hasChildren ? "pointer" : "default" }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {/* Chevron */}
        {hasChildren ? (
          expanded ? (
            <i className="bi bi-chevron-down text-muted" />
          ) : (
            <i className="bi bi-chevron-right text-muted" />
          )
        ) : (
          <span className="me-3"></span>
        )}

        {/* Folder Icon */}
        {expanded ? (
          <i className="bi bi-folder2-open text-primary" />
        ) : (
          <i className="bi bi-folder text-primary" />
        )}

        {/* Label */}
        <span>
          {label}
          <small className="text-muted ms-2">
            ({members} Members, {roles} Roles)
          </small>
        </span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <ul className="ms-4 mt-1 list-unstyled">
          {children.map((child, index) => (
            <TreeNode key={index} {...child} />
          ))}
        </ul>
      )}
    </li>
  );
};

// ---------------- Tree Builder ----------------
export function buildOrganizationUnitTree(
  units: IOrganizationUnitsData[]
): IOrganizationUnitTree[] {
  const map = new Map<string, IOrganizationUnitTree>();

  // 1. Initialize all nodes
  for (const unit of units) {
    map.set(unit.id || "", {
      label: unit.displayName,
      members: unit.memberCount ?? 0,
      roles: unit.roleCount ?? 0,
      children: [],
    });
  }

  const roots: IOrganizationUnitTree[] = [];

  // 2. Link children with parents
  for (const unit of units) {
    const node = map.get(unit.id || "");
    if (!node) continue;

    if (unit.parentId && map.has(unit.parentId)) {
      map.get(unit.parentId)!.children.push(node);
    } else {
      roots.push(node); // top-level
    }
  }

  return roots;
}

// ---------------- Add Form ----------------
const AddOrganizationUnitForm = ({
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

// ---------------- Main Component ----------------
const OrganizationTreeApp = ({
  data,
  refetch,
}: {
  data?: IOrganizationUnitsData[];
  refetch: () => void;
}) => {
  const [showAddModel, setShowAddModel] = useState<boolean>(false);
  const methods = useForm<IOrganizationUnitsData>();
  const { isSuccess: isAddSuccess } = useAddOrganizationUnitsMutation()[1];

  useEffect(() => {
    if (isAddSuccess) {
      refetch();
    }
  }, [isAddSuccess, refetch]);

  const treeData = buildOrganizationUnitTree(data || []);

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header d-flex justify-content-between align-items-center border-0">
        <h5 className="mb-0">Organisation Tree</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddModel(true)}
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add Root unit
        </button>
      </div>

      <div className="card-body pt-2">
        {treeData.length === 0 ? (
          <div className="text-muted">No organisation unit defined yet.</div>
        ) : (
          <ul className="list-unstyled mb-0">
            {treeData.map((node, index) => (
              <TreeNode key={index} {...node} />
            ))}
          </ul>
        )}
      </div>

      <ModelApp show={showAddModel}>
        <FormProvider {...methods}>
          <AddOrganizationUnitForm
            onClose={() => setShowAddModel(false)}
            onSuccess={refetch}
          />
        </FormProvider>
      </ModelApp>
    </div>
  );
};

export default OrganizationTreeApp;
