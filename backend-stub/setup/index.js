const fetch = require("node-fetch");
const uniqid = require("uniqid");
const async = require("async");
require("dotenv").config();

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const body = req.body;
  body.id = uniqid();

  const credentials = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CERT_URL,
  };

  if (body.method === "spreadsheet") {
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      scopes
    );
    const drive = google.drive({ version: "v3", auth });
    // splits string into emails on zero or more spaces followed by a comma and zero or more spaces
    const emails = body.emails.split(/\s*(?:,|$)\s*/);
    console.log(emails);
    drive.files.copy(
      {
        fileId: process.env.FILEID,
        resource: { name: `${body.agency} Feedback Module Responses` },
      },
      (err, { data }) => {
        if (err) {
          context.res = {
            status: 500,
            body: `Request error. ${err}`,
          };
        }
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
  } else {
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
  }
};
