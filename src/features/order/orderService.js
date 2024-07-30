import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getOrders = async () => {
  const response = await axios.get(`${baseUrl}user/getMyOrders`, config);
  return response.data;
};

const orderService = {
  getOrders,
};

export default orderService;
