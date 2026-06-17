import { Router, Request, Response } from 'express';
import { WorkoutService } from '../services/WorkoutService';

const router = Router();

/**
 * GET /api/workouts - Get all workouts for the current user
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const workouts = await WorkoutService.getUserWorkouts(userId);
    res.json({
      success: true,
      data: workouts,
      count: workouts.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch workouts',
    });
  }
});

/**
 * GET /api/workouts/stats - Get workout statistics
 */
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const stats = await WorkoutService.getWorkoutStats(userId);
    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch statistics',
    });
  }
});

/**
 * GET /api/workouts/recent - Get recent workouts
 */
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const limit = parseInt(req.query.limit as string) || 10;
    const workouts = await WorkoutService.getRecentWorkouts(userId, limit);
    res.json({
      success: true,
      data: workouts,
      count: workouts.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch recent workouts',
    });
  }
});

/**
 * GET /api/workouts/:id - Get a specific workout
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await WorkoutService.getWorkoutById(req.params.id);
    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found',
      });
    }
    res.json({
      success: true,
      data: workout,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch workout',
    });
  }
});

/**
 * POST /api/workouts - Create a new workout
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const workoutData = {
      ...req.body,
      userId,
    };
    const workout = await WorkoutService.createWorkout(workoutData);
    res.status(201).json({
      success: true,
      data: workout,
      message: 'Workout created successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create workout',
    });
  }
});

/**
 * PUT /api/workouts/:id - Update a workout
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await WorkoutService.updateWorkout(
      req.params.id,
      req.body
    );
    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found',
      });
    }
    res.json({
      success: true,
      data: workout,
      message: 'Workout updated successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update workout',
    });
  }
});

/**
 * DELETE /api/workouts/:id - Delete a workout
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await WorkoutService.deleteWorkout(req.params.id);
    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found',
      });
    }
    res.json({
      success: true,
      data: workout,
      message: 'Workout deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete workout',
    });
  }
});

/**
 * POST /api/workouts/:id/complete - Mark workout as completed
 */
router.post('/:id/complete', async (req: Request, res: Response) => {
  try {
    const workout = await WorkoutService.completeWorkout(req.params.id);
    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found',
      });
    }
    res.json({
      success: true,
      data: workout,
      message: 'Workout marked as completed',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to complete workout',
    });
  }
});

export default router;
