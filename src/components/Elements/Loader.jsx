import React from "react";
import styled from "styled-components";
// Components
import { ProgressBar } from "react-loader-spinner";

const Loader = ({ visible }) => {
  return (
    <Wrapper>
      <ProgressBar
        height="60"
        visible={visible}
        borderColor="#000"
        barColor="#2d59eb"
      />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  position: absolute;
  bottom: -4.5rem;
  left: 44%;

  @media (max-width: 860px) {
    bottom: -4rem;
    left: 42%;
  }
  @media (max-width: 460px) {
    left: 40%;
  }
`;
