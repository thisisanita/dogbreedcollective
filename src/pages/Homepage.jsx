import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import Banner from "../images/Banner.png";

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
    <div className="homecontainer">
      <label>
        Dog Breed
        <Dropdown dogBreeds={dogBreeds} getDogData={getDogData} />
      </label>
      <img className="banner" src={Banner} alt="banner" />
    </div>
  );
};

export default Homepage;
