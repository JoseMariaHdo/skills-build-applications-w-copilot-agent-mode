# 🐙 OctoFit Tracker

A modern, multi-tier fitness tracking application built with GitHub Copilot agent mode.

## 🎯 Features

### Fitness Tracking
- **Workouts** - Log and track different types of exercises (cardio, strength, flexibility, sports)
- **Goals** - Set fitness goals with progress tracking and deadlines
- **Statistics** - View comprehensive fitness statistics and progress metrics
- **User Profiles** - Create accounts and manage personal fitness data

### Technical Stack

#### Frontend
- React 19 with TypeScript
- Vite for fast development and production builds
- Responsive UI components
- Port: 5173

#### Backend
- Node.js with Express.js
- TypeScript for type safety
- Mongoose ODM for MongoDB
- RESTful API with comprehensive endpoints
- Port: 8000

#### Database
- MongoDB NoSQL database
- Port: 27017

## 📁 Project Structure

```
octofit-tracker/
├── frontend/                 # React 19 + Vite application
│   ├── src/
│   │   ├── main.tsx         # Entry point
│   │   ├── App.tsx          # Root component
│   │   └── styles/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── Workout.ts
│   │   │   └── Goal.ts
│   │   ├── services/        # Business logic
│   │   │   ├── WorkoutService.ts
│   │   │   └── GoalService.ts
│   │   ├── routes/          # API endpoints
│   │   │   ├── workouts.ts
│   │   │   └── goals.ts
│   │   ├── scripts/         # Utility scripts
│   │   │   └── seed.ts      # Database seeding
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── setup.sh                  # Automated setup script
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Automated Setup

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Manual Setup

#### 1. Install Dependencies

**Backend:**
```bash
cd octofit-tracker/backend
npm install
```

**Frontend:**
```bash
cd octofit-tracker/frontend
npm install
```

#### 2. Start MongoDB

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux (Ubuntu)
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### 3. Seed the Database

```bash
cd octofit-tracker/backend
npm run seed
```

This will populate the database with:
- 3 sample users (Alex, Jordan, Casey)
- 7 sample workouts with various types and intensities
- 7 sample fitness goals with different target metrics

#### 4. Start the Backend

```bash
cd octofit-tracker/backend
npm run dev
```

Backend will be available at `http://localhost:8000`

#### 5. Start the Frontend

```bash
cd octofit-tracker/frontend
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Health & Status
- `GET /api/health` - Health check
- `GET /api/status` - Application status

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/stats` - Get workout statistics
- `GET /api/workouts/recent` - Get recent workouts
- `GET /api/workouts/:id` - Get specific workout
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `POST /api/workouts/:id/complete` - Mark workout as completed

### Goals
- `GET /api/goals` - Get all goals
- `GET /api/goals/stats` - Get goal statistics
- `GET /api/goals/active` - Get active goals
- `GET /api/goals/:id` - Get specific goal
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `PATCH /api/goals/:id/progress` - Update goal progress
- `DELETE /api/goals/:id` - Delete goal

## 🗂️ Sample Data

After running `npm run seed`, the database contains:

### Users
1. **Alex Johnson** - alex@example.com (Marathon runner)
2. **Jordan Smith** - jordan@example.com (Yoga enthusiast)
3. **Casey Williams** - casey@example.com (Cyclist)

### Workouts
- Morning runs and strength training
- Yoga sessions
- Cycling adventures
- Various durations and intensities

### Goals
- Distance goals (marathon, cycling)
- Weight loss targets
- Strength benchmarks
- Workout frequency goals
- Calorie burn targets

## 🔧 Development

### Backend Commands
```bash
cd octofit-tracker/backend

# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Production start
npm start

# Linting
npm run lint

# Database seeding
npm run seed
```

### Frontend Commands
```bash
cd octofit-tracker/frontend

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🗄️ Environment Variables

### Backend (.env)
```
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
```

## 📊 Data Models

### User
- Email (unique, required)
- Name (required)
- Password (required)
- Avatar URL
- Bio
- Timestamps

### Workout
- User ID (reference)
- Title and description
- Type (cardio, strength, flexibility, sports, other)
- Duration (minutes)
- Calories burned
- Intensity (low, moderate, high)
- Exercises array
- Completion status
- Timestamps

### Goal
- User ID (reference)
- Title and description
- Goal type (weight, distance, time, calories, workouts, other)
- Target and current values
- Unit of measurement
- Deadline
- Status (active, completed, abandoned)
- Progress percentage (calculated)
- Timestamps

## 🤝 Contributing

This is an exercise project for building applications with GitHub Copilot agent mode.

## 📝 License

MIT

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on port 27017
- Check connection string in `.env`
- Verify MongoDB is installed and started

### Port Already in Use
- Backend (8000): `lsof -i :8000` then `kill -9 <PID>`
- Frontend (5173): `lsof -i :5173` then `kill -9 <PID>`

### Seed Script Fails
- Ensure MongoDB is running
- Check database URI in `.env`
- Clear collections before reseeding

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [React 19 Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Vite Documentation](https://vitejs.dev/)
