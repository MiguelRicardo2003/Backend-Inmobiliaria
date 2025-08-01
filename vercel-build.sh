#!/bin/bash

# Ensure we're using npm
npm config set package-manager npm

# Install dependencies
npm install

# Verify pg is installed
npm list pg

echo "Build completed successfully" 