import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'info';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  variant = 'primary' 
}) => {
  const variantClasses = {
    primary: 'bg-blue-50 border-blue-200 text-blue-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-gray-50 border-gray-200 text-gray-700'
  };

  const iconColorClasses = {
    primary: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    info: 'text-gray-500'
  };

  return (
    <div 
      className={`rounded-lg border-2 p-6 shadow-sm transition-all hover:shadow-md ${
        variantClasses[variant]
      }`}
      role="article"
      aria-label={`${title}: ${value}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80 mb-2">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className={`text-3xl ${iconColorClasses[variant]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;