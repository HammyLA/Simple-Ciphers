# Use Node 22 (or any stable version you prefer)
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app
RUN npm run build

# Expose the port your app runs on (Vite runs on 5173 by default)
EXPOSE 5173

# Run the app in development mode
CMD ["npm", "run", "dev"]
