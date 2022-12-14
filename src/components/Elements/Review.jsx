import React from 'react'
import styled from "styled-components";
// Components
import ReviewStars from './ReviewStars'

const Review = ({reviewBy, rate, review}) => {
  return (
    <Wrapper className='review'>
      <ReviewHeader>
        {/* USERNAME OF USER REVIEWED BY */}
        <h3>{reviewBy}</h3>

        {/* RATING STARS */}
        <ReviewStars rate={rate}/>
      </ReviewHeader>

        {/* REVIEW */}
      <p>{review}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: .75rem;
    border-radius: 12.5px;
    padding: 1rem 1.25rem;
    background-color: rgb(0 124 255 / 10%);

    p{
        font-size: 16px;
        line-height: 21px;
        padding-top: .5rem;
    }

    &:nth-last-child(1){
      margin-bottom: 0;
    }

    @media (max-width: 860px) {
      border-radius: 10px;
      margin-bottom: .5rem;
      padding: .75rem 1rem;

      p{
          font-size: 12px;
          line-height: 18px;
          padding-top: .25rem;
      }
    }
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h3{
    font-size: 18px;
    line-height: 26px;
    font-weight: 600;
  }
  .review-stars{
    padding-top: .15rem;
  }
  @media (max-width: 860px) {
    h3{
      font-size: 14px;
      line-height: 22px;
    }
    .review-stars{
      padding-top: .1rem;
    }
  }
`

export default Review