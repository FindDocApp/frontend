import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getImageUrlFromCloudinary } from "../../utils/cloudinary";
import { UserContext } from "../../context/User";
import { post } from "../../utils/fetch";
// Components
import { ProgressBar } from "react-loader-spinner";
import FullButton from "../Buttons/FullButton";
import SelectRole from "./SelectRole";
import Input from "./Input";

const defaultFormData = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [imageFile, setImageFile] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  // Getting user info state setter from user context
  const { setUserInfo } = useContext(UserContext);

  // Form input on change handler
  const handleInput = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // An object url of the uploaded image must be created to 
  // display image preview everytime an image file is uploaded
  useEffect(() => {
    if (imageFile) {
      setImageSrc(URL.createObjectURL(imageFile));

      return () => URL.revokeObjectURL(imageFile);
    } else {
      setImageSrc(null);
    }
  }, [imageFile]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validInput()) return;

    // Register user if valid input
    registerUser();
  };

  const validInput = () => {
    const { email, username, password, confirmPassword } = formData;

    if (role?.length === 0 || role === undefined) {
      alert("Please select your role");
      return false;
    }

    if (
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill in all the fields");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const registerUser = async () => {
    setLoading(true);

    const { email, username, password } = formData;

    // Get profile image url from cloudinary if uploaded
    const profileImage = imageFile
      ? await getImageUrlFromCloudinary(imageFile)
      : null;

    // API post request
    const data = await post(process.env.REACT_APP_API_HOST + "auth/register", {
      role,
      email,
      username,
      password,
      profileImage,
    });

    // Reset states
    setFormData(defaultFormData);
    setImageFile(null);
    setImageSrc(null);
    setLoading(false);
    setRole("");

    // Handle API response
    if (data.status === "ok") {
      // Add token to user data
      let userInfo = data.user;
      userInfo.token = data.token;

      // Save user data in user context
      setUserInfo(userInfo);

      // Redirect user to dashboard
      navigate(`/dashboard/${role}/overview`);
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Register</h1>
        {/* FORM */}
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Profile Image"
            type="file"
            required={false}
            className="img-input"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {/* PREVIEW IMAGE IF UPLOADED */}
          {imageSrc && <ImagePreview src={imageSrc} alt="" />}
          <SelectRole role={role} setRole={setRole} />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            placeholder="example@email.com"
            onChange={(e) => handleInput(e, "email")}
            required={true}
          />
          <Input
            label="Username"
            type="text"
            value={formData.username}
            placeholder="Rosabel"
            onChange={(e) => handleInput(e, "username")}
            required={true}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            placeholder="********"
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
          <FullButton title="Create Account" />
        </form>
        <button
          className="alt-buttons"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/auth/login")}
        >
          Already have an account?
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
    </>
  );
};

export default Register;

const ImagePreview = styled.img`
  max-width: 150px;
  min-width: 150px;
  object-fit: cover;
  height: 150px;
  margin-bottom: 1.25rem;
  border-radius: 50%;
`;
