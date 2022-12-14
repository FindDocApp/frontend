import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Review from "../../Elements/Review";

const Reviews = ({ reviews }) => {
  const navigate = useNavigate();
  
  return (
    <Wrapper>
    {/* HEADING */}
      <Header>
        <h2>Reviews</h2>
        <button onClick={() => navigate(`/dashboard/doctor/reviews`)}>
          view all
        </button>
      </Header>

      {/* REVIEWS LIST CONTAINER */}
      <div className="flex flexColumn">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <Review
                key={review._id}
                reviewBy={review.reviewed_by}
                review={review.review}
                rate={review.rating}
              />
            );
          })
        ) : (
          <p className="no-results">You do not have any reviews yet</p>
        )}
      </div>
    </Wrapper>
  );
};

export default Reviews;

const Wrapper = styled.div`
  width: 33vw;
  max-width: 500px;
  min-width: 425px;
  min-height: 275px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem 0;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  @media (max-width: 1200px) {
    width: 550px;
  }
  @media (max-width: 860px) {
    width: 100%;
    max-width: 400px;
    min-width: 275px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    .no-results {
      font-size: 12px;
    }
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 0.75rem;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }
  button {
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 16px;
    color: #808080;
    background-color: transparent;
    padding: 0;
    transition: all 0.1s ease;

    &:hover {
      color: #686666;
    }
  }

  @media (max-width: 860px) {
    h2 {
      font-size: 16px;
    }
    button {
      font-size: 12px;
    }
  }
`;
