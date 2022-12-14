import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
// Assets
import AddImage1 from "../../assets/img/service/1.jpg";
import AddImage2 from "../../assets/img/service/2.jpg";
import AddImage3 from "../../assets/img/service/3.jpg";
import AddImage4 from "../../assets/img/service/4.jpg";
// Components
import ServiceBox from "../Elements/ServiceBox";
import FullButton from "../Buttons/FullButton";

export default function Service() {
  const navigate = useNavigate();

  return (
    <Wrapper id="service">
      {/* HOW FINDDOC WORKS */}
      <div className="container">
        <HeaderInfo>
          <h1 className="font40 extraBold">How FindDoc works?</h1>
        </HeaderInfo>
        <ServiceBoxRow className="flex">
          <ServiceBoxWrapper>
            <ServiceBox
              step={1}
              title="Register"
              subtitle="To get started, click 'Register' in the navigation bar and fill in the required fields."
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              step={2}
              title="Find a Doctor"
              subtitle="Begin your search for the ideal doctor for your requirements."
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              step={3}
              title="Book an Appointment"
              subtitle="Select a day and time for your appointment and then click 'Book Appointment.'"
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              step={4}
              title="Join Live Consultation"
              subtitle="Once your appointment has been set, join the live chat consultation on the appointed day."
            />
          </ServiceBoxWrapper>
        </ServiceBoxRow>
      </div>

      {/* FINDDOC MISSION */}
      <div className="lightBg">
        <div className="container">
          <Advertising className="flexSpaceCenter">
            {/* INFO */}
            <AddLeft>
              <h4 className="font15 semiBold blueColor">Our mission</h4>
              <h2 className="font40 extraBold">
                Simplifying healthcare needs.
              </h2>
              <p className="font12">
                Our goal is to make access to high-quality care simple, friendly
                and transparent for consumers. We are building a world where we
                can all access healthcare that is convenient and affordable.
              </p>
              <ButtonsRow className="flexNullCenter">
                <div>
                  <FullButton
                    title="Get Started"
                    action={() => navigate("/auth/register")}
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Link to="contact" spy={true} smooth={true}>
                    <FullButton title="Get in Touch" border />
                  </Link>
                </div>
              </ButtonsRow>
            </AddLeft>

            {/* SIDE IMAGES */}
            <AddRight>
              <AddRightInner>
                <div className="flexNullCenter">
                  <AddImgWrapp1 className="flexCenter">
                    <img src={AddImage1} alt="office" />
                  </AddImgWrapp1>
                  <AddImgWrapp2>
                    <img src={AddImage2} alt="office" />
                  </AddImgWrapp2>
                </div>
                <div className="flexNullCenter">
                  <AddImgWrapp3>
                    <img src={AddImage3} alt="office" />
                  </AddImgWrapp3>
                  <AddImgWrapp4>
                    <img src={AddImage4} alt="office" />
                  </AddImgWrapp4>
                </div>
              </AddRightInner>
            </AddRight>
          </Advertising>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 60px 0;
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 1010px) {
    flex-wrap: wrap;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding-top: 10px;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 22.75%;
  margin-right: 2.25%;
  padding: 60px 0;
  @media (max-width: 1010px) {
    width: 47.25%;

    &:nth-child(1),
    :nth-child(2) {
      padding: 60px 0 20px;
    }
  }
  @media (max-width: 860px) {
    &:nth-child(1),
    :nth-child(2) {
      padding: 40px 0 20px;
    }
    width: 100%;
    text-align: center;
    padding: 40px 0 20px;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 60px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: center;
  }
`;
const AddLeft = styled.div`
  width: 400px;
  p {
    padding-bottom: 1.5rem;
  }
  h2 {
    padding: 0.25rem 0 0.5rem;
    line-height: 3rem;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 2.5rem;
      padding: 0.25rem 0 0.4rem;
    }
    p {
      margin: 0 auto;
      padding-bottom: 1.25rem;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 60%;
    position: relative;
    order: 1;
    top: -50px;
  }
  @media (max-width: 560px) {
    width: 80%;
  }
  @media (max-width: 420px) {
    width: 90%;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 2%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 25px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp2 = styled.div`
  width: 40%;
  margin: 0 5% 10px;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp3 = styled.div`
  width: 25%;
  margin: 40px 1% 0 34%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp4 = styled.div`
  width: 35%;
  margin: -30px 5% 0;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
