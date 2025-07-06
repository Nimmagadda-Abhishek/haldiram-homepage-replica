#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# 1. Build the frontend
echo "📦 Building frontend..."
npm run build

# 2. Install production dependencies for server
echo "📦 Installing server dependencies..."
cd server
npm install --production
cd ..

# 3. Create deployment package
echo "📦 Creating deployment package..."
mkdir -p deploy
cp -r dist deploy/
cp -r server deploy/
cp package.json deploy/
cp README.md deploy/
cp .env.example deploy/
cp Dockerfile deploy/
cp docker-compose.yml deploy/

# 4. Create a zip file
echo "📦 Creating zip archive..."
zip -r deploy.zip deploy/

# 5. Clean up
echo "🧹 Cleaning up..."
rm -rf deploy/

echo "✅ Deployment package created: deploy.zip"
echo "📋 Next steps:"
echo "  1. Upload deploy.zip to your server"
echo "  2. Unzip the package"
echo "  3. Configure .env file with your production settings"
echo "  4. Start the server with 'npm start' or using Docker"