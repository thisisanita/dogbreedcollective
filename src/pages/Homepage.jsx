import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import Banner from "../images/Banner.png";
import DogsBanner from "../images/DogsBanner.png";
import DogBanner from "../images/DogBanner.png";
import dogbreedcollective from "../images/dogbreedcollective.png";
import { Stack } from "@mui/material";

const Homepage = () => {
  const [dogBreeds, setDogBreeds] = useState([]);

  const getDogData = async (signal) => {
    try {
      const res = await fetch("https://api.thedogapi.com/v1" + "/breeds", {
        signal,
      });

      if (res.ok) {
        const data = await res.json();
        setDogBreeds(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getDogData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Stack direction="column" spacing={5} alignItems="center">
      <br></br>
      <img
        className="banner"
        src={dogbreedcollective}
        alt="dogbreedcollective"
        sx={{ margin: 2, border: "1px solid #000" }}
      />
      <Dropdown dogBreeds={dogBreeds} getDogData={getDogData} />
      <img
        className="image"
        src={DogsBanner}
        alt="banner"
        sx={{ margin: 2, border: "1px solid #000" }}
      />
    </Stack>
  );
};

export default Homepage;
