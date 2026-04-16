import { Request, Response, NextFunction } from 'express';
import { calculateDashboardMetrics } from './dashboard.service';

export const getMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Ensure user is authenticated (authMiddleware should set req.user)
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userId = req.user.id;
    const metrics = await calculateDashboardMetrics(userId);

    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    next(error);
  }
};