import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Dropdown = (props) => {
  const breeds = props.dogBreeds;
  console.log(breeds[0]);

  const navigate = useNavigate();
  const navigateToNewPage = (breedid) => navigate("/breeds/" + breedid);

  return (
    <FormControl sx={{ width: 800 }}>
      <InputLabel id="dropdown-label">Select a Dog Breed</InputLabel>
      <MuiSelect
        labelId="dropdown-label"
        onChange={(event) => navigateToNewPage(event.target.value)}
      >
        {breeds.map((breed) => (
          <MenuItem key={breed.id} value={breed.id}>
            {breed.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Dropdown;
