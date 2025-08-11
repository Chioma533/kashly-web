import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionReview = ({ recipient, amount, currency, onConfirm, onEdit }) => {
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const exchangeRate = 1.0;
  const transferFee = amount > 100 ? 0 : 2.99;
  const totalAmount = amount + transferFee;
  const estimatedDelivery = "Instant";

  const currencies = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    GBP: { symbol: '£', name: 'British Pound' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar' }
  };

  const formatCurrency = (amount, currencyCode) => {
    const curr = currencies[currencyCode] || currencies.USD;
    return `${curr.symbol}${amount.toFixed(2)}`;
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setPinError('PIN must be 4 digits');
      return;
    }

    // Mock PIN validation (correct PIN: 1234)
    if (pin !== '1234') {
      setPinError('Incorrect PIN. Please try again.');
      setPin('');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onConfirm({
        recipient,
        amount,
        currency,
        fee: transferFee,
        total: totalAmount,
        note,
        transactionId: `TXN${Date.now()}`,
        timestamp: new Date().toISOString()
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handlePinChange = (value) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    setPin(numericValue);
    setPinError('');
  };

  if (showPinEntry) {
    return (
      <div className="space-y-6">
        {/* Security Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Shield" size={32} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Secure Transaction</h3>
          <p className="text-muted-foreground">Enter your 4-digit PIN to confirm this transfer</p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-muted rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Sending to</span>
            <span className="font-medium text-foreground">{recipient.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="font-mono font-semibold text-foreground">
              {formatCurrency(totalAmount, currency)}
            </span>
          </div>
        </div>

        {/* PIN Entry */}
        <div className="space-y-4">
          <Input
            type="password"
            label="Transaction PIN"
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => handlePinChange(e.target.value)}
            error={pinError}
            maxLength={4}
            className="text-center text-2xl font-mono tracking-widest"
          />

          {/* PIN Dots Indicator */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 ${
                  index < pin.length
                    ? 'bg-primary border-primary' :'border-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={handlePinSubmit}
            disabled={pin.length !== 4 || isProcessing}
            loading={isProcessing}
            iconName="Lock"
            iconPosition="left"
          >
            {isProcessing ? 'Processing...' : 'Confirm Transfer'}
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowPinEntry(false)}
            disabled={isProcessing}
          >
            Back to Review
          </Button>
        </div>

        {/* Security Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-warning">Security Notice</p>
              <p className="text-xs text-muted-foreground">
                Never share your PIN with anyone. Kashly will never ask for your PIN via email or phone.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Header */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Review Transfer</h3>
        <p className="text-muted-foreground">Please review the details before confirming</p>
      </div>

      {/* Recipient Information */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={recipient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(recipient.name)}&background=6B46C1&color=fff`}
            alt={recipient.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{recipient.name}</h4>
            <p className="text-sm text-muted-foreground">
              {recipient.email || recipient.phone || 'Manual recipient'}
            </p>
            {recipient.isFrequent && (
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="Star" size={12} className="text-secondary" />
                <span className="text-xs text-secondary">Frequent recipient</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit"
            onClick={() => onEdit('recipient')}
          />
        </div>
      </div>

      {/* Amount Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">Amount Details</h4>
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit"
            onClick={() => onEdit('amount')}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Send Amount</span>
            <span className="font-mono font-semibold text-foreground">
              {formatCurrency(amount, currency)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Transfer Fee</span>
            <span className="font-mono text-foreground">
              {transferFee === 0 ? 'Free' : formatCurrency(transferFee, currency)}
            </span>
          </div>

          {currency !== 'USD' && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-mono text-muted-foreground">
                1 {currency} = {exchangeRate} USD
              </span>
            </div>
          )}

          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">Total Amount</span>
              <span className="font-mono font-bold text-lg text-foreground">
                {formatCurrency(totalAmount, currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-muted rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Estimated Delivery</span>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={14} className="text-success" />
            <span className="font-medium text-success">{estimatedDelivery}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Transaction Type</span>
          <span className="text-sm font-medium text-foreground">Peer-to-Peer Transfer</span>
        </div>
      </div>

      {/* Optional Note */}
      <div>
        <Input
          label="Add a note (optional)"
          type="text"
          placeholder="What's this for?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={100}
        />
        <p className="text-xs text-muted-foreground mt-1">
          This note will be visible to both you and the recipient
        </p>
      </div>

      {/* Confirmation Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          size="lg"
          onClick={() => setShowPinEntry(true)}
          iconName="Send"
          iconPosition="left"
        >
          Confirm & Send {formatCurrency(totalAmount, currency)}
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => onEdit('amount')}
        >
          Back to Edit
        </Button>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="space-y-2">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Shield" size={16} className="text-success" />
          </div>
          <p className="text-xs text-muted-foreground">256-bit Encryption</p>
        </div>
        <div className="space-y-2">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Lock" size={16} className="text-success" />
          </div>
          <p className="text-xs text-muted-foreground">Secure PIN Verification</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionReview;