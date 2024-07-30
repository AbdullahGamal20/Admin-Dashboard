import React, { useEffect, useState } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import ReactQuill from "react-quill";

import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brand/brandSlice";
import { getColors } from "../../features/color/colorSlice";
import { getProductCategories } from "../../features/prodCategory/prodCategorySlice";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import { createProduct, resetState } from "../../features/product/productSlice";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const addProdcutSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  color: yup
    .array()
    .min(1, "Select at least one color")
    .required("Color is required"),
  quantity: yup.number().required("Quantity is required"),
  tags: yup.string().required("Tag is Required"),
});

const initialValues = {
  title: "",
  description: "",
  price: "",
  brand: "",
  category: "",
  color: [],
  quantity: "",
  images: "",
  tags: "",
};

const AddProduct = () => {
  const [color, setColor] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
    dispatch(getBrands());
    dispatch(getProductCategories());
  }, []);

  const brandState = useSelector((state) => state.brands.brands);
  const categoryState = useSelector(
    (state) => state.prodCategory.prodCategories
  );

  const imgState = useSelector((state) => state.upload.images);
  const colorState = useSelector((state) => state.colors.colors);

  const colorOpt = colorState.map((i) => ({
    label: i.title,
    value: i._id,
  }));

  const handleColors = (value) => {
    setColor(value);
    formik.setFieldValue("color", value);
  };

  const img = imgState.map((i) => ({
    public_id: i.public_id,
    url: i.url,
  }));

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [img, color]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addProdcutSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/product-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              label="Enter Product Tile"
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

          <div>
            <CustomInput
              type="text"
              i_class="my-3"
              label="Enter Product Price"
              name="price"
              onCh={formik.handleChange("price")}
              onBl={formik.handleBlur("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price ? (
                <div>{formik.errors.price}</div>
              ) : null}
            </div>
          </div>
          <div>
            <select
              className="form-control  mb-3"
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
            >
              <option value="">Select Category </option>
              {categoryState?.map((item, index) => {
                return (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
              ) : null}
            </div>
          </div>

          <div>
            <select
              className="form-control  mb-3"
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              value={formik.values.tags}
            >
              <option value="" disabled>
                Select Tags
              </option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags ? (
                <div>{formik.errors.tags}</div>
              ) : null}
            </div>
          </div>

          <div className="my-3">
            <Select
              mode="multiple"
              allowClear
              className="w-100"
              placeholder="Select Colors"
              defaultValue={color}
              value={color}
              onChange={handleColors}
              options={colorOpt}
            />
            <div className="error">
              {formik.touched.color && formik.errors.color ? (
                <div>{formik.errors.color}</div>
              ) : null}
            </div>
          </div>

          <div>
            <select
              className="form-control  mb-3"
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
            >
              <option value="">Select Brand </option>
              {brandState?.map((item, index) => {
                return (
                  <option key={index} value={item.brand}>
                    {item.brand}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand ? (
                <div>{formik.errors.brand}</div>
              ) : null}
            </div>
          </div>

          <div>
            <CustomInput
              type="text"
              i_class="my-3"
              label="Enter Product Quantity"
              name="quantity"
              onCh={formik.handleChange("quantity")}
              onBl={formik.handleBlur("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity ? (
                <div>{formik.errors.quantity}</div>
              ) : null}
            </div>
          </div>

          <div
            className="bg-white p-5 text-center rounded-2 form-control"
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
            <div className="showImg   ">
              {Array.isArray(imgState)
                ? imgState?.map((i, index) => {
                    return (
                      <div className="w-25 position-relative" key={index}>
                        <button
                          onClick={() => dispatch(deleteImg(i.public_id))}
                          className="btn-close  btn_delete  position-absolute rounded-circle p-2"
                          style={{ top: "-15px", right: "-15px", zIndex: "50" }}
                        ></button>
                        <img
                          src={i.url}
                          alt="Image"
                          className="img-fluid w-100"
                          style={{ zIndex: "1" }}
                        />
                      </div>
                    );
                  })
                : []}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn mt-4">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
