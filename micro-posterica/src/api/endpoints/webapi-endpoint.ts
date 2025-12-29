import { GetEnvConfig } from "../../app.config";

/**
 * @deprecated This is depricated and will be removed in future versions.
 * Use the `GetEnvConfig` function to get the API base URL and construct endpoints as needed.
 * @returns 
 */
export const ApiEndpoint = () => {
  const serviceEndpoint = GetEnvConfig().api.baseUrl;

  return {
    baseApiUrl: serviceEndpoint,
    serviceEndpoint: serviceEndpoint,
    master: {
      frameTypes: `${serviceEndpoint}/master/frame-types`,
      glassTypes: `${serviceEndpoint}/master/glass-types`,
      miscCharges: `${serviceEndpoint}/master/misc-charges`,
    },
    profile: {
      posterica: `${serviceEndpoint}/profile/frame-types`,
    },
    order: {
      list: `${serviceEndpoint}/orders`,
    },
  };
};
