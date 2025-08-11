import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GroupCard = ({ group, onContribute, onViewDetails, onChat }) => {
  const progressPercentage = (group.currentAmount / group.targetAmount) * 100;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-success';
    if (percentage >= 75) return 'bg-primary';
    if (percentage >= 50) return 'bg-secondary';
    return 'bg-accent';
  };

  const getStatusBadge = () => {
    if (progressPercentage >= 100) {
      return (
        <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
          <Icon name="CheckCircle" size={12} />
          <span>Completed</span>
        </div>
      );
    }
    if (progressPercentage >= 75) {
      return (
        <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
          <Icon name="TrendingUp" size={12} />
          <span>Almost There</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1 bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
        <Icon name="Clock" size={12} />
        <span>In Progress</span>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-soft hover:shadow-elevated transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
              {group.name}
            </h3>
            {getStatusBadge()}
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {group.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 ml-4">
          <Button
            variant="ghost"
            size="icon"
            iconName="MessageCircle"
            iconSize={16}
            onClick={() => onChat(group.id)}
            className="h-8 w-8 opacity-60 hover:opacity-100"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="MoreVertical"
            iconSize={16}
            className="h-8 w-8 opacity-60 hover:opacity-100"
          />
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progressPercentage)}`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-lg font-bold text-foreground">
              {formatCurrency(group.currentAmount)}
            </div>
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">
              {formatCurrency(group.targetAmount - group.currentAmount)}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              {formatCurrency(group.targetAmount)}
            </div>
            <div className="text-xs text-muted-foreground">Goal</div>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Members</span>
          <span className="text-sm font-medium text-foreground">
            {group.members.length} members
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {group.members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="relative w-8 h-8 rounded-full border-2 border-card bg-muted overflow-hidden"
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {group.members.length > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{group.members.length - 4}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 text-right">
            <div className="text-xs text-muted-foreground">
              Last contribution: {group.lastContribution}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onContribute(group.id)}
          className="flex-1"
          disabled={progressPercentage >= 100}
        >
          Contribute
        </Button>
        
        <Link to="/group-details" state={{ groupId: group.id }}>
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            className="whitespace-nowrap"
          >
            View Details
          </Button>
        </Link>
      </div>

      {/* Achievement Badge */}
      {group.isNewAchievement && (
        <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-2 shadow-soft">
          <Icon name="Star" size={16} className="fill-current" />
        </div>
      )}
    </div>
  );
};

export default GroupCard;