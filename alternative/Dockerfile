# Use an official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Copy the rest of the project
COPY . .

# Install dependencies
RUN npm install

# Build the project
RUN npm run build