import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getColors = async () => {
  const response = await axios.get(`${baseUrl}color/get-all-color`);
  return response.data;
};

const createColor = async (data) => {
  const response = await axios.post(
    `${baseUrl}color/create-color`,
    data,
    config
  );
  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${baseUrl}color/update-color/${color.id}`,
    { title: color.colorData.title },
    config
  );
  return response.data;
};

const getColor = async (id) => {
  const response = await axios.get(`${baseUrl}color/get-color/${id}`, config);
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(
    `${baseUrl}color/delete-color/${id}`,
    config
  );
  return response.data;
};

const colorService = {
  getColors,
  createColor,
  deleteColor,
  getColor,
  updateColor,
};

export default colorService;
