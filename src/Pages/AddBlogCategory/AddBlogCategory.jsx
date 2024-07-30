import React, { useEffect } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addBlogCategory } from "../../features/blog/blogSlice";
import {
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../../features/blogCat/blogCatSlice";

const addBrandSchema = yup.object({
  title: yup.string().required("Category is Required"),
});

const initialValues = {
  title: "",
};

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCat = useSelector((state) => state.blogCat);
  const { blogCategoryName } = newBlogCat;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      const res = dispatch(getBlogCategory(getBlogCatId));
      formik.setFieldValue("title", blogCategoryName);
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId, blogCategoryName]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addBrandSchema,
    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, data: values };
        dispatch(updateBlogCategory(data));
      } else {
        dispatch(addBlogCategory(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              label="Enter Blog Category"
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
              {getBlogCatId !== undefined ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
