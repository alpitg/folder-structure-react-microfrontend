import type {
  IOrganizationUnitTree,
  IOrganizationUnitsData,
} from "../../interfaces/organization-units.model";

// ---------------- Tree Builder ----------------
export const buildOrganizationUnitTree = (
  units: IOrganizationUnitsData[]
): IOrganizationUnitTree[] => {
  const map = new Map<string, IOrganizationUnitTree>();

  // 1. Initialize all nodes
  for (const unit of units) {
    map.set(unit.id || "", {
      id: unit?.id ?? "",
      label: unit?.displayName,
      members: unit.memberCount ?? 0,
      roles: unit.roleCount ?? 0,
      children: [],
    });
  }

  const roots: IOrganizationUnitTree[] = [];

  // 2. Link children with parents
  for (const unit of units) {
    const node = map.get(unit?.id || "");
    if (!node) continue;

    if (unit?.parentId && map.has(unit?.parentId)) {
      map.get(unit?.parentId)!.children.push(node);
    } else {
      roots.push(node); // top-level
    }
  }

  return roots;
};
