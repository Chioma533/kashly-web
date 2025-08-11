import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletHeader = ({ totalBalance, balanceChange, onRefresh }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Animate balance counter
    const duration = 1000;
    const steps = 60;
    const increment = totalBalance / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= totalBalance) {
        setAnimatedBalance(totalBalance);
        clearInterval(timer);
      } else {
        setAnimatedBalance(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalBalance]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Wallet" size={24} className="text-primary-foreground" />
          <h1 className="text-xl font-semibold">Total Balance</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            iconName={isVisible ? "Eye" : "EyeOff"}
            iconSize={20}
            onClick={() => setIsVisible(!isVisible)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="RefreshCw"
            iconSize={20}
            onClick={handleRefresh}
            loading={isRefreshing}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        {isVisible ? (
          <>
            <div className="text-4xl font-bold font-mono">
              {formatCurrency(animatedBalance)}
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={balanceChange >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                className={balanceChange >= 0 ? "text-secondary" : "text-error"}
              />
              <span className={`text-sm font-medium ${
                balanceChange >= 0 ? "text-secondary" : "text-error"
              }`}>
                {formatChange(balanceChange)} from last month
              </span>
            </div>
          </>
        ) : (
          <div className="text-4xl font-bold font-mono text-primary-foreground/60">
            ••••••••
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-primary-foreground/20">
        <div className="text-center">
          <div className="text-sm text-primary-foreground/80">This Month</div>
          <div className="text-lg font-semibold">+$1,247.30</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-primary-foreground/80">Savings Goal</div>
          <div className="text-lg font-semibold">73% Complete</div>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;