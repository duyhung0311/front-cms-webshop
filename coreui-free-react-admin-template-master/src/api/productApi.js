import axiosClient from "./axiosClient";
// api/productApi.js
const config = { headers: { "Content-Type": "multipart/form-data" } };
class ProductApi {
  getAll = () => {
    const url = "/api/products";
    return axiosClient.get(url);
  };
  createPro = (params) => {
    const url = "/api/productss";
    return axiosClient.post(url, params);
  };
}
const productApi = new ProductApi();
export default productApi;
