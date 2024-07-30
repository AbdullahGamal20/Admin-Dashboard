import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBrands = async () => {
  const response = await axios.get(`${baseUrl}brand/get-all-brand`);
  return response.data;
};

const addBrand = async (data) => {
  const response = await axios.post(
    `${baseUrl}brand/create-brand`,
    data,
    config
  );
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${baseUrl}brand/update-brand/${brand.id}`,
    { brand: brand.brandData.brand },
    config
  );
  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${baseUrl}brand/get-brand/${id}`, config);
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(
    `${baseUrl}brand/delete-brand/${id}`,
    config
  );
  return response.data;
};

const brandServices = {
  getBrands,
  addBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandServices;
