import React, { useEffect, useState } from "react";
import "./addBlog.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "../../features/blogCat/blogCatSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { addBlog, getBlog, updateBlog } from "../../features/blog/blogSlice";
import { resetState } from "../../features/product/productSlice";

const addBlogSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBlogId]);

  const blogCatState = useSelector((state) => state.blogCat.blogCats);
  const imgState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blogs);

  useEffect(() => {
    setImages(imgState.map((i) => ({ public_id: i.public_id, url: i.url })));
  }, [imgState]);

  const { blogName, blogCategory, blogDescription, blogImg } = newBlog;

  const initialValues = {
    title: blogName || "",
    description: blogDescription || "",
    category: blogCategory || "",
    images: blogImg || [],
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: addBlogSchema,
    onSubmit: (values) => {
      values.images = images; // Assign images to form values
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
      } else {
        dispatch(addBlog(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 2000);
    },
  });

  useEffect(() => {
    formik.setFieldValue("images", images);
  }, [images]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <CustomInput
              type="text"
              label="Enter Blog Title "
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </div>
          </div>

          <div>
            <select
              className="form-control mb-3"
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
            >
              <option value="">Select Blog Category </option>
              {blogCatState?.length > 0 &&
                blogCatState?.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
              ) : null}
            </div>
          </div>

          <div>
            <ReactQuill
              className="bg-white"
              theme="snow"
              name="description"
              onChange={(value) => formik.setFieldValue("description", value)}
              onBlur={() => formik.setFieldTouched("description", true)}
              value={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>
          </div>

          <div
            className="bg-white p-5 text-center rounded-2 form-control mt-3"
            style={{ border: "1px solid #ededed", cursor: "pointer" }}
          >
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} name="image" />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="showImg">
              {imgState?.length > 0 &&
                imgState?.map((i, index) => (
                  <div className="w-25 position-relative" key={index}>
                    <button
                      onClick={() => dispatch(deleteImg(i.public_id))}
                      className="btn-close btn_delete position-absolute rounded-circle p-2"
                      style={{ top: "-15px", right: "-15px", zIndex: "50" }}
                    ></button>
                    <img
                      src={i.url}
                      alt="Image"
                      className="img-fluid w-100"
                      style={{ zIndex: "1" }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn my-5">
              {getBlogId !== undefined ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
