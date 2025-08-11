import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionSuccess = ({ transactionData }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount, currency = 'USD') => {
    const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$' };
    return `${symbols[currency] || '$'}${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCopyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(transactionData.transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy transaction ID');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Money Sent Successfully',
      text: `I just sent ${formatCurrency(transactionData.amount, transactionData.currency)} to ${transactionData.recipient.name} via Kashly`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `${shareData.text}\nTransaction ID: ${transactionData.transactionId}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReceipt = () => {
    // Mock receipt download
    const receiptData = {
      transactionId: transactionData.transactionId,
      timestamp: transactionData.timestamp,
      sender: 'You',
      recipient: transactionData.recipient.name,
      amount: transactionData.amount,
      currency: transactionData.currency,
      fee: transactionData.fee,
      total: transactionData.total,
      note: transactionData.note || 'No note provided'
    };

    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kashly-receipt-${transactionData.transactionId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Success Animation */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className={`w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
            showConfetti ? 'animate-bounce' : ''
          }`}>
            <Icon name="Check" size={48} className="text-success-foreground" />
          </div>
          
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-secondary rounded-full animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-success mb-2">Money Sent Successfully!</h2>
          <p className="text-muted-foreground">
            Your transfer to {transactionData.recipient.name} has been completed
          </p>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={transactionData.recipient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(transactionData.recipient.name)}&background=6B46C1&color=fff`}
            alt={transactionData.recipient.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{transactionData.recipient.name}</h3>
            <p className="text-sm text-muted-foreground">
              {transactionData.recipient.email || transactionData.recipient.phone}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono font-bold text-lg text-foreground">
              {formatCurrency(transactionData.amount, transactionData.currency)}
            </p>
            <p className="text-xs text-muted-foreground">
              + {formatCurrency(transactionData.fee, transactionData.currency)} fee
            </p>
          </div>
        </div>

        {transactionData.note && (
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">Note:</p>
            <p className="text-sm text-foreground">{transactionData.note}</p>
          </div>
        )}
      </div>

      {/* Transaction Details */}
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Transaction ID</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm text-foreground">
              {transactionData.transactionId}
            </span>
            <Button
              variant="ghost"
              size="icon"
              iconName={copied ? "Check" : "Copy"}
              onClick={handleCopyTransactionId}
              className="h-6 w-6"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Date & Time</span>
          <span className="text-sm text-foreground">
            {formatDate(transactionData.timestamp)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Status</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-success">Completed</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Delivery</span>
          <span className="text-sm font-medium text-success">Instant</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={handleDownloadReceipt}
          >
            Receipt
          </Button>
        </div>

        <Button
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={() => window.location.reload()}
        >
          Send Another
        </Button>

        <Button
          variant="ghost"
          fullWidth
          onClick={() => navigate('/digital-wallet')}
        >
          Back to Wallet
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => {
              // Pre-fill form with same recipient
              window.location.reload();
            }}
          >
            Send Again
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => {
              // Add to favorites logic
              console.log('Add to favorites');
            }}
          >
            Add Favorite
          </Button>
        </div>
      </div>

      {/* Support */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Need help with this transaction?
        </p>
        <Button
          variant="link"
          size="sm"
          iconName="HelpCircle"
          iconPosition="left"
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default TransactionSuccess;