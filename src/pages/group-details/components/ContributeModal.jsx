import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContributeModal = ({ isOpen, onClose, onContribute, group }) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [10, 25, 50, 100];

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsProcessing(true);
    
    try {
      await onContribute({
        amount: parseFloat(amount),
        note: note.trim(),
        timestamp: new Date().toISOString()
      });
      
      // Reset form
      setAmount('');
      setNote('');
      onClose();
    } catch (error) {
      console.error('Contribution failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const remainingAmount = group.targetAmount - group.currentAmount;
  const contributionPercentage = amount ? (parseFloat(amount) / group.targetAmount) * 100 : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Contribute to Goal</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Goal Progress */}
          <div className="text-center">
            <h3 className="font-medium text-foreground mb-2">{group.name}</h3>
            <div className="text-2xl font-bold text-foreground">
              ${group.currentAmount.toLocaleString()} / ${group.targetAmount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              ${remainingAmount.toLocaleString()} remaining
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Quick amounts
            </label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant={amount === quickAmount.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAmount(quickAmount)}
                  className="text-sm"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <Input
              label="Custom Amount ($)"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
            />
            
            {amount && contributionPercentage > 0 && (
              <div className="mt-2 text-sm text-muted-foreground">
                This contribution represents {contributionPercentage.toFixed(1)}% of the goal
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <Input
              label="Add a note (optional)"
              type="text"
              placeholder="Share your motivation..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={100}
            />
            {note && (
              <div className="mt-1 text-xs text-muted-foreground text-right">
                {note.length}/100 characters
              </div>
            )}
          </div>

          {/* Preview */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Contribution Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-foreground">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New total:</span>
                  <span className="font-medium text-foreground">
                    ${(group.currentAmount + parseFloat(amount)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className="font-medium text-primary">
                    {(((group.currentAmount + parseFloat(amount)) / group.targetAmount) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleContribute}
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            loading={isProcessing}
            iconName="Plus"
            iconPosition="left"
            className="flex-1"
          >
            Contribute
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContributeModal;