const fetch = require("node-fetch");
require("dotenv").config();

module.exports = function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const successMsg = () => {
    context.res = {
      status: 200,
      body: "Your submission was successful!",
    };
    context.done();
  };

  const errorMsg = (err) => {
    context.res = {
      status: 500,
      body: `Request error. ${err}`,
    };
    context.done();
  };

  const config = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };

  fetch(process.env.ENDPOINT, config)
    .then((res) =>
      res.status === 202 ? successMsg() : errorMsg(JSON.stringify(res.body))
    )
    .catch(errorMsg);
};
