import React, { useState } from "react";
import Button from "./Button";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";

const ResponseForm = (props) => {
  const selectedTopic = props.selectedTopicId;
  console.log(selectedTopic);

  // // USEREF
  //   const responseDescriptionRef = useRef();
  //   const responseNameRef = useRef();
  //   const responseEmailRef = useRef();

  const [resDescription, setResDescription] = useState("");
  const [resName, setResName] = useState("");
  const [resEmail, setResEmail] = useState("");

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
            description: resDescription,
            name: resName,
            email: resEmail,
          },
        },
      ],
    };

    const addReply = async () => {
      // const dogid = breed.id;
      //   const topic = topicRef.current.value;
      //   const description = responseDescriptionRef.current.value;
      //   const name = responseNameRef.current.value;
      //   const email = responseEmailRef.current.value;
      console.log(JSON.stringify(reply));
      //   console.log(description);
      // console.log(id);
      //   console.log(name);
      //   console.log(email);
      //   console.log(topic);
      //   console.log(JSON.stringify(post));

      // AIRTABLE DATA
      const baseId = "appZRFaaZa7BY5aiI";
      const tableIdOrName = "reply";
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
          body: JSON.stringify(reply),
        }
      );

      if (res.ok) {
        //   const newReplyData = await res.json();
        setResDescription("");
        setResName("");
        setResEmail("");
        props.toggleResponseModal();
        props.getReplyData(selectedTopic);

        console.log("hi");

        //   console.log(newReplyData);
      } else {
        console.log("an error has occured");
      }
    };

    addReply();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Reply to a post</h2>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          type="text"
          value={resDescription}
          onChange={(e) => setResDescription(e.target.value)}
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
          value={resName}
          onChange={(e) => setResName(e.target.value)}
          fullWidth
        ></TextField>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          value={resEmail}
          onChange={(e) => setResEmail(e.target.value)}
          fullWidth
        ></TextField>{" "}
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
          margin="16px"
        >
          <Button variant="outlined" onClick={props.toggleResponseModal}>
            close
          </Button>
          <Button onClick={handleResponse}>submit</Button>
        </Stack>
      </div>
    </div>
  );
};

export default ResponseForm;
