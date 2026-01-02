# Project README

API Documentation: See [API.md](API.md) for detailed endpoint information.

Postman Documentation: https://documenter.getpostman.com/view/27071391/2sBXVcjsGA

## Project Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory and add:

   ```
   API_KEY=your-secret-api-key-here
   PORT=3000

   # Database configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your-db-username
   DB_PASSWORD=your-db-password
   DB_DATABASE=your-db-name
   DB_SYNCHRONIZE=true # Auto-sync schema in dev (disable in prod)
   ```

   Ensure PostgreSQL is running and the database exists.

3. **Run the application:**

   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## Features

- Modular NestJS architecture with TypeORM for PostgreSQL.
- Input validation using class-validator.
- API key authentication.
- Request logging middleware.
- Auto-seeding of initial products on startup.
