import "./permission-tree.scss";

import type { ITreeNode } from "../../../../../../interfaces/tree-node.model";
import PermissionTreeNodeApp from "./node/permission-tree-node";

interface PermissionTreeAppProps {
  data: ITreeNode[];
}

const PermissionTreeApp: React.FC<PermissionTreeAppProps> = ({ data }) => {
  return (
    <div className="permission-tree-app">
      {/* <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Collapse All"
          >
            <i className="bi bi-chevron-double-down"></i>
            <span className="ms-2 text-muted">Collapse All</span>
          </button>
        </div>

        <div className="form-check form-switch">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Only Show Enabled Permissions
          </label>
        </div>
      </div> */}

      <ul className="list-group list-group-flush">
        {data.map((node) => (
          <PermissionTreeNodeApp key={node.id} props={node} />
        ))}
      </ul>
    </div>
  );
};

export default PermissionTreeApp;
