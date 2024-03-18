import React, { useState } from "react";
import Button from "./Button";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";

const InputForm = (props) => {
  const breed = props.breed;
  console.log(breed.id);

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
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
      console.log(JSON.stringify(post));

      // AIRTABLE DATA
      const baseId = "appZRFaaZa7BY5aiI";
      const tableIdOrName = "post";
      const token = import.meta.env.VITE_AIRTABLE_APIKEY;

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
              height: "85px",
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
