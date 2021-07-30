require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const uniqid = require("uniqid");
const cors = require("cors");

const async = require("async");

const app = express();
app
  .use(cors({ origin: true, credentials: true, methods: ["POST"] }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
