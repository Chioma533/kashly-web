import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementSystem = () => {
  const [activeTab, setActiveTab] = useState('badges');
  const [showAll, setShowAll] = useState(false);

  const badges = [
    { id: 1, name: 'Budget Master', description: 'Stay within budget for 3 consecutive months', icon: 'Award', earned: true, earnedDate: '2025-01-15', progress: 100, rarity: 'gold' },
    { id: 2, name: 'Savings Streak', description: 'Save money for 30 days straight', icon: 'Target', earned: true, earnedDate: '2025-01-20', progress: 100, rarity: 'silver' },
    { id: 3, name: 'Expense Tracker', description: 'Log expenses for 7 days in a row', icon: 'CheckCircle', earned: false, progress: 85, rarity: 'bronze' },
    { id: 4, name: 'Goal Crusher', description: 'Achieve 5 financial goals', icon: 'Trophy', earned: false, progress: 60, rarity: 'gold' }
  ];

  const challenges = [
    { id: 1, title: 'No-Spend Weekend', description: 'Avoid unnecessary purchases this weekend', reward: 50, progress: 0, maxProgress: 2, timeLeft: '2 days', difficulty: 'easy', category: 'Spending' },
    { id: 2, title: 'Meal Prep Challenge', description: 'Prepare meals at home for 5 days', reward: 100, progress: 3, maxProgress: 5, timeLeft: '3 days', difficulty: 'medium', category: 'Food' },
    { id: 3, title: 'Transportation Saver', description: 'Use public transport or walk instead of ride-sharing', reward: 75, progress: 2, maxProgress: 7, timeLeft: '5 days', difficulty: 'medium', category: 'Transportation' }
  ];

  const milestones = [
    { id: 1, title: 'First Month Complete', description: 'Successfully tracked expenses for your first month', achieved: true, points: 200, date: '2024-12-28' },
    { id: 2, title: 'Budget Optimization', description: 'Reduced monthly expenses by 10%', achieved: true, points: 300, date: '2025-01-10' },
    { id: 3, title: 'Savings Goal Reached', description: 'Reach your first $1000 savings milestone', achieved: false, points: 500, progress: 75 }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-200 to-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDisplayedItems = (items) => {
    return showAll ? items : items.slice(0, 1);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Achievements & Progress</h2>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Zap" size={16} className="text-warning" />
          <span className="font-medium text-foreground">1,250 points</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
        {['badges', 'challenges', 'milestones'].map(tab => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'ghost'}
            size="sm"
            onClick={() => { setActiveTab(tab); setShowAll(false); }}
            className="flex-1"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <>
          <div className="flex flex-col space-y-4">
            {getDisplayedItems(badges).map((badge) => (
              <div key={badge.id} className={`relative p-4 rounded-lg border transition-all duration-200 ${badge.earned ? 'border-primary bg-primary/5 shadow-soft' : 'border-border bg-background hover:border-primary/50'}`}>
                {badge.earned && (
                  <div className="absolute -top-2 -right-2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} flex items-center justify-center`}>
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${badge.earned ? `bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white` : 'bg-muted text-muted-foreground'}`}>
                    <Icon name={badge.icon} size={24} />
                  </div>
                  <h3 className={`font-medium mb-1 ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                  {!badge.earned && (
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${badge.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{badge.progress}% complete</span>
                    </div>
                  )}
                  {badge.earned && (
                    <span className="text-xs text-success">
                      Earned {new Date(badge.earnedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {badges.length > 1 && (
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className=" bg-white border border-primary text-primary hover:bg-primary hover:text-white" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'View Less' : 'View More'}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <>
          <div className="space-y-4">
            {getDisplayedItems(challenges).map((challenge) => {
              const progressPercentage = (challenge.progress / challenge.maxProgress) * 100;
              return (
                <div key={challenge.id} className="bg-background rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground">{challenge.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Category: {challenge.category}</span>
                        <span>Time left: {challenge.timeLeft}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-warning mb-1">
                        <Icon name="Zap" size={14} />
                        <span className="text-sm font-medium">{challenge.reward} pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress: {challenge.progress}/{challenge.maxProgress}</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {challenges.length > 1 && (
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className=" bg-white border border-primary text-primary hover:bg-primary hover:text-white" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'View Less' : 'View More'}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <>
          <div className="space-y-4">
            {getDisplayedItems(milestones).map((milestone) => (
              <div key={milestone.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${milestone.achieved ? 'border-success bg-success/5' : 'border-border bg-background'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${milestone.achieved ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}`}>
                  <Icon name={milestone.achieved ? 'CheckCircle' : 'Circle'} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${milestone.achieved ? 'text-foreground' : 'text-muted-foreground'}`}>{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  {!milestone.achieved && milestone.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${milestone.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{milestone.progress}% complete</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-warning">
                    <Icon name="Zap" size={14} />
                    <span className="text-sm font-medium">{milestone.points} pts</span>
                  </div>
                  {milestone.achieved && (
                    <span className="text-xs text-success">
                      {new Date(milestone.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {milestones.length > 1 && (
            <div className="mt-4 text-center">
              <Button size="sm" className=" bg-white border border-primary text-primary hover:bg-primary hover:text-white" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'View Less' : 'View More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AchievementSystem;
