# Deploy to Vercel with PostgreSQL

This guide will help you deploy your Next.js application with PostgreSQL to Vercel.

## 🚀 Quick Deployment Steps

### 1. Set up PostgreSQL Database

Choose one of these PostgreSQL services:

#### Option A: Vercel Postgres (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or go to your existing project
3. Go to the "Storage" tab
4. Click "Create Database" → "Postgres"
5. Choose a name for your database
6. Copy the connection string

#### Option B: Supabase (Free tier available)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string

#### Option C: Railway
1. Go to [Railway](https://railway.app)
2. Create a new project
3. Add PostgreSQL service
4. Copy the connection string

#### Option D: Neon
1. Go to [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string

### 2. Deploy to Vercel

#### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
# Paste your PostgreSQL connection string when prompted
```

#### Method 2: GitHub Integration
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings

### 3. Configure Environment Variables

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add the following variables:

```
DATABASE_URL = your_postgresql_connection_string
```

**Example connection strings:**
```
# Vercel Postgres
postgres://default:password@ep-xxx.us-east-1.postgres.vercel-storage.com/verceldb

# Supabase
postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

# Railway
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway

# Neon
postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb
```

### 4. Run Database Migrations

After deployment, you need to run migrations on your production database:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy

# Or using Prisma directly (if you have the connection string)
DATABASE_URL="your_production_connection_string" npx prisma migrate deploy
```

### 5. Verify Deployment

1. Check your Vercel deployment URL
2. Test creating, viewing, and editing snippets
3. Check the database in your PostgreSQL service dashboard

## 🔧 Configuration Files

### vercel.json
```json
{
  "buildCommand": "prisma generate && next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "next dev"
}
```

### package.json scripts
Make sure your package.json has:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

## 🐛 Troubleshooting

### Build Failures
- Ensure `prisma generate` runs during build
- Check that all environment variables are set
- Verify PostgreSQL connection string format

### Database Connection Issues
- Check if your PostgreSQL service allows connections from Vercel IPs
- Verify connection string format
- Ensure database is accessible from the internet

### Migration Issues
- Run `npx prisma migrate deploy` after deployment
- Check migration status with `npx prisma migrate status`

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in your project settings
- Monitor performance and errors

### Database Monitoring
- Use your PostgreSQL service's built-in monitoring
- Set up alerts for connection issues

## 🔄 CI/CD Pipeline

For automatic deployments:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Push to main branch triggers automatic deployment
4. Run migrations after each deployment

## 💡 Best Practices

1. **Use connection pooling** for production
2. **Set up database backups**
3. **Monitor database performance**
4. **Use environment-specific configurations**
5. **Test migrations in staging first**

## 🆘 Support

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [PostgreSQL on Vercel](https://vercel.com/docs/storage/vercel-postgres)
