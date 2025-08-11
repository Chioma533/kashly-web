import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GroupHeader = ({ group, onContribute, onShare, onInvite }) => {
  const progressPercentage = (group.currentAmount / group.targetAmount) * 100;

  return (
    <div className="bg-card rounded-lg shadow-soft overflow-hidden mb-6">
      {/* Banner Image */}
      <div className="relative h-32 lg:h-40 overflow-hidden">
        <Image
          src={group.bannerImage}
          alt={`${group.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Admin Badge */}
        {group.isAdmin && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            <Icon name="Shield" size={12} className="inline mr-1" />
            Admin
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Group Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">{group.name}</h1>
          <p className="text-muted-foreground mb-4">{group.description}</p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">${group.currentAmount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">${group.targetAmount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Goal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{group.memberCount}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{group.daysLeft}</div>
              <div className="text-sm text-muted-foreground">Days Left</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500 relative"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                {progressPercentage >= 100 && (
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-success-foreground" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onContribute}
            className="flex-1"
          >
            Contribute
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              onClick={onShare}
              className="flex-1 sm:flex-none"
            >
              Share
            </Button>
            
            <Button
              variant="outline"
              iconName="UserPlus"
              iconPosition="left"
              onClick={onInvite}
              className="flex-1 sm:flex-none"
            >
              Invite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;