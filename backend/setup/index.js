const fetch = require("node-fetch");
const uniqid = require("uniqid");
const async = require("async");
const { google } = require("googleapis");

require("dotenv").config();

module.exports = function (context, req) {
  const sendRequest = async (body) => {
    const config = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await fetch(process.env.SETUP_ENDPOINT, config);
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

  context.log("JavaScript HTTP trigger function processed a request.");

  const body = req.body;
  body.id = uniqid();

  if (!body.pagetitle || body.pagetitle === "") {
    errorMsg("Please enter a valid page title.");
  } else if (!body.agency || body.agency === "") {
    errorMsg("Please enter a valid agency name.");
  } else if (!body.emails || body.emails === "") {
    errorMsg("Please enter at least one valid email.");
  }
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const emails = body.emails.split(/\s*(?:,|$)\s*/);
  emails.forEach((email) => {
    if (!re.test(email)) errorMsg(`${email} is not a valid email`);
  });

  const scopes = ["https://www.googleapis.com/auth/drive"];
  const auth = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes
  );

  if (body.method === "spreadsheet") {
    const drive = google.drive({ version: "v3", auth });
    // splits string into emails on zero or more spaces followed by a comma and zero or more spaces
    drive.files.copy(
      {
        fileId: process.env.FILEID,
        resource: { name: `${body.agency} Feedback Module Responses` },
      },
      (err, { data }) => {
        if (err) {
          errorMsg(err);
        }
        body.spreadsheetID = data.id;
        sendRequest(body)
          .then(() => {
            async.eachSeries(emails, (email) => {
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
                  if (err) throw err;
                }
              );
            });
          })
          .catch(errorMsg);
      }
    );
    successMsg();
  } else if (body.method === "excel" || body.method === "email") {
    sendRequest(body).then(successMsg).catch(errorMsg);
    successMsg();
  } else {
    errorMsg("Invalid method.");
  }
};
