import React, { useState } from "react";
import styled from "styled-components";
import { post } from "../../utils/fetch";
// Components
import { ProgressBar } from "react-loader-spinner";
import SuccessMessage from "./SuccessMessage";
import SelectRating from "./SelectRating";
import Button from "../Buttons/Button";

const ReviewTab = ({ appointment, setShow, refresh, setRefresh }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async  () => {
    // Check if valid data
    if (!rating || !review) {
      alert("Please fill in the required fields");
      return;
    }
    
    setLoading(true);

    // API post request
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/review-doctor",
      {
        reviewBy: appointment.booked_by,
        reviewFor: appointment.booked_for,
        rating,
        review
      }
    );

    // Reset states
    setLoading(false);
    setReview('');
    setRating('');

    // Handle API response
    if (data.status === "ok") {
      setShowSuccessMessage(true);
      // Refresh current tab data
      setRefresh(!refresh)
    } else {
      alert(data.error);
    }
  }

  return (
    <>
      <Wrapper>
        {/* REVIEW CONTAINER */}
        <Container>
          <h2>Review {appointment.user.username}</h2>

          <label>Write a review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          <Rating>
            <label>Rate your experience</label>
            {/* DOCTOR RATING BUTTONS */}
            <SelectRating setRating={setRating} rating={rating} />
          </Rating>

          <Buttons>
            <Button
              text="Ignore"
              type="secondary"
              action={() => setShow(false)}
            />
            <Button
              text="Submit Review"
              type="primary"
              action={handleSubmit}
            />
          </Buttons>

          {/* LOADER */}
          <Loader>
            <ProgressBar
              height="60"
              visible={loading}
              borderColor="#000"
              barColor="#2d59eb"
            />
          </Loader>
        </Container>
      </Wrapper>

      {/* SUCCESS MESSAGE CONTAINER */}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShow}
          message="Review submitted successfully"
        />
      )}
    </>
  );
};

export default ReviewTab;

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
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  width: 450px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;

  h2 {
    font-size: 22px;
    line-height: 26px;
    margin-bottom: 0.5rem;
  }
  label {
    font-weight: 600;
  }
  textarea {
    background-color: #eceff5;
    border: none;
    outline: none;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 1rem;
    resize: vertical;
    max-height: 200px;
    min-height: 50px;
  }

  @media (max-width: 860px) {
    width: 100%;
    max-width: 300px;
    padding: 1rem 1.25rem;

    h2 {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 0.25rem;
    }
    label {
      font-size: 12px;
    }
    textarea {
      padding: 0.6rem 1rem;
      font-size: 12px;
      margin-bottom: 1rem;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;

  .secondary {
    margin-right: 0.5rem;
  }
`;

const Loader = styled.div`
  position: absolute;
  bottom: -4.5rem;
  left: 44%;

  @media (max-width: 860px) {
    bottom: -4rem;
    left: 38%;
  }
  @media (max-width: 460px) {
    left: 36%;
  }
`;
