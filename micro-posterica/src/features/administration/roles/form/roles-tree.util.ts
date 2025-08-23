import type { IRolesPermissionItem } from "../../interfaces/roles-permission.model";
import type { ITreeNode } from "../../../../interfaces/tree-node.model";

// ---------------- Tree Builder ----------------
export const buildPermissionTree = (
  permissions: IRolesPermissionItem[]
): ITreeNode<IRolesPermissionItem>[] => {
  const map = new Map<string, ITreeNode<IRolesPermissionItem>>();

  // 1. Initialize all nodes
  for (const perm of permissions) {
    map.set(perm.name, {
      id: perm.name,
      label: perm.displayName,
      code: perm.name,
      description: perm.description ?? "",
      data: perm, // keep full permission info
      children: [],
    });
  }

  const roots: ITreeNode<IRolesPermissionItem>[] = [];

  // 2. Link children with parents
  for (const perm of permissions) {
    const node = map.get(perm.name);
    if (!node) continue;

    if (perm.parentName && map.has(perm.parentName)) {
      map.get(perm.parentName)!.children.push(node);
    } else {
      roots.push(node); // top-level
    }
  }

  return roots;
};
