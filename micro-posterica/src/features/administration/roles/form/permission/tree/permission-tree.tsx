import type { ITreeNode } from "../../../../../../interfaces/tree-node.model";
import PermissionTreeNodeApp from "./node/permission-tree-node";

interface PermissionTreeAppProps {
  data: ITreeNode[];
}

const PermissionTreeApp: React.FC<PermissionTreeAppProps> = ({ data }) => {
  return (
    <ul className="list-group list-group-flush">
      {data.map((node) => (
        <PermissionTreeNodeApp key={node.id} props={node} />
      ))}
    </ul>
  );
};

export default PermissionTreeApp;
