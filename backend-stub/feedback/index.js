const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: JSON.stringify(req.body),
  };

  const apiCall = async (url, data) => {
    try {
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
        body: JSON.stringify(data),
      };
      const response = await fetch(url, config);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  apiCall(
    "https://prod-139.westus.logic.azure.com:443/workflows/22b04a18b2d740d9ab30bdaf56912836/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4S70ZyQpmbMCJxFXpEWo3aEeVj4-i7oUlBe-ARQ7snc",
    context.req.body
  )
    .then((data) => {
      data.json();
    })
    .then((response) => context.res.json(response))
    .catch(
      (err) =>
        (context.res = {
          status: 500,
          body: `Request error. ${err}`,
        })
    );
  context.done();
};
