import { useState } from "react";

const TreeNode = ({ label, members, roles, children }: any) => {
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
          <span>{label}</span>
          <small className="text-muted ms-2">
            ({members} Members, {roles} Roles)
          </small>
        </span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <ul className="ms-4 mt-1 list-unstyled">
          {children.map((child: any, index: number) => (
            <TreeNode key={index} {...child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const OrganizationTreeApp = () => {
  const data = [
    {
      label: "Selling",
      members: 0,
      roles: 0,
      children: [],
    },
    {
      label: "Producing",
      members: 2,
      roles: 0,
      children: [
        { label: "Quality Management", members: 1, roles: 1, children: [] },
        { label: "Testing", members: 1, roles: 0, children: [] },
        { label: "Research & Development", members: 1, roles: 0, children: [] },
      ],
    },
    {
      label: "Supporting",
      members: 1,
      roles: 0,
      children: [
        { label: "Human Resources", members: 0, roles: 0, children: [] },
        { label: "Buying", members: 4, roles: 0, children: [] },
      ],
    },
  ];

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header d-flex justify-content-between align-items-center border-0">
        <h5 className="mb-0">Organisation Tree</h5>
        <button className="btn btn-primary btn-sm">
          <i className="bi bi-plus-lg fs-3"></i> Add Root Unit
        </button>
      </div>
      <div className="card-body pt-2">
        {data?.length === 0 ? (
          <div className="text-muted">No organisation unit defined yet.</div>
        ) : (
          <ul className="list-unstyled mb-0">
            {data.map((node, index) => (
              <TreeNode key={index} {...node} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrganizationTreeApp;
