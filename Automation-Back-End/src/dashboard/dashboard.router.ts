import { Router } from 'express';
import { getMetrics } from './dashboard.controller';

const dashboardRouter = Router();

// GET /api/dashboard/metrics - Get dashboard metrics for authenticated user
dashboardRouter.get('/metrics', getMetrics);

export { dashboardRouter };