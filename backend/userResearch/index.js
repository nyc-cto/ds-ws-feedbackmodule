const fetch = require("node-fetch");
require("dotenv").config();

module.exports = function (context, req) {
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

  const successMsg = () => {
    context.res = {
      body: "Your feedback module has been generated! Check your email for confirmation and further instructions.",
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

  fetch(process.env.USER_RESEARCH_ENDPOINT, config)
    .then((res) => (res.ok ? successMsg() : errorMsg(JSON.stringify(res.body))))
    .catch(errorMsg);
};
