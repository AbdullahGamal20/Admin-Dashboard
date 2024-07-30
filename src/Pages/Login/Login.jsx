import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "./login.css";
import { login } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")

      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user]);

  return (
    <div
      className="login  d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "#0b084a",
      }}
    >
      <div className="bg-white rounded-3 p-4 login_box">
        <h3 className="text-center my-3 title">Login</h3>
        <p className="text-center my-3">Login to your account to continue. </p>
        <div className="text-center error">
          {message == "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-4">
            <CustomInput
              type="text"
              label="Email Address"
              id="email"
              name="email"
              val={formik.values.email}
              onCh={formik.handleChange("email")}
              onBl={formik.handleBlur}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="my-4">
            <CustomInput
              type="password"
              label="Password"
              id="password"
              name="password"
              val={formik.values.password}
              onCh={formik.handleChange("password")}
              onBl={formik.handleBlur}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <div className="text-center my-3">
            <button
              className="text-white text-uppercase  fw-bold w-50 border-0 px-3 py-2 rounded-2 text-center"
              style={{
                background: "#0b084a",
                letterSpacing: "1px",
              }}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
