#!/bin/bash

# Aura Auth Frontend Setup Script
# This script installs dependencies and starts the development server

echo "🚀 Aura Auth Frontend Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Installing Yarn..."
    npm install -g yarn
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Yarn. Please install it manually:"
        echo "   npm install -g yarn"
        exit 1
    fi
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Yarn version: $(yarn --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies with Yarn..."
yarn install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        echo "⚠️  .env file not found. Creating from .env.example..."
        cp .env.example .env
        echo "✅ .env file created. Please configure it if needed."
        echo ""
    fi
    
    echo "🎉 Setup complete!"
    echo ""
    echo "To start the development server, run:"
    echo "  yarn dev"
    echo ""
    echo "Or run this script with 'start' argument:"
    echo "  ./setup.sh start"
    echo ""
    
    # If 'start' argument is provided, start the dev server
    if [ "$1" = "start" ]; then
        echo "🚀 Starting development server..."
        yarn dev
    fi
else
    echo ""
    echo "❌ Failed to install dependencies."
    echo "Please check the error messages above."
    exit 1
fi
