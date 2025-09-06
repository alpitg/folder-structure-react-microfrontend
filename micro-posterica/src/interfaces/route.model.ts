export interface IRoutes {
  id: string;
  title: string;
  path: string;
  icon: string;
  claims: string[];
  subRoutes?: IRoutes[];
  isSelected?: boolean;
}
