import React, { useEffect } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createColor,
  getColor,
  updateColor,
} from "../../features/color/colorSlice";
import { resetState } from "../../features/product/productSlice";

const addBrandSchema = yup.object({
  title: yup.string().required("Color is Required"),
});

const initialValues = {
  title: "",
};

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.colors);
  const { colorName } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      const res = dispatch(getColor(getColorId));
      formik.values.title = colorName;
    } else {
      dispatch(resetState());
    }
  }, [getColorId, colorName]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addBrandSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const color = { id: getColorId, colorData: values };
        dispatch(updateColor(color));
      } else {
        dispatch(createColor(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-color");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="color"
              i_class="py-3"
              label="Enter Color"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn mt-4">
              {getColorId !== undefined ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
