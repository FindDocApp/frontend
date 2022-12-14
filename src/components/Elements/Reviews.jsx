import React from "react";
import styled from "styled-components";
// Components
import Review from "./Review";

const Reviews = ({ setShowReviews, name, reviews }) => {
  return (
    <Wrapper>
      {/* CLOSE OVERLAY ( HIDES COMPONENT ON CLICK ) */}
      <CloseOverlay onClick={() => setShowReviews(false)}></CloseOverlay>

      <Container>
        {/* HEADING */}
        <Header>
          {/* formatting name to one or two word(s) name depending on username's number of words */}
          <h1>
            {name.split(" ").length > 2
              ? name.split(" ")[0] + " " + name.split(" ")[1]
              : name.split(" ")[0]}
            's Reviews
          </h1>
          <button className="font13" onClick={() => setShowReviews(false)}>
            close
          </button>
        </Header>

        {/* NUMBER OF REVIEWS  */}
        <NumberOfReviews>
          <p>{reviews.length} reviews</p>
          <div></div>
        </NumberOfReviews>

        {/* REVIEWS LIST CONTAINER */}
        <ReviewsList>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, i) => {
              return (
                <Review
                  key={review._id || i}
                  reviewBy={review.reviewed_by}
                  review={review.review}
                  rate={review.rating}
                />
              );
            })
          ) : (
            <p className="no-results">{name} has no reviews yet</p>
          )}
        </ReviewsList>
      </Container>
    </Wrapper>
  );
};

export default Reviews;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0b15361f;
  display: grid;
  place-items: center;
  padding: 0 1.5rem;
  z-index: 1000;
`;

const CloseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  max-width: 550px;
  height: 650px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  padding: 1.25rem 1.5rem;
  overflow: hidden;

  @media (max-width: 960px) {
    max-width: 550px;
    height: 600px;
  }
  @media (max-width: 860px) {
    padding: 1rem 1.25rem;
  }
  @media (max-width: 660px) {
    max-width: 450px;
    height: 500px;
  }
  @media (max-width: 460px) {
    min-height: 500px;
    height: 100%;
    max-height: 550px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  h1 {
    font-size: 20px;
    line-height: 28px;
  }
  button {
    cursor: pointer;
    outline: none;
    border: 1px solid #f95f5f;
    padding: 0 15px;
    height: 35px;
    color: #f95f5f;
    background: transparent;
    border-radius: 7.5px;
    letter-spacing: 1px;
    transition: all 0.2s ease-out;

    &:hover {
      background-color: #f95f5f;
      color: #fff;
    }
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 16px;
      line-height: 24px;
    }
    button {
      font-size: 12px;
      padding: 0 12.5px;
      height: 30px;
      border-radius: 7.5px;
    }
  }
`;

const NumberOfReviews = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.5rem;

  p {
    line-height: 0px;
    padding: 0 0.5rem 0 0;
    font-size: 13px;
    min-width: 75px;
    color: #aaa;
  }
  div {
    height: 1px;
    width: 100%;
    background-color: #aaa;
  }

  @media (max-width: 960px) {
    padding-top: 1.25rem;
  }
  @media (max-width: 460px) {
    p {
      padding: 0 0.5rem 0 0;
      font-size: 11px;
      min-width: 65px;
    }
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-x: hidden;
  margin-top: 1.5rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
  }

  @media (max-width: 960px) {
    margin-top: 1.25rem;
    height: 460px;
  }
  @media (max-width: 660px) {
    height: 375px;
  }
  @media (max-width: 460px) {
    min-height: 375px;
    height: 81.5%;
  }
`;
