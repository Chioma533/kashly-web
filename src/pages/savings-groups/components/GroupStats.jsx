import React from 'react';
import Icon from '../../../components/AppIcon';

const GroupStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statItems = [
    {
      label: 'Active Groups',
      value: stats.totalGroups,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 this month'
    },
    {
      label: 'Total Contributions',
      value: formatCurrency(stats.totalContributions),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+$450 this month'
    },
    {
      label: 'Goals Achieved',
      value: stats.goalsAchieved,
      icon: 'Target',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+1 this month'
    },
    {
      label: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+5% improvement'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-soft mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Your Savings Overview</h2>
        <div className="flex items-center space-x-1 text-success">
          <Icon name="TrendingUp" size={16} />
          <span className="text-sm font-medium">Growing</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.bgColor} mb-2`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            
            <div className="text-xl lg:text-2xl font-bold text-foreground mb-1">
              {item.value}
            </div>
            
            <div className="text-sm text-muted-foreground mb-1">
              {item.label}
            </div>
            
            <div className="text-xs text-success font-medium">
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Badges */}
      {/* {stats.recentBadges && stats.recentBadges.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Recent Achievements</span>
            <span className="text-xs text-muted-foreground">This month</span>
          </div>
          
          <div className="flex space-x-2">
            {stats.recentBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium"
              >
                <Icon name="Award" size={12} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GroupStats;