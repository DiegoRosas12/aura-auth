#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Aura Auth Backend..."

cd ./backend

# Run migrations
echo "🗄️  Running database migrations..."
node dist/infrastructure/database/data-source.js || echo "⚠️  Migrations failed or already applied"

# Start the application
echo "✅ Starting server..."
node dist/main
