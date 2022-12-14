import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Components
import FullButton from "../Buttons/FullButton";
import Reviews from "../Elements/Reviews";

// landing page Doctor Component
export default function DoctorBox({ img, name, speciality, reviews }) {
  const [showReviews, setShowReviews] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        {/* DOCTOR INFO */}
        <img className="radiusCircle" src={img} alt="project"></img>
        <h1 className="font20 darkColor">{name}</h1>
        <p className="font13 semiBold">{speciality}</p>

        {/* BUTTONS */}
        <ButtonsWrapper className="animate">
          <FullButton
            title="Book Appointment"
            action={() => navigate("/auth/login")}
          />
          <FullButton
            title="Reviews"
            action={() => setShowReviews(true)}
            border
          />
        </ButtonsWrapper>
      </Wrapper>

      {/* REVIEWS */}
      {showReviews && (
        <Reviews
          setShowReviews={setShowReviews}
          name={name}
          reviews={reviews}
        />
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 1.75rem;
  box-shadow: 0 10px 25px -10px #2525252e;

  img {
    width: 5rem;
    height: 5rem;
    box-shadow: 0 3px 20px -12px rgb(0 0 0 / 0.125);
  }
  h1 {
    line-height: 1.4rem;
    margin: 1.5rem 0 0.25rem;
  }
  @media (max-width: 475px) {
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 20px -8px #2525251c;

    img {
      width: 4rem;
      height: 4rem;
    }
    h1 {
      line-height: 1.3rem;
      margin: 1.5rem 0 0.25rem;
    }
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  width: 100%;
  height: 100%;

  button {
    align-self: flex-end;
    &:nth-child(1) {
      margin-right: 2.5%;
      min-width: 155px;
    }
  }
  @media (max-width: 860px) {
    button {
      &:nth-child(1) {
        min-width: 55px;
      }
    }
  }
  @media (max-width: 475px) {
    margin-top: 15px;
    button {
      align-self: flex-end;
    }
  }
`;
