import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import CloseIcon from "../../assets/svg/CloseIcon";

export default function Sidebar({ sidebarOpen, toggleSidebar, auth }) {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(`/auth/${page}`);
    toggleSidebar(!sidebarOpen);
  };

  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      {/* HEADER */}
      <SidebarHeader className="flexSpaceCenter">
        {/* LOGO */}
        <div onClick={() => navigate("/")} className="pointer flexNullCenter">
          <LogoIcon />
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            fanatic
          </h1>
        </div>
        {/* CLOSE-ON-CLICK OVERLAY */}
        <CloseBtn
          onClick={() => toggleSidebar(!sidebarOpen)}
          className="animate pointer"
        >
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      {/* NAV MENU */}
      <UlStyle className="flexNullCenter flexColumn">
        {/* SHOW HOME PAGE SECTIONS MENU ONLY IF auth=true */}
        {!auth && (
          <>
          {/* HOME PAGE SECTIONS NAV MENU */}
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                style={{ padding: "10px 15px 7.5px" }}
                to="home"
                spy={true}
                smooth={true}
                offset={-60}
              >
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                style={{ padding: "10px 15px 7.5px" }}
                to="service"
                spy={true}
                smooth={true}
                offset={-60}
              >
                Service
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                style={{ padding: "10px 15px 7.5px" }}
                to="doctors"
                spy={true}
                smooth={true}
                offset={-60}
              >
                Doctors
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                style={{ padding: "10px 15px 7.5px" }}
                to="contact"
                spy={true}
                smooth={true}
                offset={-60}
              >
                Contact
              </Link>
            </li>
          </>
        )}
        {/* AUTH PAGES NAV MENU */}
        <li
          className="semiBold font15 pointer"
          onClick={() => handleNavigation("login")}
        >
          <p className="whiteColor">Log in</p>
        </li>
        <li
          className="semiBold font15 pointer flexCenter"
          onClick={() => handleNavigation("register")}
        >
          <p className=" lightBg">Register</p>
        </li>
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-100vw")};
  z-index: 9999;
  @media (max-width: 400px) {
    // width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
  p {
    border-radius: 10px;
    padding: 0.5rem 1.2rem;
    transition: all 0.3s ease;

    &:hover {
      color: #2d59eb;
    }
  }
`;
