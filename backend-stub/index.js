require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app
  .use(cors({ origin: true, credentials: true, methods: ["POST"] }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

const apiCall = async (url, data) => {
  try {
    const config = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// When a user clicks submit, the application creates a post request to the endpoint
app.post("/api/feedback", (req, res) => {
  res.header("Access-Control-Allow-Origin", "true");
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  apiCall(process.env.ENDPOINT, req.body)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

// For personally identifiable information from the user
app.post("/api/userinfo", (req, res) => {
  console.log(req.body);
  apiCall(process.env.USER_RESEARCH_ENDPOINT, req.body)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
