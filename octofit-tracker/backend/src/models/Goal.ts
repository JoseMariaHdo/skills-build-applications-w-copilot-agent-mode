import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  goalType: 'weight' | 'distance' | 'time' | 'calories' | 'workouts' | 'other';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: Date;
  status: 'active' | 'completed' | 'abandoned';
  progress: number; // percentage
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
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
    goalType: {
      type: String,
      enum: ['weight', 'distance', 'time', 'calories', 'workouts', 'other'],
      default: 'other',
    },
    targetValue: {
      type: Number,
      required: true,
    },
    currentValue: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
    },
    deadline: Date,
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Calculate progress percentage
goalSchema.virtual('progress').get(function () {
  return Math.round((this.currentValue / this.targetValue) * 100);
});

export const Goal = mongoose.model<IGoal>('Goal', goalSchema);
