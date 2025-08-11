import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedContentCarousel = ({ featuredContent, onContentClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredContent.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    setIsAutoPlaying(false);
  };

  const currentContent = featuredContent[currentIndex];

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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-muted relative overflow-hidden">
          <Image
            src={currentContent.thumbnail}
            alt={currentContent.title}
            className="w-full h-full object-cover"
          />
          
          {/* Content Type Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getContentTypeColor(currentContent.type)}`}>
            <div className="flex items-center space-x-1">
              <Icon name={getContentTypeIcon(currentContent.type)} size={12} />
              <span className="capitalize">{currentContent.type}</span>
            </div>
          </div>

          {/* New Badge */}
          {currentContent.isNew && (
            <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-bold">
              NEW
            </div>
          )}

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            iconName="ChevronLeft"
            iconSize={20}
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
          />
          
          <Button
            variant="ghost"
            size="icon"
            iconName="ChevronRight"
            iconSize={20}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
          />

          {/* Play Button for Videos */}
          {currentContent.type === 'video' && (
            <Button
              variant="ghost"
              size="icon"
              iconName="Play"
              iconSize={32}
              onClick={() => onContentClick(currentContent)}
              className="absolute inset-0 m-auto bg-black/50 text-white hover:bg-black/70 w-16 h-16 rounded-full"
            />
          )}
        </div>

        {/* Content Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                {currentContent.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {currentContent.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{currentContent.duration}</span>
              <span>{currentContent.difficulty}</span>
              {currentContent.views && <span>{currentContent.views} views</span>}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContentClick(currentContent)}
            >
              {currentContent.type === 'video' ? 'Watch' : 
               currentContent.type === 'quiz' ? 'Take Quiz' : 'Read'}
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex items-center justify-center space-x-2 p-4 bg-muted/30">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedContentCarousel;