import { rehydrate } from "../app/redux/administration/auth/auth.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrate());
  }, [dispatch]);
};
