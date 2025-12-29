export interface IRolePermission {
  name: string; // Unique permission name, e.g., "Pages.Administration"
  displayName: string; // Display label
  description: string | null; // Optional or nullable
  parentName: string | null; // May be null if it's a root, e.g., "Pages"
  isGrantedByDefault: boolean; // Default granted state
}
