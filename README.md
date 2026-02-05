# Logistics Animation Platform

Modern logistics platform with animated tracking interface and cost calculator.

## Features

- 📦 Parcel tracking with animated visualization
- 💰 Shipping cost calculator (China → India)
- 📊 User dashboard with profile management
- 🎨 Modern UI with Tailwind CSS and Framer Motion
- 🔐 Session-based authentication (mock for demo)

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5000

### Production Build

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository: `dh7gxucx-max/CHinaIN`
5. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`
6. Add environment variables:
   ```
   SESSION_SECRET=your-secret-here-change-in-production
   NODE_ENV=production
   ```
7. Click "Deploy"

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `dh7gxucx-max/CHinaIN`
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
5. Add environment variables in site settings:
   ```
   SESSION_SECRET=your-secret-here
   NODE_ENV=production
   ```
6. Click "Deploy"

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `dh7gxucx-max/CHinaIN`
4. Add environment variables:
   ```
   SESSION_SECRET=your-secret-here
   NODE_ENV=production
   PORT=5000
   ```
5. Railway will auto-detect and deploy

### Deploy to Render

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub and select `dh7gxucx-max/CHinaIN`
4. Configure:
   - **Name**: china-in-logistics
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables:
   ```
   SESSION_SECRET=your-secret-here
   NODE_ENV=production
   ```
6. Click "Create Web Service"

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express, Node.js
- **Build**: Vite, esbuild
- **Storage**: In-memory (no database required)

## Project Structure

```
.
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities
├── server/          # Backend Express application
│   ├── routes.ts    # API routes
│   └── storage.ts   # In-memory storage
├── shared/          # Shared types and schemas
└── dist/            # Production build output
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `SESSION_SECRET` | Session encryption key | Required in production |

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## Notes

- **No database required**: Uses in-memory storage (data resets on restart)
- **Mock authentication**: Login creates demo user automatically
- **For production**: Consider adding persistent storage (PostgreSQL, MongoDB, etc.)

## License

MIT
