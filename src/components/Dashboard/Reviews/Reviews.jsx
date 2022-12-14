import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import { post, get } from "../../../utils/fetch";
// Components
import SuccessMessage from "../../Elements/SuccessMessage";
import ConfirmTab from "../../Elements/ConfirmTab";
import Loader from "../../Elements/Loader";
import Review from "./Review";

const Reviews = () => {
  // Get user info state from user context
  const { userInfo } = useContext(UserContext);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmTab, setShowConfirmTab] = useState(false);
  const [deletedReview, setDeletedReview] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Delete review with passed id
  const deleteReview = useCallback(
    async (reviewId) => {
      setLoading(true);

      // API get request
      const data = await post(
        process.env.REACT_APP_API_HOST + "dashboard/delete-review",
        {review_id: reviewId}
      );

      // Reset used states
      setDeletedReview({});
      setLoading(false);

      // Handle API response
      if (data.status === "ok") {
        setShowSuccessMessage(true);
        setRefresh(!refresh); // Refresh reviews page
      } else {
        alert("Failed to delete review");
      }
    },
    [refresh]
  );

  // Get reviews from Database
  const getReviews = useCallback(async () => {
    // API get request
    // user id must be passed as a query in the get request url
    const data = await get(
      process.env.REACT_APP_API_HOST + "dashboard/reviews?id=" + userInfo._id
    );

    // Handle API response
    if (data.status === "ok") {
      setReviews(data.reviews.reverse());
    } else {
      alert("Failed to fetch reviews");
    }
  }, [userInfo._id]);

  useEffect(() => {
    // Get doctor reviews from database on component mount
    getReviews();

    // Clean up reviews state on component unmount
    return () => setReviews([]);
  }, [getReviews, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Reviews</h1>

        {/* REVIEWS CONTAINER */}
        <Container>
          {reviews.length > 0 ? (
            reviews.map((review) => {
              return (
                <Review
                  key={review._id}
                  setShowConfirmTab={setShowConfirmTab}
                  review={review}
                  setDeletedReview={setDeletedReview}
                />
              );
            })
          ) : (
            <p className="no-results">You do not have any reviews yet</p>
          )}
          <Loader visible={loading} />
        </Container>
      </Wrapper>

      {/* CONFIRM DELETE REVIEW CONTAINER */}
      {showConfirmTab && (
        <ConfirmTab
          setShow={setShowConfirmTab}
          promptText="Are you sure you want to delete this review?"
          type="danger"
          cta="Delete"
          action={() => {
            deleteReview(deletedReview);
            setShowConfirmTab(false);
          }}
        />
      )}

      {/* SUCCESS MESSAGE CONTAINER */}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message="Review successfully deleted"
        />
      )}
    </>
  );
};

export default Reviews;

const Wrapper = styled.div`
  h1 {
    text-align: center;
    font-size: 24px;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 18px;
    }
  }
`;
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    .no-results {
      font-size: 12px;
    }
  }
`;
