import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GoalSetting = () => {
  const [activeGoal, setActiveGoal] = useState(null);
  const [newGoalAmount, setNewGoalAmount] = useState('');

  const goals = [
    {
      id: 1,
      category: 'Food',
      currentBudget: 600,
      suggestedBudget: 550,
      spent: 520,
      icon: 'UtensilsCrossed',
      color: 'bg-secondary',
      status: 'on-track'
    },
    {
      id: 2,
      category: 'Entertainment',
      currentBudget: 300,
      suggestedBudget: 350,
      spent: 280,
      icon: 'Gamepad2',
      color: 'bg-success',
      status: 'under-budget'
    },
    {
      id: 3,
      category: 'Shopping',
      currentBudget: 500,
      suggestedBudget: 400,
      spent: 317,
      icon: 'ShoppingBag',
      color: 'bg-warning',
      status: 'needs-attention'
    },
    {
      id: 4,
      category: 'Transportation',
      currentBudget: 400,
      suggestedBudget: 420,
      spent: 380,
      icon: 'Car',
      color: 'bg-accent',
      status: 'on-track'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'text-success';
      case 'under-budget': return 'text-primary';
      case 'needs-attention': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'on-track': return 'On Track';
      case 'under-budget': return 'Under Budget';
      case 'needs-attention': return 'Needs Attention';
      default: return 'Unknown';
    }
  };

  const handleGoalUpdate = (goalId) => {
    if (newGoalAmount && parseFloat(newGoalAmount) > 0) {
      console.log(`Updating goal ${goalId} to $${newGoalAmount}`);
      setActiveGoal(null);
      setNewGoalAmount('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Budget Goals</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left" iconSize={16}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const spentPercentage = (goal.spent / goal.currentBudget) * 100;
          const isEditing = activeGoal === goal.id;
          
          return (
            <div key={goal.id} className="bg-background rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${goal.color} text-white`}>
                    <Icon name={goal.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{goal.category}</h3>
                    <span className={`text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {getStatusText(goal.status)}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Edit3"
                  iconSize={16}
                  onClick={() => setActiveGoal(isEditing ? null : goal.id)}
                />
              </div>

              {/* Current vs Suggested Budget */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Current Budget</p>
                  <p className="text-lg font-semibold text-foreground">
                    ${goal.currentBudget}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">AI Suggested</p>
                  <p className={`text-lg font-semibold ${
                    goal.suggestedBudget < goal.currentBudget ? 'text-success' : 'text-warning'
                  }`}>
                    ${goal.suggestedBudget}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Spent: ${goal.spent}</span>
                  <span>{Math.round(spentPercentage)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      spentPercentage > 90 ? 'bg-error' : 
                      spentPercentage > 75 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Edit Mode */}
              {isEditing && (
                <div className="space-y-3 pt-3 border-t border-border">
                  <Input
                    type="number"
                    label="New Budget Amount"
                    placeholder="Enter amount"
                    value={newGoalAmount}
                    onChange={(e) => setNewGoalAmount(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleGoalUpdate(goal.id)}
                      className="flex-1"
                    >
                      Update Goal
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveGoal(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Suggestion */}
              {!isEditing && goal.suggestedBudget !== goal.currentBudget && (
                <div className="pt-3 border-t border-border">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">
                        {goal.suggestedBudget < goal.currentBudget 
                          ? `Consider reducing by $${goal.currentBudget - goal.suggestedBudget} based on your spending pattern.`
                          : `Consider increasing by $${goal.suggestedBudget - goal.currentBudget} for better financial flexibility.`
                        }
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-xs mt-1"
                        onClick={() => {
                          setNewGoalAmount(goal.suggestedBudget.toString());
                          setActiveGoal(goal.id);
                        }}
                      >
                        Apply Suggestion
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-4">Quick Budget Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button variant="secondary" size="sm" iconName="Zap" iconPosition="left" iconSize={14}>
            Auto-Optimize
          </Button>
          <Button variant="secondary" size="sm" iconName="Copy" iconPosition="left" iconSize={14}>
            Copy Last Month
          </Button>
          <Button variant="secondary" size="sm" iconName="RotateCcw" iconPosition="left" iconSize={14}>
            Reset All
          </Button>
          <Button variant="secondary" size="sm" iconName="Calendar" iconPosition="left" iconSize={14}>
            Schedule Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;