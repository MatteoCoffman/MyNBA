# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code
COPY frontend/ .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NAME World

# Run app.js when the container launches
CMD ["npm", "start"]
