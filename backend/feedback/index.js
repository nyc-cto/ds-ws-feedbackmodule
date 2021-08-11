const fetch = require("node-fetch");
require("dotenv").config();

module.exports = function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const successMsg = () => {
    context.res = {
      status: 200,
      body: JSON.stringify(req.body),
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
    .then((res) => (res.ok ? successMsg() : errorMsg(JSON.stringify(res.body))))
    .catch(errorMsg);
};
