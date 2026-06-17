import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  duration: number; // in minutes
  caloriesBurned?: number;
  intensity: 'low' | 'moderate' | 'high';
  exercises: IExercise[];
  notes?: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExercise {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  distance?: number; // in km
}

const exerciseSchema = new Schema<IExercise>({
  name: {
    type: String,
    required: true,
  },
  sets: Number,
  reps: Number,
  weight: Number,
  duration: Number,
  distance: Number,
});

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    type: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'sports', 'other'],
      default: 'other',
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    caloriesBurned: Number,
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      default: 'moderate',
    },
    exercises: [exerciseSchema],
    notes: String,
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
