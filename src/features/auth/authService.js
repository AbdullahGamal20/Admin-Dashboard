import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${baseUrl}user/getMonthWiseOrderIncome`,
    config
  );
  return response.data;
};

const getYearlyStates = async () => {
  const response = await axios.get(`${baseUrl}user/get-yearly-orders`, config);

  return response.data;
};

const authService = {
  login,
  getMonthlyOrders,
  getYearlyStates,
};

export default authService;
