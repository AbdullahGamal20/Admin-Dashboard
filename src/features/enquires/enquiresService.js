import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getEnqueries = async () => {
  const response = await axios.get(`${baseUrl}enquiry/get-all-enquiry`);
  return response.data;
};

const deleteEnquery = async (id) => {
  const response = await axios.delete(
    `${baseUrl}enquiry/delete-enquiry/${id}`,
    config
  );
  return response.data;
};

const enqueriesService = {
  getEnqueries,
  deleteEnquery,
};

export default enqueriesService;
