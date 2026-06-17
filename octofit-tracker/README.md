# 🐙 OctoFit Tracker

A modern, multi-tier fitness tracking application built with GitHub Copilot agent mode.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── backend/           # Node.js + Express + TypeScript API
    ├── src/
    ├── package.json
    ├── tsconfig.json
    └── .env.example
```

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Port**: 5173

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB ODM
- **Port**: 8000

### Database
- **MongoDB** - NoSQL database
- **Port**: 27017

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```

The backend API will be available at `http://localhost:8000`

### MongoDB Setup

Ensure MongoDB is running on your machine:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux (Ubuntu)
sudo systemctl start mongod

# Windows
net start MongoDB
```

## Available Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/status` - Application status

## Development

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` in the backend directory for required environment variables.

## License

MIT
