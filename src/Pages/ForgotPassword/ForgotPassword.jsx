import React from "react";
import "./forgotPassword.css";
import CustomInput from "../../Components/CustomInput/CustomInput";

function ForgotPassword() {
  return (
    <div
      className="login  d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "#0b084a",
      }}
    >
      <div className="bg-white rounded-3 p-4 login_box">
        <h3 className="text-center my-3 title">Forgot Password</h3>
        <p className="text-center my-3">
          Please Enter Your Register email to get reset Password mail.{" "}
        </p>
        <form action="">
          <div className="my-4">
            <CustomInput type="text" label="Email Address" id="email" />
          </div>

          <div className="text-center my-3">
            <button
              className="text-white fw-bold w-50 border-0 px-3 text-uppercase py-2 rounded-2 text-center"
              style={{
                background: "#0b084a",
                letterSpacing: "1px",
              }}
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
