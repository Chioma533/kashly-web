import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityTab = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'contribution': return 'Plus';
      case 'milestone': return 'Target';
      case 'member_joined': return 'UserPlus';
      case 'goal_updated': return 'Edit';
      case 'achievement': return 'Award';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'contribution': return 'text-primary';
      case 'milestone': return 'text-success';
      case 'member_joined': return 'text-secondary';
      case 'goal_updated': return 'text-accent';
      case 'achievement': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityDate.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={activity.user.avatar}
                alt={activity.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            
            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-foreground">{activity.user.name}</span>
                <Icon 
                  name={getActivityIcon(activity.type)} 
                  size={14} 
                  className={getActivityColor(activity.type)}
                />
                <span className="text-sm text-muted-foreground">{formatTimeAgo(activity.timestamp)}</span>
              </div>
              
              <p className="text-sm text-foreground mb-2">{activity.description}</p>
              
              {/* Activity Details */}
              {activity.amount && (
                <div className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                  <Icon name="DollarSign" size={12} />
                  <span>${activity.amount.toLocaleString()}</span>
                </div>
              )}
              
              {activity.note && (
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground italic">"{activity.note}"</p>
                </div>
              )}
            </div>
            
            {/* Reaction Button */}
            <div className="flex-shrink-0">
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="Heart" size={16} />
                <span className="text-sm">{activity.reactions || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth">
          Load more activities
        </button>
      </div>
    </div>
  );
};

export default ActivityTab;