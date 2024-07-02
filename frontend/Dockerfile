FROM node:18 AS build
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .



# Expose port 80
EXPOSE 3000
CMD ["npm", "run", "start"]

