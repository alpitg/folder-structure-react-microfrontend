import { useEffect, useState } from "react";

import LoadingApp from "../../../components/loading/loading";
import { Outlet } from "react-router";
import { useLazyGetWebsiteCartQuery } from "../../../app/redux/website/cart/cart.api";

const GUEST_CART_ID_KEY = "website_guest_cart_id";

const InitWebsiteApp = () => {
  const [isInitializingGuestCart, setIsInitializingGuestCart] = useState(true);

  const [createOrGetGuestCart, { isLoading: isCreatingGuestCart }] =
    useLazyGetWebsiteCartQuery();

  // ==================================================
  // INITIALIZE GUEST CART
  // ==================================================

  useEffect(() => {
    const existingGuestCartId = localStorage.getItem(GUEST_CART_ID_KEY);

    // ==================================================
    // CART ID ALREADY EXISTS
    // ==================================================

    if (existingGuestCartId) {
      setIsInitializingGuestCart(false);
      return;
    }

    // ==================================================
    // CREATE GUEST CART
    // ==================================================

    const initializeGuestCart = async () => {
      try {
        setIsInitializingGuestCart(true);

        const response = await createOrGetGuestCart({}).unwrap();

        const newGuestCartId = response?.guestCartId;

        if (!newGuestCartId) {
          throw new Error("Guest cart ID was not returned by the server.");
        }

        localStorage.setItem(GUEST_CART_ID_KEY, newGuestCartId);
      } catch (error) {
        console.error("Unable to initialize guest cart:", error);
      } finally {
        setIsInitializingGuestCart(false);
      }
    };

    initializeGuestCart();
  }, [createOrGetGuestCart]);

  // ==================================================
  // RENDER
  // ==================================================

  if (isInitializingGuestCart || isCreatingGuestCart) {
    return <LoadingApp />;
  }

  return <Outlet />;
};

export default InitWebsiteApp;
