import React from "react";
import styled from "styled-components";

const ProfilePicture = ({ imageSrc, setImageFile }) => {
  return (
    <Wrapper>
      {/* PROFILE IMAGE */}
      <img src={imageSrc} alt="" />

      {/* IMAGE SELECT INPUT FIELD */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
    </Wrapper>
  );
};

export default ProfilePicture;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0.75rem 0 1rem;
  }
  input {
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 1.25rem;
    padding: 0 !important;
    border-radius: 0 !important;
    background-color: transparent !important;
  }

  @media (max-width: 860px) {
    img {
      width: 80px;
      height: 80px;
      margin: 0.5rem 0 0.75rem;
    }
    input {
      font-size: 12px;
      margin-bottom: 1rem;
    }
  }
`;
