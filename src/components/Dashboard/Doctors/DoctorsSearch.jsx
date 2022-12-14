import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const DoctorsSearch = ({ setFilteredDoctors, doctors }) => {
  const [searchInput, setSearchInput] = useState("");

  // Filtering doctors when search input changes
  useEffect(() => {
    // Filtering doctors based on doctor name or speciality
    let filtered = doctors.filter((doctor) => {
      let name = doctor.username.toLowerCase();
      let speciality = doctor.speciality.toLowerCase();
      let input = searchInput.toLowerCase();

      // Returning doctors if their name or speciality matches the search input
      return name.includes(input) || speciality.includes(input);
    });

    // Saving updated filtered doctors
    setFilteredDoctors(filtered);
  }, [doctors, searchInput, setFilteredDoctors]);

  return (
    <Wrapper>
      {/* SEARCH INPUT FIELD */}
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search doctor name or speciality"
      />
      {/* ICON */}
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </Wrapper>
  );
};

export default DoctorsSearch;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px -10px #2525252e;

  input {
    min-width: 250px;
    outline: none;
    border: none;
    font-size: 16px;
    padding: 1rem 1.5rem;
    background-color: transparent;
  }
  svg {
    color: #2d59eb;
    padding-right: 1.5rem;
  }

  @media (max-width: 860px) {
    display: flex;
    align-items: center;
    border-radius: 7.5px;
    width: 100%;
    max-width: 300px;

    input {
      width: 100%;
      min-width: 150px;
      font-size: 12px;
      padding: 0.75rem 1rem;
    }
    svg {
      font-size: 12px;
      padding-right: 1rem;
    }
  }

  @media (max-width: 620px) {
    max-width: 375px;
  }
`;
