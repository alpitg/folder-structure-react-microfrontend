export const ApiEndpoint = () => {
  const baseApiUrl = "http://localhost:3000/api"; // Default to local if not set
  // const serviceEndpoint = GetEnvConfig().microserviceUrl;
  const serviceEndpoint = "http://localhost:3000/api"; // Replace with actual service endpoint

  return {
    baseApiUrl: baseApiUrl,
    serviceEndpoint: serviceEndpoint,
    master: {
      frameTypes: `${serviceEndpoint}/master/frame-types`,
      glassTypes: `${serviceEndpoint}/master/glass-types`,
      miscCharges: `${serviceEndpoint}/master/misc-charges`,
    },
  };
};
