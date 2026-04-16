import React from 'react';
import { ActivityItem, FeatureStatus } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityWidgetProps {
  activities: ActivityItem[];
}

const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({ activities }) => {
  const getStatusBadgeColor = (status: FeatureStatus): string => {
    const colors: Record<FeatureStatus, string> = {
      [FeatureStatus.CREATED]: 'bg-gray-100 text-gray-800',
      [FeatureStatus.QA]: 'bg-blue-100 text-blue-800',
      [FeatureStatus.QA_APPROVED]: 'bg-indigo-100 text-indigo-800',
      [FeatureStatus.DEV]: 'bg-purple-100 text-purple-800',
      [FeatureStatus.PLAN_APPROVED]: 'bg-cyan-100 text-cyan-800',
      [FeatureStatus.CODE_GEN]: 'bg-yellow-100 text-yellow-800',
      [FeatureStatus.PR_CREATED]: 'bg-orange-100 text-orange-800',
      [FeatureStatus.DONE]: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatStatus = (status: FeatureStatus): string => {
    return status.replace(/_/g, ' ');
  };

  const formatTimestamp = (timestamp: Date): string => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity to display</p>
          <p className="text-sm mt-2">Activity will appear here as you work on features</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={`${activity.featureId}-${activity.timestamp}`}
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            role="listitem"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.featureTitle}
              </p>
              <div className="flex items-center mt-1 space-x-2">
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusBadgeColor(activity.status)
                  }`}
                >
                  {formatStatus(activity.status)}
                </span>
                <span className="text-xs text-gray-500">
                  by {activity.changedBy}
                </span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <p className="text-xs text-gray-500 whitespace-nowrap">
                {formatTimestamp(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityWidget;