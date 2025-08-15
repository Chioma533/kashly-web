import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = () => {
  const location = useLocation();

  const tabs = [
    {
      id: 'wallet',
      label: 'Wallet',
      icon: 'Wallet',
      paths: ['/digital-wallet', '/send-money'],
      color: 'primary'
    },
    {
      id: 'groups',
      label: 'Groups',
      icon: 'Users',
      paths: ['/savings-groups', '/group-details'],
      color: 'secondary'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: 'BookOpen',
      paths: ['/budgeting-coach', '/financial-literacy-hub'],
      color: 'accent'
    }
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    return tabs.find(tab => 
      tab.paths.some(path => currentPath === path || currentPath.startsWith(path + '/'))
    );
  };

  const activeTab = getActiveTab();

  const getPrimaryPath = (tab) => {
    return tab.paths[0];
  };

  return (
    <div className="fixed -bottom-1 left-0 w-full md:sticky md:top-[64px] bg-transparent z-50">
      <nav className="flex items-center justify-center m-1">
        <div className="flex bg-muted rounded-lg p-2">
          {tabs.map((tab) => {
            const isActive = activeTab?.id === tab.id;
            const primaryPath = getPrimaryPath(tab);
            
            return (
              <Link
                key={tab.id}
                to={primaryPath}
                className={`flex items-center space-x-2 px-5 py-3 rounded-md text-sm font-medium transition-smooth justify-center ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
              >
                <Icon 
                  name={tab.icon} 
                  size={18} 
                  className={isActive ? 'text-primary-foreground' : 'text-current'}
                />
                <span>{tab.label}</span>
              
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default TabNavigation;