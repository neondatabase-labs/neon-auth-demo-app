<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Neon Identity Demo App

## Features

- Next.js application with TypeScript
- User authentication powered by Stack Auth
- Database migrations with Drizzle ORM
- Ready-to-deploy configuration for Vercel, Netlify, and Render

## Prerequisites

- [Neon](https://neon.tech) account
- Node.js 18+ installed locally

## Local Development Setup

### 1. Set up Neon Identity

1. Create a new Neon project or use an existing one
2. Navigate into Neon Identity
3. Click "Connect" and go through the OAuth flow until your Neon Identity integration is set

### 2. Get your Stack Auth keys

1. Navigate to your Stack Auth [project dashboard](https://app.stack-auth.com/projects)
2. Create a new API Key
3. Upon creating the API key, you will receive `NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` and `STACK_SECRET_SERVER_KEY`. Keep these handy for the next steps.

   ![Stack Auth API Key](/images/stack-auth-api-key.png)

### 3. Running the application

1. Clone the repository:

   ```bash
   git clone https://github.com/neondatabase-labs/neon-identity-demo-app.git
   cd neon-identity-demo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with the following variables:

   ```env
   # Stack Auth
   NEXT_PUBLIC_STACK_PROJECT_ID=
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
   STACK_SECRET_SERVER_KEY=

   # Database connections
   DATABASE_URL=              # neondb_owner role connection
   ```

   > Get your Stack Auth keys from your Stack Auth project dashboard.

4. Set up the database:

   ```bash
   npm run drizzle:generate  # Generate migrations
   npm run drizzle:migrate  # Apply migrations
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` to see the application running.

   ![Neon Identity Demo App](/images/neon-identity-todos-app.png)

## Important: Production Setup

1. Upgrade your Stack Auth project to production mode by navigating to the project settings.
   ![Stack Auth Production Mode](/images/stack-auth-production-mode.png)

## Learn More

- [Neon Identity Documentation](https://neon.tech/docs/guides/neon-identity)
- [Stack Auth Documentation](https://docs.stack-auth.com/)

## Authors

- [David Gomes](https://github.com/davidgomes)
- [Pedro Figueiredo](https://github.com/pffigueiredo)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
