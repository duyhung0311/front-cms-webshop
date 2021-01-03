import axiosClient from "./axiosClient";
class LoginApi {
  signinUser = (params) => {
    const url = "/api/users/login/admin";
    return axiosClient.post(url, params);
  };
}
const loginApi = new LoginApi();
export default loginApi;
