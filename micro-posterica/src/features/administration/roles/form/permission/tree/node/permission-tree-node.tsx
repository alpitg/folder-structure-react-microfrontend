import type { ITreeNode } from "../../../../../../../interfaces/tree-node.model";
import { useState } from "react";

const PermissionTreeNodeApp = ({ props }: { props: ITreeNode }) => {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = props?.children && props?.children.length > 0;

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

          <div className="form-check">
            <input
              className="form-check-input cursor-pointer"
              type="checkbox"
              value=""
              checked
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
