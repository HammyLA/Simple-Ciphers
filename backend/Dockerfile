# Nodejs version as a base
FROM node:22-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Install Prisma globally
RUN npm install -g prisma

# Copy the backend code
COPY . .

# Run Prisma migration before starting the server
RUN prisma migrate deploy

# Expose the port the backend will run on
EXPOSE 5003

# Start the express server
CMD ["npm", "run", "dev"]
