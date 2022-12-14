import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/fetch";
// Components
import Input from "./Input";
import FullButton from "../Buttons/FullButton";
import { ProgressBar } from "react-loader-spinner";
import SuccessMessage from "../Elements/SuccessMessage";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("Please fill in your email");
      return;
    }

    sendResetLink();
  };

  // Send password reset link to user if email is registered
  const sendResetLink = async () => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "auth/password-reset-link",
      { email }
    );

    // Reset states
    setEmail("");
    setLoading(false);

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
        <h1>Forgot Password</h1>
        <p>
          If an account linked to your email is found, a reset link will be sent
          to your email.
        </p>
        {/* FORM */}
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <FullButton title="Get Password Reset Link" />
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
          message="Password reset link successfully sent to your email."
        />
      )}
    </>
  );
};

export default ForgotPassword;
