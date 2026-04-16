// Existing types remain...

export enum FeatureStatus {
  CREATED = 'CREATED',
  QA = 'QA',
  QA_APPROVED = 'QA_APPROVED',
  DEV = 'DEV',
  PLAN_APPROVED = 'PLAN_APPROVED',
  CODE_GEN = 'CODE_GEN',
  PR_CREATED = 'PR_CREATED',
  DONE = 'DONE'
}

export interface ActivityItem {
  featureId: string;
  featureTitle: string;
  status: FeatureStatus;
  timestamp: Date;
  changedBy: string;
}

export interface DashboardMetrics {
  totalFeatures: number;
  featuresByStatus: Record<FeatureStatus, number>;
  recentActivity: ActivityItem[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface Feature {
  _id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  statusHistory?: Array<{
    status: FeatureStatus;
    changedAt: Date;
    changedBy: string;
  }>;
}

export interface DashboardState {
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
}