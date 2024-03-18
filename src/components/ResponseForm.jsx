import React, { useState } from "react";
import Button from "./Button";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";

const ResponseForm = (props) => {
  //DECLARE THE SELECTEDTOPICID HERE SO THAT THE RIGHT TOPIC ID IS SENT TO AIRTABLE INSTEAD OF ALL THE TOPIC IDS THAT ARE ON THE PAGE
  const selectedTopic = props.selectedTopicId;
  console.log(selectedTopic);

  const [resDescription, setResDescription] = useState("");
  const [resName, setResName] = useState("");
  const [resEmail, setResEmail] = useState("");

  const handleResponse = async () => {
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
      console.log(JSON.stringify(reply));

      // AIRTABLE DATA
      const baseId = "appZRFaaZa7BY5aiI";
      const tableIdOrName = "reply";
      const token = import.meta.env.VITE_AIRTABLE_APIKEY;

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
        setResDescription("");
        setResName("");
        setResEmail("");
        props.toggleResponseModal();
        props.getReplyData(selectedTopic);
      } else {
        console.log("an error has occured");
      }
    };
    addReply();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Reply to a topic</h2>
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
              height: "85px",
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
