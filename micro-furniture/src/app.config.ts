let environment = {
  apiUrl: "http://localhost:3000/api",
  name: "Micro Posterica",
  version: "1.0.0",
  debugMode: false,
  description: "A microservice for managing posterica data",
  author: "Posterica Team",
  logo: "/static/media/img/logo.png",
  homePage: {
    title: "title here",
    subtitle: "subtitle here",
    description: "description here",
    contactnumber: "+1234567890",
    whyChooseUs: {
      title: "Why Choose Us",
      description: "description here",
      services: [
        {
          title: "Service 1",
          description: "Description for service 1",
          icon: "",
        },
      ],
    },
    whyChooseUs2: {
      title: "Why Choose Us 2",
      description: "description here",
      services: [
        {
          title: "Service 1",
          description: "Description for service 1",
          icon: "",
        },
      ],
    },
  },
  api: {
    baseUrl: "",
    apiVersion: "",
    profile: {
      posterica: "",
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
