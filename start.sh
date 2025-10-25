#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Aura Auth Backend..."

# Run migrations
echo "🗄️  Running database migrations..."
cd backend && yarn migration:run:prod

# Start the application
echo "✅ Starting server..."
node backend/dist/main.js
