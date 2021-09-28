require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const uniqid = require("uniqid");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const async = require("async");

const app = express();
app
  .use(
    rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 100,
      message: "You exceeded 100 requests per hour limit!",
      headers: true,
    })
  )
  .use(cors({ origin: true, credentials: true, methods: ["POST"] }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
