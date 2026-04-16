import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import featureReducer from './featureSlice';
import dashboardReducer from './dashboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    features: featureReducer,
    dashboard: dashboardReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['dashboard/fetchMetrics/fulfilled'],
        ignoredPaths: ['dashboard.metrics.recentActivity']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// Re-export selectors and actions for convenience
export { selectDashboardMetrics, selectDashboardLoading, selectDashboardError } from './dashboardSlice';
export { fetchDashboardMetrics } from './dashboardSlice';