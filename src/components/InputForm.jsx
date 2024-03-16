import React, { useRef, useState } from "react";
import Button from "./Button";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";

const InputForm = (props) => {
  const breed = props.breed;
  console.log(breed.id);

  // // USEREF
  // const idRef = useRef();
  // const topicRef = useRef();
  // const descriptionRef = useRef();
  // const nameRef = useRef();
  // const emailRef = useRef();

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    // event.preventDefault();
    console.log("hi");
    // console.log(topicRef.current);
    // console.log(idRef.current);

    const post = {
      records: [
        {
          fields: {
            dogid: parseInt(breed.id),
            topic,
            description,
            name,
            email,
          },
        },
      ],
    };

    const addPost = async () => {
      // const dogid = breed.id;
      console.log(description);
      console.log(name);
      console.log(email);
      console.log(topic);
      console.log(JSON.stringify(post));
      // console.log(id);
      // console.log(name);
      // console.log(email);
      // console.log(topic);
      // console.log(JSON.stringify(post));

      // AIRTABLE DATA
      const baseId = "appZRFaaZa7BY5aiI";
      const tableIdOrName = "post";
      const token =
        "patbGdTJLogkMsGuU.101dea3bfabb03bfca08789d55d5d26f3fe55d10dc6a96f4da698d29da36f007";

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
        setTopic("");
        setDescription("");
        setName("");
        setEmail("");
        props.toggleTopicModal();
        props.getTopicData(breed.id);

        console.log("hi");

        console.log(newPostData);
      } else {
        console.log("an error has occured");
      }
    };

    addPost();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Create a post</h2>
        <TextField
          id="outlined-basic"
          label="Topic"
          variant="outlined"
          type="text"
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        ></TextField>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              // Target the input field
              height: "85px", // Set the height
            },
          }}
        ></TextField>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        ></TextField>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        ></TextField>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
          margin="16px"
        >
          <Button variant="outlined" onClick={props.toggleTopicModal}>
            close
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </div>
    </div>
  );
};

export default InputForm;
