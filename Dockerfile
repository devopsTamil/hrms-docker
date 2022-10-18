#Fetching base image from registry
FROM node:latest

#Setting up the working directory
WORKDIR /usr/src/app

#Installing the dependencies for angualr project
RUN npm install -g @angular/cli
RUN npm install -g json-server

#Copying all project files into 
COPY . .

RUN npm install