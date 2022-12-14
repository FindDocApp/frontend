import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/User";
// Components
import PatientMenu from "./PatientMenu";
import DoctorMenu from "./DoctorMenu";

const SideNavbar = ({ showMenu, setShowMenu, signOut, username }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  // A resize event listener is added to the dom
  // to handle screen width on screen resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });

    // remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", () =>
        setScreenWidth(window.innerWidth)
      );
    };
  }, [screenWidth]);

  return (
    <Wrapper
      style={{
        transform:
          screenWidth < 861
            ? `translateX(${showMenu ? "0%" : "-100%"})`
            : "none",
      }}
    >
      {/* CLOSE OVERLAY ( HIDES COMPONENT ON CLICK )  */}
      {/* FOR MOBILE SCREEN ONLY */}
      {screenWidth < 861 && showMenu && (
        <CloseOverlay onClick={() => setShowMenu(false)}></CloseOverlay>
      )}

      {/* NAVIGAION MENU */}
      <PagesList>
        {userInfo.role === "patient" ? (
          // Patient menu: Overview, Doctors, Bookings, Appointments, Profile
          <PatientMenu />
        ) : (
          // Doctor menu: Overview, Bookings, Appointments, Reviews, Profile
          <DoctorMenu />
        )}
      </PagesList>

      {/* FOOTER (FOR MOBILE) */}
      <footer className="username">
        {/* USERNAME */}
        <h3>{username}</h3>
        {/* SIGNOUT */}
        <p onClick={() => signOut()}>Sign out</p>
      </footer>
    </Wrapper>
  );
};

export default SideNavbar;

const Wrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  box-shadow: 0 5px 25px -10px #2525252e;
  z-index: 1;

  width: 275px;
  background-color: #fff;
  padding: 130px 2rem 2rem;
  display: flex;
  flex-direction: column;

  .username {
    display: none;
  }

  @media (max-width: 860px) {
    width: 200px;
    padding: 100px 1.5rem 1.5rem;
    box-shadow: 0 115px 25px -10px #2525252e;

    .username {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-top: 20px;

      h3 {
        font-size: 16px;
        line-height: 26px;
        padding-bottom: 0rem;
      }
      p {
        font-size: 14px;
        cursor: pointer;
        color: #2d59eb;
        font-weight: 600;
      }
    }
  }
`;

const CloseOverlay = styled.div`
  position: absolute;
  top: 72px;
  left: 100%;
  width: 100vw;
  height: 100vh;
  background-color: #0e1a4338;
`;

const PagesList = styled.ul`
  li {
    font-size: 18px;
    cursor: pointer;
    padding: 1rem 0;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: #2d59eb;
    }
  }
  .active {
    font-weight: 400;
    border: none;
    color: #fff;
    position: relative;

    &:hover {
      color: #fff;

      &::after {
        background-color: #2248c5;
      }
    }
    &::after {
      content: "";
      width: 115%;
      height: 100%;
      position: absolute;
      top: -4%;
      left: -17px;
      color: #fff;
      background-color: #2d59eb;
      z-index: -1;
      border-radius: 10px;
      transition: all 0.3s ease;
    }
  }

  @media (max-width: 860px) {
    li {
      font-size: 14px;
      padding: 0.75rem 0;
    }
    .active {
      &::after {
        width: 115%;
        top: -4%;
        left: -13px;
      }
    }
  }
`;
