import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { getImageUrlFromCloudinary } from "../../../utils/cloudinary";
import { UserContext } from "../../../context/User";
import { post } from "../../../utils/fetch";
import emailjs from "@emailjs/browser";
// Assets
import Img from "../../../assets/img/dashboard/profile-img.jpg";
// Components
import SuccessMessage from "../../Elements/SuccessMessage";
import ProfilePicture from "./ProfilePicture";
import ConfirmUpdate from "./ConfirmUpdate";
import Loader from "../../Elements/Loader";
import Button from "../../Buttons/Button";
import Input from "./Input";

const defaultInput = {
  username: "",
  speciality: "",
};

const Profile = () => {
  const formRef = useRef();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [ShowConfirmUpdate, setShowConfirmUpdate] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [input, setInput] = useState(defaultInput);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [imageSrc, setImageSrc] = useState(Img);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");

  // Get user info state and setter from user context
  const { userInfo, setUserInfo } = useContext(UserContext);

  // Input fields handler
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Displays profile update confirmation tab
  const handleUpdate = (e) => {
    e.preventDefault();
    setPassword('')
    setShowConfirmUpdate(true);
  };

  // Update user handler
  // This function is called after update confirmation
  const updateUser = async () => {
    if (password.trim().length === 0) {
      alert("Please enter your password");
      return;
    }

    setLoading(true);

    // Updated user info object
    let newInfo = {
      id: input._id,
      username: input.username,
      speciality: input.speciality,
      confirmPassword: password,
    };

    // Get image url from cloudinary if image is updated
    if (typeof(imageFile) === "object" && imageFile !== null) {
      newInfo.profileImage = await getImageUrlFromCloudinary(imageFile);
    }

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/update-user",
      newInfo
    );

    // Reset state
    setLoading(false);
    setShowConfirmUpdate(false);
    setImageFile(null); // Reset image file state

    // Handle API response
    if (data.status === "ok") {
      setSuccessMessage("Profile successfully updated");
      setShowSuccessMessage(true);
      setUserInfo(data.user); // Store updatedd user data
    } else {
      alert(data.error);
    }

    // Refresh profile page
    setRefresh(!refresh);
  };

  // Sends password reset link to user
  const getPasswordResetLink = async () => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "auth/password-reset-link",
      { email: userInfo.email }
    );

    // Handle API response
    if (data.status === "ok") {
      setLink(data.link)
    } else {
      alert(data.error);
    }
  };

  const handleSentMessageResponse = (status, text) => {
    if (status === 200) {
      setSuccessMessage("A password reset link has been sent to your email.");
      setShowSuccessMessage(true);
    } else {
      console.log(text);
      alert("Failed to send password reset link, please try again later");
    }
    
    // Reset loader state
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

  // Runs everytime a new image is selected
  useEffect(() => {
    // Create an object url of the uploaded image to display image preview
    if (imageFile) {
      setImageSrc(URL.createObjectURL(imageFile));

      return () => URL.revokeObjectURL(imageFile);
    } else {
      setImageSrc(userInfo.profileImage || Img); // Use current image if no new image selected
    }
  }, [imageFile, userInfo.profileImage]);

  // Set default input values on component mount or refresh
  useEffect(() => {
    if (userInfo.password) {
      let updatedInput = userInfo;
      setInput(updatedInput);
    }
  }, [userInfo, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Profile</h1>

        <Container onSubmit={handleUpdate} ref={formRef}>
          {/* PROFILE IMAGE */}
          <label>Profile picture</label>
          <ProfilePicture imageSrc={imageSrc} setImageFile={setImageFile} />

          {/* USERNAME */}
          <Input
            label="Username"
            type="text"
            value={input.username}
            onChange={(e) => handleInput(e)}
          />

          {/* SPECIALITY (FOR DOCTORS) */}
          {userInfo.role === "doctor" && (
            <Input
              label="Speciality"
              type="text"
              value={input.speciality}
              onChange={(e) => handleInput(e)}
            />
          )}

          {/* BELOW FIELDS ARE HIDDEN AND ARE USED IN EMAILS TO SEND PASSWORD RESET LINK */}
          <input
            type="text"
            name="email"
            hidden={true}
            value={userInfo.email}
            onChange={() => {}}
          />
          <input
            type="text"
            name="link"
            hidden={true}
            value={link}
            onChange={() => {}}
          />

          {/* PASSWORD RESET LINK */}
          <p className="password-reset" onClick={getPasswordResetLink}>
            Get password reset link
          </p>

          {/* UPDATE BUTTON */}
          <Button text="Update" type="primary" />

          {/* LOADER */}
          <Loader visible={loading} />
        </Container>
      </Wrapper>

      {/* CONFIRM UPDATE PROFILE CONTAINER */}
      {ShowConfirmUpdate && (
        <ConfirmUpdate
          setShow={setShowConfirmUpdate}
          updateUser={updateUser}
          setPassword={setPassword}
          password={password}
        />
      )}

      {/* SUCCESS MESSAGE CONTAINER */}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message={successMessage}
        />
      )}
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  h1 {
    text-align: center;
    font-size: 24px;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 18px;
    }
  }
`;

const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem 0.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  label {
    font-weight: 600;
  }
  input {
    background-color: #eceff5;
    border: none;
    outline: none;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 1.25rem;
  }
  button {
    align-self: flex-end;
    margin: 0.25rem 0 1rem;
  }
  .password-reset {
    cursor: pointer;
    font-weight: 600;
    color: #2d59eb;
    transition: all 0.25s ease;

    &:hover {
      color: #2248c5;
    }
  }
  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    label,
    .no-results,
    .password-reset {
      font-size: 12px;
    }
    input {
      font-size: 12px;
      padding: 0.6rem 1rem;
      margin-bottom: 1rem;
    }
    button {
      margin: 0.25rem 0 0.25rem;
    }
  }
`;
