export interface ITreeNode<T = unknown> {
  id: string;
  label: string;
  code: string;
  description: string;
  data?: T;
  children: ITreeNode<T>[];
}
