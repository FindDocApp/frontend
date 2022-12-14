import React from "react";
import styled from "styled-components";

// There's 2 types of this button: 
// default: blue background
// bordered: gray border and text
export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#707070" : "#2d59eb")};
  background-color: ${(props) => (props.border ? "transparent" : "#2d59eb")};
  padding: .8rem 1.4rem;
  outline: none;         
  border-radius:10px;                                                                                                                                                                                                                
  color: ${(props) => (props.border ? "#707070" : "#fff")}; 

  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#2248c5")};
    border: 1px solid #2d59eb;
    color: ${(props) => (props.border ? "#2d59eb" : "#fff")};
  }

  @media (max-width: 860px){
    font-size: 12px;
    padding: .7rem 1.2rem;
    outline: none;         
  }
`;

