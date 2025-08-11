import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedContent = ({ relatedContent, onContentClick }) => {
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'quiz': return 'HelpCircle';
      case 'article': return 'FileText';
      default: return 'BookOpen';
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-error bg-error/10';
      case 'quiz': return 'text-accent bg-accent/10';
      case 'article': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Related Content</h3>
        <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {relatedContent.map((content) => (
          <div
            key={content.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-smooth cursor-pointer"
            onClick={() => onContentClick(content)}
          >
            <div className="flex items-start space-x-4">
              {/* Thumbnail */}
              <div className="w-20 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Content Type Overlay */}
                <div className="relative">
                  <div className={`absolute -top-12 left-1 px-1.5 py-0.5 rounded text-xs font-medium ${getContentTypeColor(content.type)}`}>
                    <Icon name={getContentTypeIcon(content.type)} size={10} />
                  </div>
                </div>
              </div>

              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground line-clamp-2 text-sm">
                    {content.title}
                  </h4>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0 ml-2" />
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {content.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{content.duration || content.readingTime}</span>
                    {content.views && <span>{content.views} views</span>}
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                </div>

                {/* Progress Bar for partially consumed content */}
                {content.progress > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${content.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {relatedContent.length === 0 && (
        <div className="text-center py-8">
          <Icon name="BookOpen" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No related content available</p>
        </div>
      )}
    </div>
  );
};

export default RelatedContent;