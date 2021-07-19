# Dockerfile for the backend stub that will simply receive feedback requests from widget
# 1. Use an existing Docker as base
FROM node:alpine

WORKDIR /usr/app


# Download and install a dependency
COPY ./package.json .

RUN npm install

COPY . .

# Tell the image what to do when it starts as a container

CMD ["npm", "start"]
