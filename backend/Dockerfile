FROM node:18 AS build
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .




EXPOSE 5000
CMD ["node", "server.js"]