# Dockerfile for Tohfae web application
# Use lightweight node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Build project
RUN npm run build

# Expose port
EXPOSE 8000

# Start app
CMD ["npm", "start"]
