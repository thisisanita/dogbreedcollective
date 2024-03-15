import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import ResponseForm from "./ResponseForm";
import Button from "./Button";

const TopicCard = (props) => {
  const [topics, setTopics] = useState([]);
  const [showResponse, setShowResponse] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const breedId = props.breed.id;
  console.log(breedId);

  const getTopicData = async (breedId) => {
    // AIRTABLE DATA
    const baseId = "appZRFaaZa7BY5aiI";
    const tableIdOrName = "post";
    const token =
      "patbGdTJLogkMsGuU.101dea3bfabb03bfca08789d55d5d26f3fe55d10dc6a96f4da698d29da36f007";

    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableIdOrName}?filterByFormula={dogid}='${breedId}'`,
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
    if (props.breed && props.breed.id) {
      getTopicData(props.breed.id);
    }
  }, [props.breed]);

  return (
    <div>
      <InputForm breed={props.breed}></InputForm>
      {showResponse && (
        <div className="popup">
          <ResponseForm
            topicId={selectedTopicId}
            onClose={() => setShowResponse(false)}
          />
        </div>
      )}

      <h1>Post</h1>
      {topics.map((topic, index) => (
        <div key={index}>
          <h3>{topic.fields.topic}</h3>
          <p>{topic.fields.description}</p>
          <p>
            Created by {topic.fields.name} at {topic.createdTime}
          </p>
          <p>{topic.id}</p>
          <Button
            onClick={() => {
              setSelectedTopicId(topic.id);
              setShowResponse(true);
            }}
          >
            reply
          </Button>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default TopicCard;
