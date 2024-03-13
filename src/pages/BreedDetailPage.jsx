import React, { useState, useEffect } from "react";
import BreedCard from "../components/BreedCard";
import { useParams } from "react-router-dom";
import Dropdown from "../components/Dropdown";

const BreedDetailPage = () => {
  const { breedid } = useParams();
  const [breed, setBreed] = useState({});

  // GET DATA FROM DOG API
  //   useEffect(() => {
  const getBreedData = async (signal) => {
    try {
      const res = await fetch(
        "https://api.thedogapi.com/v1/breeds/" + breedid,
        {
          signal,
        }
      );

      if (res.ok) {
        const data = await res.json();
        setBreed(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };
  //   });

  useEffect(() => {
    const controller = new AbortController();
    getBreedData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {/* <h1>{breedid}</h1> */}
      <BreedCard breed={breed}></BreedCard>
    </>
  );
};

export default BreedDetailPage;
