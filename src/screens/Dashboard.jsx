import React, { useEffect, useContext, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PubNubProvider } from "pubnub-react";
import { UserContext } from "../context/User";
import styled from "styled-components";
import { get } from "../utils/fetch";
import jwt from "jwt-decode";
import PubNub from "pubnub";
// Components
import Doctor from "../components/Dashboard/Doctor";
import Patient from "../components/Dashboard/Patient";
import TopNavbar from "../components/Dashboard/Nav/TopNavbar";

// Confirguring PubNub
// PubNub React docs: https://www.pubnub.com/docs/sdks/react
const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
  uuid: process.env.REACT_APP_PUBNUB_UNIQUE_ID,
});

const Dashboard = () => {
  const navigate = useNavigate();

  // Getting user info state getter and setter from user context
  const { userInfo, setUserInfo } = useContext(UserContext);

  // Check if user is authenticated
  const isAuthenticatedUser = useCallback(() => {
    const token = localStorage.getItem("token");

    // Redirect user to login page if token is not found in local storage
    if (userInfo.token === undefined && (!token || token === "undefined")) {
      navigate("/auth/login");
    }

    // Verifying JWT token
    try {
      jwt(token);
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      alert("Authenticated access only, please sign in.");
      return false;
    }
  }, [navigate, userInfo.token]);

  // Get user data from database
  const getUserData = useCallback(async () => {
    const id = userInfo.id || localStorage.getItem("id");

    if (!id || id === "undefined") {
      navigate("/auth/login");
    }

    if (userInfo.token === undefined) {
      // API get request
      // user id must be passed as a query in the post request url
      const data = await get(
        process.env.REACT_APP_API_HOST + "dashboard/user?id=" + id
      );

      // Handle response
      if (data.status === "error") {
        alert("Failed to get user data. Please login again.");
        navigate("/auth/login");
      }

      // Saving user data in user context
      setUserInfo(data.user);
    }
  }, [navigate, setUserInfo, userInfo.id, userInfo.token]);

  // Getting user data from database if user is authenticated
  // when the dashboard component is mounted on render
  useEffect(() => {
    if (!isAuthenticatedUser()) {
      navigate("/auth/login");
    }

    getUserData();
  }, [getUserData, isAuthenticatedUser, navigate, userInfo.token]);

  return (
    <PubNubProvider client={pubnub}>
      <Wrapper>
        <TopNavbar />
        <Routes>
          <Route path="/patient/*" element={<Patient />} />
          <Route path="/doctor/*" element={<Doctor />} />
        </Routes>
      </Wrapper>
    </PubNubProvider>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: #eceff5;
  z-index: 0;

  .pages-wrapper {
    width: 100%;
    padding: 140px 2.5rem 135px 310px;
    z-index: 1;
  }

  @media (max-width: 860px) {
    .pages-wrapper {
      padding: 115px 1.5rem;
    }
  }
`;
