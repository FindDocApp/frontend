import React from "react";
import styled from "styled-components";

export default function ServiceBox({step, title, subtitle}) {
  return (
    <Wrapper className="flex flexColumn">
      <StepStyle>{step}</StepStyle>
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font13">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const StepStyle = styled.h1`
  font-size: 56px;
  line-height: 0;
  color: #2d59eb;
  @media (max-width: 860px) {
    font-size: 46px;
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  padding: 50px 0 10px;
  @media (max-width: 860px) {
    padding: 35px 0 0;
    margin: 0 auto;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;