import React from "react";
import styled from "styled-components";

// There's 3 types of this button: 
// primary: blue background
// secondary: gray border and text
// danger: red background
const Button = ({ action, type, text }) => {
  return (
    <Wrapper className={type} onClick={action} type={type}>
      {text}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button`
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 7.5px;
  color: ${(props) => (props.type === "secondary" ? "#9a9a9a" : "#fff")};
  border: 1px solid
    ${(props) =>
      props.type === "secondary"
        ? "#9a9a9a"
        : props.type === "primary"
        ? "#2d59eb"
        : "#F95F5F"};
  background-color: ${
    (props) =>
      props.type === "primary"
        ? "#2d59eb"
        : props.type === "danger"
        ? "#F95F5F"
        : props.type === "secondary"
        ? "transparent"
        : "#2d59eb"
  };
  transition: all 0.25s ease;

  &:hover {
    color: ${(props) => (props.type === "secondary" ? "#767676" : "#fff")};
    border: 1px solid
      ${(props) =>
        props.type === "secondary"
          ? "#767676"
          : props.type === "primary"
          ? "#2248c5"
          : "#e65656"};
    background-color: ${(props) =>
      props.type === "primary"
        ? "#2248c5"
        : props.type === "danger"
        ? "#e65656"
        : props.type === "secondary"
        ? "transparent"
        : "#2248c5"};
  }

  @media (max-width: 860px) {
    font-size: 12px;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
  }
`;
