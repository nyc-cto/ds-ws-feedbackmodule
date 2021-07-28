# NYC MoCTO Feedback Module

Frustrating online experiences reflect poorly on government, undermining the public’s faith in the capability of their elected officials and public servants to deliver services. In the digital-era, constituents expect governments to offer the same calibre of digital service seen in online banking, or travel. In response, governments are increasingly using various types of user research approaches, including user feedback data, to make services more accountable and transparent, while ensuring that online services resonate with constituents’ heightened expectations of 21st government service provision.

# About the code

The following are the main folders in this repository

### `feedback-module`

This folder contains the source files for our feedback module. It produces the widget that folks can click in order for them to pull out the feedback module.

### `backend`

This folder contains a simple backend that accepts any requests from `feedback-module`. It mainly responds `{ "status": "OK"}` or `{ "status": "error", "message": "An error occured"}` on command.

### `homepage`

This is the folder containing an instance of the Landing Page as a Service (LPaaS) service. This would be the landing page dedicated to the feedback module, which will also demo the capabilities of the feedback module. It is run independently from `feedback-module`

# Installation

The project is run via `Docker` so you would need to have docker installed in your system. [Learn how to install docker](https://docs.docker.com/get-docker/)

Once you have installed docker, make sure you have installed `docker-compose` if you have not, [learn how to install docker-compose](https://docs.docker.com/compose/install/)

# Configuration

Once you have copied your desired project into this directory, configure your docker file by running this command:

```
cp docker-compose.yml.template docker-compose.yml
```

Replace the pathnames with your project's pathnames.

Configure your Makefile by running this command:

```
cp Makefile.template Makefile
```

Replace the pathnames with your project's pathname.

Create a `.env` file with a variable `ENDPOINT` set to your Microsoft Flow endpoint.

In your `.gitignore` file update /your-path on line 2 with your project's pathname.

If you are embedding the module in a React project, run `cp feedback-module/Dockerfile <your-path>/Dockerfile`, replacing <your-path> with the path to your React project.

# Running the module

Once you have installed `docker` and `docker-compose`, run the following command:

```
$ docker-compose up --build
```

Once this has finished running, run `make build`.

# Embedding the module

## Static website (`.html`)

Add the following code into your project:

```
<link rel="stylesheet" href="main.css" />
<div id="feedback-widget" lang="en" pagetitle="<your page name>" endpoint="<your unique id>"></div>
<script src="./feedback-module.min.js"></script>
```

## React

```
cd path/to/your/project && npm install react-script-tag
```

Add this line to the top of the file you want to embed your module in:

```
import ScriptTag from "react-script-tag";
```

Add the following code into your project:

```
<link rel="stylesheet" href="/main.css" />
<div
  id="feedback-widget"
  lang={<your page's current language>}
  title="<your page name>"
  endpoint="<your unique id>"
></div>
<ScriptTag src="/feedback-module.min.js" type="text/javascript" />
```
