const fetch = require("node-fetch");
require("dotenv").config();

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const config = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };

  await fetch(process.env.ENDPOINT, config)
    .then(() => (context.res = { body: "success!" }))
    .catch(
      (err) =>
        (context.res = {
          status: 500,
          body: `Request error. ${err}`,
        })
    );
};
