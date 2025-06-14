<img width="250px" src="https://neon.com/brand/neon-logo-dark-color.svg" />

# Neon Auth Demo App

## Features

- Next.js application with TypeScript
- User authentication powered by Neon Auth
- Database migrations with Drizzle ORM
- Ready-to-deploy configuration for Vercel, Netlify, and Render

## Prerequisites

- [Neon](https://neon.com) account
- Node.js 18+ installed locally

## Local Development Setup

### Clone this repository

Clone this demonstration application and install the dependencies:

```bash
git clone https://github.com/neondatabase-labs/neon-auth-demo-app.git

cd neon-auth-demo-app
npm install
```

### Set up Neon Auth

1. Create or open a [Neon project](https://console.neon.tech/app/projects)
2. Go to **Neon Auth** → **Setup instructions**
3. Click **Set up Auth** to generate your configuration
4. Copy these environment variables to `.env.local`:
   - `NEXT_PUBLIC_STACK_PROJECT_ID`
   - `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
   - `STACK_SECRET_SERVER_KEY`
   - `DATABASE_URL`

![Screenshot of Neon Auth API keys in the console](/images/neon-auth-api-keys.png)

### Set up and run the application

1. Set up the database:

   ```bash
   npm run drizzle:generate  # Generates migrations
   npm run drizzle:migrate   # Applies migrations
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000` to see the application running (check your console for the actual port if 3000 is in use).

   ![Screenshot of the Neon Auth demo application showing the todos interface](/images/neon-auth-todos-app.png)

## Production Setup (Important)

Configure production settings in the Neon Console's Auth Configuration tab, such as domain restrictions.

   ![Screenshot of Neon Auth configuration settings](/images/neon-auth-production-config.png)

## Learn More

- [Neon Auth Documentation](https://neon.com/docs/guides/neon-auth)
- [Stack Auth Documentation](https://docs.stack-auth.com/)

## Authors

- [David Gomes](https://github.com/davidgomes)
- [Pedro Figueiredo](https://github.com/pffigueiredo)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
