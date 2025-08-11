import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();
  
  const breadcrumbConfig = {
    '/digital-wallet': [
      { label: 'Wallet', path: '/digital-wallet' }
    ],
    '/send-money': [
      { label: 'Wallet', path: '/digital-wallet' },
      { label: 'Send Money', path: '/send-money' }
    ],
    '/savings-groups': [
      { label: 'Groups', path: '/savings-groups' }
    ],
    '/group-details': [
      { label: 'Groups', path: '/savings-groups' },
      { label: 'Group Details', path: '/group-details' }
    ],
    '/budgeting-coach': [
      { label: 'Learn', path: '/budgeting-coach' }
    ],
    '/financial-literacy-hub': [
      { label: 'Learn', path: '/budgeting-coach' },
      { label: 'Financial Hub', path: '/financial-literacy-hub' }
    ]
  };

  const currentPath = location.pathname;
  const breadcrumbs = breadcrumbConfig[currentPath];

  // Don't show breadcrumbs for primary section pages
  const primaryPaths = ['/digital-wallet', '/savings-groups', '/budgeting-coach'];
  if (!breadcrumbs || breadcrumbs.length <= 1 || primaryPaths.includes(currentPath)) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isClickable = !isLast && crumb.path !== currentPath;
          
          return (
            <li key={crumb.path} className="flex items-center space-x-2">
              {index > 0 && (
                <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
              )}
              
              {isClickable ? (
                <Link
                  to={crumb.path}
                  className="hover:text-foreground transition-smooth font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={`${isLast ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;