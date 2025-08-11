import React from 'react';
import Icon from '../../../components/AppIcon';


const CategoryCard = ({ category, onCategoryClick }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth cursor-pointer"
         onClick={() => onCategoryClick(category)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.bgColor}`}>
            <Icon name={category.icon} size={24} className={category.iconColor} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{category.title}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{category.progress}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(category.progress)}`}
            style={{ width: `${category.progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{category.articleCount} articles</span>
            <span>{category.readingTime} min read</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(category.difficulty)}`}>
            {category.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;