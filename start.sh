#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Aura Auth Backend..."

cd ./backend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm ci
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Run migrations
echo "🗄️  Running database migrations..."
npm run typeorm migration:run -- -d dist/infrastructure/database/data-source.js || echo "⚠️  Migrations failed or already applied"

# Start the application
echo "✅ Starting server..."
npm run start:prod
