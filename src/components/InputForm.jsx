import React, { useRef, useState } from "react";
import Button from "./Button";

const InputForm = (props) => {
  const breed = props.breed;
  console.log(breed.id);

  // // USEREF
  // const idRef = useRef();
  const topicRef = useRef();
  const descriptionRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = async () => {
    // event.preventDefault();
    console.log("hi");
    console.log(topicRef.current);
    // console.log(idRef.current);

    const post = {
      records: [
        {
          fields: {
            dogid: parseInt(breed.id),
            topic: topicRef.current.value,
            description: descriptionRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
          },
        },
      ],
    };

    const addPost = async () => {
      // const dogid = breed.id;
      const topic = topicRef.current.value;
      const description = descriptionRef.current.value;
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      console.log(description);
      // console.log(id);
      console.log(name);
      console.log(email);
      console.log(topic);
      console.log(JSON.stringify(post));

      // AIRTABLE DATA
      const baseId = "appZRFaaZa7BY5aiI";
      const tableIdOrName = "post";
      const token =
        "patbGdTJLogkMsGuU.101dea3bfabb03bfca08789d55d5d26f3fe55d10dc6a96f4da698d29da36f007";

      if (topic.length >= 1 && topic.length <= 50) {
        const res = await fetch(
          `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          }
        );

        if (res.ok) {
          const newPostData = await res.json();
          topicRef.current.value = "";
          descriptionRef.current.value = "";
          nameRef.current.value = "";
          emailRef.current.value = "";
          props.getTopicData(breed.id);

          console.log("hi");

          console.log(newPostData);
        } else {
          console.log("an error has occured");
        }
      }
    };

    addPost();
  };

  return (
    <div>
      <input type="text" ref={topicRef} placeholder="topic" />
      <input type="text" ref={descriptionRef} placeholder="description" />
      <input type="text" ref={nameRef} placeholder="name" />
      <input type="text" ref={emailRef} placeholder="email" />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default InputForm;
