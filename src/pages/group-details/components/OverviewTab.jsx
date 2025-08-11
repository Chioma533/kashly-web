import React from 'react';
import Icon from '../../../components/AppIcon';


const OverviewTab = ({ group, userContributions, milestones }) => {
  const userTotal = userContributions.reduce((sum, contribution) => sum + contribution.amount, 0);
  const userPercentage = (userTotal / group.targetAmount) * 100;

  return (
    <div className="space-y-6">
      {/* Personal Progress */}
      <div className="bg-card rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Contribution</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold text-foreground">${userTotal.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Your Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{userPercentage.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Of Goal</div>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(userPercentage, 100)}%` }}
          />
        </div>

        <div className="text-sm text-muted-foreground">
          You've contributed {userContributions.length} times to this goal
        </div>
      </div>

      {/* Recent Contributions */}
      <div className="bg-card rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Recent Contributions</h3>
        
        <div className="space-y-3">
          {userContributions.slice(0, 5).map((contribution) => (
            <div key={contribution.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Plus" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">${contribution.amount}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(contribution.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              {contribution.note && (
                <div className="text-sm text-muted-foreground max-w-32 truncate">
                  {contribution.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-card rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Milestones</h3>
        
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                milestone.achieved 
                  ? 'bg-success text-success-foreground' 
                  : milestone.current 
                    ? 'bg-primary text-primary-foreground animate-pulse'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {milestone.achieved ? (
                  <Icon name="Check" size={16} />
                ) : milestone.current ? (
                  <Icon name="Target" size={16} />
                ) : (
                  <Icon name="Circle" size={16} />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    milestone.achieved ? 'text-success' : 'text-foreground'
                  }`}>
                    {milestone.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ${milestone.amount.toLocaleString()}
                  </span>
                </div>
                
                {milestone.achieved && milestone.celebrationDate && (
                  <div className="text-sm text-muted-foreground">
                    Achieved on {new Date(milestone.celebrationDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;