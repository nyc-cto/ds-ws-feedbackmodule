const fetch = require("node-fetch");
const uniqid = require("uniqid");
require("dotenv").config();

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const body = req.body;
  body.id = uniqid();

  const config = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  await fetch(process.env.SETUP_ENDPOINT, config)
    .then(
      () =>
        (context.res = {
          body: "Your feedback module has been generated! Check your email for confirmation and further instructions.",
        })
    )
    .catch(
      (err) =>
        (context.res = {
          status: 500,
          body: `Request error. ${err}`,
        })
    );
};
