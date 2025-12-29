// import { ApiEndpoint } from "../../endpoints/webapi-endpoint";
// import { axiosInstance } from "../../axios-instance/axios";

export default class ProfileService {
  static fetch = () => {
    const data = fetch(`/api/posterica.json`).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }); // for debugging
    return { data: data };

    // return axiosInstance.get(ApiEndpoint().profile.posterica);
  };
}
