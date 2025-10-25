#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Aura Auth Backend..."

cd ./backend

# Run migrations
echo "🗄️  Running database migrations..."
npx typeorm migration:run -d dist/infrastructure/user/database/data-source.js || echo "⚠️  Migrations failed or already applied"

# Start the application
echo "✅ Starting server..."
node dist/main
