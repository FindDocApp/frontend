import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/User";
import { useNavigate } from "react-router-dom";
// Assets
import LogoIcon from "../../../assets/svg/Logo";
import DefaultProfilePicture from "../../../assets/img/dashboard/profile-img.jpg";
// Components
import SideNavbar from "./SideNavbar";

const TopNavbar = () => {
  const navigate = useNavigate();

  // Get user info state and setter from user context
  const { setUserInfo, userInfo } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);

  // On sign out click
  const signOut = () => {
    // Clear data stored in local storage (token, id)
    localStorage.clear();
    // Reset user info
    setUserInfo({});
    // Go to home page
    navigate("/");
  };

  return (
    <Wrapper>
      {/* LOGO */}
      <Logo>
        <div onClick={() => navigate(`/dashboard/${userInfo.role}/overview`)}>
          <LogoIcon />
          <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
            FindDoc
          </h1>
        </div>
      </Logo>

      {/* TOP RIGHT USER DATA */}
      <User>
        {/* MENU BUTTON */}
        <div className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={showMenu ? faXmark : faBars} />
        </div>

        <div className="username">
          {/* USERNAME */}
          <h2>{userInfo.username}</h2>
          {/* SIGNOUT BUTTON */}
          <p onClick={() => signOut()}>Sign out</p>
        </div>

        {/* USER PROFILE IMAGE */}
        <div className="image">
          <img
            src={
              userInfo.profileImage
                ? userInfo.profileImage
                : DefaultProfilePicture
            }
            alt=""
          />
        </div>
      </User>

      {/* SIDE NAVIGATION MENU */}
      <SideNavbar
        username={userInfo.username}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        signOut={signOut}
      />
    </Wrapper>
  );
};

export default TopNavbar;

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1;

  @media (max-width: 860px) {
    box-shadow: 0 5px 25px -10px #2525252e;
    background-color: #fff;
  }
`;

const Logo = styled.div`
  width: 275px;
  background-color: #fff;
  padding: 2rem;
  z-index: 2;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  @media (max-width: 860px) {
    width: auto;
    background-color: transparent;
    padding: 1rem 1.5rem;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1.25rem;
  margin: 0rem 0.75rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px -10px #2525252e;
  z-index: 2;

  .menu-btn {
    display: none;
  }
  .username {
    padding-right: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    h2 {
      font-size: 20px;
      line-height: 0;
      padding: 0.6rem 0 1.5rem;
    }
    p {
      cursor: pointer;
      line-height: 0;
      font-weight: 600;
      color: #2d59eb;
      transition: all 0.1s ease;

      &:hover {
        color: #2248c5;
      }
    }
  }
  .image {
    width: 60px;
    min-width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 860px) {
    justify-content: flex-end;
    padding: 0;
    margin: 0rem 1.5rem;
    background-color: transparent;
    min-width: 80px;
    box-shadow: none;

    .menu-btn {
      cursor: pointer;
      display: grid;
      place-items: center;
      margin: 0 1rem;

      svg {
        font-size: 19px;
      }
    }
    .username {
      display: none;
    }
    .image {
      min-width: 50px;
      width: 50px;
      height: 50px;
    }
  }
`;
