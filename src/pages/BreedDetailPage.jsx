import React, { useState, useEffect } from "react";
import BreedCard from "../components/BreedCard";
import { useParams } from "react-router-dom";
import TopicCard from "../components/TopicCard";

const BreedDetailPage = () => {
  const { breedId } = useParams(); // Acess dynamic part of the Dog API url based on the dog breed id
  const [breed, setBreed] = useState({});
  const [topics, setTopics] = useState([]); //Lift state up. State is managed in BreedDetailPage and passed down to children
  const dogBreedId = breed.id; // Get breed id of the dog selected on dropdown to filter airtable topic data with
  console.log(dogBreedId);

  // GET SELECTED DOG BREED DATA (BASED ON DOGBREED SELECTED FROM THE DROPDOWN ON THE HOMEPAGE) FROM DOG API
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
    const token = import.meta.env.VITE_AIRTABLE_APIKEY;

    // FilterByFormula query parameter is used to filter the records returned by the Airtable based on a formula
    // The formula is specified as a string and does a a simple equality check {dogid}=${dogBreedId}
    // ? is to indicate the start of a query string
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableIdOrName}?filterByFormula={dogid}=${dogBreedId}`,
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
        // Sort topics by data and time (in descending order)
        const sortedTopics = data.records.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );
        setTopics(sortedTopics); // Assuming data.records contains the topics
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
      <BreedCard breed={breed}></BreedCard>
      <TopicCard
        breed={breed}
        topics={topics}
        setTopics={setTopics}
        getTopicData={getTopicData}
      ></TopicCard>
    </>
  );
};

export default BreedDetailPage;
