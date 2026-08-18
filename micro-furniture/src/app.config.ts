let environment = {
  version: "1.0.0",
  debugMode: false,
  name: "Micro",
  description: "A microservice for managing data",
  author: "Team",
  logo: "/static/media/img/logo.png",
  homePage: {
    title: "title here",
    subtitle: "subtitle here",
    description: "description here",
    contactDetails: {
      address: "",
      contactnumber: "",
      email: "",
      instagram: "instagram_handle",
      whatsapp: {
        number: "+1234567890",
        message: "Hello, I would like to inquire about your services.",
      },
      site: "",
    },
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
    whyChooseUs3: {
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
  },
  cartPage: {
    title: "Your Shopping Cart",
    description: "Review your selected items and proceed to checkout.",
    enablePayment: false,
  },
  legal: {
    lastUpdated: "",
  },
  api: {
    baseUrl: "",
    apiVersion: "",
    website: {
      apiUrl: "",
      auth: {
        refresh: "",
        me: "",
        addresses: "",
        profile: "",
        logout: "",
        sendOtp: "",
        resendOtp: "",
        verifyOtp: "",
      },
      getCurrentUserProfile: "",
      product: {
        list: "",
        detail: "",
      },
      order: {
        create: "",
        verifyPayment: "",
        list: "",
      },
      cart: {
        get: "",
        addItem: "",
        updateItem: "",
        removeItem: "",
        clear: "",
        merge: "",
      },
      wishlist: {
        list: "",
        add: "",
        remove: "",
        merge: "",
      },
    },
    dashboard: {
      stats: "",
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
        logout: "",
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
      delete: "",
    },
    catalog: {
      product: {
        list: "/api/catalog/products.json",
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
    blob: {
      getUploadUrl: "",
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
