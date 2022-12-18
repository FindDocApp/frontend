import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/User";
import { post } from "../../utils/fetch";
// Components
import SuccessMessage from "../Elements/SuccessMessage";
import { ProgressBar } from "react-loader-spinner";
import Input from "../Dashboard/Profile/Input";
import Button from "../Buttons/Button";

const AddSpeciality = ({ setShow }) => {
  // Getting user info state getter and setter from user context
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [loading, setLoading] = useState(false);

  const addSpeciality = async () => {
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/add-speciality",
      {
        speciality,
        doctor_id: userInfo._id,
      }
    );

    // Reset states
    setSpeciality("");
    setLoading(false);

    // Handle response
    if (data.status === "ok") {
      // Add speciality to user data
      let newUserInfo = userInfo;
      newUserInfo.speciality = data.speciality;

      // Save user data in user context
      setUserInfo(newUserInfo);

      setShowSuccessMessage(true);
      // Remove component and success message from DOM (hide)
      setTimeout(() => setShow(false), 2000);
    } else {
      alert(data.error);

      // Close tab if speciality is already added
      if (data.status === "continue") {
        setShow(false);
      }
    }
  };

  return (
    <>
      <Wrapper>
        {/* ADD SPECIALITY CONTAINER */}
        <Container>
          <h2>Welcome, {userInfo.username}. One last step to get started!</h2>
          <p>This helps patients find the doctor best fit for their needs.</p>
          <Input
            label="What is your speciality? (required)"
            type="text"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required={true}
          />
          <Button
            text="Continue"
            type="primary"
            action={addSpeciality}
            disabled
          />

          {/* LOADER */}
          <Loader>
            <ProgressBar
              height="60"
              visible={loading}
              borderColor="#000"
              barColor="#2d59eb"
            />
          </Loader>
        </Container>
      </Wrapper>

      {/* SUCCESS MESSAGE CONTAINER */}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message="Speciality added successfully"
        />
      )}
    </>
  );
};

export default AddSpeciality;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0b15361f;
  display: grid;
  place-items: center;
  padding: 0 1.5rem;
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  width: 600px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;

  h2 {
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 24px;
    margin-bottom: 0.5rem;
  }
  label {
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 0.25rem;
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
    margin: 0.25rem 0;
  }

  @media (max-width: 860px) {
    width: 100%;
    max-width: 435px;
    padding: 1rem 1.25rem;

    h2 {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0.25rem;
    }
    p {
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 0.1rem;
    }
    label {
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

const Loader = styled.div`
  position: absolute;
  bottom: -4.5rem;
  left: 44%;

  @media (max-width: 860px) {
    bottom: -4rem;
    left: 41%;
  }
  @media (max-width: 460px) {
    left: 39%;
  }
`;
