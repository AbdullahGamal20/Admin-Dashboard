import React, { useEffect } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetState } from "../../features/product/productSlice";
import {
  createCoupon,
  getCoupon,
  updateCoupon,
} from "../../features/coupon/couponSlice";

const addBrandSchema = yup.object({
  name: yup.string().required("Name is Required"),
  expiry: yup.string().required("Expiry Date is Required"),
  discount: yup.number().required("Quantity is required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const { couponName, couponExpiry, couponDiscount } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      const res = dispatch(getCoupon(getCouponId));
      res.then((response) => {
        if (response.payload) {
          formik.setFieldValue("name", response.payload.name);
          formik.setFieldValue(
            "expiry",
            changeDateFormat(response.payload.expiry)
          );
          formik.setFieldValue("discount", response.payload.discount);
        }
      });
    } else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  const initialValues = {
    name: couponName || "",
    expiry: changeDateFormat(couponExpiry) || "",
    discount: couponDiscount || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addBrandSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              i_class="py-2"
              label="Enter Coupon Name"
              name="name"
              onCh={formik.handleChange("name")}
              onBl={formik.handleBlur("name")}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
          <div>
            <CustomInput
              type="date"
              i_class="py-2"
              label="Enter Expiry Date"
              name="expiry"
              onCh={formik.handleChange("expiry")}
              onBl={formik.handleBlur("expiry")}
              val={formik.values.expiry}
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry ? (
                <div>{formik.errors.expiry}</div>
              ) : null}
            </div>
          </div>
          <div>
            <CustomInput
              type="number"
              i_class="py-2"
              label="Enter Discount "
              name="discount"
              onCh={formik.handleChange("discount")}
              onBl={formik.handleBlur("discount")}
              val={formik.values.discount}
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount ? (
                <div>{formik.errors.discount}</div>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn mt-4">
              {getCouponId !== undefined ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
