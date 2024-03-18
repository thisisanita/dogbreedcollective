import React from "react";
import { useNavigate } from "react-router-dom";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Dropdown = (props) => {
  const breeds = props.dogBreeds;

  //Navigate to page based on the breed id of the dog
  const navigate = useNavigate(); //useNavigate returns a function that you can call to navigate to different routes in your application.
  const navigateToNewPage = (breedId) => navigate("/breeds/" + breedId);

  return (
    <FormControl sx={{ width: "70%" }}>
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
