import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import workoutRoutes from './routes/workouts';
import goalRoutes from './routes/goals';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: '🐙 OctoFit Tracker Backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    name: 'OctoFit Tracker Backend',
    version: '0.0.1',
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// API Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The route ${req.originalUrl} does not exist`,
  });
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`📊 MongoDB URI: ${mongoUri}`);
  console.log(`\n📚 API Documentation:`);
  console.log(`   Workouts: GET/POST /api/workouts`);
  console.log(`   Goals: GET/POST /api/goals`);
  console.log(`   Health: GET /api/health`);
  console.log(`   Status: GET /api/status`);
});
