require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const { google } = require("googleapis");
const scopes = ["https://www.googleapis.com/auth/drive"];
const credentials = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_EMAIL,
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

const apiCall = async (url, data) => {
  try {
    const config = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

app.post("/test", (req, res) => {
  const emails = req.body.emails.split(/\s*(?:,|$)\s*/);
  const permissions = emails.map((email) => {
    return {
      role: "reader",
      type: "user",
      emailAddress: email,
    };
  });
  drive.files.copy(
    {
      fileId: process.env.FILEID,
      resource: { name: req.body.name },
    },
    (err, { data }) => {
      if (err) throw err;
      console.log(emails);
      async.eachSeries(
        permissions,
        (permission, permissionCallback) => {
          drive.permissions.create(
            {
              fileId: data.id,
              sendNotificationEmail: true,
              emailMessage:
                "Your Feedback Module responses are available to view. To view responses for different questions, click on the tabs at the bottom of the spreadsheet",
              resource: permission,
            },
            (err) => {
              if (err) permissionCallback(err);
              else permissionCallback();
            }
          );
        },
        (err) => {
          if (err) throw err;
          else res.send("success!");
        }
      );
    }
  );
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
