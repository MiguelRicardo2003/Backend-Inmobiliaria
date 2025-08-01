#!/bin/bash

# Ensure we're using npm
npm config set package-manager npm

# Install dependencies
npm install

# Verify pg is installed
npm list pg

# Verify other critical dependencies
npm list express
npm list sequelize
npm list cors

# Set production environment
export NODE_ENV=production

echo "Build completed successfully" 