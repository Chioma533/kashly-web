import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";
import { cn } from "../../utils/cn";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Wallet,
  Bell,
  Search,
} from "lucide-react";

const Header = ({ title, showBalance = true, className }) => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const formatCurrency = (amount) => {
    // return new Intl.NumberFormat('en-US', {
    //   style: 'currency',
    //   currency: 'USD'
    // }).format(amount || 0);
  };

  return (
    <header
      className={cn("bg-card border-b border-border shadow-soft sticky w-full top-0 z-100 ", className)}
    >
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
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                {/* Notifications */}
                <Button size="sm" className="relative hidden md:block bg-white">
                  <Bell className="w-6 h-6 text-black" />
                  <span className="absolute top-1 right-2 w-2 h-2 bg-error rounded-full"></span>
                </Button>

                {/* Profile Dropdown */}
                <div className="relative md:block hidden">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className=" p-2 rounded-full bg-green-500"
                  >
                    <span className=" md:block text-sm font-medium text-foreground ">
                      {userProfile?.full_name
                        ? userProfile.full_name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .toUpperCase()
                        : "U"}
                    </span>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-100 "
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-max bg-card rounded-lg shadow-elevated border border-border z-20">
                        <div className="p-3 border-b border-border">
                          <p className="font-medium text-foreground">
                            {userProfile?.full_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user?.email}
                          </p>
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
                  className="md:hidden border border-border p-2 rounded-md"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
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
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && user && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="space-y-2 flex flex-col w-100">
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
};

export default Header;
