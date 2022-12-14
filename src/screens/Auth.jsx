import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
// Pages
import Footer from "../components/Sections/Footer";
import TopNavbar from "../components/Nav/TopNavbar";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ChangePassword from "../components/Auth/ChangePassword";

const Auth = () => {
  return (
    <>
      {/* Header / Navigation */}
      {/* If auth=true the landing page navigation menu is hidden */}
      <TopNavbar auth={true} />

      {/* Auth Page */}
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/change-password/:id/:token"
            element={<ChangePassword />}
          />
        </Routes>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 120px 0;

  .page {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 600px;

    h1 {
      padding-bottom: 0.5rem;
    }
    .alt-buttons {
      color: #2d59eb;
      cursor: pointer;
      outline: none;
      border: none;
      background-color: transparent;
      margin-top: 0.5rem;
      text-align: left;
    }
    p {
      padding-bottom: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      padding: 1.75rem 2rem 2rem;
      background-color: #f5f5f5;
      border-radius: 15px;

      input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #000;
        font-size: 16px;
        outline: none;
        padding: 0.5rem;
        margin-bottom: 1.5rem;
      }
      button {
        font-size: 16px;
        margin-top: 0.5rem;
      }
      .img-input {
        border-bottom: none;
        padding: 0.5rem 0 0;
      }

      .select-role-input {
        display: flex;
        align-items: center;
        margin-top: 0.25rem;
        margin-bottom: 1.25rem;

        label {
          margin-right: 1.5rem;
          height: 22.5px;
        }
        input[type="radio"] {
          margin: 0;
          padding: 0;
          height: 20px;
          width: 20px;
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }

    .loader {
      position: absolute;
      width: 100%;
      bottom: -4rem;
      display: grid;
      place-items: center;
    }
  }

  @media (max-width: 769px) {
    padding: 0 1.5rem;

    .page {
      width: 100%;
      max-width: 500px;

      h1 {
        font-size: 24px;
        padding-bottom: 0.25rem;
      }
      .alt-buttons {
        margin-top: 0.5rem;
      }
      p {
        padding-bottom: 0.5rem;
      }
      form {
        padding: 1.25rem 1.5rem 1.5rem;
        border-radius: 15px;

        input {
          font-size: 12px;
          margin-bottom: 1.25rem;
        }
        button {
          font-size: 12px;
          margin-top: 0.25rem;
        }
        label {
          font-size: 12px;
        }
        .select-role-input {
          margin-bottom: 1rem;

          label {
            margin-right: 1rem;
            height: 15px;
          }
          input[type="radio"] {
            height: 15px;
            width: 15px;
            margin-right: 0.35rem;
          }
        }
      }
    }
  }
`;

export default Auth;
