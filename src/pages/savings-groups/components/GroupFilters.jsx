import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GroupFilters = ({ onFilterChange, onSearchChange, searchQuery }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filterOptions = [
    { id: 'all', label: 'All Groups', icon: 'Grid3X3' },
    { id: 'active', label: 'Active', icon: 'Play' },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { id: 'near-goal', label: 'Near Goal', icon: 'Target' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent', icon: 'Clock' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'amount', label: 'Amount', icon: 'DollarSign' },
    { id: 'members', label: 'Members', icon: 'Users' }
  ];

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange({ filter: filterId, sort: sortBy });
  };

  const handleSortChange = (sortId) => {
    setSortBy(sortId);
    onFilterChange({ filter: activeFilter, sort: sortId });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-soft mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search your groups..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions.map((option) => (
          <Button
            key={option.id}
            variant={activeFilter === option.id ? 'default' : 'outline'}
            size="sm"
            iconName={option.icon}
            iconPosition="left"
            onClick={() => handleFilterChange(option.id)}
            className="flex-shrink-0"
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        
        <div className="flex space-x-1">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              variant={sortBy === option.id ? 'secondary' : 'ghost'}
              size="xs"
              iconName={option.icon}
              iconPosition="left"
              onClick={() => handleSortChange(option.id)}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFilter !== 'all' || sortBy !== 'recent') && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {activeFilter !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                <span>{filterOptions.find(f => f.id === activeFilter)?.label}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  iconSize={10}
                  onClick={() => handleFilterChange('all')}
                  className="h-4 w-4 ml-1"
                />
              </div>
            )}
            {sortBy !== 'recent' && (
              <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
                <span>{sortOptions.find(s => s.id === sortBy)?.label}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  iconSize={10}
                  onClick={() => handleSortChange('recent')}
                  className="h-4 w-4 ml-1"
                />
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="xs"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => {
              setActiveFilter('all');
              setSortBy('recent');
              onFilterChange({ filter: 'all', sort: 'recent' });
              onSearchChange('');
            }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupFilters;