import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Dropdown = (props) => {
  const breeds = props.dogBreeds;
  console.log(breeds[0]);

  const navigate = useNavigate();
  const navigateToNewPage = (breedid) => navigate("/breeds/" + breedid);

  return (
    <select
      className="dropdown"
      onChange={(event) => navigateToNewPage(event.target.value)}
    >
      <option value="">Select Breed</option>
      {breeds.map((breed) => (
        // <Link to={`/breeds/${breed.id}`}>
        <option key={breed.id} value={breed.id}>
          {breed.name}
        </option>
        // </Link>
      ))}
    </select>
  );
};

export default Dropdown;
