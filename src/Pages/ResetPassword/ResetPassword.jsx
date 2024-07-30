import React from "react";
import "./resetPassword.css";
import CustomInput from "../../Components/CustomInput/CustomInput";

function ResetPassword() {
  return (
    <div
      className="login  d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "#0b084a",
      }}
    >
      <div className="bg-white rounded-3 p-4 login_box">
        <h3 className="text-center my-3 title">Reset Password</h3>
        <p className="text-center my-3">Please Enter your new password </p>
        <form action="">
          <div className="my-4">
            <CustomInput type="password" label="New Password" id="pass" />
          </div>
          <div className="my-4">
            <CustomInput
              type="password"
              label="Confirm Password"
              id="confirmpass"
            />
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
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
