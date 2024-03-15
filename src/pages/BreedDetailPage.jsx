import React, { useState, useEffect } from "react";
import BreedCard from "../components/BreedCard";
import { useParams } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import TopicCard from "../components/TopicCard";
import InputForm from "../components/InputForm";

const BreedDetailPage = () => {
  const { breedId } = useParams();
  const [breed, setBreed] = useState({});
  const [topics, setTopics] = useState([]); //Lift state up. State is managed in BreedDetailPage and passed down to children
  const dogBreedId = breed.id;
  console.log(dogBreedId);

  // const toggleModal = () => {
  //   setShowTopicModal(!showTopicModal);
  // }; //The toggleModal function toggles the value of showModal between true and false.

  // GET DOG BREED DATA FROM DOG API
  const getBreedData = async (signal) => {
    try {
      const res = await fetch(
        "https://api.thedogapi.com/v1/breeds/" + breedId,
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

  useEffect(() => {
    const controller = new AbortController();
    getBreedData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // GET TOPIC DATA (FILTERRED BY DOGBREED ID)FROM AIRTABLE

  const getTopicData = async (dogBreedId) => {
    // AIRTABLE DATA
    const baseId = "appZRFaaZa7BY5aiI";
    const tableIdOrName = "post";
    const token =
      "patbGdTJLogkMsGuU.101dea3bfabb03bfca08789d55d5d26f3fe55d10dc6a96f4da698d29da36f007";

    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableIdOrName}?filterByFormula={dogid}='${dogBreedId}'`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setTopics(data.records); // Assuming data.records contains the topics
      } else {
        console.log("an error has occured");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (breed && breed.id) {
      getTopicData(breed.id);
    }
  }, [breed]);

  return (
    <>
      {/* <h1>{breedid}</h1> */}
      {/* <InputForm breed={breed}></InputForm> */}
      <BreedCard breed={breed}></BreedCard>
      {/* <Button onClick={toggleModal}>Create a Post</Button> */}
      <TopicCard
        breed={breed}
        topics={topics}
        setTopics={setTopics}
      ></TopicCard>
    </>
  );
};

export default BreedDetailPage;
