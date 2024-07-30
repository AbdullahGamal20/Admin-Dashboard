import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getCoupons = async () => {
  const response = await axios.get(`${baseUrl}coupon/get-all-coupons`, config);
  return response.data;
};

const createCoupon = async (data) => {
  const response = await axios.post(
    `${baseUrl}coupon/create-coupon`,
    data,
    config
  );
  return response.data;
};

const updateCoupon = async (coupon) => {
  const data = {
    name: coupon.couponData.name,
    expiry: coupon.couponData.expiry,
    discount: coupon.couponData.discount,
  };

  const response = await axios.put(
    `${baseUrl}coupon/update-coupon/${coupon.id}`,
    data,
    config
  );
  return response.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(`${baseUrl}coupon/get-coupon/${id}`, config);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(
    `${baseUrl}coupon/delete-coupon/${id}`,
    config
  );
  return response.data;
};

const couponService = {
  createCoupon,
  getCoupons,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};

export default couponService;
