import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import { cn } from '../../utils/cn';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Wallet,
  Bell,
  Search
} from 'lucide-react';

const Header = ({ title, showBalance = true, className }) =>{
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  return (
    <header className={cn("bg-card border-b border-border shadow-soft", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-foreground">Kashly</span>
            </Link>
            
            {title && (
              <div className="hidden md:block">
                <span className="text-muted-foreground">•</span>
                <span className="ml-2 text-lg font-semibold text-foreground">{title}</span>
              </div>
            )}
          </div>

          {/* Center Section - Balance (Desktop) */}
          {showBalance && userProfile && (
            <div className="hidden md:flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(userProfile.wallet_balance)}
              </span>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                {/* Search Button (Desktop) */}
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Search className="w-5 h-5" />
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
                </Button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      {userProfile?.profile_picture_url ? (
                        <img
                          src={userProfile.profile_picture_url}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-foreground">
                      {userProfile?.full_name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-lg shadow-elevated border border-border z-20">
                        <div className="p-3 border-b border-border">
                          <p className="font-medium text-foreground">{userProfile?.full_name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            Profile Settings
                          </Link>
                          <button
                            onClick={() => {
                              handleSignOut();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Balance */}
        {showBalance && userProfile && (
          <div className="md:hidden pb-3">
            <div className="flex items-center justify-center space-x-2 bg-muted/50 rounded-full px-4 py-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(userProfile.wallet_balance)}
              </span>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && user && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/digital-wallet"
                className="block px-3 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Digital Wallet
              </Link>
              <Link
                to="/savings-groups"
                className="block px-3 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Savings Groups
              </Link>
              <Link
                to="/budgeting-coach"
                className="block px-3 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Budgeting Coach
              </Link>
              <Link
                to="/financial-literacy-hub"
                className="block px-3 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Financial Hub
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;