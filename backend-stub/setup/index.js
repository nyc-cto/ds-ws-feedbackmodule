const fetch = require("node-fetch");
const uniqid = require("uniqid");
const async = require("async");
const credentials = require("./credentials.json");
require("dotenv").config();

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);
const drive = google.drive({ version: "v3", auth });

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

  if (body.method === "spreadsheet") {
    const emails = req.body.emails.split(", ");
    drive.files.copy(
      {
        fileId: process.env.FILEID,
        resource: { name: req.body.name },
      },
      (err, { data }) => {
        if (err) throw err;
        async.eachSeries(
          emails,
          (email, emailCallback) => {
            drive.permissions.create(
              {
                fileId: data.id,
                sendNotificationEmail: true,
                emailMessage:
                  "Your Feedback Module responses are available to view here. Please do not edit the headers.",
                resource: {
                  role: "writer",
                  type: "user",
                  emailAddress: email,
                },
              },
              (err) => {
                if (err) emailCallback(err);
                else emailCallback();
              }
            );
          },
          (err) => {
            if (err) {
              context.res = {
                status: 500,
                body: `Request error. ${err}`,
              };
            }
          }
        );
      }
    );
  }
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
