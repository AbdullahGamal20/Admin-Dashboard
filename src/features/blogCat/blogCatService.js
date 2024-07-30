import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBlogCat = async () => {
  const response = await axios.get(`${baseUrl}blogcategory/get-all-category`);
  return response.data;
};

const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(
    `${baseUrl}blogcategory/update-category/${blogCategory.id}`,
    { title: blogCategory.data.title },
    config
  );
  return response.data;
};

const getOneBlogCategory = async (id) => {
  const response = await axios.get(
    `${baseUrl}blogcategory/get-category/${id}`,
    config
  );
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${baseUrl}blogcategory/delete-category/${id}`,
    config
  );
  return response.data;
};

const blogCategoryService = {
  getBlogCat,
  deleteBlogCategory,
  updateBlogCategory,
  getOneBlogCategory,
};

export default blogCategoryService;
