import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import ResponseForm from "./ResponseForm";
import Button from "./Button";

const TopicCard = (props) => {
  //   const [topics, setTopics] = useState([]);
  const [showResponseModal, setShowResponseModal] = useState(false);
  //   const [selectedTopicId, setSelectedTopicId] = useState(null);
  //   const [responses, setReponses] = useState([]);
  const [responsesByTopic, setResponsesByTopic] = useState({});
  const [showTopicModal, setShowTopicModal] = useState(false);

  const breedId = props.breed.id;
  const topics = props.topics;
  //   console.log(selectedTopicId);

  //   const refreshTopics = () => {
  //     getTopicData(breedId);
  //   };
  // creating a
  console.log(topics);
  console.log(breedId);

  //   const refreshResponses = () => {
  //     getReplyData();
  //   };

  const toggleTopicModal = () => {
    setShowTopicModal(!showTopicModal);
  }; //The toggleModal function toggles the value of showModal between true and false.

  const toggleResponseModal = () => {
    setShowResponseModal(!showResponseModal);
  }; //The toggleModal function toggles the value of showModal between true and false.

  // GET TOPIC DATA (FILTERED BY DOG ID FROM AIRTABLE)
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
        props.setTopics(data.records); // Assuming data.records contains the topics
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

  // GET REPLY DATA (FILTERED BY TOPIC ID FROM AIRTABLE)
  const getReplyData = async (selectedTopicId) => {
    console.log("Fetching replies for Topic ID:", selectedTopicId); // Log the selected topic ID
    // AIRTABLE DATA
    const baseId = "appZRFaaZa7BY5aiI";
    const tableIdOrName = "reply";
    const token =
      "patbGdTJLogkMsGuU.101dea3bfabb03bfca08789d55d5d26f3fe55d10dc6a96f4da698d29da36f007";

    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableIdOrName}?filterByFormula={topicid}='${selectedTopicId}'`,
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
        console.log("Fetched Responses:", data.records); // Log the fetched responses
        setResponsesByTopic((prevResponses) => ({
          ...prevResponses,
          [selectedTopicId]: data.records,
        })); //Adds or updates the entry for the selectedTopicId with the new responses (data.records). If selectedTopicId already exists in the state, its value will be updated with data.records. If it doesn't exist, it will be added with data.records as its value.
        console.log("Updated Responses State:", responsesByTopic);
      } else {
        console.log("an error has occured");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (topics.length > 0) {
      topics.forEach((topic) => {
        getReplyData(topic.id);
      });
    }
  }, [topics]);

  return (
    <div>
      <Button onClick={toggleTopicModal}>Post a Topic</Button>
      {showTopicModal && (
        <InputForm
          breed={props.breed}
          getTopicData={getTopicData}
          toggleTopicModal={toggleTopicModal}
        ></InputForm>
      )}
      {/* {showResponse && (
        <div className="popup">
          <ResponseForm
            onClick={getReplyData}
            topicId={selectedTopicId}
            onClose={() => setShowResponse(false)}
            onRefreshResponse={refreshResponses}
            selectedTopicId={selectedTopicId}
          />
        </div>
      )} */}
      {/* <h1>Post</h1> */}
      {props.topics.map((topic, index) => (
        <div key={index}>
          <h3>{topic.fields.topic}</h3>
          <p>{topic.fields.description}</p>
          <p>
            Created by {topic.fields.name} at {topic.createdTime}
          </p>
          <p>{topic.id}</p>

          {responsesByTopic[topic.id]?.map((response, responseIndex) => {
            return (
              <div key={responseIndex}>
                <p>{response.fields.description}</p>
                <p>
                  Created by {response.fields.name} at {response.createdTime}
                </p>
              </div>
            );
          })}
          <Button onClick={toggleResponseModal}>Response</Button>

          {showResponseModal && (
            <div className="popup">
              <ResponseForm
                onClick={getReplyData}
                topicId={topic.id}
                //   onClose={() => setShowResponse(false)}
                //   onRefreshResponse={refreshResponses}
                getReplyData={getReplyData}
                toggleResponseModal={toggleResponseModal}
                // selectedTopicId={topic.id}
              />
            </div>
          )}

          {/* Add more fields as needed */}
        </div>
      ))}
      {/* {responsesByTopic[topics.id]?.map((response, responseIndex) => {
        <div key={responseIndex}>
          <p>{response.fields.description}</p>
          <p>
            Created by {response.fields.name} at {response.createdTime}
          </p>
        </div>;
      })} */}
    </div>
  );
};

export default TopicCard;
