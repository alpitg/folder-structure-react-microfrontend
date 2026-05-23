let environment = {
  apiUrl: "http://localhost:3000/api",
  appName: "Micro Meal Planner",
  version: "1.0.0",
  debugMode: false,
  description: "A microservice for managing meal-planner data",
  author: "Meal Planner Team",
  logo: "/static/media/img/logo.png",
  api: {
    baseUrl: "",
    frontendBaseUrl: "",
    apiVersion: "",
    profile: {
      mealPlanner: "",
    },
    mealPlanner: {
      mealRequest: "",
      stickyNotes: "",
      availableIngredients: "",
      weeklyPlan: "",
      weeklyMeals: "",
    },
    administration: {
      organizationUnits: {
        list: "",
        detail: "",
        add: "",
        update: "",
        delete: "",
        roles: {
          list: "",
          add: "",
          remove: "",
        },
      },
      roles: {
        list: "",
        detail: "",
        add: "",
        update: "",
        delete: "",
        permissions: "",
      },
      users: {
        login: "",
        refreshToken: "",
        appInit: "",
        forgotPassword: "",
        resetPassword: "",
        updatePassword: "",
        getCurrentUserProfile: "",
        updateCurrentUserProfile: "",
        list: "",
        detail: "",
        add: "",
        update: "",
        delete: "",
        getUserForEdit: "",
        permissions: "",
      },
    },
    master: {
      frameTypes: "",
      glassTypes: "",
      miscCharges: "",
    },
    order: {
      list: "",
      listGet: "",
      detail: "",
      placeOrder: "",
      update: "",
      delete: "",
    },
    catalog: {
      product: {
        list: "",
        detail: "",
        add: "",
        update: "",
        delete: "",
      },
      category: {
        list: "",
        detail: "",
        add: "",
        update: "",
        delete: "",
      },
    },
    customer: {
      list: "",
      detail: "",
      add: "",
      update: "",
      delete: "",
    },
  },
};

export const GetEnvConfig = () => {
  return environment;
};

export const SetEnvConfig = (env: any) => {
  environment = { ...environment, ...env };
  return environment;
};
