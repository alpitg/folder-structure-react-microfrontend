import ErrorLoginAgainApp from "../components/ui/error/error-login-again";
import LoadingApp from "../components/loading/loading";
import { Outlet } from "react-router";
import { setAppInitialData } from "../app/redux/administration/auth/auth.slice";
import { useAuth } from "../hooks/use-auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetAppInitialDataQuery } from "../app/redux/administration/auth/auth.api";

const AppInitializer = () => {
  const { isAuthenticated, hydrated } = useAuth();
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetAppInitialDataQuery(undefined, {
      skip: !hydrated || !isAuthenticated,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      pollingInterval: 0,
    });

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      void refetch();
    }
  }, [hydrated, isAuthenticated, refetch]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAppInitialData(data));
    }
  }, [isSuccess, data, dispatch]);

  //#region render
  if (isLoading) return <LoadingApp />;

  if (isError) {
    return <ErrorLoginAgainApp description="Unable to load the application." />;
  }

  return <Outlet />;
  //#endregion
};

export default AppInitializer;
