import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import {
  fetchDashboardMetrics,
  selectDashboardMetrics,
  selectDashboardLoading,
  selectDashboardError
} from '../store/dashboardSlice';
import DashboardCard from '../components/DashboardCard';
import RecentActivityWidget from '../components/RecentActivityWidget';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const metrics = useSelector(selectDashboardMetrics);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    // Check authentication
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/auth');
      return;
    }

    // Fetch dashboard metrics
    dispatch(fetchDashboardMetrics());
  }, [dispatch, navigate]);

  const handleRefresh = () => {
    dispatch(fetchDashboardMetrics());
  };

  const handleCreateFeature = () => {
    navigate('/features/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state for new users
  if (metrics && metrics.totalFeatures === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome to your automation dashboard</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Started</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't created any features yet. Start automating your workflow by creating your first feature.
            </p>
            <button
              onClick={handleCreateFeature}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Your First Feature
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Overview of your automation workflow</p>
          </div>
          <button
            onClick={handleRefresh}
            className="mt-4 sm:mt-0 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            aria-label="Refresh dashboard"
          >
            <span className="mr-2">🔄</span>
            Refresh
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Features"
            value={metrics?.totalFeatures || 0}
            icon="📊"
            variant="info"
          />
          <DashboardCard
            title="In Progress"
            value={
              (metrics?.featuresByStatus.QA || 0) +
              (metrics?.featuresByStatus.DEV || 0) +
              (metrics?.featuresByStatus.CODE_GEN || 0) +
              (metrics?.featuresByStatus.PR_CREATED || 0)
            }
            icon="⚙️"
            variant="warning"
          />
          <DashboardCard
            title="Completed"
            value={metrics?.featuresByStatus.DONE || 0}
            icon="✅"
            variant="success"
          />
          <DashboardCard
            title="Awaiting Approval"
            value={
              (metrics?.featuresByStatus.QA_APPROVED || 0) +
              (metrics?.featuresByStatus.PLAN_APPROVED || 0)
            }
            icon="⏳"
            variant="primary"
          />
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features by Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics && Object.entries(metrics.featuresByStatus).map(([status, count]) => (
              <div key={status} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-600 mt-1">{status.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivityWidget activities={metrics?.recentActivity || []} />
      </div>
    </div>
  );
};

export default DashboardPage;