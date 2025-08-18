let environment = {
  apiUrl: "http://localhost:3000/api",
  appName: "Micro Posterica",
  version: "1.0.0",
  debugMode: false,
  description: "A microservice for managing posterica data",
  author: "Posterica Team",
  logo: "/static/media/img/logo.png",
  api: {
    baseUrl: "",
    apiVersion: "",
    profile: {
      posterica: "",
    },
    master: {
      frameTypes: "",
      glassTypes: "",
      miscCharges: "",
    },
    order: {
      list: "",
      detail: "",
      placeOrder: "",
      update: "",
    },
    catalog: {
      product: {
        list: "",
        detail: "",
        add: "",
        update: "",
      },
      category: {
        list: "",
        detail: "",
        add: "",
        update: "",
      },
    },
    customer: {
      list: "",
      detail: "",
      add: "",
      update: "",
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
