import { Goal, IGoal } from '../models/Goal';
import mongoose from 'mongoose';

export class GoalService {
  /**
   * Create a new goal
   */
  static async createGoal(data: Partial<IGoal>): Promise<IGoal> {
    const goal = new Goal(data);
    return await goal.save();
  }

  /**
   * Get all goals for a user
   */
  static async getUserGoals(userId: string): Promise<IGoal[]> {
    return await Goal.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Get a specific goal
   */
  static async getGoalById(goalId: string): Promise<IGoal | null> {
    return await Goal.findById(goalId).exec();
  }

  /**
   * Update a goal
   */
  static async updateGoal(
    goalId: string,
    data: Partial<IGoal>
  ): Promise<IGoal | null> {
    return await Goal.findByIdAndUpdate(goalId, data, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /**
   * Delete a goal
   */
  static async deleteGoal(goalId: string): Promise<IGoal | null> {
    return await Goal.findByIdAndDelete(goalId).exec();
  }

  /**
   * Update goal progress
   */
  static async updateGoalProgress(
    goalId: string,
    newValue: number
  ): Promise<IGoal | null> {
    const goal = await Goal.findById(goalId).exec();
    if (!goal) return null;

    goal.currentValue = newValue;

    // Check if goal is completed
    if (newValue >= goal.targetValue) {
      goal.status = 'completed';
    }

    return await goal.save();
  }

  /**
   * Get active goals for a user
   */
  static async getActiveGoals(userId: string): Promise<IGoal[]> {
    return await Goal.find({
      userId: new mongoose.Types.ObjectId(userId),
      status: 'active',
    })
      .sort({ deadline: 1 })
      .exec();
  }

  /**
   * Get goal statistics
   */
  static async getGoalStats(userId: string): Promise<any> {
    const goals = await Goal.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).exec();

    const totalGoals = goals.length;
    const completedGoals = goals.filter((g) => g.status === 'completed').length;
    const activeGoals = goals.filter((g) => g.status === 'active').length;
    const abandonedGoals = goals.filter(
      (g) => g.status === 'abandoned'
    ).length;

    const avgProgress =
      totalGoals > 0
        ? Math.round(
            goals.reduce(
              (sum, g) => sum + Math.round((g.currentValue / g.targetValue) * 100),
              0
            ) / totalGoals
          )
        : 0;

    return {
      totalGoals,
      completedGoals,
      activeGoals,
      abandonedGoals,
      completionRate:
        totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0,
      averageProgress: avgProgress,
    };
  }
}
