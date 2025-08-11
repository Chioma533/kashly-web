import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizSection = ({ quizzes, onQuizStart }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Interactive Quizzes</h2>
          <p className="text-sm text-muted-foreground">Test your knowledge and earn badges</p>
        </div>
        <Button variant="outline" size="sm" iconName="Trophy" iconPosition="left">
          View Badges
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className={`bg-card border rounded-lg p-4 transition-smooth cursor-pointer hover:shadow-soft ${
              selectedQuiz?.id === quiz.id ? 'border-primary ring-1 ring-primary' : 'border-border'
            }`}
            onClick={() => setSelectedQuiz(quiz)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="HelpCircle" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{quiz.title}</h3>
                  <p className="text-xs text-muted-foreground">{quiz.questions} questions</p>
                </div>
              </div>
              
              {quiz.completed && (
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className={`text-xs font-medium ${getScoreColor(quiz.lastScore)}`}>
                    {quiz.lastScore}%
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Estimated time</span>
                <span className="text-foreground">{quiz.estimatedTime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
                
                {quiz.badge && (
                  <div className="flex items-center space-x-1 text-xs text-accent">
                    <Icon name="Award" size={12} />
                    <span>{quiz.badge}</span>
                  </div>
                )}
              </div>

              <Button
                variant={quiz.completed ? "outline" : "default"}
                size="sm"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  onQuizStart(quiz);
                }}
                className="mt-3"
              >
                {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Stats */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">85%</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">7</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">15</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;