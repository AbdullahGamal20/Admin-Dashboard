import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${baseUrl}blog/get-all-blogs`);
  return response.data;
};

const addBlog = async (data) => {
  const response = await axios.post(`${baseUrl}blog/create-blog`, data, config);
  return response.data;
};

const addBlogCategory = async (data) => {
  const response = await axios.post(
    `${baseUrl}blogcategory/create-category`,
    data,
    config
  );
  return response.data;
};

const updateBlog = async (blog) => {
  const data = {
    title: blog.blogData.title,
    category: blog.blogData.category,
    description: blog.blogData.description,
    image: blog.blogData.image,
  };
  const response = await axios.put(
    `${baseUrl}blog/update-blog/${blog.id}`,
    data,
    config
  );
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}blog/get-blog/${id}`, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(
    `${baseUrl}blog/delete-blog/${id}`,
    config
  );
  return response.data;
};

const blogService = {
  getBlogs,
  addBlog,
  addBlogCategory,
  getBlog,
  deleteBlog,
  updateBlog,
};

export default blogService;
