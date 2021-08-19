# Table of Contents

- [Table of Contents](#table-of-contents)
- [NYC MoCTO Feedback Module](#nyc-mocto-feedback-module)
- [About the code](#about-the-code)
  - [`feedback-module`](#feedback-module)
  - [`backend`](#backend-stub)
  - [`homepage`](#homepage)
- [Initial setup for agency webmasters](#initial-setup-for-agency-webmasters)
  - [Setup via the command line interface](#setup-via-the-command-line-interface)
    - [`method`](#method)
    - [`emails`](#emails)
    - [`agency`](#agency)
  - [Spreadsheets](#spreadsheets)
    - [Organization of feedback](#organization-of-feedback)
- [Embedding the module in your website](#embedding-the-module-in-your-website)
  - [Static Website](#static-website)
  - [React](#react)
  - [Attributes](#attributes)
    - [`id`](#id)
    - [`lang`](#lang)
    - [endpoint](#endpoint)
    - [gaID](#gaid)
    - [`theme`](#theme-attribute)
- [Setting up your own instance of the module](#setting-up-your-own-instance-of-the-module)
  - [System Requirements](#system-requirements)
    - [Docker](#docker)
    - [Excel Spreadsheet Templates](#excel-spreadsheet-templates)
    - [Google Sheets Spreadsheet Templates](#google-sheets-spreadsheet-templates)
    - [Microsoft Flow](#microsoft-flow)
    - [Google Drive API](#google-drive-api)
    - [Azure](#azure)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Building the module locally](#building-the-module-locally)
  - [Testing the local build of your module](#testing-the-local-build-of-your-module)
    - [Static website (`.html`)](#static-website-html)
    - [React](#react)
  - [Key features](#key-features)
    - [Common Components](#common-components)
    - [Constants](#constants)
  - [Objects](#objects)
    - [Feedback Type Object](#feedback-type-object)
    - [Input Response Object](#input-response-object)
    - [Form Response Object](#form-response-object)
  - [API](#api)
    - [`/api/feedback`](#api-feedback-post)
    - [`/api/userResearch`](#api-userresearch-post)
    - [`/api/setup`](#api-setup-post)
  - [Updating the Module](#updating-the-module)
    - [Adding Languages for Internationalization](#adding-languages-for-internationalization)
    - [Adding a Screen](#adding-a-screen)
    - [Updating the Module’s Questions](#updating-the-module’s-questions)
    - [Changing Styles](#changing-styles)
    - [Theming](#theming)
    - [Style Overrides](#style-overrides)
    - [Exporting Styles](#exporting-styles)
  - [Publishing module updates](#publishing-module-updates)
- [Google Analytics Tracking](#google-analytics-tracking)
  - [What we are tracking](#what-we-are-tracking)
  - [Pageview](#pageview)
  - [Events](#events)
  - [Updating tracking events](#updating-tracking-events)

# [NYC MoCTO Feedback Module](#nyc-mocto-feedback-module)

Frustrating online experiences reflect poorly on government, undermining the public’s faith in the capability of their elected officials and public servants to deliver services. In the digital-era, constituents expect governments to offer the same calibre of digital service seen in online banking, or travel. In response, governments are increasingly using various types of user research approaches, including user feedback data, to make services more accountable and transparent, while ensuring that online services resonate with constituents’ heightened expectations of 21st government service provision.

# [About the code](#about-the-code)

The following are the main folders in this repository

### [`feedback-module`](#feedback-module)

This folder contains the source files for our feedback module. It produces the widget that folks can click in order for them to pull out the feedback module.

### [`backend`](#backend-stub)

The backend is built using Azure Functions. There are currently two endpoints at `/api/feedback`, which handles all feedback from the feedback module, and `/api/userResearch`, which handles all personal information from the user research form. To edit these functions, modify the files at `/backend-stub/feedback/index.js `and `/backend-stub/userResearch/index.js`.

### [`homepage`](#homepage)

This is the folder containing an instance of the Landing Page as a Service (LPaaS) service. This would be the landing page dedicated to the feedback module, which will also demo the capabilities of the feedback module. It is run independently from `feedback-module`

# [Initial setup for agency webmasters](#initial-setup-for-agency-webmasters)

As an agency webmaster you can follow these instructions to set up how you will receive and store the feedback received on your site.

Note: you only need to go through this setup once when you are initially embedding the module into your site

## [Setup via the command line interface](#setup-via-the-command-line-interface)

You will enter this command into a new terminal window in order to spin up a new feedback storage system for your site: (everything is bold you need to update with your specific information)

```
$ curl -d '{"method": "spreadsheet", "emails": "email@gmail.com", "agency": "Agency"}' -H 'Content-Type: application/json' "https://ctofeedback.azurewebsites.net/api/setup"
```

### [`method`](#method)

Your preferred method for storing feedback.

**Method options:**

<table>
<tr>
<td><strong>method key</strong>
</td>
<td><strong>description</strong>
</td></tr>

<tr>
<td><code>spreadsheet</code>
</td>
<td>If you choose the method “spreadsheet”, you will be emailed the link to a google spreadsheet that will store all of your feedback.
</td></tr>

<tr>
<td><code>excel</code>
</td>
<td>If you choose the method “excel”, you will be emailed a link to an excel spreadsheet which will store your feedback data.
</td></tr>

<tr>
<td><code>email</code>
</td>
<td>If you choose the method “email”, then every time a user submits feedback, an email will be sent to the designated email address with their particular feedback
</td></tr>

</table>

### [`emails`](#emails)

The email that will receive the link to the spreadsheet or will receive future feedback if your method is “email.” To include multiple emails, put them in a comma-separated list (e.g. `"emails": "email1@cto.nyc.gov, email2@cto.nyc.gov"`)

### [`agency`](#agency)

Your agency name.

## [Spreadsheets](#spreadsheets)

If you choose to receive feedback either from a google or excel spreadsheet, the data will be stored the same way. The spreadsheet will have 4 different sheets: “data1”, “data2”, “data3” (pictured below) are used to store responses to the different categories of feedback, and “interactions” is used to store the amount of times each feedback button was clicked. The feedback is separated into these sheets depending on the category of feedback the user is giving (feedback_type). For example, if the user chooses the initial option “I couldn't find what I was looking for” their feedback will appear on the data1 sheet, but if the user were to have chosen “I have other feedback on this page or website” then their feedback would be saved on the data3 sheet.

![spreadsheet setup](/documentation/assets/sheets.jpg)

**NOTE:** You should not edit the column headers or the sheet tab labels on the template unless you also edit the corresponding labels in `feedback-module/src/lib/constants.js` and/or the inputObjects variable in the “Feedback Flow HTTP” Microsoft Flow.

### [Organization of feedback](#organization-of-feedback)

**Timestamp:** Time that the user submitted their feedback.

**Feedback Type:** The category of feedback that the user submitted (this will be the same for every entry on a sheet but will be different across sheets).

**Checked Options:** This will be a comma separated list of all the different checkboxes that the user checked.

**Inputs:** Each input text box will have its own column within the spreadsheet. The title of that column will be the question and the user’s inputs for that question will be saved within that column.

**Source:** The user’s window location when they submit their feedback.

# [Embedding the module in your website](#embedding-the-module-in-your-website)

While you may embed your widget anywhere in your website, we recommend embedding it above your footer.

## [Static Website](#static-website)

Add the following code into your .html file:

```
<div  id="feedback-widget"  lang="<your language>"  pageTitle="<your page name>"  endpoint="<your unique id>"  gaID="<your google analytics (ga4) measurement ID>"></div>
<script  src="https://d2ttz3as5y3dj0.cloudfront.net/feedback-module.min.js"></script>
```

## [React](#react)

In your console, run the following line:

```

$ cd path/to/your/project && npm install react-script-tag

```

Add this line to the top of the file you want to embed your module in:

```
$ import ScriptTag from "react-script-tag";
```

Add the following code into your desired file:

```
<div id="feedback-widget" lang="<your language>" endpoint="<your unique id>" gaID="<your google analytics (ga4) measurement ID>"> theme="default"></div>
<ScriptTag src="https://d2ttz3as5y3dj0.cloudfront.net/feedback-module.min.js" type="text/javascript" />
```

If using i18next for Internationalization in your website:

1. Add the line `import { useTranslation } from "react-i18next";` to the top of your file.

2. In your component, add the line `const { i18n } = useTranslation();`

3. Modify your div’s lang attribute: `lang={i18n.language}`

## [Attributes](#attributes)

### [`id`](#id)

Setting the `id` attribute to `"feedback-widget"` sets the div as your container for the module. **DO NOT modify this field.**

### [`lang`](#lang)

The `lang` attribute determines the language of your module based on a two-letter locale. The feedback module currently supports English (`en`) and Spanish (`es`). If a language is not currently supported by the feedback module, it will default to English. If your website dynamically changes languages, set this value to your dynamic language code.

### [endpoint](#endpoint)

The `endpoint` attribute is the unique ID for your agency, created during the initial module setup.

### [gaID](#gaid)

The `gaID` attribute is the unique google analytics measurement ID for your agency. To find this ID go into your Google Analytics account and look for the` Admin` tab. Then choose `Data Streams`, find your particular project, and copy the `Measurement ID` in the top right hand corner of the page.

### [`theme`](#theme-attribute) (optional)

The `theme` attribute is the unique google analytics measurement ID for your agency. To find this ID go into your Google Analytics account and look for the` Admin` tab. Then choose `Data Streams`, find your particular project, and copy the `Measurement ID` in the top right hand corner of the page.

# [Setting up your own instance of the module](#setting-up-your-own-instance-of-the-module)

## [System Requirements](#system-requirements)

### [Docker](#docker)

The project is run locally via `Docker` so you would need to have docker installed in your system. [Learn how to install docker](https://docs.docker.com/get-docker/)

Once you have installed docker, make sure you have installed `docker-compose` if you have not, [learn how to install docker-compose](https://docs.docker.com/compose/install/)

### [Excel Spreadsheet Templates](#excel-spreadsheet-templates)

Download the following spreadsheet templates and upload them to your OneDrive files. We recommend creating a folder for storing the Feedback Module files.

1. [Feedback_Module_Dev_Template.xlsx](/documentation/spreadsheet_templates/Feedback_Module_Dev_Template.xlsx) - the spreadsheet that manages all agency feedback responses, based on their unique ID’s, response collection method, and response endpoints.
2. [User_Research_Responses_Template.xlsx](/documentation/spreadsheet_templates/User_Research_Responses_Template.xlsx) - the spreadsheet that stores all users who sign up to be part of future user research testing. This file contains sensitive user information and should be secure.
3. [Excel_Template.xlsx](/documentation/spreadsheet_templates/Excel_Template.xlsx) - the template for storing feedback responses. This file will be duplicated during initial client setup whenever a user selects Excel as their feedback response storage method.

### [Google Sheets Spreadsheet Templates](#google-sheets-spreadsheet-templates)

Download the following spreadsheet templates and upload them to Google Drive. We recommend creating a folder for storing the Feedback Module files.

1. [Google_Sheets_Template.xlsx](/documentation/spreadsheet_templates/Google_Sheets_Template.xlsx) - the template for storing feedback responses. This file will be duplicated during initial client setup whenever a user selects Excel as their feedback response storage method.

Once you have uploaded the file, double click on it to open it. In order to use the file as a Google Sheets file in Microsoft Flow, click “File” and “Save as Google Sheets”:

![Spreadsheet template example file](/documentation/assets/save_as_sheets.jpg)

### [Microsoft Flow](#microsoft-flow)

[Microsoft Flow](https://us.flow.microsoft.com/en-us/) is used to process feedback responses and information from the user research form through requests made from Azure functions. Note: you will need a premium license for the purposes of this project.

**Flow Templates:**
In order to get started, download the necessary templates. You may modify these to meet your needs later, if necessary.

1. Initial Client Setup Flow
2. Feedback Flow
3. User Research Flow

**Importing templates:**

1. Download a template here.
2. Once logged into Microsoft Flow, click on “My Flows” on the left-hand menu.
3. In the top-left of the main interface, click “Import”.
   ![Microsoft Flow import page](/documentation/assets/ms_import.jpg)
4. When prompted to choose a package to import, click “Upload” and select the .zip file.
5. Once the .zip file is uploaded, click “Import.”
6. For each resource type under “Related resources,” click “Select during import.”
7. Click on your connection, or create a new one by clicking “Create new,” and press “Save.” Repeat until all related resources have green check marks next to them.
   ![Microsoft Flow new connection](/documentation/assets/import_setup.jpg)
8. Click on “Open Flow”
   ![Microsoft Flow open flow link](/documentation/assets/open_flow.jpg)

**Modifying the Initial Client Setup Flow**

1. Click on the Client Set-Up template in “My Flows” and press “Edit.”
2. In the “Get File Content” action, click on the folder icon in the “File” field and select your “Feedback Template.xlsx” file from OneDrive. [See this section if you have not created this file already](#excel-spreadsheet-templates).
3. In Switch > Case 2 > Create File 2, click on the folder icon in the “Folder Path” field and select your desired destination folder for the template duplicates created during setup.
4. Hit “Save”

**Modifying the Feedback Flow**

1. Click on the Feedback Flow HTTP template in “My Flows” and press “Edit.”
2. In the “Get a Row” action, click on the folder icon in the “File” field and select your “Feedback Module Dev.xlsx” file from OneDrive. [See this section if you have not created this file already](#excel-spreadsheet-templates).
3. In Switch > Case 2 > List Files in Folder, click on the folder icon in the “Folder” field and select the destination folder for agency Excel spreadsheets (should be the same folder as step 3 of “Modifying the Initial Client Setup Flow.”)
4. In Switch > Case 3 > List Files in Folder 2, click on the folder icon in the “Folder id” field and select the destination folder for agency Google Sheets spreadsheets.
5. Hit “Save”

**Modifying the User Research Flow**

1. Click on the User Research Flow template in “My Flows” and press “Edit.”
2. In the “Add a row into a table” action, click on the folder icon in the “File” field and select your “User Research Responses.xlsx” file from OneDrive. [See this section if you have not created this file already](#excel-spreadsheet-templates).
3. Hit “Save”

### [Google Drive API](#google-drive-api)

Google Drive API is used to create and share Google Sheets spreadsheets for storing feedback responses that use the “spreadsheet” method. Follow these steps to set up your API configuration:

1. Log into [https://console.cloud.google.com/](https://console.cloud.google.com/).
2. Create a new project by clicking “Select a project” and then “New project”
   ![Creating a new Google Drive API project](/documentation/assets/new_project.jpg)
3. Click the 3 lines in the top left corner and click “APIs & Services”
4. In the left-hand menu, click “Library” and search for “Google Drive API,” then click on this option in the search results.
5. Click “Enable”
6. Click APIs & Services > Credentials
7. Click “Create Credentials” and select “Service account”
8. Enter your desired service account name and click “Create and Continue,” then “Done”
9. Under APIs & Services > Credentials, click on your newly created service account
10. Share the Google Drive folder you created to store agency spreadsheets with the service account email (should have the format [your-service-account-name@your-project-name.iam.gserviceaccount.com](mailto:your-service-account-name@your-project-name.iam.gserviceaccount.com)) and give it editing permissions.
11. Click the “Keys” tab and click “Add key” then “Create a new key”
12. Select JSON as the key type and click “Create”
13. Save the newly-created JSON file to your computer

### [Azure](#azure)

The feedback module uses a running proxy server via Node.js Azure functions as a middleware for user feedback.
[Learn how to configure GitHub Actions workflows for static web apps](https://docs.microsoft.com/en-us/azure/static-web-apps/github-actions-workflow).
[Learn how to set up Azure functions](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node).
[Learn how to set up CI/CD for your Azure function via GitHub](https://docs.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment).

Once you have set up your continuous deployment using GitHub Actions, your Azure functions and static deployment will automatically be updated on each of the triggers in the `.github/workflows` folder. In `.github/workflows/<your Azure Function App name>.yml`, update the `AZURE_FUNCTIONAPP_PACKAGE_PATH` in `env` to the path to your backend directory (if you decide to use this project’s default backend configuration, it should be` AZURE_FUNCTIONAPP_PACKAGE_PATH: "./backend"`.)

In your Azure Function project, add the following environment variables:

- `ENDPOINT` - Microsoft Flow HTTP Request endpoint for the feedback response flow
- `USER_RESEARCH_ENDPOINT` - Microsoft Flow HTTP Request endpoint for the feedback response flow
- `SETUP_ENDPOINT` - Microsoft Flow HTTP Request endpoint for the initial client setup flow
- `CLIENT_EMAIL` - Your Google Drive API service account email, created in [this step](#google-drive-api)
- `PRIVATE_KEY` - The “private_key” field from the JSON file, created in [this step](#google-drive-api)
- `FILEID` - The ID of your “Feedback Template” Google Sheets file, created in [this step](#google-sheets-spreadsheet-templates). Your file ID is the string of letters and numbers between the /d/ and /edit in your file URL (https://docs.google.com/spreadsheets/d/< your file ID >/edit)

## [Installation](#installation)

Clone this repository to your local files:

```
$ git clone https://github.com/nyc-cto/feedback-module.git && cd feedback-module
```

For the most updated version of the feedback module, pull from the dev branch:

```
$ git checkout -b dev
$ git pull origin dev
```

Install any necessary dependencies:

```
$ cd feedback-module && npm install && cd ..
$ cd backend-stub && npm install && cd ..

```

Move a project you want to test the feedback module on into your newly-created directory.

## [Configuration](#configuration)

Once you have copied your desired project into this directory, configure your docker file by running this command:

```
$ cp docker-compose.yml.template docker-compose.yml
```

In this new `docker-compose.yml` file, replace any instance of `your-path` with your project's path name.

Configure your Makefile by running this command:

```
$ cp Makefile.template Makefile
```

In this new `Makefile` file, replace any instance of `your-path` with your project's path name. Note: for a React project, your path should lead to the public folder of your project.

Configure your React environment by running the following commands:

```
$ echo REACT_APP_BACKEND_ENDPOINT=https://your-azure-function.azurewebsites.net > feedback-module/.env.local
$ echo "REACT_APP_BACKEND_ENDPOINT=https://ctofeedback.azurewebsites.net
REACT_APP_CSS_PATH=/main.css" > feedback-module/.env.local
```

In your `.gitignore` file update `/your-path` on line 4 with your project's pathname.

If you are embedding the module in a React project, run `cp feedback-module/Dockerfile &lt;your-path>/Dockerfile`, replacing with the path to your React project.

## [Building the module locally](#building-the-module-locally)

Once you have installed `docker` and `docker-compose`, run the following command:

```
$ docker-compose up --build
```

Once this has finished running, run `make build`.

## [Testing the local build of your module](#testing-the-local-build-of-your-module)

### [Static website (`.html`)](#static-website-html)

Add the following code into your project:

```
<div id="feedback-widget" lang="en" endpoint="<your unique id>"></div>
<script src="./feedback-module.min.js"></script>
```

### [React](#react)

In your console, run the following line:

```
$ cd path/to/your/project && npm install react-script-tag
```

Add this line to the top of the file you want to embed your module in:

```
$ import ScriptTag from "react-script-tag";
```

Add the following code into your project:

```
<div id="feedback-widget" lang={<your page's current language>} endpoint="<your unique id>"></div>
<ScriptTag src="/feedback-module.min.js" type="text/javascript" />
```

## [Key features](#key-features)

### [Common Components](#common-components)

**ModuleButton (`feedback-module/src/components/common/Button.js`)**

<table><tr><td><strong>Prop</strong></td><td><strong>Description</strong></td><td><strong>Description</strong></td></tr>
<tr><td><code>buttonText</code></td><td>The label displayed on the button</td><td><code>string | undefined</code></td></tr>
<tr><td><code>onClick</code></td><td>The function that gets called when a user clicks on a button</td><td><code>((event: MouseEvent&lt;HTMLButtonElement, MouseEvent>) => void) | undefined</code></td></tr>
<tr><td><code>networkError</code></td><td>Determines whether or not an error alert is displayed next to the button. Only true if a user tried to submit a form but the request failed to go through</td><td><code>boolean | undefined</code></td></tr>
<tr><td><code>className</code></td><td>Adds additional styling to the button</td><td><code>string | undefined</code></td></tr>
</table>

**ModuleCheckbox (`feedback-module/src/components/common/Checkbox.js`)**

<table><tr><td><strong>Prop</strong></td><td><strong>Description</strong></td><td><strong>Description</strong></td></tr>
<tr><td><code>label</code></td><td>The label displayed next to the checkbox</td><td><code>string | undefined</code></td></tr>
<tr><td><code>onCheck</code></td><td>The function that gets called when a user checks the checkbox</td><td><code>((event: ChangeEvent&lt;HTMLInputElement>) => void) | undefined</code></td></tr>
<tr><td><code>id</code></td><td>The id of the checkbox</td><td><code>string | undefined</code></td></tr>
<tr><td><code>firstCheckRef</code></td><td>A reference to the first checkbox on the page, which gets focused when there is an error associated with the checkboxes or when a new screen appears</td><td><code>string | RefObject&lt;HTMLInputElement> | ((instance: HTMLInputElement | null) => void) | null | undefined</code></td></tr>
<tr><td><code>defaultChecked</code></td><td>Determines whether or not the checkbox should already appear to be checked upon load</td><td><code>boolean | undefined</code></td></tr>
</table>

**ErrorAlert (`feedback-module/src/components/common/ErrorAlert.js`)**

<table><tr><td><strong>Prop</strong></td><td><strong>Description</strong></td><td><strong>Description</strong></td></tr>
<tr><td><code>errorText</code></td><td>The error message to be displayed.</td><td><code>string | undefined</code></td></tr>
<tr><td><code>id</code></td><td>The unique id of the alert</td><td><code>string | undefined</code></td></tr>
<tr><td><code>className</code></td><td>Adds additional styling to the button</td><td><code>string | undefined</code></td></tr>
</table>

**Textbox (`feedback-module/src/components/common/Textbox.js`)**

<table><tr><td><strong>Prop</strong></td><td><strong>Description</strong></td><td><strong>Description</strong></td></tr>
<tr><td><code>label</code></td><td>The label displayed above the input field.</td><td><code>string | undefined</code></td></tr>
<tr><td><code>type</code></td><td>The type of the textbox. If the value is textarea, the module will return a USWDS TextArea component. Otherwise, the module will return a USWDS TextInput component with the type set to the type value.</td><td><code>"textarea" | "number" | "text" | "tel" | "url | "email" | "search" | "password"</code></td></tr>
<tr><td><code>id</code></td><td>The id of the text input or textarea and the htmlFor attribute of the label.</td><td><code>string | undefined</code></td></tr>
<tr><td><code>className</code></td><td>Adds additional styling to the button</td><td><code>string | undefined</code></td></tr>
<tr><td><code>onChange</code></td><td>The function that gets called when a user updates the input field.</td><td><code>((event: ChangeEvent&lt;HTMLInputElement>) => void) | undefined</code></td></tr>
<tr><td><code>required</code></td><td>Determines whether the input field is required</td><td><code>boolean</code></td></tr>
<tr><td><code>describedBy</code></td><td>Identifies the element</td><td><code>string | undefined</code></td></tr>
<tr><td><code>invalid</code></td><td>Indicates whether or not the input entered is valid</td><td><code>boolean | undefined</code></td></tr>
<tr><td><code>inputRef</code></td><td>Helps determine which input box should be focused</td><td><code>TextInputRef</code></td></tr>
<tr><td><code>showErrors</code></td><td>A function that determines whether or not to show an error alert above the input box displayed</td><td><code>((index: any) => JSX.Element) | undefined</code></td></tr>
</table>

**LoadingSpinner (`feedback-module/src/components/common/LoadingSpinner.js`)**

<table><tr><td><strong>Prop</strong></td><td><strong>Description</strong></td><td><strong>Description</strong></td></tr>
<tr><td><code>className</code></td><td>Adds additional styling to the button</td><td><code>string | undefined</code></td></tr>
<tr><td><code>overlay</code></td><td>Determines if the loader should appear as three dots and the module should retain its previous height</td><td><code>boolean | undefined</code></td></tr>
</table>

### [Constants](#constants)

The module’s screens, questions, and endpoint for sending requests are set by the `feedback-module/src/lib/constants.js` file.

**`ENDPOINTS`**
The different endpoints that the user can send form data to. These should match the API endpoints from your Azure functions, set by the folder names in `backend`.

**`THEMES`**
The different themes that a user has defined. These should match the values in the `$themes` variable (see [this section](#changing-styles).)

**`FORM_EVENTS`**
Events that will be tracked by google analytics when a form is submitted. The property name for each form event object should match an endpoint from your ENDPOINTS array.

**`INITIAL_SCREEN`**
The first screen (taken from your SCREENS array) which will be displayed to the user.

**`TEXTAREA_MAX_CHAR`**
The maximum number of characters accepted in an input box of type textarea.

**`OTHER_MAX_CHAR`**
The maximum number of characters accepted in the input box that appears when the user checks “Other”.

**`SCREENS`**
The configuration for each of the screens of the module.To add a screen, create a new property in your screen For more detailed instructions on setting the questions see the “[Updating the Module’s Questions](#updating-the-module’s-questions)” section.

**Screen Properties**

<table><tr><td><strong>Property</strong></td><td><strong>Description</strong></td><td><strong>Example Value</strong></td></tr>
<tr><td><code>title</code></td><td>The title of the screen, referencing the title property of the translation file.</td><td><code>"feedbackType.title"</code></td></tr>
<tr><td><code>titleInverse</code></td><td>The title of a screen (displayed with white text on a dark background), referencing the title property of the translation file.</td><td><code>"feedbackResults.title"</code></td></tr>
<tr><td><code>buttons</code></td><td>An array of objects configuring the buttons on the screen. Each button object has the following properties:
<p>
<code>type</code> - Determines whether the button acts as a submit button (right-aligned) or form button (left-aligned. Possible values are “<code>form</code>” and “<code>submit</code>”.
<p>
<code>text</code> - The button’s label, referencing a property in your translation file.
<p>
<code>nextScreen</code> - The key of the next screen to be displayed when the button is clicked
<p>
<code>feedbackID</code> (optional) - The key of the spreadsheet tab to host the user’s response from the following screens. Do not change these values unless the spreadsheet tab keys are also changed.</td><td><code>
[<br />&emsp;
{<br />&emsp;&emsp;
type: "form",<br />&emsp;&emsp;
text: "missing.initialBtn",<br />&emsp;&emsp;
nextScreen: "missing_info",<br />&emsp;&emsp;
feedbackID: "data1",<br />&emsp;&emsp;
},<br />&emsp;
{<br />&emsp;&emsp;
type: "form",<br />&emsp;&emsp;
text: "broken.initialBtn",<br />&emsp;&emsp;
nextScreen: "broken",<br />&emsp;&emsp;
feedbackID: "data2",<br />&emsp;
},<br />&emsp;
{<br />&emsp;&emsp;
type: "form",<br />&emsp;&emsp;
text: "other.initialBtn",<br />&emsp;&emsp;
nextScreen: "other",<br />&emsp;&emsp;
feedbackID: "data3",<br />&emsp;
},<br />
]</code></td></tr>
<tr><td><code>checkboxes</code></td><td>An object representing all of the checkbox labels and whether or not they’re required.
<p>
<code>labels</code> - A reference to an array of checkbox labels in the translation files.
<p>
<code>required</code> - A boolean representing whether or not at least one checkbox must be checked.</td><td><code>{ labels: "missing.checkboxes", required: true }</code></td></tr>
<tr><td><code>textInputs</code></td><td>A reference to an array of objects representing the input fields in the translation files.</td><td><code>"broken.textInputs"</code></td></tr>
<tr><td><code>formID</code></td><td>The ID of the form used to determine which Azure endpoint the screen’s data should be saved to. This ID should match one of the endpoints in your ENDPOINTS array.</td><td><code>"feedback"</code></td></tr>
<tr><td><code>plainText</code></td><td>Supplementary text on the page, referencing a plainText property in the translation file.</td><td><code>"feedbackResults.plainText"</code></td></tr>
</table>

## [Objects](#objects)

### [Feedback Type Object](#feedback-type-object)

<table><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td></tr>
<tr><td>feedbackID</td><td>String</td><td>The key of the spreadsheet tab to host the user’s feedback submission.</td></tr>
<tr><td>label</td><td>String</td><td>The label of the feedback type. Default options include `I couldn’t find what I was looking for`, `Something appears to be broken or inaccurate`, `I have other feedback on this page or website</td></tr>
</table>
 
**Example Object:**
```
{
  "label": "I couldn't find what I was looking for",
  "feedbackID": "data1"
}
```
### [Input Response Object](#input-response-object)
<table><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td></tr>
<tr><td>question</td><td>String</td><td>The question that labels an input box.</td></tr>
<tr><td>answer</td><td>String</td><td>The user’s response in the input box.</td></tr>
</table>
**Example Object:**

```
{
  "question": "What were you looking for or trying to do?",
  "answer": "I was trying to navigate this page."
}
```

### [Form Response Object](#form-response-object)

<table><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td></tr>
<tr><td>checkedOptions</td><td>Array (String)</td><td>The checkbox options selected by the user.</td></tr>
<tr><td>inputResponses</td><td>Array (<a  href="#input-response-object">Input Response Object</a>)</td><td>Input questions and the user’s responses to them.</td></tr>
<tr><td>feedbackType (Optional)</td><td><a  href="#feedback-type-object">Feedback Type Object</a></td><td>The type of feedback response, if the submission is from a feedback form.</td></tr>
<tr><td>source</td><td>String</td><td>The URL of the website that the form submission came from.</td></tr>
<tr><td>interaction</td><td>Boolean</td><td>`true` if the button pressed has type “form” (is only meant to track an interaction), and `false` if the button pressed has type “submit.”</td></tr>
</table>

**Example Object:**

```
{
	"feedbackType": {
		"label": "I couldn't find what I was looking for",
		"feedbackID": "data1"
	},
	"checkedOptions": [
		"I wasn't sure where to look",
		"I was confused by the information I found"
	],
	"inputResponses": [
		{
			"question": "What were you looking for or trying to do?",
			"answer": ""
		},
		{
			"question": "Would you like to add anything else?",
			"answer": ""
		}
],
	"interaction": "false",
	"source": "http://localhost:3000/"
}

```

## [API](#api)

The base URL of the Feedback Module API is [https://ctofeedback.azurewebsites.net](https://ctofeedback.azurewebsites.net). However, this base URL will be different if you set up your own Azure functions.

### [`/api/feedback`](#api-feedback-post) `POST`

**Body Params:**

<table>
<tr>
<td><strong>Property</strong>
</td>
<td><strong>Type</strong>
</td>
<td><strong>Description</strong>
</td></tr>
<tr>
<td><code>id</code>
</td>
<td><code>String</code>
</td>
<td>The ID of the agency that the feedback should be submitted to.
</td></tr>
<tr>
<td><code>feedback</code>
</td>
<td><code><a  href="#form-response-object">Form Response Object</a></code>
</td>
<td>The user’s feedback form submission.
</td></tr>
</table>

**Example Request:**

```
{
  "id": "abcd1234",
  "feedback": {
    "feedbackType": {
      "label": "I couldn't find what I was looking for",
      "feedbackID": "data1"
    },
    "checkedOptions": [
      "I wasn't sure where to look",
      "I was confused by the information I found"
    ],
    "inputResponses": [
      {
        "question": "What were you looking for or trying to do?",
        "answer": ""
      },
      {
        "question": "Would you like to add anything else?",
        "answer": ""
      }
    ],
    "interaction": "false",
    "source": "http://localhost:3000/"
  }
}

```

**Response:**

**`200` `OK`**

```
{
  "id": "abcd1234",
  "feedback": {
    "feedbackType": {
      "label": "I couldn't find what I was looking for",
      "feedbackID": "data1"
    },
    "checkedOptions": [
      "I wasn't sure where to look",
      "I was confused by the information I found"
    ],
    "inputResponses": [
      {
        "question": "What were you looking for or trying to do?",
        "answer": ""
      },
      {
        "question": "Would you like to add anything else?",
        "answer": ""
      }
    ],
    "interaction": "false",
    "source": "http://localhost:3000/"
  }
}
```

**`500` `Bad Request`**

```

Request Error. {Reason for error}

```

### [`/api/userResearch`](#api-userresearch-post) `POST`

**Body Params:**

<table>
<tr>
<td><strong>Property</strong>
</td>
<td><strong>Type</strong>
</td>
<td><strong>Description</strong>
</td></tr>
<tr>
<td><code>id</code>
</td>
<td><code>String</code>
</td>
<td>The ID of the agency module from which the user research response came from.
</td></tr>
<tr>
<td><code>userResearch</code>
</td>
<td><code><a  href="#form-response-object">Form Response Object</a></code>
</td>
<td>The user’s user research form submission.
</td></tr>
</table>

**Example Request:**

```
{
  "id": "xedh26krnxt1ti",
  "userResearch": {
    "checkedOptions": [],
    "inputResponses": [
      {
      "question": "Your name",
      "answer": "John Smith"
      },
      {
      "question": "Your email",
      "answer": "johnsmith@cto.nyc.gov"
      },
      {
      "question": "Your phone number",
      "answer": ""
      }
    ],
    "interaction": "false",
    "source": "http://localhost:3000/"
  }
}
```

**Response:**
**`200` `OK`**

```
{
  "id": "xedh26krnxt1ti",
  "userResearch": {
    "checkedOptions": [],
    "inputResponses": [
      {
        "question": "Your name",
        "answer": "John Smith"
      },
      {
        "question": "Your email",
        "answer": "johnsmith@cto.nyc.gov"
      },
      {
        "question": "Your phone number",
        "answer": ""
      }
    ],
    "interaction": "false",
    "source": "http://localhost:3000/"
  }
}

```

**`500` `Bad Request`**

```

Request Error. {Reason for error}

```

### [`/api/setup`](#api-setup-post) `POST`

**Body Params:**

<table>
<tr>
<td><strong>Property</strong>
</td>
<td><strong>Type</strong>
</td>
<td><strong>Description</strong>
</td></tr>
<tr>
<td><code>method</code>
</td>
<td><code>String</code>
</td>
<td>Your preferred method for storing feedback. Possible values: `spreadsheet`, `excel`, `email`
</td></tr>
<tr>
<td><code>emails</code>
</td>
<td><code>String</code>
</td>
<td>The email that will receive the link to the spreadsheet or will receive future feedback if your method is “email.” To include multiple emails, put them in a comma-separated list (e.g. <code>"emails": "email1@cto.nyc.gov, email2@cto.nyc.gov"</code>)
</td></tr>
<tr>
<td><code>agency</code>
</td>
<td><code>String</code>
</td>
<td>Your agency name.
</td></tr>
</table>

**Example Request:**

```
{
  "method": "excel",
  "emails": "email1@cto.nyc.gov, email2@cto.nyc.gov",
  "agency": "Agency"
}
```

**Response:**

**`200` `OK`**

```
The feedback module for MOCTO has been generated! Check your email for confirmation and further instructions.

```

**`500` `Bad Request`**

```
Request Error. Please enter a valid agency name.

```

## [Updating the Module](#updating-the-module)

**NOTE: **To edit the module, you should avoid editing code in `feedback-module/components` directly. Instead, you should adjust the configurations in `feedback-module/lib/constants.js.`

### [Adding Languages for Internationalization](#adding-languages-for-internationalization)

1. Create a new folder in `feedback-module/src/translations`, named with your desired language code: `mkdir feedback-module/src/translations/&lt;your-language-code>`.
2. Copy the file `feedback-module/src/translations/en/translations.js` to your newly created folder: `cp feedback-module/src/translations/en/translation.js feedback-module/src/translations/&lt;your-language-code>`.
3. In your new `translation.js` file, change the const name to `TRANSLATIONS_&lt;YOUR-LANGUAGE-CODE>` and change the strings for each property to the translated versions in your new language.
4. Import the new file at the top of your `i18n.js` file (e.g. `import { TRANSLATIONS_&lt;your-language-code> } from "./translations/&lt;your-language-code>/translations";`).
5. Add the new language in the `resources` of your `i18n.js` file.

### [Adding a Screen](#adding-a-screen)

To add a screen, you will need to add a new object to the `SCREENS` variables in `feedback-module/src/assets/constants.js`, named with the key you want to use to reference your screen. For example, the `feedback_type: { … }` is an object that can be referenced using the key `feedback_type`. Edit the configuration of your new object to add text, questions, buttons, etc. For more details about the configuration options. See [this section](#constants).

To set your new screen as the starting screen of the module, edit the initial state of the screen state in `feedback-module/src/assets/constants.js`. Set the variable `INITIAL_SCREEN = SCREENS.your_screen_key`

To set your new screen to display when a button is clicked, update the button’s `nextScreen` field with your screen’s key:

```
buttons: [
  { type: "submit", text: "submitBtn", nextScreen: "your_screen_key" },
],
```

### [Updating the Module’s Questions](#updating-the-module’s-questions)

1. Choose a `translation.js` file within `feedback-module/src/translations`
2. Each file is broken down into smaller objects which contain all the information for one specific page (ie. the initial choice the user made to reach this page, the title displayed on the page, any additional text, and all the feedback questions)
3. To add or remove one of the checkbox options, simply add a string to the array titled “checkboxes”
4. Note: if an object contains a checkbox array, the title displayed is the question the user is answering via the checkboxes
5. To add or remove a short answer question, add an object within the “textInputs” array 2. Object format:
   ```
   {
    type: the type of the input box (ie. textarea, tel, email, etc …)
    text: the question displayed above the textbox
   }
   ```
6. Note: any updates made to one `translation.js` file should be made to all of them

### [Changing Styles](#changing-styles)

Note: none of the theming and styling that you alter for the module will impact the theming and styling within your webpage.

### [Theming](#theming)

To edit the module’s theme styling, update the `$themes` variable in `feedback-module/src/styles/abstracts/_variables.scss`.

To add a new theme, add the theme to the `THEMES` array in `feedback-module/src/lib/constants.js` and create a new list of values in `$themes`, and assign each of the following values:

1. `feedback-primary` - used as the text color for `.usa-checkbox, .usa-label, .usa-input, .usa-textarea, .usa-checkbox__label, .usa-textarea, .usa-input, .feedback-module__plaintext, .usa-button:hover, .feedback-module__heading--default, .usa-hint`, the background color for `.feedback-module__header, .usa-button, .usa-checkbox__input:checked + .usa-checkbox__label::before, .feedback-module__main--inverse`, the border color for `.usa-button:hover, .usa-textarea, .usa-input`, and the fill color for `.overlay__spinner`
2. `feedback-inverse` - used as the background color for `.feedback-module, .usa-button:hover, .usa-textarea, .usa-input, .usa-button:hover, .overlay, .usa-textarea, .usa-input`
3. `feedback-inverse-lighter` - used as the background color for `.usa-input:focus, .usa-textarea:focus`
4. `feedback-error-accent` - used as the background color for `.usa-alert:before`
5. `feedback-error-base` - used as the background color for `.usa-alert--error`
6. `feedback-error-contrast` - used as the color for `.usa-hint`
7. `feedback-contrast` - used as the color for `.usa-button, .feedback-module__heading--inverse` and the background color for `.usa-checkbox__label::before`
8. `feedback-checkbox-border`
9. `feedback-checkbox-svg` - should be given a value returned by the `checkbox` function, with a parameter of the hex string for the svg’s fill color
10. `feedback-logo` - should be given a value returned by the `logo` function, with a parameter of the hex string for the svg’s fill color

### [Style Overrides](#style-overrides)

In general, avoid modifying the styles in `feedback-module/src/styles/components` and `feedback-module/src/styles/_base.scss` directly. To override styles, create a `_reset.scss` file within feedback-module/src/styles and add your additional styling there. Then, add `@import "reset"` as the last line in the `#feedback-module` selector of `feedback-module/src/styles/import.scss`

Feedback module styles use the sass @extend method. We are extending the styles from the USWDS styling classnames. For a full list of the available USWDS styles look through the options [here](https://designsystem.digital.gov/utilities/).

Note: some of the applied USWDS styles are applied directly to the component itself via the className prop.

The feedback module uses mobile-first styling. To add style-overrides for mobile-lg or larger screens, use the `mobile-lg` mixin, providing your desired class names as arguments (e.g. `@include mobile-lg("font-sans-lg");`)

### [Exporting Styles](#exporting-styles)

If you want to use any particular theme styles (most commonly our theme colors) anywhere outside of a `.scss` file make sure to include it within the `:export` included in the `feedback-module/src/styles/export.module.scss `file. To then use this style within a javascript file, make sure to include the line “`import styles from feedback-module/src/styles/export.module.scss" `at the top of your file. Then within your code you will just call `styles.variableName` to reference a particular style.

## [Publishing module updates](#publishing-module-updates)

This section will explain how to publish changes to your module and

1. Run `make build` with your latest updates.
2. Create an [Amazon AWS Cloudfront](https://aws.amazon.com/cloudfront/) account.
3. Follow [these instructions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html) to upload the static folder and main.css files generated by your build.
4. After uploading these files, change the `REACT_APP_CSS_PATH` variable in `feedback-module/.env.production.local` from `/main.css` to `https://&lt;your-distribution-domain-name>.cloudfront.net/main.css`.
5. Run `make build` again
6. Upload your updated feedback-module.min.js file to your newly-created Cloudfront bucket.
7. Update any instances of the old Cloudfront distribution domain name to your new one.

# [Google Analytics Tracking](#google-analytics-tracking)

When you initially set up your feedback module, you will be given a Google Analytics 4 Measurement ID and credentials so that you can view specific events and information about the module and your site. Just as with all the #feedback_widget attributes, you will enter your specific measurement id in the gaID attribute field.

### [What we are tracking](#what-we-are-tracking)

### [Pageview](#pageview)

The pageview event is automatically triggered by Google Analytics. We have slightly altered this event so it does not just send the overall page title (your website’s title) but it also sends the title of the different screens of the feedback module that have been visited.

To view this metric go into `Reports` → `Life cycle` → `Engagement` → `Pages and screens`. Here you can view how many times each screen of the feedback module was completed. This will give you a good metric of where users are dropping off of the module.

### [Events](#events)

<table>
<tr>
<td><strong>Event</strong>
</td>
<td><strong>Description</strong>
</td>
<td><strong>Custom Parameters</strong>
</td></tr>
<tr>
<td><code>page_change</code>
</td>
<td>This event will be trigger every time the user clicks a button on a screen and is sent to the next screen
</td>
<td><code>Current_page_title: </code>the title of the user’s page before they clicked the button <code> </code>
<p>
<code>Next_page: </code>the title of the page that the user will be redirected to
</td></tr>
<tr>
<td><code>future_research</code>
</td>
<td>This event will be triggered if the user completes the form with their contact information for future feedback
</td>
<td><code>Event_label: </code>“user agreed to participate in research in the future”
</td></tr>
<tr>
<td><code>module_viewed</code>
</td>
<td>This event is triggered if the module was seen by the user. This metric can be helpful because you can consider if one of the reasons that feedback is not being submitted is whether or not the user even viewed the module in the first place.
</td>
<td><code>Event_label: </code>“module appeared on user screen”
</td></tr>
</table>

### [Updating tracking events](#updating-tracking-events)

All of the google analytics events are stored as utility functions within the `feedback-module/src/lib/hooks/googleAnalytics.js` file. To create a new event just add another exportable function to this file. To actually trigger this new event, call your new function within the feedback module when you want the event triggered.

The trackFormAction event is a series of different events which will be triggered whenever a form is submitted to the backend. The details for these events are stored in the `feedback-module/src/lib/constants.js` file. To add an event, create a new object within the `FORM_EVENTS` object. The name of this object should be connected to one of the `formID's` inside one of your screen objects. This connection tells your code when to trigger this specific event (upon which form submission).
