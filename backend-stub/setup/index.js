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

  if (body.method === "spreadsheet") {
    // splits string into emails on zero or more spaces followed by a comma and zero or more spaces
    const emails = body.emails.split(/\s*(?:,|$)\s*/);
    console.log(emails);
    drive.files.copy(
      {
        fileId: process.env.FILEID,
        resource: { name: `${body.agency} Feedback Module Responses` },
      },
      (err, { data }) => {
        if (err) throw err;
        body.spreadsheetID = data.id;
        async.eachSeries(
          emails,
          (email, emailCallback) => {
            drive.permissions.create(
              {
                fileId: data.id,
                sendNotificationEmail: true,
                emailMessage:
                  "Your Feedback Module responses are available to view. To view responses for different questions, click on the tabs at the bottom of the spreadsheet",
                resource: {
                  role: "reader",
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
