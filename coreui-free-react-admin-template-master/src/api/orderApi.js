import axiosClient from "./axiosClient";
// api/productApi.js
class OrderApi {
  getAll = () => {
    const url = "/api/order";
    return axiosClient.get(url);
  };
  confirmorder = (params) => {
    const url = `/api/order/${params.oid}`;
    return axiosClient.put(url, params.data);
  };
}
const orderApi = new OrderApi();
export default orderApi;
