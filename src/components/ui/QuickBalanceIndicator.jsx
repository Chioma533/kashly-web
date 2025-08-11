import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickBalanceIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(2847.50);
  const [currency, setCurrency] = useState('USD');
  const [changeAmount, setChangeAmount] = useState(+127.30);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const refreshBalance = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBalance(2847.50 + (Math.random() - 0.5) * 100);
      setIsLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatChange = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${formatCurrency(Math.abs(amount))}`;
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Balance Display */}
      <div className="flex items-center space-x-2">
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">Balance</span>
            <Button
              variant="ghost"
              size="icon"
              iconName={isVisible ? "Eye" : "EyeOff"}
              iconSize={14}
              onClick={toggleVisibility}
              className="h-6 w-6"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            {isVisible ? (
              <>
                <span className="font-mono font-semibold text-foreground text-sm lg:text-base">
                  {isLoading ? '...' : formatCurrency(balance)}
                </span>
                
                {/* Change indicator - desktop only */}
                <div className="hidden lg:flex items-center space-x-1">
                  <Icon 
                    name={changeAmount >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={12} 
                    className={changeAmount >= 0 ? "text-success" : "text-error"}
                  />
                  <span className={`text-xs font-medium ${
                    changeAmount >= 0 ? "text-success" : "text-error"
                  }`}>
                    {formatChange(changeAmount)}
                  </span>
                </div>
              </>
            ) : (
              <span className="font-mono font-semibold text-muted-foreground text-sm lg:text-base">
                ••••••
              </span>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="icon"
          iconName="RefreshCw"
          iconSize={14}
          onClick={refreshBalance}
          loading={isLoading}
          className="h-6 w-6"
        />
      </div>

      {/* Currency Selector - Desktop only */}
      <div className="hidden lg:flex items-center">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="text-xs bg-transparent border-none text-muted-foreground focus:outline-none focus:text-foreground cursor-pointer"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CAD">CAD</option>
        </select>
      </div>
    </div>
  );
};

export default QuickBalanceIndicator;