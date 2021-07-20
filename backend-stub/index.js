require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app
  .use(cors({ origin: true, credentials: true, methods: ["POST"] }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));
// .use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

const apiCall = async (url, data) => {
  try {
    const config = {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
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
      return data;
    })
    .catch((err) => console.log(err));
});

// For personally identifiable information from the user
app.post("/api/userinfo", (req, res) => {
  console.log(req.body);
});

app.get("/test", (req, res) => {
  return "hello world";
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
