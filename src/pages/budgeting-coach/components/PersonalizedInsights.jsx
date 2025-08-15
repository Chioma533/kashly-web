import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedInsights = () => {
  const [showAll, setShowAll] = useState(false);

  const insights = [
    {
      id: 1,
      type: 'tip',
      icon: 'Lightbulb',
      title: 'Reduce Food Spending',
      description: `You've spent 15% more on food this month compared to last month. Consider meal planning to save an average of $120 monthly.`,
      action: 'View Meal Planning Tips',
      priority: 'high',
      category: 'Food'
    },
    {
      id: 2,
      type: 'achievement',
      icon: 'Award',
      title: 'Transportation Goal Achieved!',
      description: 'Great job staying under your transportation budget for 3 months straight. You saved $45 this month.',
      action: 'Set New Goal',
      priority: 'success',
      category: 'Transportation'
    },
    {
      id: 3,
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Entertainment Budget Alert',
      description: `You're at 93% of your entertainment budget with 8 days left in the month. Consider free activities to stay on track.`,
      action: 'View Free Activities',
      priority: 'medium',
      category: 'Entertainment'
    },
    {
      id: 4,
      type: 'opportunity',
      icon: 'TrendingUp',
      title: 'Savings Opportunity',
      description: 'Based on your spending patterns, you could save an extra $200 monthly by optimizing your subscriptions.',
      action: 'Review Subscriptions',
      priority: 'medium',
      category: 'Subscriptions'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error bg-error/5';
      case 'success': return 'border-success bg-success/5';
      case 'medium': return 'border-warning bg-warning/5';
      default: return 'border-border bg-background';
    }
  };

  const getIconColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'success': return 'text-success';
      case 'medium': return 'text-warning';
      default: return 'text-primary';
    }
  };

  // Only show first 2 unless "showAll" is true
  const displayedInsights = showAll ? insights : insights.slice(0, 2);

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Personalized Insights</h2>
        <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={16}>
          Refresh
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {displayedInsights.map((insight) => (
          <div 
            key={insight.id} 
            className={`rounded-lg border p-4 transition-all duration-200 hover:shadow-soft ${getPriorityColor(insight.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-background ${getIconColor(insight.priority)}`}>
                <Icon name={insight.icon} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground text-sm">{insight.title}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {insight.category}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {insight.description}
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full sm:w-auto"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                >
                  {insight.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More / View Less Button */}
      {insights.length > 2 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View Less' : 'View More'}
          </Button>
        </div>
      )}

      {/* Quick Actions */}
      {/* <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" iconName="Calculator" iconPosition="left" iconSize={14}>
            Budget Calculator
          </Button>
          <Button variant="secondary" size="sm" iconName="PieChart" iconPosition="left" iconSize={14}>
            Expense Analysis
          </Button>
          <Button variant="secondary" size="sm" iconName="Target" iconPosition="left" iconSize={14}>
            Set New Goal
          </Button>
          <Button variant="secondary" size="sm" iconName="BookOpen" iconPosition="left" iconSize={14}>
            Learning Center
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default PersonalizedInsights;
