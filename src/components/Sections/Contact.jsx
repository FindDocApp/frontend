import React, { useState, useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
// Assets
import ContactImg1 from "../../assets/img/contact/1.png";
import ContactImg2 from "../../assets/img/contact/2.png";
import ContactImg3 from "../../assets/img/contact/3.png";
// Components
import SuccessMessage from "../Elements/SuccessMessage";
import Loader from "../Elements/Loader";

const defaultState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState(defaultState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Form input on change handler
  const handleInput = (e) =>
    setFormInput({ ...formInput, [e.target.name]: e.target.value });

  // Handling contact form submittion
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formInput;
    if (!name || !email || !message || !subject) {
      alert("Please fill in all the required fields");
      return;
    }

    // Submit contact form if valid data
    submitContactForm();
  };

  const submitContactForm = async () => {
    setLoading(true);

    // Send email
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => handleSentMessageResponse(result.status, result.text),
        (error) => handleSentMessageResponse(error.status, error.text)
      );
  };

  const handleSentMessageResponse = (status, text) => {
    if (status === 200) {
      setShowSuccessMessage(true);
    } else {
      console.log(text);
      alert("Failed to send message, please try again later");
    }

    // Reset states
    setLoading(false);
    setFormInput(defaultState);
  };

  return (
    <>
      <Wrapper id="contact" className="lightBg">
        <div className="container">
          {/* HEADING */}
          <HeaderInfo>
            <h1 className="font40 extraBold">We're here to help.</h1>
            <p className="font13">
              Get in touch with us by submitting the form below and we will get
              back to you soon.
            </p>
          </HeaderInfo>

          <div className="row" style={{ paddingBottom: "60px" }}>
            {/* CONTACT FORM */}
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-6"
              style={{ position: "relative" }}
            >
              <Form onSubmit={handleSubmit} ref={formRef}>
                <label className="font13">Name:</label>
                <input
                  type="text"
                  id="fname"
                  name="name"
                  value={formInput.name}
                  onChange={(e) => handleInput(e)}
                />
                <label className="font13">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formInput.email}
                  onChange={(e) => handleInput(e)}
                />
                <label className="font13">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formInput.subject}
                  onChange={(e) => handleInput(e)}
                />
                <label className="font13">Message:</label>
                <textarea
                  rows="4"
                  cols="50"
                  type="text"
                  id="message"
                  name="message"
                  value={formInput.message}
                  onChange={(e) => handleInput(e)}
                />
                <SumbitWrapper>
                  <ButtonInput
                    type="submit"
                    value="Send Message"
                    className="pointer animate radius8"
                  />
                </SumbitWrapper>
              </Form>

              {/* LOADER */}
              <Loader visible={loading} />
            </div>

            {/* IMAGES */}
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex images">
              <div
                style={{ width: "50%" }}
                className="flexNullCenter flexColumn"
              >
                <ContactImgBox>
                  <img src={ContactImg1} alt="office" className="radius6" />
                </ContactImgBox>
                <ContactImgBox>
                  <img src={ContactImg2} alt="office" className="radius6" />
                </ContactImgBox>
              </div>
              <div style={{ width: "50%" }}>
                <div style={{ marginTop: "100px" }}>
                  <img src={ContactImg3} alt="office" className="radius6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* SUCCESS MESSAGE CONTAINER */}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message="Message successfully sent"
        />
      )}
    </>
  );
}

const Wrapper = styled.section`
  width: 100%;

  @media (max-width: 991px) {
    .images {
      display: none;
    }
  }
`;
const HeaderInfo = styled.div`
  padding: 70px 0 0;
  p {
    max-width: 500px;
  }
  @media (max-width: 860px) {
    text-align: center;
    p {
      margin: 0 auto;
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  label {
    width: 100%;
    max-width: 500px;
    font-weight: 600;
  }
  input[type="text"],
  input[type="email"],
  textarea {
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    max-width: 500px;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 2px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  @media (max-width: 860px) {
    padding: 30px 0 10px;
    align-items: center;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #2d59eb;
  background-color: #2d59eb;
  padding: 0.8rem 1.4rem;
  outline: none;
  border-radius: 10px;
  color: #fff;

  :hover {
    background-color: #2248c5;
    border: 1px solid #2248c5;
  }

  @media (max-width: 860px) {
    font-size: 12px;
    padding: 0.7rem 1.2rem;
    outline: none;
  }
`;
const ContactImgBox = styled.div`
  max-width: 180px;
  align-self: flex-end;
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
  @media (max-width: 860px) {
    display: flex;
    justify-content: center;
  }
`;
