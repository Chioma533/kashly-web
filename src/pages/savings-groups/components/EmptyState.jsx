import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmptyState = ({ type = 'no-groups', onCreateGroup, onJoinGroup }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-groups':
        return {
          image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center',
          title: 'Start Your Savings Journey',
          description: `Ready to achieve your financial goals together? Create your first savings group or join friends in their journey towards financial success.`,
          primaryAction: {
            label: 'Create Your First Group',
            icon: 'Plus',
            action: onCreateGroup
          },
          secondaryAction: {
            label: 'Browse & Join Groups',
            icon: 'Search',
            action: onJoinGroup
          }
        };
      
      case 'no-search-results':
        return {
          image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center',
          title: 'No Groups Found',
          description: `We couldn't find any groups matching your search. Try adjusting your filters or create a new group with your criteria.`,
          primaryAction: {
            label: 'Create New Group',
            icon: 'Plus',
            action: onCreateGroup
          },
          secondaryAction: {
            label: 'Clear Filters',
            icon: 'RotateCcw',
            action: () => window.location.reload()
          }
        };
      
      case 'loading':
        return {
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
          title: 'Loading Your Groups',
          description: 'Please wait while we fetch your savings groups...',
          primaryAction: null,
          secondaryAction: null
        };
      
      default:
        return getEmptyStateContent();
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 lg:py-16 px-4">
      {/* Illustration */}
      <div className="w-64 h-48 lg:w-80 lg:h-60 mb-6 rounded-xl overflow-hidden shadow-soft">
        <Image
          src={content.image}
          alt="Empty state illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
          {content.title}
        </h3>
        
        <p className="text-muted-foreground text-sm lg:text-base mb-6 leading-relaxed">
          {content.description}
        </p>

        {/* Actions */}
        {content.primaryAction && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              iconName={content.primaryAction.icon}
              iconPosition="left"
              onClick={content.primaryAction.action}
              className="min-w-[180px]"
            >
              {content.primaryAction.label}
            </Button>
            
            {content.secondaryAction && (
              <Button
                variant="outline"
                iconName={content.secondaryAction.icon}
                iconPosition="left"
                onClick={content.secondaryAction.action}
                className="min-w-[180px]"
              >
                {content.secondaryAction.label}
              </Button>
            )}
          </div>
        )}

        {/* Loading indicator */}
        {type === 'loading' && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>

      {/* Feature Highlights */}
      {type === 'no-groups' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">Collaborative Saving</h4>
            <p className="text-xs text-muted-foreground">Save together with friends and family</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Target" size={20} className="text-secondary" />
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">Goal Tracking</h4>
            <p className="text-xs text-muted-foreground">Monitor progress with visual indicators</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Award" size={20} className="text-success" />
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">Achievements</h4>
            <p className="text-xs text-muted-foreground">Earn badges and celebrate milestones</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;