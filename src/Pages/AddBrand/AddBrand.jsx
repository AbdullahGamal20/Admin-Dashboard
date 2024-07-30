import React, { useEffect } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrand,
  getBrand,
  updateBrand,
} from "../../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { resetState } from "../../features/product/productSlice";

const addBrandSchema = yup.object({
  brand: yup.string().required("Brand Name is Required"),
});

const initialValues = {
  brand: "",
};

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brands);
  const { brandName } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      const res = dispatch(getBrand(getBrandId));
      formik.setFieldValue("brand", brandName);
    } else {
      dispatch(resetState());
    }
  }, [getBrandId, brandName]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addBrandSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
      } else {
        dispatch(addBrand(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-brand");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              i_class="py-2"
              label="Enter Brand"
              name="brand"
              onCh={formik.handleChange("brand")}
              onBl={formik.handleBlur("brand")}
              val={formik.values.brand}
            />
            <div className="error">
              {formik.touched.brand && formik.errors.brand ? (
                <div>{formik.errors.brand}</div>
              ) : null}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn mt-4">
              {getBrandId !== undefined ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
