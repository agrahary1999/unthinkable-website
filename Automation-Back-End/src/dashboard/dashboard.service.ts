import { Feature } from '../features/feature.model';
import { FeatureStatus } from '../features/feature.types';

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

export const calculateDashboardMetrics = async (userId: string): Promise<DashboardMetrics> => {
  try {
    // Get total features count
    const totalFeatures = await Feature.countDocuments({ userId });

    // Aggregate features by status
    const statusAggregation = await Feature.aggregate([
      { $match: { userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Initialize featuresByStatus with all statuses set to 0
    const featuresByStatus: Record<FeatureStatus, number> = {
      [FeatureStatus.CREATED]: 0,
      [FeatureStatus.QA]: 0,
      [FeatureStatus.QA_APPROVED]: 0,
      [FeatureStatus.DEV]: 0,
      [FeatureStatus.PLAN_APPROVED]: 0,
      [FeatureStatus.CODE_GEN]: 0,
      [FeatureStatus.PR_CREATED]: 0,
      [FeatureStatus.DONE]: 0
    };

    // Populate with actual counts
    statusAggregation.forEach(item => {
      if (item._id in featuresByStatus) {
        featuresByStatus[item._id as FeatureStatus] = item.count;
      }
    });

    // Get recent activity from statusHistory
    const featuresWithHistory = await Feature.find({ userId })
      .select('title status statusHistory')
      .sort({ updatedAt: -1 })
      .limit(50)
      .lean();

    // Extract and flatten recent status changes
    const activityItems: ActivityItem[] = [];
    
    for (const feature of featuresWithHistory) {
      if (feature.statusHistory && feature.statusHistory.length > 0) {
        // Get the most recent status change for each feature
        const recentChange = feature.statusHistory[feature.statusHistory.length - 1];
        activityItems.push({
          featureId: feature._id.toString(),
          featureTitle: feature.title,
          status: recentChange.status,
          timestamp: recentChange.changedAt,
          changedBy: recentChange.changedBy
        });
      }
    }

    // Sort by timestamp descending and limit to 10 most recent
    const recentActivity = activityItems
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return {
      totalFeatures,
      featuresByStatus,
      recentActivity
    };
  } catch (error) {
    console.error('Error calculating dashboard metrics:', error);
    throw new Error('Failed to calculate dashboard metrics');
  }
};