require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const uniqid = require("uniqid");
const cors = require("cors");
const { google } = require("googleapis");
const scopes = ["https://www.googleapis.com/auth/drive"];
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

const async = require("async");

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);
const drive = google.drive({ version: "v3", auth });

const app = express();
app
  .use(cors({ origin: true, credentials: true, methods: ["POST"] }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.post("/test", (req, res) => {
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

    await fetch(process.env.SETUP_ENDPOINT, config)
      .then(res.send("success!"))
      .catch((err) => res.send(err));
  };
  const body = req.body;
  body.id = uniqid();
  const emails = body.emails.split(/\s*(?:,|$)\s*/);

  drive.files.copy(
    {
      fileId: "1zNjDpY9iwNS8DJAPEyzagrGK15-JQYyYllaiwO1gu9A",
      resource: { name: req.body.name },
    },
    (err, result) => {
      if (err) throw err;
      async.eachSeries(
        emails,
        (email, callback) => {
          drive.permissions.create(
            {
              fileId: result.data.id,
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
              if (err) callback(err);
              else sendRequest(body);
            }
          );
        },
        (err) => {
          if (err) throw err;
        }
      );
    }
  );
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
