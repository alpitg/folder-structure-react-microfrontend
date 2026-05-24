import "./meal-footer.scss";

import { useEffect, useState } from "react";

import type { IRoutes } from "../../../interfaces/route.model";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";

const MealFooterApp = () => {
  // full static routes as before

  const routes: IRoutes[] = [
    // {
    //   id: "stickyNotes",
    //   title: "Sticky Notes",
    //   path: ROUTE_URL.MEAL_PLANNER.STICKY_NOTES,
    //   icon: "bi bi-journal-text fs-3",
    //   claims: [],
    //   subRoutes: [],
    // },
    // {
    //   id: "dashboard",
    //   title: "Dashboard",
    //   path: ROUTE_URL.DASHBOARD,
    //   icon: "bi bi-bounding-box fs-3",
    //   claims: [],
    //   subRoutes: [],
    // },
    {
      id: "mealScheduler",
      title: "Meal Scheduler",
      path: ROUTE_URL.DASHBOARD,
      icon: "bi bi-clock fs-3",
      claims: [],
      subRoutes: [],
    },
    {
      id: "mealRequest",
      title: "Meal Request",
      path: ROUTE_URL.MEAL_PLANNER.MEAL_REQUEST,
      icon: "bi bi-fork-knife fs-3",
      claims: [],
      subRoutes: [],
    },
    {
      id: "availableIngredients",
      title: "Available Ingredients",
      path: ROUTE_URL.MEAL_PLANNER.AVAILABLE_INGREDIENTS,
      icon: "bi bi-bag-check-fill fs-3",
      claims: [],
      subRoutes: [],
    },
    {
      id: "weeklyPlan",
      title: "Weekly Plan",
      path: ROUTE_URL.MEAL_PLANNER.WEEKLY_PLAN,
      icon: "bi bi-cart-check fs-3",
      claims: [],
      subRoutes: [],
    },
  ];
  // state will hold routes WITH isSelected flags
  const [menuState, setMenuState] = useState<IRoutes[]>([]);

  // build on mount + whenever path or claims change
  useEffect(() => {
    setMenuState(routes);
  }, []);

  const handleMenuClick = (menu: IRoutes) => {
    // only parents with subRoutes toggle
    if (!menu.subRoutes || menu.subRoutes.length === 0) return;

    if (menu?.subRoutes && menu?.isSelected) {
      // clicking an open parent closes it
      setMenuState((prev) =>
        prev.map((route) =>
          route?.id === menu?.id ? { ...route, isSelected: false } : route,
        ),
      );
      return;
    }

    setMenuState((prev) =>
      prev.map((route) =>
        route?.id === menu?.id
          ? { ...route, isSelected: !route?.isSelected }
          : route,
      ),
    );
  };

  return (
    <div className="meal-footer-app">
      <div className="app-footer-menu overflow-hidden flex-column-fluid">
        <div className="app-footer-wrapper">
          <div className="hover-scroll-y overflow-hidden my-2 mx-2">
            <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold">
              {menuState.map((route) => (
                <div
                  key={route.id}
                  className={`menu-item menu-accordion ${
                    route.isSelected ? "show" : ""
                  }`}
                  onClick={() =>
                    route.subRoutes?.length && handleMenuClick(route)
                  }
                >
                  {route.subRoutes && (
                    <NavLink
                      className="menu-link"
                      to={route.path}
                      title={route.title}
                    >
                      <span className="menu-icon">
                        <i className={route.icon}></i>
                      </span>
                      <span className="menu-title">{route.title}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealFooterApp;
