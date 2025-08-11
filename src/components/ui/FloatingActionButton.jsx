import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from './Button';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getContextualActions = () => {
    const currentPath = location.pathname;
    
    if (currentPath === '/digital-wallet' || currentPath.startsWith('/digital-wallet/')) {
      return [
        { 
          label: 'Send Money', 
          icon: 'Send', 
          action: () => navigate('/send-money'),
          color: 'primary'
        },
        { 
          label: 'Request Money', 
          icon: 'Download', 
          action: () => console.log('Request money'),
          color: 'secondary'
        },
        { 
          label: 'Add Funds', 
          icon: 'Plus', 
          action: () => console.log('Add funds'),
          color: 'success'
        }
      ];
    }
    
    if (currentPath === '/savings-groups' || currentPath.startsWith('/savings-groups/')) {
      return [
        { 
          label: 'Create Group', 
          icon: 'UserPlus', 
          action: () => console.log('Create group'),
          color: 'primary'
        },
        { 
          label: 'Join Group', 
          icon: 'Users', 
          action: () => console.log('Join group'),
          color: 'secondary'
        }
      ];
    }
    
    if (currentPath === '/send-money' || currentPath.startsWith('/send-money/')) {
      return [
        { 
          label: 'Quick Send', 
          icon: 'Zap', 
          action: () => console.log('Quick send'),
          color: 'primary'
        },
        { 
          label: 'Scan QR', 
          icon: 'QrCode', 
          action: () => console.log('Scan QR'),
          color: 'accent'
        }
      ];
    }
    
    if (currentPath === '/budgeting-coach' || currentPath === '/financial-literacy-hub') {
      return [
        { 
          label: 'Set Goal', 
          icon: 'Target', 
          action: () => console.log('Set goal'),
          color: 'primary'
        },
        { 
          label: 'Track Progress', 
          icon: 'TrendingUp', 
          action: () => console.log('Track progress'),
          color: 'success'
        }
      ];
    }
    
    // Default actions
    return [
      { 
        label: 'Quick Action', 
        icon: 'Plus', 
        action: () => console.log('Quick action'),
        color: 'primary'
      }
    ];
  };

  const actions = getContextualActions();
  const primaryAction = actions[0];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    action.action();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-200 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* FAB Container */}
      <div className="fixed bottom-6 right-6 z-300">
        {/* Expanded Actions */}
        {isExpanded && actions.length > 1 && (
          <div className="flex flex-col space-y-3 mb-4">
            {actions.slice(1).reverse().map((action, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 animate-in slide-in-from-bottom-2 duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-card text-card-foreground px-3 py-1 rounded-lg text-sm font-medium shadow-soft whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  iconName={action.icon}
                  iconSize={20}
                  onClick={() => handleActionClick(action)}
                  className="h-12 w-12 shadow-soft"
                />
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <div className="relative">
          {/* Desktop: Show as inline button on larger screens */}
          <div className="hidden lg:block">
            <Button
              variant="default"
              iconName={primaryAction.icon}
              iconPosition="left"
              onClick={() => handleActionClick(primaryAction)}
              className="shadow-elevated"
            >
              {primaryAction.label}
            </Button>
          </div>

          {/* Mobile: Show as FAB */}
          <div className="lg:hidden">
            <Button
              variant="default"
              size="icon"
              iconName={isExpanded ? "X" : primaryAction.icon}
              iconSize={24}
              onClick={actions.length > 1 ? toggleExpanded : () => handleActionClick(primaryAction)}
              className="h-14 w-14 rounded-full shadow-elevated transition-all duration-200 hover:scale-105"
            />
            
            {/* Action count indicator */}
            {actions.length > 1 && !isExpanded && (
              <div className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {actions.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingActionButton;