import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VideoContent = ({ videos, onVideoPlay }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set());

  const categories = ['All', 'Basics', 'Investing', 'Budgeting', 'Cryptocurrency', 'Saving'];

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const toggleBookmark = (videoId) => {
    const newBookmarks = new Set(bookmarkedVideos);
    if (newBookmarks.has(videoId)) {
      newBookmarks.delete(videoId);
    } else {
      newBookmarks.add(videoId);
    }
    setBookmarkedVideos(newBookmarks);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Video Library</h2>
          <p className="text-sm text-muted-foreground">Learn through engaging video content</p>
        </div>
        <Button variant="outline" size="sm" iconName="Bookmark" iconPosition="left">
          Bookmarks ({bookmarkedVideos.size})
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-soft transition-smooth">
            <div className="relative aspect-video bg-muted">
              <Image
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                {formatDuration(video.duration)}
              </div>

              {/* Play Button */}
              <Button
                variant="ghost"
                size="icon"
                iconName="Play"
                iconSize={24}
                onClick={() => onVideoPlay(video)}
                className="absolute inset-0 m-auto bg-black/50 text-white hover:bg-black/70 w-12 h-12 rounded-full"
              />

              {/* New Badge */}
              {video.isNew && (
                <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-bold">
                  NEW
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground line-clamp-2 flex-1">
                  {video.title}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={bookmarkedVideos.has(video.id) ? "Bookmark" : "BookmarkPlus"}
                  iconSize={16}
                  onClick={() => toggleBookmark(video.id)}
                  className={`ml-2 w-8 h-8 ${bookmarkedVideos.has(video.id) ? 'text-accent' : 'text-muted-foreground'}`}
                />
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {video.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.uploadDate}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                  {video.difficulty}
                </span>
              </div>

              {/* Progress Bar */}
              {video.watchProgress > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{video.watchProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${video.watchProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => onVideoPlay(video)}
                >
                  {video.watchProgress > 0 ? 'Continue' : 'Watch'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  iconName="Share"
                  iconSize={16}
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No videos found</h3>
          <p className="text-muted-foreground">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default VideoContent;