import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/fetch";
import emailjs from "@emailjs/browser";
// Components
import Input from "./Input";
import FullButton from "../Buttons/FullButton";
import { ProgressBar } from "react-loader-spinner";
import SuccessMessage from "../Elements/SuccessMessage";
import { useEffect } from "react";

const ForgotPassword = () => {
  const formRef = useRef();

  const navigate = useNavigate();

  const [link, setLink] = useState("");
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

    // Handle response
    if (data.status === "ok") {
      setLink(data.link);
    } else {
      alert(data.error);
    }

    // Reset states
    setLink("");
    setEmail("");
    setLoading(false);
  };

  // Sends password reset link to user after receiving the link from server
  useEffect(() => {
    if (link !== "") {
      // Send email
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_PASSWORD_LINK_TEMPLATE_ID,
          formRef.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => handleSentMessageResponse(result.status, result.text),
          (error) => handleSentMessageResponse(error.status, error.text)
        );
    }
  }, [link]);

  const handleSentMessageResponse = (status, text) => {
    if (status === 200) {
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      console.log(text);
      alert("Failed to send password reset link, please try again later");
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
        <form onSubmit={handleFormSubmit} ref={formRef}>
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <input
            type="text"
            name="link"
            hidden={true}
            value={link}
            onChange={() => {}}
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
