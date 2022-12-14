import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../../utils/fetch";
// Components
import SuccessMessage from "../Elements/SuccessMessage";
import { ProgressBar } from "react-loader-spinner";
import FullButton from "../Buttons/FullButton";
import Input from "./Input";

const defaultFormData = {
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  // Get id and token from query params
  const { id, token } = useParams();

  // Form input on change handler
  const handleInput = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Change password if passwords match
    changePassword();
  };

  // Update user password in database
  const changePassword = async () => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "auth/reset-password",
      {
        password: formData.password,
        id,
        token,
      }
    );

    // Reset states
    setLoading(false);
    setFormData(defaultFormData);

    // Handle response
    if (data.status === "ok") {
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Change Password</h1>
        {/* FORM */}
        <form onSubmit={handleFormSubmit}>
          <Input
            label="New password"
            type="password"
            value={formData.password}
            placeholder="example@email.com"
            onChange={(e) => handleInput(e, "password")}
            required={true}
          />
          <Input
            label="Confirm password"
            type="password"
            value={formData.confirmPassword}
            placeholder="********"
            onChange={(e) => handleInput(e, "confirmPassword")}
            required={true}
          />
          <FullButton title="Confirm" />
        </form>
        <button
          className="alt-buttons"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/auth/login")}
        >
          Back to login
        </button>

        {/* LOADER */}
        <div className="loader">
          <ProgressBar
            height="60"
            visible={loading}
            borderColor="#000"
            barColor="#2d59eb"
          />
        </div>
      </div>

      {/* SUCCESS MESSAGE CONTAINER */}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message="Password successfully changed"
        />
      )}
    </>
  );
};

export default ChangePassword;
