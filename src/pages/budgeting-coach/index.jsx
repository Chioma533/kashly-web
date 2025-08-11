import React from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import BudgetOverview from './components/BudgetOverview';
import PersonalizedInsights from './components/PersonalizedInsights';
import ExpenseChart from './components/ExpenseChart';
import GoalSetting from './components/GoalSetting';
import AchievementSystem from './components/AchievementSystem';

const BudgetingCoach = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-32 lg:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🎯</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Budgeting Coach
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Get personalized financial guidance, track your spending patterns, and achieve your budgeting goals with AI-powered insights and recommendations.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="space-y-6">
            {/* Budget Overview */}
            <BudgetOverview />

            {/* Two Column Layout for Desktop */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Charts and Analysis */}
              <div className="xl:col-span-2 space-y-6">
                <ExpenseChart />
                <GoalSetting />
              </div>

              {/* Right Column - Insights and Achievements */}
              <div className="space-y-6">
                <PersonalizedInsights />
                <AchievementSystem />
              </div>
            </div>
          </div>

          {/* Financial Health Score */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Financial Health Score</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">Excellent</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">85</div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary mb-1">92%</div>
                <div className="text-xs text-muted-foreground">Budget Adherence</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-secondary mb-1">78%</div>
                <div className="text-xs text-muted-foreground">Savings Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-accent mb-1">15</div>
                <div className="text-xs text-muted-foreground">Days Streak</div>
              </div>
            </div>
            
            <div className="mt-4 w-full bg-muted rounded-full h-2">
              <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  );
};

export default BudgetingCoach;