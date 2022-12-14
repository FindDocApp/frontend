import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
// Components
import Review from "../../Elements/Review";

const ReviewContainer = ({ setShowConfirmTab, review, setDeletedReview }) => {
  // Delete review handler
  const handleDelete = () => {
    setDeletedReview(review);
    setShowConfirmTab(true);
  };

  return (
    <Wrapper>
      {/* REVIEW */}
      <Review
        reviewBy={review.reviewed_by}
        review={review.review}
        rate={review.rating}
      />
      {/* DELETE BUTTON ICON */}
      <FontAwesomeIcon
        icon={faTrashCan}
        className="delete"
        onClick={handleDelete}
      />
    </Wrapper>
  );
};

export default ReviewContainer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .delete {
    position: relative;
    top: -8px;
    margin-left: 1.5rem;
    font-size: 18px;
    cursor: pointer;
    color: #f95f5f;

    &:hover {
      transition: all 0.1s ease;
      color: #e65656;
    }
  }
  @media (max-width: 860px) {
    .delete {
      top: -6px;
      margin-left: 1.25rem;
      font-size: 16px;
    }
  }
`;
