# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the server dependencies
RUN npm install

# Copy the rest of the server's source code to the container
COPY . .

# Expose the server port (e.g., 5000)
EXPOSE 8800

# Start the server
CMD ["npm", "start"]
