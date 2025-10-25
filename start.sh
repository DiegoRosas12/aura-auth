#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Aura Auth Backend..."

# Run migrations
echo "🗄️  Running database migrations..."
npm run typeorm migration:run -- -d dist/infrastructure/database/data-source.js

# Start the application
echo "✅ Starting server..."
node dist/main
