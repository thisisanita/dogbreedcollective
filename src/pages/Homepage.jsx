import React, { useState, useEffect } from "react";
import BreedCard from "../components/BreedCard";
import Dropdown from "../components/Dropdown";

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
    <div>
      <Dropdown dogBreeds={dogBreeds} getDogData={getDogData} />
    </div>
  );
};

export default Homepage;
