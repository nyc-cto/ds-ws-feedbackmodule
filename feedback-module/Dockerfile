# Dockerfile for the backend stub that will simply receive feedback requests from widget
# 1. Use an existing Docker as base
FROM node:alpine

RUN mkdir -p /app

WORKDIR /app


ENV PATH /app/node_modules/.bin:$PATH

RUN npm install yarn
# Download and install a dependency
COPY ./package.json .

RUN npm install --legacy-peer-deps

COPY . .

# Tell the image what to do when it starts as a container

CMD ["npm", "start"]