import axiosClient from "./axiosClient";
// api/productApi.js
class CategoryApi {
  getAll = () => {
    const url = "/api/categories";
    return axiosClient.get(url);
  };
  createCate = (params) => {
    const url = "/api/categories";
    return axiosClient.post(url,params);
  };
  
}
const categoryApi = new CategoryApi();
export default categoryApi;
