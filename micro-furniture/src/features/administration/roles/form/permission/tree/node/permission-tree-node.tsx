import type { IRoleWithPermissions } from "../../../../../interfaces/roles.model";
import type { ITreeNode } from "../../../../../../../interfaces/tree-node.model";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const PermissionTreeNodeApp = ({ props }: { props: ITreeNode }) => {
  const [expanded, setExpanded] = useState(false);
  const { setValue, watch } = useFormContext<IRoleWithPermissions>();

  const hasChildren = props?.children && props?.children.length > 0;

  const granted = watch("grantedPermissionNames") || [];
  const isChecked = granted.includes(props.code);

  // Utility: recursively get all descendant codes
  const getDescendantCodes = (node: ITreeNode): string[] => {
    let codes: string[] = [node.code];
    for (const child of node.children || []) {
      codes = [...codes, ...getDescendantCodes(child)];
    }
    return codes;
  };

  const handleToggle = () => {
    const allCodes = getDescendantCodes(props); // parent + children

    if (isChecked) {
      // Uncheck parent + all children
      setValue(
        "grantedPermissionNames",
        granted.filter((x) => !allCodes.includes(x)),
        { shouldDirty: true }
      );
    } else {
      // Check parent + all children
      setValue(
        "grantedPermissionNames",
        [...new Set([...granted, ...allCodes])],
        {
          shouldDirty: true,
        }
      );
    }
  };

  return (
    <div>
      <li className="list-unstyled">
        <div className="d-flex align-items-center py-2 gap-3">
          {/* Chevron */}
          {hasChildren ? (
            expanded ? (
              <i
                className={`bi bi-chevron-down text-muted ${
                  hasChildren ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() => hasChildren && setExpanded(!expanded)}
              />
            ) : (
              <i
                className={`bi bi-chevron-right text-muted ${
                  hasChildren ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() => hasChildren && setExpanded(!expanded)}
              />
            )
          ) : (
            <span className="me-4"></span>
          )}

          {/* Checkbox */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input cursor-pointer"
              checked={isChecked}
              onChange={handleToggle}
            />
          </div>

          {/* Folder Icon */}
          {expanded ? (
            <i className="bi bi-folder2-open text-primary fs-3" />
          ) : (
            <i className="bi bi-folder text-primary fs-3" />
          )}

          {/* Label */}
          <span>
            {props?.label}
            <small className="text-muted ms-2">({props?.description})</small>
          </span>
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <ul className="ms-4 mt-1 list-unstyled">
            {props?.children.map((child, index) => (
              <PermissionTreeNodeApp key={index} props={child} />
            ))}
          </ul>
        )}
      </li>
    </div>
  );
};

export default PermissionTreeNodeApp;
