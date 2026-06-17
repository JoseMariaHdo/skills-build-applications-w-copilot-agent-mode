import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Workout } from '../models/Workout';
import { Goal } from '../models/Goal';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Workout.deleteMany({});
    await Goal.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample users
    const users = await User.insertMany([
      {
        email: 'alex@example.com',
        name: 'Alex Johnson',
        password: 'hashed_password_123',
        bio: 'Fitness enthusiast and marathon runner',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        email: 'jordan@example.com',
        name: 'Jordan Smith',
        password: 'hashed_password_456',
        bio: 'Yoga and strength training lover',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        email: 'casey@example.com',
        name: 'Casey Williams',
        password: 'hashed_password_789',
        bio: 'Cyclist and outdoor adventure seeker',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ]);

    console.log('👥 Created 3 sample users');

    // Create sample workouts for Alex
    const workoutsAlexData = [
      {
        userId: users[0]._id,
        title: 'Morning Run',
        description: 'Easy 5K run in the park',
        type: 'cardio',
        duration: 30,
        caloriesBurned: 350,
        intensity: 'moderate',
        exercises: [
          {
            name: 'Running',
            distance: 5,
          },
        ],
        completed: true,
        completedAt: new Date('2026-06-16'),
      },
      {
        userId: users[0]._id,
        title: 'Upper Body Strength',
        description: 'Chest, back, and arms workout',
        type: 'strength',
        duration: 60,
        caloriesBurned: 450,
        intensity: 'high',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 80 },
          { name: 'Pull-ups', sets: 3, reps: 10 },
          { name: 'Dumbbell Rows', sets: 3, reps: 10, weight: 25 },
          { name: 'Bicep Curls', sets: 3, reps: 12, weight: 15 },
        ],
        completed: true,
        completedAt: new Date('2026-06-17'),
      },
      {
        userId: users[0]._id,
        title: 'Evening Yoga',
        description: 'Relaxing evening yoga session',
        type: 'flexibility',
        duration: 45,
        caloriesBurned: 150,
        intensity: 'low',
        exercises: [
          { name: 'Vinyasa Flow' },
          { name: 'Child Pose' },
          { name: 'Downward Dog' },
        ],
        completed: false,
      },
    ];

    const workoutsAlex = await Workout.insertMany(workoutsAlexData);
    console.log('💪 Created 3 workouts for Alex');

    // Create sample workouts for Jordan
    const workoutsJordanData = [
      {
        userId: users[1]._id,
        title: 'Yoga Flow',
        description: 'Morning vinyasa flow',
        type: 'flexibility',
        duration: 60,
        caloriesBurned: 200,
        intensity: 'moderate',
        exercises: [
          { name: 'Vinyasa Flow', duration: 45 },
          { name: 'Savasana', duration: 15 },
        ],
        completed: true,
        completedAt: new Date('2026-06-17'),
      },
      {
        userId: users[1]._id,
        title: 'Leg Day',
        description: 'Lower body strength workout',
        type: 'strength',
        duration: 50,
        caloriesBurned: 400,
        intensity: 'high',
        exercises: [
          { name: 'Squats', sets: 4, reps: 10, weight: 100 },
          { name: 'Lunges', sets: 3, reps: 12, weight: 20 },
          { name: 'Leg Press', sets: 3, reps: 8, weight: 150 },
          { name: 'Calf Raises', sets: 3, reps: 15 },
        ],
        completed: true,
        completedAt: new Date('2026-06-16'),
      },
    ];

    const workoutsJordan = await Workout.insertMany(workoutsJordanData);
    console.log('💪 Created 2 workouts for Jordan');

    // Create sample workouts for Casey
    const workoutsCaseyData = [
      {
        userId: users[2]._id,
        title: 'Long Distance Cycling',
        description: 'Weekend bike ride on scenic route',
        type: 'cardio',
        duration: 120,
        caloriesBurned: 900,
        intensity: 'moderate',
        exercises: [
          {
            name: 'Cycling',
            distance: 40,
          },
        ],
        completed: true,
        completedAt: new Date('2026-06-15'),
      },
      {
        userId: users[2]._id,
        title: 'Mountain Biking',
        description: 'Technical trail riding',
        type: 'sports',
        duration: 90,
        caloriesBurned: 700,
        intensity: 'high',
        exercises: [
          {
            name: 'Mountain Biking',
            distance: 25,
          },
        ],
        completed: true,
        completedAt: new Date('2026-06-17'),
      },
    ];

    const workoutsCasey = await Workout.insertMany(workoutsCaseyData);
    console.log('💪 Created 2 workouts for Casey');

    // Create sample goals for Alex
    const goalsAlexData = [
      {
        userId: users[0]._id,
        title: 'Run a Marathon',
        description: 'Complete a full marathon (42.2 km)',
        goalType: 'distance',
        targetValue: 42.2,
        currentValue: 15.5,
        unit: 'km',
        deadline: new Date('2026-12-31'),
        status: 'active',
      },
      {
        userId: users[0]._id,
        title: 'Bench Press 100kg',
        description: 'Achieve a one-rep max of 100kg',
        goalType: 'weight',
        targetValue: 100,
        currentValue: 80,
        unit: 'kg',
        deadline: new Date('2026-09-30'),
        status: 'active',
      },
      {
        userId: users[0]._id,
        title: 'Complete 50 Workouts',
        description: 'Reach 50 completed workouts',
        goalType: 'workouts',
        targetValue: 50,
        currentValue: 12,
        unit: 'workouts',
        deadline: new Date('2026-12-31'),
        status: 'active',
      },
    ];

    const goalsAlex = await Goal.insertMany(goalsAlexData);
    console.log('🎯 Created 3 goals for Alex');

    // Create sample goals for Jordan
    const goalsJordanData = [
      {
        userId: users[1]._id,
        title: 'Lose 5kg',
        description: 'Reach target weight of 65kg',
        goalType: 'weight',
        targetValue: 65,
        currentValue: 70,
        unit: 'kg',
        deadline: new Date('2026-09-30'),
        status: 'active',
      },
      {
        userId: users[1]._id,
        title: 'Yoga 3x per week',
        description: 'Establish consistent yoga practice',
        goalType: 'workouts',
        targetValue: 12,
        currentValue: 8,
        unit: 'sessions',
        deadline: new Date('2026-08-31'),
        status: 'active',
      },
    ];

    const goalsJordan = await Goal.insertMany(goalsJordanData);
    console.log('🎯 Created 2 goals for Jordan');

    // Create sample goals for Casey
    const goalsCaseyData = [
      {
        userId: users[2]._id,
        title: 'Cycle 500km',
        description: 'Total cycling distance goal',
        goalType: 'distance',
        targetValue: 500,
        currentValue: 185,
        unit: 'km',
        deadline: new Date('2026-12-31'),
        status: 'active',
      },
      {
        userId: users[2]._id,
        title: 'Burn 50,000 Calories',
        description: 'Total calories burned target',
        goalType: 'calories',
        targetValue: 50000,
        currentValue: 12600,
        unit: 'calories',
        deadline: new Date('2026-12-31'),
        status: 'active',
      },
    ];

    const goalsCasey = await Goal.insertMany(goalsCaseyData);
    console.log('🎯 Created 2 goals for Casey');

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Database Seed Complete!');
    console.log('='.repeat(50));
    console.log(`✅ Users: ${users.length}`);
    console.log(`✅ Workouts: ${(await Workout.countDocuments())}`);
    console.log(`✅ Goals: ${(await Goal.countDocuments())}`);
    console.log('='.repeat(50));

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
