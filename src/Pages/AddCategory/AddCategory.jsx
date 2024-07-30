import React, { useEffect } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../features/prodCategory/prodCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { resetState } from "../../features/product/productSlice";

const addCategorySchema = yup.object({
  title: yup.string().required("Category is Required"),
});

const initialValues = {
  title: "",
};

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCatId = location.pathname.split("/")[3];

  const newCategory = useSelector((state) => state.prodCategory);
  const { categoryName } = newCategory;

  useEffect(() => {
    if (getCatId !== undefined) {
      const res = dispatch(getCategory(getCatId));
      formik.setFieldValue("title", categoryName);
    } else {
      dispatch(resetState());
    }
  }, [getCatId, categoryName]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addCategorySchema,
    onSubmit: (values) => {
      if (getCatId !== undefined) {
        const data = { id: getCatId, categoryData: values };
        dispatch(updateCategory(data));
      } else {
        dispatch(createCategory(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-category");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getCatId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              i_class="py-2"
              label="Enter Category"
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
              {getCatId !== undefined ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
