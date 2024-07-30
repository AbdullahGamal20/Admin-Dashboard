import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${baseUrl}category/get-all-category`);
  return response.data;
};

const createCategory = async (data) => {
  const response = await axios.post(
    `${baseUrl}category/create-category`,
    data,
    config
  );
  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(
    `${baseUrl}category/get-category/${id}`,
    config
  );
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axios.put(
    `${baseUrl}category/update-category/${category.id}`,
    { title: category.categoryData.title },
    config
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${baseUrl}category/delete-category/${id}`,
    config
  );
  return response.data;
};

const prodCategoryService = {
  getProductCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default prodCategoryService;
