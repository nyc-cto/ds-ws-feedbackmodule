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

  await fetch(
    "https://prod-175.westus.logic.azure.com:443/workflows/f42583989bde435294b19b7b6503fc3e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VJ_vHz6TsvICCtPsL2PGhVL8rOKKpraniK9V35J7FtA",
    config
  )
    .then(() => (context.res = { body: "success!" }))
    .catch(
      (err) =>
        (context.res = {
          status: 500,
          body: `Request error. ${err}`,
        })
    );
};
