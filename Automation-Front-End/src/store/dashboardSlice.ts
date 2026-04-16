import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, DashboardMetrics } from '../types';
import { getDashboardMetrics } from '../services/dashboard.service';
import { RootState } from './index';

const initialState: DashboardState = {
  metrics: null,
  loading: false,
  error: null
};

export const fetchDashboardMetrics = createAsyncThunk(
  'dashboard/fetchMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const metrics = await getDashboardMetrics();
      return metrics;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard metrics'
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    resetDashboard: (state) => {
      state.metrics = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action: PayloadAction<DashboardMetrics>) => {
        state.loading = false;
        state.metrics = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearDashboardError, resetDashboard } = dashboardSlice.actions;

// Selectors
export const selectDashboardMetrics = (state: RootState) => state.dashboard.metrics;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

export default dashboardSlice.reducer;