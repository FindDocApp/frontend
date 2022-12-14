import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const starsSizeArray = [1, 2, 3, 4, 5];

const SelectRating = ({ rating, setRating }) => {
  return (
    // ROW OF 5 STAR ICONS
    <Wrapper className="review-stars">
      {starsSizeArray.map((index) => {
        return (
          <FontAwesomeIcon
            // SETTING RATE AS CURRENT INDEX
            // EX: if index = 3, then rating = 3 out of 5
            onClick={() => setRating(index)}
            icon={rating >= index ? faStarSolid : faStarRegular}
            key={index}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding-bottom: 0.25rem;

  svg {
    cursor: pointer;
    width: 16px;
    color: #ffbc3a;
    margin: 0 0.1rem;
  }

  @media (max-width: 860px) {
    padding-bottom: 0.275rem;

    svg {
      width: 13px;
      margin: 0 0.05rem;
    }
  }
`;

export default SelectRating;
