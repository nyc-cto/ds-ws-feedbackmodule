# NYC MoCTO Feedback Module

Frustrating online experiences reflect poorly on government, undermining the public’s faith in the capability of their elected officials and public servants to deliver services. In the digital-era, constituents expect governments to offer the same calibre of digital service seen in online banking, or travel. In response, governments are increasingly using various types of user research approaches, including user feedback data, to make services more accountable and transparent, while ensuring that online services resonate with constituents’ heightened expectations of 21st government service provision. 

# About the code

The following are the main folders in this repository

### `feedback-module`

This folder contains the source files for our feedback module. It produces the widget that folks can click in order for them to pull out the feedback module.

### `backend-stub` 

This folder contains a simple backend that accepts any requests from `feedback-module`. It mainly responds `{ "status": "OK"}` or `{ "status": "error", "message": "An error occured"}` on command.

### `webpage`

This is the folder containing an instance of the Landing Page as a Service (LPaaS) service. This would be the landing page dedicated to the feedback module, which will also demo the capabilities of the feedback module. It is run independently from `feedback-module`

# Installation

The project is run via `Docker` so you would need to have docker installed in your system. [Learn how to install docker](https://docs.docker.com/get-docker/)

Once you have installed docker, make sure you have installed `docker-compose` if you have not, [learn how to install docker-compose](https://docs.docker.com/compose/install/)

Once you have installed `docker` and `docker-compose`, run the following command:

```
$ docker-compose up --build
```