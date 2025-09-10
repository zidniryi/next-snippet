# Docker Setup for PostgreSQL

This project uses Docker to run PostgreSQL for local development.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm installed

## Quick Start

1. **Start PostgreSQL with Docker:**
   ```bash
   docker-compose up -d
   ```

2. **Wait for PostgreSQL to be ready:**
   ```bash
   # Check if the container is healthy
   docker-compose ps
   ```

3. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Docker Commands

### Start PostgreSQL
```bash
docker-compose up -d
```

### Stop PostgreSQL
```bash
docker-compose down
```

### View PostgreSQL logs
```bash
docker-compose logs postgres
```

### Access PostgreSQL directly
```bash
docker-compose exec postgres psql -U postgres -d snippets_db
```

### Reset the database (removes all data)
```bash
docker-compose down -v
docker-compose up -d
npx prisma migrate dev --name init
```

## Database Configuration

The PostgreSQL container is configured with:
- **Database:** `snippets_db`
- **Username:** `postgres`
- **Password:** `password`
- **Port:** `5432`
- **Host:** `localhost` (when accessing from your application)

## Environment Variables

The `.env` file contains:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/snippets_db?schema=public"
```

## Troubleshooting

### Port 5432 already in use
If you have PostgreSQL already running on port 5432, you can change the port in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Use port 5433 instead
```
Then update your `.env` file:
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/snippets_db?schema=public"
```

### Container won't start
Check the logs:
```bash
docker-compose logs postgres
```

### Database connection issues
Make sure the container is running and healthy:
```bash
docker-compose ps
```

The health check should show "healthy" status.
