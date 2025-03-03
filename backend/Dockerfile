# Nodejs version as a base
FROM node:22-alpine

# Set working directory in the container
WORKDIR /app

# copy package.json and isntall dependency
COPY package*.json ./
RUN npm install

# Copy the backend code
COPY . .

# Expose the port the backend will run on
EXPOSE 5000

# Start the express server
CMD ["npm", "run", "dev"]