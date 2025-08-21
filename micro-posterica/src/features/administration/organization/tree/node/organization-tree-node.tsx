import type { IOrganizationUnitTree } from "../../../interfaces/organization-units.model";
import { useState } from "react";

const OrganizationTreeNodeApp = ({
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
            <OrganizationTreeNodeApp key={index} {...child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default OrganizationTreeNodeApp;
