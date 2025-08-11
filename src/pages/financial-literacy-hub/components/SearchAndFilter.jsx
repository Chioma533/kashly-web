import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilterChange, searchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    contentType: 'all',
    difficulty: 'all',
    topic: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const contentTypes = [
    { value: 'all', label: 'All Content' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'quiz', label: 'Quizzes' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const topics = [
    { value: 'all', label: 'All Topics' },
    { value: 'basics', label: 'Financial Basics' },
    { value: 'investing', label: 'Investing' },
    { value: 'saving', label: 'Saving Strategies' },
    { value: 'budgeting', label: 'Budgeting' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'digital', label: 'Digital Finance' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query, activeFilters);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
    onSearch(searchQuery, newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      contentType: 'all',
      difficulty: 'all',
      topic: 'all'
    };
    setActiveFilters(resetFilters);
    setSearchQuery('');
    onFilterChange(resetFilters);
    onSearch('', resetFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search articles, videos, and quizzes..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
        />
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={16}
            onClick={() => handleSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
          />
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Content Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Content Type
              </label>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contentType"
                      value={type.value}
                      checked={activeFilters.contentType === type.value}
                      onChange={(e) => handleFilterChange('contentType', e.target.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Difficulty Level
              </label>
              <div className="space-y-2">
                {difficulties.map((difficulty) => (
                  <label key={difficulty.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty.value}
                      checked={activeFilters.difficulty === difficulty.value}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{difficulty.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Topic Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Topic
              </label>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <label key={topic.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="topic"
                      value={topic.value}
                      checked={activeFilters.topic === topic.value}
                      onChange={(e) => handleFilterChange('topic', e.target.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{topic.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      {searchQuery && searchResults && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
          </span>
          <span>
            {searchResults.filter(r => r.type === 'article').length} articles, {' '}
            {searchResults.filter(r => r.type === 'video').length} videos, {' '}
            {searchResults.filter(r => r.type === 'quiz').length} quizzes
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;