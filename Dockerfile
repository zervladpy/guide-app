# Use an official Node.js image as the base
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /guide-app

# Install dependencies (you can do this in the development stage too, or as part of your `npm run dev` command)
COPY ./package*.json ./
RUN npm install

# Copy all the files (except those ignored by .dockerignore)
COPY . .

# Command to run Next.js in development mode
ENTRYPOINT ["npm", "run", "dev"]