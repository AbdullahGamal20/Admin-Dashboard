import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${baseUrl}product/get-all-products`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(
    `${baseUrl}product/create-product`,
    product,
    config
  );
  return response.data;
};
const productServices = {
  getProducts,
  createProduct,
};

export default productServices;
