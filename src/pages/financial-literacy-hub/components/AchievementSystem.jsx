import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementSystem = ({ achievements, learningStats }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Badges', icon: 'Award' },
    { value: 'learning', label: 'Learning', icon: 'BookOpen' },
    { value: 'quiz', label: 'Quiz Master', icon: 'HelpCircle' },
    { value: 'streak', label: 'Consistency', icon: 'Calendar' },
    { value: 'social', label: 'Social', icon: 'Users' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'rare': return 'bg-primary/10 text-primary';
      case 'epic': return 'bg-accent/10 text-accent';
      case 'legendary': return 'bg-gradient-to-r from-accent to-secondary text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 75) return 'bg-primary';
    if (progress >= 50) return 'bg-warning';
    return 'bg-muted-foreground/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
          <p className="text-sm text-muted-foreground">Track your learning progress and earn badges</p>
        </div>
        <Button variant="outline" size="sm" iconName="TrendingUp" iconPosition="left">
          View Stats
        </Button>
      </div>

      {/* Learning Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Flame" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{learningStats.currentStreak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="BookOpen" size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-foreground">{learningStats.articlesRead}</div>
          <div className="text-sm text-muted-foreground">Articles Read</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={24} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground">{learningStats.badgesEarned}</div>
          <div className="text-sm text-muted-foreground">Badges Earned</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={24} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{learningStats.quizScore}%</div>
          <div className="text-sm text-muted-foreground">Avg Quiz Score</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            iconName={category.icon}
            iconPosition="left"
            onClick={() => setSelectedCategory(category.value)}
            className="whitespace-nowrap"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-card border rounded-lg p-4 transition-smooth ${
              achievement.earned 
                ? 'border-primary shadow-soft' 
                : 'border-border opacity-75'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getBadgeColor(achievement.rarity)}`}>
                <Icon 
                  name={achievement.icon} 
                  size={24} 
                  className={achievement.earned ? 'text-current' : 'text-muted-foreground'} 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h3>
                  {achievement.earned && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {achievement.description}
                </p>

                {/* Progress Bar */}
                {!achievement.earned && achievement.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(achievement.progress)}`}
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Earned Date */}
                {achievement.earned && achievement.earnedDate && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Earned on {achievement.earnedDate}
                  </div>
                )}

                {/* Rarity Badge */}
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getBadgeColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </span>
                  
                  {achievement.points && (
                    <span className="text-xs text-accent font-medium">
                      +{achievement.points} XP
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No achievements found</h3>
          <p className="text-muted-foreground">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default AchievementSystem;