import type { AppState } from "../app/store";
import { useSelector } from "react-redux";

export const useToast = () => {
  const { toast } = useSelector((state: AppState) => state?.core?.appSettings);

  return {
    toast,
  };
};
