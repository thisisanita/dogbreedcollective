import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import ResponseForm from "./ResponseForm";
import Button from "./Button";

const TopicCard = (props) => {
  const [showResponseModal, setShowResponseModal] = useState(false); // Toggle the visibility of the response form
  const [responsesByTopic, setResponsesByTopic] = useState({}); // Get all responses by topic id
  const [showTopicModal, setShowTopicModal] = useState(false); // Toogle the visibility of the input form
  const [selectedTopicId, setSelectedTopicId] = useState(null); // Obtain the selected topic id when responding to a topic so that the right responses will get fetched

  const breedId = props.breed.id;
  const topics = props.topics;
  console.log(topics);
  console.log(breedId);

  //CONVERT THE CREATEDTIME FORMAT (ISO 8601 string) FROM AIRTABLE TO 12HOUR FORMAT
  function convertTo12HourFormat(isoDateString) {
    // Create a Date object from the ISO 8601 string
    // When called with new, acts as a constructor and creates a new Date object specifically designed to handle date and time
    const date = new Date(isoDateString);
    // Format the date to a 12-hour format
    //  toLocaleString(date and number objects) formats the date or number according to the user's locale (language and region) settings.
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour format
    });

    return formattedDate;
  }

  // TOGGLE THE VISIBILITY OF THE TOPIC MODAL
  const toggleTopicModal = () => {
    setShowTopicModal(!showTopicModal); //The ! acts as a logical NOT operator and inverts the current visibility state of the topic modal
  };

  //TOOGLE THE VISIBILITY OF THE RESPONSE MODAL AND CAPTURE THE TOPIC ID
  const toggleResponseModal = (topicId) => {
    setShowResponseModal(!showResponseModal);
    setSelectedTopicId(topicId);
  };

  // GET REPLY DATA (FILTERED BY TOPIC ID FROM AIRTABLE)
  const getReplyData = async (selectedTopicId) => {
    // AIRTABLE DATA
    const baseId = "appZRFaaZa7BY5aiI";
    const tableIdOrName = "reply";
    const token = import.meta.env.VITE_AIRTABLE_APIKEY;

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
        // Sort responses by data and time (in descending order)
        const sortedResponses = data.records.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );
        // Updating the responseByTopic state with the data from Airtable that is filtered by topic id
        // prevResponses represents the current state of the responsesbyTopic data before the update
        setResponsesByTopic((prevResponses) => ({
          ...prevResponses,
          // [] are used to create a new object that represents the updated state when new
          // If selectedTopicId exists in the state, its value will be updated with data.records.
          //If it doesn't exist, it will be added with data.records as its value.
          [selectedTopicId]: sortedResponses,
        })); //Adds or updates the entry for the selectedTopicId with the new responses (data.records).
      } else {
        console.log("an error has occured");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Checks if there is at least one topic in the topics state.
    if (topics.length > 0) {
      //if there is at least one topic in the topic state, it iterates through each topic and triggers the fetching og replies for each topic.
      topics.forEach((topic) => {
        getReplyData(topic.id);
      });
    }
  }, [topics]);

  return (
    <div>
      <Button
        onClick={toggleTopicModal}
        sx={{
          width: "90%",
          borderRadius: "20px",
          margin: "16px 32px 16px 32px",
          padding: "8px",
          fontSize: "18px",
          letterSpacing: "3px",
        }}
      >
        Post a Topic
      </Button>
      {showTopicModal && (
        <InputForm
          breed={props.breed}
          getTopicData={props.getTopicData}
          toggleTopicModal={toggleTopicModal}
        ></InputForm>
      )}

      {props.topics.map((topic, index) => (
        <div className="topics" key={index}>
          <h3>{topic.fields.topic}</h3>
          <p>{topic.fields.description}</p>
          <div className="smalltext">
            Created by {topic.fields.name} at{" "}
            {convertTo12HourFormat(topic.createdTime)}
          </div>
          {/* [] serves as a safeguard to handle potential special characters or spaces in topic.id for property access */}
          {/* Uses option chaining: ? to access nested properties */}
          {/* if topic.id exist in responsesByTopics, it will map out those responses */}
          {responsesByTopic[topic.id]?.map((response, responseIndex) => {
            return (
              <div className="responses" key={responseIndex}>
                <p>{response.fields.description}</p>
                <div className="smalltext">
                  Created by {response.fields.name} at{" "}
                  {convertTo12HourFormat(response.createdTime)}
                </div>
              </div>
            );
          })}
          <Button
            variant="outlined"
            sx={{
              width: "strech",
              borderRadius: "20px",
              margin: "0px 32px 0px 32px",
              letterSpacing: "3px",
            }}
            onClick={() => toggleResponseModal(topic.id)}
          >
            Reply
          </Button>

          {showResponseModal && (
            <ResponseForm
              onClick={getReplyData}
              getReplyData={getReplyData}
              toggleResponseModal={toggleResponseModal}
              selectedTopicId={selectedTopicId}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicCard;
