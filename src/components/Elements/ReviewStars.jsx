import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const stars = [1, 2, 3, 4, 5];

const ReviewStars = ({ rate }) => {
  return (
    // DOCTOR RATING STARS
    <Wrapper className="review-stars">
      {stars.map((star, i) => (
        <Star rate={rate} index={star} key={i} />
      ))}
    </Wrapper>
  );
};

const Star = ({ rate, index }) => {
  // if rate >= index: filled star
  // if rate < index: outlined star
  return <FontAwesomeIcon icon={rate >= index ? faStarSolid : faStarRegular} />;
};

const Wrapper = styled.div`
  display: flex;

  svg {
    width: 13px;
    color: #ffbc3a;
    margin: 0 0.1rem;
  }

  @media (max-width: 860px) {
    svg {
      width: 11px;
      margin: 0 0.05rem;
    }
  }
`;

export default ReviewStars;
