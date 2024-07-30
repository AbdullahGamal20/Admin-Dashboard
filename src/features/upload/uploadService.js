import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const uploadImg = async (data) => {
  const response = await axios.post(
    `${baseUrl}upload/upload-image`,
    data,
    config
  );
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${baseUrl}upload/delete-image/${id}`,
    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
