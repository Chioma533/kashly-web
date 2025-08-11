import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AmountInput = ({ onAmountChange, amount, currency, onCurrencyChange }) => {
  const [displayAmount, setDisplayAmount] = useState(amount || '');
  const [selectedCurrency, setSelectedCurrency] = useState(currency || 'USD');
  const [showKeypad, setShowKeypad] = useState(false);
  const [conversionRates, setConversionRates] = useState({
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    CAD: 1.25
  });

  const availableBalance = 2847.50;
  const maxSendLimit = 5000.00;

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' }
  ];

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫']
  ];

  useEffect(() => {
    onAmountChange(parseFloat(displayAmount) || 0);
  }, [displayAmount, onAmountChange]);

  useEffect(() => {
    onCurrencyChange(selectedCurrency);
  }, [selectedCurrency, onCurrencyChange]);

  const handleKeypadPress = (key) => {
    if (key === '⌫') {
      setDisplayAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!displayAmount.includes('.')) {
        setDisplayAmount(prev => prev + '.');
      }
    } else {
      if (displayAmount.length < 10) {
        setDisplayAmount(prev => {
          const newAmount = prev + key;
          return parseFloat(newAmount) <= maxSendLimit ? newAmount : prev;
        });
      }
    }
  };

  const handleQuickAmount = (quickAmount) => {
    setDisplayAmount(quickAmount.toString());
  };

  const formatCurrency = (amount, currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return `${currency?.symbol || '$'}${amount.toFixed(2)}`;
  };

  const getConvertedAmount = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    const usdAmount = amount / conversionRates[fromCurrency];
    return usdAmount * conversionRates[toCurrency];
  };

  const currentAmount = parseFloat(displayAmount) || 0;
  const isInsufficientFunds = currentAmount > availableBalance;
  const isOverLimit = currentAmount > maxSendLimit;
  const hasError = isInsufficientFunds || isOverLimit;

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div className="space-y-6">
      {/* Currency Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {currencies.map((curr) => (
          <Button
            key={curr.code}
            variant={selectedCurrency === curr.code ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCurrency(curr.code)}
            className="flex-shrink-0"
          >
            <span className="font-mono">{curr.symbol}</span>
            <span className="ml-1">{curr.code}</span>
          </Button>
        ))}
      </div>

      {/* Amount Display */}
      <div className="text-center space-y-2">
        <div className="relative">
          <Input
            type="text"
            value={displayAmount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              if (parseFloat(value) <= maxSendLimit || value === '') {
                setDisplayAmount(value);
              }
            }}
            placeholder="0.00"
            className={`text-center text-3xl lg:text-4xl font-mono h-16 ${
              hasError ? 'border-error text-error' : ''
            }`}
            style={{ fontSize: 'clamp(24px, 8vw, 48px)' }}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <span className="text-2xl lg:text-3xl font-mono text-muted-foreground">
              {currencies.find(c => c.code === selectedCurrency)?.symbol}
            </span>
          </div>
        </div>

        {/* Conversion Display */}
        {selectedCurrency !== 'USD' && currentAmount > 0 && (
          <div className="text-sm text-muted-foreground">
            ≈ {formatCurrency(getConvertedAmount(currentAmount, selectedCurrency, 'USD'), 'USD')} USD
          </div>
        )}

        {/* Error Messages */}
        {isInsufficientFunds && (
          <div className="flex items-center justify-center space-x-2 text-error text-sm">
            <Icon name="AlertCircle" size={16} />
            <span>Insufficient funds (Available: {formatCurrency(availableBalance, 'USD')})</span>
          </div>
        )}

        {isOverLimit && (
          <div className="flex items-center justify-center space-x-2 text-error text-sm">
            <Icon name="AlertTriangle" size={16} />
            <span>Amount exceeds daily limit ({formatCurrency(maxSendLimit, selectedCurrency)})</span>
          </div>
        )}
      </div>

      {/* Quick Amount Buttons */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Amounts</h3>
        <div className="grid grid-cols-3 gap-2">
          {quickAmounts.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAmount(quickAmount)}
              className="font-mono"
            >
              {formatCurrency(quickAmount, selectedCurrency)}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Keypad Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          fullWidth
          iconName={showKeypad ? "ChevronUp" : "Calculator"}
          iconPosition="left"
          onClick={() => setShowKeypad(!showKeypad)}
        >
          {showKeypad ? "Hide Keypad" : "Show Keypad"}
        </Button>
      </div>

      {/* Numeric Keypad */}
      {(showKeypad || window.innerWidth >= 1024) && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="grid grid-cols-3 gap-3">
            {keypadNumbers.flat().map((key, index) => (
              <Button
                key={index}
                variant={key === '⌫' ? "destructive" : "outline"}
                size="lg"
                onClick={() => handleKeypadPress(key)}
                className="h-12 text-lg font-mono"
                disabled={key === '.' && displayAmount.includes('.')}
              >
                {key === '⌫' ? <Icon name="Delete" size={20} /> : key}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Balance Information */}
      <div className="bg-muted rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Available Balance</span>
          <span className="font-mono font-medium text-foreground">
            {formatCurrency(availableBalance, 'USD')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Daily Send Limit</span>
          <span className="font-mono text-sm text-muted-foreground">
            {formatCurrency(maxSendLimit, selectedCurrency)}
          </span>
        </div>
        {currentAmount > 0 && (
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Remaining After Send</span>
            <span className={`font-mono font-medium ${
              isInsufficientFunds ? 'text-error' : 'text-success'
            }`}>
              {formatCurrency(Math.max(0, availableBalance - currentAmount), 'USD')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmountInput;