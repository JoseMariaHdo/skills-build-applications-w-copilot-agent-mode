import { Router, Request, Response } from 'express';
import { GoalService } from '../services/GoalService';

const router = Router();

/**
 * GET /api/goals - Get all goals for the current user
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const goals = await GoalService.getUserGoals(userId);
    res.json({
      success: true,
      data: goals,
      count: goals.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch goals',
    });
  }
});

/**
 * GET /api/goals/stats - Get goal statistics
 */
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const stats = await GoalService.getGoalStats(userId);
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
 * GET /api/goals/active - Get active goals
 */
router.get('/active', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const goals = await GoalService.getActiveGoals(userId);
    res.json({
      success: true,
      data: goals,
      count: goals.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch active goals',
    });
  }
});

/**
 * GET /api/goals/:id - Get a specific goal
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await GoalService.getGoalById(req.params.id);
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }
    res.json({
      success: true,
      data: goal,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch goal',
    });
  }
});

/**
 * POST /api/goals - Create a new goal
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const goalData = {
      ...req.body,
      userId,
    };
    const goal = await GoalService.createGoal(goalData);
    res.status(201).json({
      success: true,
      data: goal,
      message: 'Goal created successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create goal',
    });
  }
});

/**
 * PUT /api/goals/:id - Update a goal
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await GoalService.updateGoal(req.params.id, req.body);
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }
    res.json({
      success: true,
      data: goal,
      message: 'Goal updated successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update goal',
    });
  }
});

/**
 * PATCH /api/goals/:id/progress - Update goal progress
 */
router.patch('/:id/progress', async (req: Request, res: Response) => {
  try {
    const { newValue } = req.body;
    if (newValue === undefined || newValue === null) {
      return res.status(400).json({
        success: false,
        error: 'newValue is required',
      });
    }
    const goal = await GoalService.updateGoalProgress(
      req.params.id,
      newValue
    );
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }
    res.json({
      success: true,
      data: goal,
      message: 'Goal progress updated successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update goal progress',
    });
  }
});

/**
 * DELETE /api/goals/:id - Delete a goal
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await GoalService.deleteGoal(req.params.id);
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }
    res.json({
      success: true,
      data: goal,
      message: 'Goal deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete goal',
    });
  }
});

export default router;
