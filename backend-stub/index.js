require("dotenv").config();

const express = require("express");
const redis = require("redis");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// const client = redis.createClient({
//   host: "redis-server",
//   port: 6379,
// });

// client.set("visit", "0");

// app.get("/", (req, res) => {
//   client.get("visit", (err, visit) => {
//     client.set("visit", parseInt(visit) + 1);
//     res.send("Number of visits is " + visit);
//   });
// });

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
  console.log(req.body);
  apiCall(process.env.ENDPOINT, {
    id: "1",
    feedback: req.body.feedback,
  })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
});

// For personally identifiable information from the user
app.post("/api/userinfo", (req, res) => {
  console.log(req.body);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
