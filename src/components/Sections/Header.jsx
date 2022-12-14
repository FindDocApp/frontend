import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Assets
import Dots from "../../assets/svg/Dots";
import HeaderImage from "../../assets/img/header-img.jpg";
// Components
import FullButton from "../Buttons/FullButton";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      {/* ABOUT TEXT */}
      <LeftSide className="flexCenter">
        <div>
          <HeaderH1 className="extraBold font60">
            Get better connected to healthcare.
          </HeaderH1>
          <HeaderP className="font13 semiBold">
            <p>
              Find a doctor, make an appointment, and clear up any health
              concerns. We want people to be able to easily discover the right
              doctor and schedule an appointment.
            </p>
            <p>
              We also assist doctors in better managing their practices and
              developing their internet reputation.
            </p>
          </HeaderP>
          <BtnWrapper>
            <FullButton
              title="Get Started"
              action={() => navigate("/auth/register")}
            />
          </BtnWrapper>
        </div>
      </LeftSide>

      {/* IMAGE */}
      <RightSide>
        <ImageWrapper>
          <Img
            className="radius8"
            src={HeaderImage}
            alt="office"
            style={{ zIndex: 9 }}
          />
          <DotsWrapper><Dots />
          </DotsWrapper>
        </ImageWrapper>
        <GreyDiv className="lightBg"></GreyDiv>
      </RightSide>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 875px;
  @media (max-width: 860px) {
    flex-direction: column;
  }
  @media (max-width: 769px) {
    min-height: 675px;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 860px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 860px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderH1 = styled.h1`
  line-height: 4rem;
  @media (max-width: 859px) {
    line-height: 3.5rem;
  }
  @media (max-width: 500px) {
    line-height: 2.85rem;
    font-size: 38px;
    margin-bottom: 5px;
  }
  @media (max-width: 400px) {
    line-height: 2.3rem;
    font-size: 30px;
    margin-bottom: 5px;
  }
`;
const HeaderP = styled.div`
  line-height: 1.35rem;
  padding: 15px 0 25px;

  p:nth-child(1) {
    padding-bottom: 15px;
    max-width: 550px;
  }
  p:nth-child(2) {
    max-width: 400px;
  }
  @media (max-width: 860px) {
    text-align: center;
    padding: 10px 0 25px;

    p:nth-child(1) {
      margin: auto;
      max-width: 70%;
      padding-bottom: 10px;
    }
    p:nth-child(2) {
      margin: auto;
      max-width: 50%;
    }
  }
  @media (max-width: 560px) {
    padding: 5px 0 20px;

    p:nth-child(1) {
      padding-bottom: 5px;
      max-width: 90%;
    }
    p:nth-child(2) {
      max-width: 85%;
    }
  }
`;
const BtnWrapper = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 860px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 860px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  width: auto;
  height: 607px;
  @media (max-width: 1100px) {
    height: 550px;
  }
  @media (max-width: 960px) {
    height: 500px;
  }
  @media (max-width: 860px) {
    height: 450px;
  }
  @media (max-width: 450px) {
    height: 105vw;
  }
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 860px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;
