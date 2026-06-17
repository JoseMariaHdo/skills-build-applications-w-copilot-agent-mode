import { Workout, IWorkout } from '../models/Workout';
import mongoose from 'mongoose';

export class WorkoutService {
  /**
   * Create a new workout
   */
  static async createWorkout(data: Partial<IWorkout>): Promise<IWorkout> {
    const workout = new Workout(data);
    return await workout.save();
  }

  /**
   * Get all workouts for a user
   */
  static async getUserWorkouts(userId: string): Promise<IWorkout[]> {
    return await Workout.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Get a specific workout
   */
  static async getWorkoutById(workoutId: string): Promise<IWorkout | null> {
    return await Workout.findById(workoutId).exec();
  }

  /**
   * Update a workout
   */
  static async updateWorkout(
    workoutId: string,
    data: Partial<IWorkout>
  ): Promise<IWorkout | null> {
    return await Workout.findByIdAndUpdate(workoutId, data, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /**
   * Delete a workout
   */
  static async deleteWorkout(workoutId: string): Promise<IWorkout | null> {
    return await Workout.findByIdAndDelete(workoutId).exec();
  }

  /**
   * Mark workout as completed
   */
  static async completeWorkout(workoutId: string): Promise<IWorkout | null> {
    return await Workout.findByIdAndUpdate(
      workoutId,
      { completed: true, completedAt: new Date() },
      { new: true }
    ).exec();
  }

  /**
   * Get workout statistics for a user
   */
  static async getWorkoutStats(userId: string): Promise<any> {
    const workouts = await Workout.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).exec();

    const totalWorkouts = workouts.length;
    const completedWorkouts = workouts.filter((w) => w.completed).length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = workouts.reduce(
      (sum, w) => sum + (w.caloriesBurned || 0),
      0
    );

    const workoutsByType: Record<string, number> = {};
    workouts.forEach((w) => {
      workoutsByType[w.type] = (workoutsByType[w.type] || 0) + 1;
    });

    return {
      totalWorkouts,
      completedWorkouts,
      completionRate:
        totalWorkouts > 0
          ? Math.round((completedWorkouts / totalWorkouts) * 100)
          : 0,
      totalDuration,
      totalCalories,
      averageDuration:
        totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0,
      workoutsByType,
    };
  }

  /**
   * Get recent workouts
   */
  static async getRecentWorkouts(
    userId: string,
    limit: number = 10
  ): Promise<IWorkout[]> {
    return await Workout.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}
