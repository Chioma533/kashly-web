import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetOverview = () => {
  const budgetData = {
    totalBudget: 3500,
    totalSpent: 2847,
    categories: [
      { name: 'Housing', budgeted: 1400, spent: 1350, color: 'bg-primary', trend: 'down' },
      { name: 'Food', budgeted: 600, spent: 520, color: 'bg-secondary', trend: 'up' },
      { name: 'Transportation', budgeted: 400, spent: 380, color: 'bg-accent', trend: 'stable' },
      { name: 'Entertainment', budgeted: 300, spent: 280, color: 'bg-success', trend: 'down' },
      { name: 'Shopping', budgeted: 500, spent: 317, color: 'bg-warning', trend: 'up' },
      { name: 'Other', budgeted: 300, spent: 0, color: 'bg-muted', trend: 'stable' }
    ]
  };

  const spentPercentage = (budgetData.totalSpent / budgetData.totalBudget) * 100;
  const remainingBudget = budgetData.totalBudget - budgetData.totalSpent;

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-error';
      case 'down': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Monthly Budget Overview</h2>
        <div className="text-sm text-muted-foreground">
          January 2025
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 lg:w-40 lg:h-40 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${spentPercentage * 2.51} 251`}
              className="text-primary transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl lg:text-3xl font-bold text-foreground">
              {Math.round(spentPercentage)}%
            </span>
            <span className="text-xs text-muted-foreground">spent</span>
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-xl font-semibold text-foreground">
                ${budgetData.totalBudget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-xl font-semibold text-success">
                ${remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Budget Status</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You're {spentPercentage < 80 ? 'on track' : spentPercentage < 95 ? 'approaching your limit' : 'over budget'} 
              {spentPercentage < 80 && ' with your spending this month. Keep it up!'}
              {spentPercentage >= 80 && spentPercentage < 95 && '. Consider reducing discretionary spending.'}
              {spentPercentage >= 95 && '. Review your expenses and adjust your budget.'}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgetData.categories.map((category, index) => {
          const categoryPercentage = (category.spent / category.budgeted) * 100;
          const isOverBudget = category.spent > category.budgeted;
          
          return (
            <div key={index} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{category.name}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getTrendIcon(category.trend)} 
                    size={14} 
                    className={getTrendColor(category.trend)}
                  />
                  <span className={`text-xs ${isOverBudget ? 'text-error' : 'text-muted-foreground'}`}>
                    {Math.round(categoryPercentage)}%
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>${category.spent}</span>
                  <span>${category.budgeted}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isOverBudget ? 'bg-error' : category.color
                    }`}
                    style={{ width: `${Math.min(categoryPercentage, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                ${(category.budgeted - category.spent).toLocaleString()} remaining
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverview;