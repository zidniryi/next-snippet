#!/bin/bash

# Deploy to Vercel with PostgreSQL
echo "🚀 Deploying to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
vercel whoami > /dev/null 2>&1 || vercel login

# Deploy to Vercel
echo "📦 Deploying application..."
vercel --prod

# Set up environment variables
echo "🔧 Setting up environment variables..."
echo "Please enter your PostgreSQL connection string:"
read -p "DATABASE_URL: " DATABASE_URL

if [ ! -z "$DATABASE_URL" ]; then
    vercel env add DATABASE_URL
    echo "✅ Environment variable added!"
else
    echo "⚠️  No DATABASE_URL provided. Please add it manually in Vercel dashboard."
fi

echo "🎉 Deployment complete!"
echo "📝 Next steps:"
echo "1. Run database migrations: npx prisma migrate deploy"
echo "2. Test your application at the provided URL"
echo "3. Check Vercel dashboard for logs and monitoring"
