import React, { useState, useContext } from "react";
import { UserContext } from "../../context/User";
import { post } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
// Components
import { ProgressBar } from "react-loader-spinner";
import FullButton from "../Buttons/FullButton";
import SelectRole from "./SelectRole";
import Input from "./Input";

const defaultFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  // Getting user info state setter from user context
  const { setUserInfo } = useContext(UserContext);

  // Form input on change handler
  const handleInput = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validInput()) return;

    // login user if valid input
    loginIn();
  };

  const validInput = () => {
    const { email, password } = formData;

    if (role?.length === 0 || role === undefined) {
      alert("Please select your role");
      return false;
    }

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all the fields");
      return false;
    }

    return true;
  };

  const loginIn = async () => {
    setLoading(true);

    const { email, password } = formData;

    // API post request
    const data = await post(process.env.REACT_APP_API_HOST + "auth/sign-in", {
      role,
      email,
      password,
    });

    // Reset states
    setRole("");
    setLoading(false);
    setFormData(defaultFormData);

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
    <div className="page">
      <h1>Login</h1>

      {/* FORM */}
      <form onSubmit={handleFormSubmit}>
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
          label="Password"
          type="password"
          value={formData.password}
          placeholder="********"
          onChange={(e) => handleInput(e, "password")}
          required={true}
        />
        <FullButton title="Login" />
      </form>

      {/* ALT BUTTONS */}
      <button
        className="alt-buttons"
        style={{ marginTop: "1rem" }}
        onClick={() => navigate("/auth/forgot-password")}
      >
        Forgot your password?
      </button>
      <button
        className="alt-buttons"
        onClick={() => navigate("/auth/register")}
      >
        Don't have an account?
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
  );
};

export default Login;
