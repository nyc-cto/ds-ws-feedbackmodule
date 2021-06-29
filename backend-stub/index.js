require("dotenv").config();

const express = require("express");
const redis = require("redis");
const fetch = require("node-fetch");

const app = express();
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

app.get("/api/test", () => {
  apiCall(process.env.ENDPOINT, {
    id: "1",
    feedback: "another test!!",
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
