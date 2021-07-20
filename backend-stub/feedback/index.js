const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const config = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(req.body),
  };

  await fetch(
    "https://prod-139.westus.logic.azure.com:443/workflows/22b04a18b2d740d9ab30bdaf56912836/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4S70ZyQpmbMCJxFXpEWo3aEeVj4-i7oUlBe-ARQ7snc",
    config
  )
    .then((response) => response.json())
    .then((response) => context.res.json(response))
    .catch(
      (err) =>
        (context.res = {
          status: 500,
          body: `Request error. ${err}`,
        })
    );
};
