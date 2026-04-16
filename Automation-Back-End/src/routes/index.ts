import { Router } from 'express';
import { authRouter } from '../auth/auth.router';
import { featureRouter } from '../features/feature.router';
import { dashboardRouter } from '../dashboard/dashboard.router';
import { authMiddleware } from '../middleware/auth.middleware';

export interface RouteConfig {
  path: string;
  router: Router;
  isPublic: boolean;
}

const routes: RouteConfig[] = [
  { path: '/auth', router: authRouter, isPublic: true },
  { path: '/features', router: featureRouter, isPublic: false },
  { path: '/dashboard', router: dashboardRouter, isPublic: false }
];

export const setupRoutes = (app: Router): void => {
  routes.forEach(({ path, router, isPublic }) => {
    if (isPublic) {
      app.use(path, router);
    } else {
      app.use(path, authMiddleware, router);
    }
  });
};

export { routes };