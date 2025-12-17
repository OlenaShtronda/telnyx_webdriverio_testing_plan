# Use official Node image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ../package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Expose port for Allure server (optional)
EXPOSE 8080

# Default command: run all tests
CMD ["npm", "run", "test:docker:all"]