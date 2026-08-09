import { useEffect, useState } from "react";
import {
  useGetWebsiteCartQuery,
  useLazyGetWebsiteCartQuery,
} from "../../../app/redux/website/cart/cart.api";

import ErrorLoginAgainApp from "../../../components/ui/error/error-login-again";
import LoadingApp from "../../../components/loading/loading";
import { Outlet } from "react-router";
import { useAuth } from "../../../hooks/use-auth";

const GUEST_CART_ID_KEY = "website_guest_cart_id";

const InitWebsiteApp = () => {
  const { isAuthenticated, hydrated } = useAuth();

  const [guestCartId, setGuestCartId] = useState<string | null>(() => {
    return localStorage.getItem(GUEST_CART_ID_KEY);
  });

  const [isInitializingGuestCart, setIsInitializingGuestCart] = useState(true);

  const [
    createOrGetGuestCart,
    { isLoading: isCreatingGuestCart, isError: isCreateCartError },
  ] = useLazyGetWebsiteCartQuery();

  const { isLoading: isLoadingCart, isError: isCartError } =
    useGetWebsiteCartQuery(
      guestCartId
        ? {
            guestCartId,
          }
        : undefined,
      {
        skip: !hydrated || isAuthenticated || !guestCartId,
      },
    );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    // For now we only initialize guest carts.
    if (isAuthenticated) {
      setIsInitializingGuestCart(false);
      return;
    }

    const existingGuestCartId = localStorage.getItem(GUEST_CART_ID_KEY);

    if (existingGuestCartId) {
      setGuestCartId(existingGuestCartId);
      setIsInitializingGuestCart(false);
      return;
    }

    const initializeGuestCart = async () => {
      try {
        setIsInitializingGuestCart(true);

        const response = await createOrGetGuestCart({}).unwrap();

        const newGuestCartId = response?.guestCartId;

        if (!newGuestCartId) {
          throw new Error("Guest cart ID was not returned by the server.");
        }

        localStorage.setItem(GUEST_CART_ID_KEY, newGuestCartId);

        setGuestCartId(newGuestCartId);
      } catch (error) {
        console.error("Unable to initialize guest cart:", error);
      } finally {
        setIsInitializingGuestCart(false);
      }
    };

    initializeGuestCart();
  }, [hydrated, isAuthenticated, createOrGetGuestCart]);

  //#region render

  if (!hydrated) {
    return <LoadingApp />;
  }

  if (isInitializingGuestCart || isCreatingGuestCart || isLoadingCart) {
    return <LoadingApp />;
  }

  if (isCreateCartError || isCartError) {
    return <ErrorLoginAgainApp description="Unable to load the application." />;
  }

  return <Outlet />;

  //#endregion
};

export default InitWebsiteApp;
