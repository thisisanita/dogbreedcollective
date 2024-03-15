import React, { useRef } from "react";
import Button from "./Button";

const ResponseForm = (props) => {
  const selectedTopic = props.topicId;
  console.log(selectedTopic);

  // // USEREF
  const responseDescriptionRef = useRef();
  const responseNameRef = useRef();
  const responseEmailRef = useRef();

  const handleResponse = async () => {
    // event.preventDefault();
    // console.log("hi");
    // console.log(topicRef.current);
    // console.log(idRef.current);

    const reply = {
      records: [
        {
          fields: {
            topicid: selectedTopic,
            description: responseDescriptionRef.current.value,
            name: responseNameRef.current.value,
            email: responseEmailRef.current.value,
          },
        },
      ],
    };

    const addReply = async () => {
      // const dogid = breed.id;
      //   const topic = topicRef.current.value;
      const description = responseDescriptionRef.current.value;
      const name = responseNameRef.current.value;
      const email = responseEmailRef.current.value;
      console.log(description);
      // console.log(id);
      console.log(name);
      console.log(email);
      //   console.log(topic);
      //   console.log(JSON.stringify(post));

      // AIRTABLE DATA
      const baseId = "appZRFaaZa7BY5aiI";
      const tableIdOrName = "reply";
      const token =
        "patbGdTJLogkMsGuU.101dea3bfabb03bfca08789d55d5d26f3fe55d10dc6a96f4da698d29da36f007";

      if (description.length >= 1 && description.length <= 50) {
        const res = await fetch(
          `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reply),
          }
        );

        if (res.ok) {
          //   const newReplyData = await res.json();
          props.getReplyData(selectedTopic);

          console.log("hi");

          //   console.log(newReplyData);
        } else {
          console.log("an error has occured");
        }
      }
    };

    addReply();
  };

  return (
    <div>
      <input
        type="text"
        ref={responseDescriptionRef}
        placeholder="description"
      />
      <input type="text" ref={responseNameRef} placeholder="name" />
      <input type="text" ref={responseEmailRef} placeholder="email" />
      <Button onClick={handleResponse}>submit</Button>
    </div>
  );
};

export default ResponseForm;
