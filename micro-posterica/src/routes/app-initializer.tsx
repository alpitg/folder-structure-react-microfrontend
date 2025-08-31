import ErrorPage from "../components/ui/error/error-page";
import type { IUserWithPermissions } from "../features/administration/interfaces/users.model";
import LoadingApp from "../components/loading/loading";
import { Outlet } from "react-router";
import { setAppInitialData } from "../app/redux/administration/auth/auth.slice";
import { useAuth } from "../hooks/use-auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetAppInitialDataQuery } from "../app/redux/administration/auth/auth.api";

export interface IAppInitializer {
  user: IUserWithPermissions | null;
}

const AppInitializer = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError } = useGetAppInitialDataQuery(
    undefined,
    {
      skip: !isAuthenticated, // ✅ don’t call if no token
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      pollingInterval: 0,
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAppInitialData(data));
    }
  }, [isSuccess, data, dispatch]);

  //#region render
  if (isLoading) return <LoadingApp />;

  if (isError) {
    return (
      <ErrorPage description="Unable to load the application." />
    );
  }

  return <Outlet />;
  //#endregion
};

export default AppInitializer;
