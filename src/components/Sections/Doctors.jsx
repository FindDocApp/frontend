import React from "react";
import styled from "styled-components";
// Assets
import DoctorOne from '../../assets/img/doctors/1.jpg'
import DoctorTwo from '../../assets/img/doctors/2.jpg'
import DoctorThree from '../../assets/img/doctors/3.jpg'
// Components
import DoctorBox from "../Elements/DoctorBox";

export default function Doctors() {
  return (
    <Wrapper id="doctors" className="container">
      {/* HEADING */}
      <HeaderInfo>
        <h1 className="font40 extraBold">Some of the doctors</h1>
        <p className="font13">
          Find a doctor, book a visit and solve any health-related doubt. Log in to your account to find more doctors.
        </p>
      </HeaderInfo>
      
      {/* DOCTORS */}
      <DoctorsWrapper className="flexWrap row">
        <DoctorWrapper>
          <DoctorBox
            img={DoctorOne}
            name="Dr. Marcelle Pavle"
            speciality="Aesthetic And Reconstructive Surgery, Maxillofacial Surgery and Implantology"
            reviews={[
              {
                review:'The services that I received from Dr. Marcelle were excellent. Dr. Marcelle was friendly and ensured that I am properly informed about my health and care.',
                reviewed_by: 'Hannah Boško',
                rating: 5
              },{
                review:'Dr. Marcelle Pavle was a wonderful surgeon. He ensured I had a smooth prep, surgery, and follow-up.',
                reviewed_by: 'Aronne Reuben',
                rating: 4
              }
            ]}
          />
        </DoctorWrapper>
        <DoctorWrapper>
          <DoctorBox
            img={DoctorTwo}
            name="Dr. Kirabo Sullivan"
            speciality="Dental Care, Orthodontics & Dentofacial Orthopaedics"
            reviews={[
              {
                review:'Dr. Kirabo is a great doctor! He’s very understanding and listens to your concerns. He takes time with the patient to help them with their health issues! I highly recommend him to anyone looking for a dental care specialist.',
                reviewed_by: 'Emil Nassim',
                rating: 5
              },{
                review:'DR. Kirabo Sullivan is very professional. Takes time to explain things, resolve problems. HIGHLY Grateful for his experience & wide range of knowledge.',
                reviewed_by: 'George Oliviero',
                rating: 3
              },{
                review:'Dr. Kirabo Sullivan was terrific. Knowledgeable, sensitive, informative… I immediately felt at ease – and felt confident in my receiving expert medical care. ',
                reviewed_by: 'Mariano Ina',
                rating: 5
              }
            ]}
          />
        </DoctorWrapper>
        <DoctorWrapper>
          <DoctorBox
            img={DoctorThree}
            name="Dr. Radha Mariyam"
            speciality="Endocrinology & Diabetes, Internal Medicine"
            reviews={[
              {
                review:'Dr. Radha is incredible. Not only has she taken great care of my health, but also she is lovely to speak with at every appointment. It’s rare to find a doctor that combines such personal touches and care for a patient as a person with outstanding quality of medical care. I highly recommend becoming her patient!',
                reviewed_by: 'Rosa Samoil',
                rating: 5
              }
            ]}
          />
        </DoctorWrapper>
      </DoctorsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-bottom: 6rem;
  @media (max-width: 980px) {
    padding-bottom: 4rem;
  }
`;
const HeaderInfo = styled.div`
  padding-bottom: 25px;
  @media (max-width: 860px) {
    p{
      margin: 0 auto;
      max-width: 400px;
      padding: 0 1rem;
    }
    text-align: center;
  }
`;
const DoctorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 1rem;
  @media (max-width: 860px) {
    align-items: center;
    flex-direction: column;
  }
`
const DoctorWrapper = styled.div`
  display: flex;
  width: 31.5%;
  margin-right: 1.5%;

  @media (max-width: 980px) {
    width: 47.5%;
    margin-right: 2.5%;
    margin-bottom: 2.5%;
  }
  @media (max-width: 860px) {
    width: 400px;
    margin-right: 0;
    margin-bottom: 2.5%;
  }
  @media (max-width: 475px) {
    margin-bottom: 5%;
    width: 100%;
  }
`