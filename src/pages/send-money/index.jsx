import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import RecipientSelector from './components/RecipientSelector';
import AmountInput from './components/AmountInput';
import TransactionReview from './components/TransactionReview';
import ProgressIndicator from './components/ProgressIndicator';
import TransactionSuccess from './components/TransactionSuccess';

const SendMoney = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [transactionData, setTransactionData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Save draft to localStorage
  useEffect(() => {
    if (!isCompleted) {
      const draft = {
        step: currentStep,
        recipient: selectedRecipient,
        amount,
        currency,
        timestamp: Date.now()
      };
      localStorage.setItem('sendMoneyDraft', JSON.stringify(draft));
    }
  }, [currentStep, selectedRecipient, amount, currency, isCompleted]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('sendMoneyDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Only restore if draft is less than 1 hour old
        if (Date.now() - draft.timestamp < 3600000) {
          setCurrentStep(draft.step || 1);
          setSelectedRecipient(draft.recipient);
          setAmount(draft.amount || 0);
          setCurrency(draft.currency || 'USD');
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleRecipientSelect = (recipient) => {
    setSelectedRecipient(recipient);
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleEditStep = (stepType) => {
    if (stepType === 'recipient') {
      setCurrentStep(1);
    } else if (stepType === 'amount') {
      setCurrentStep(2);
    }
  };

  const handleTransactionConfirm = async (data) => {
    if (!user || !selectedRecipient || !amount) return;
    const { id: senderId } = user;

    // 1. create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: senderId,
          recipient_id: selectedRecipient.id, // Or email or wallet ID
          amount,
          currency_code: currency,
          type: 'send',
          note: data?.note || '',
          status: 'completed'
        }
      ]);

    if (transactionError) {
      console.error('Error saving transaction:', transactionError);
      return;
    }

    // 2. Update sender wallet balance
    const { error: walletError } = await supabase.rpc('deduct_wallet_balance', {
      user_id_param: senderId,
      amount_param: amount,
      currency_code_param: currency
    });

    await supabase.rpc('credit_wallet_balance', {
      recipient_id_param: selectedRecipient.id,
      amount_param: amount,
      currency_code_param: currency
    });

    if (walletError) {
      console.error('Error updating wallet:', walletError);
      return;
    }

    // 3. Mark transaction as successful
    setTransactionData({
      recipient: selectedRecipient,
      amount,
      currency: currency,
      timestamp: new Date().toISOString(),
      status: 'success',
    });

    setIsCompleted(true);
    localStorage.removeItem('sendMoneyDraft');
  };


  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedRecipient !== null;
      case 2:
        return amount > 0 && amount <= 5000;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Choose Recipient';
      case 2:
        return 'Enter Amount';
      case 3:
        return 'Review & Confirm';
      default:
        return 'Send Money';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Select who you want to send money to';
      case 2:
        return 'Enter the amount you want to send';
      case 3:
        return 'Review your transfer details';
      default:
        return 'Complete your money transfer';
    }
  };

  if (isCompleted && transactionData) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Transfer Complete - Kashly</title>
          <meta name="description" content="Your money transfer has been completed successfully" />
        </Helmet>

        <Header />
        <TabNavigation />

        <main className="pt-32 lg:pt-36 pb-24 px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <TransactionSuccess transactionData={transactionData} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Send Money - Kashly</title>
        <meta name="description" content="Send money securely to friends, family, and contacts with Kashly's peer-to-peer transfer system" />
      </Helmet>

      <Header />
      <TabNavigation />

      <main className="pt-32 lg:pt-36 pb-24 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <BreadcrumbTrail />

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Send Money
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Send money securely to friends, family, and contacts with instant transfers and competitive rates
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator
              currentStep={currentStep}
              onStepClick={handleStepClick}
              canNavigateBack={true}
            />
          </div>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-lg shadow-soft">
              {/* Step Header */}
              <div className="border-b border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {getStepTitle()}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getStepDescription()}
                    </p>
                  </div>

                  {/* Step Counter */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>Step {currentStep} of 3</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                {currentStep === 1 && (
                  <RecipientSelector
                    onRecipientSelect={handleRecipientSelect}
                    selectedRecipient={selectedRecipient}
                  />
                )}

                {currentStep === 2 && (
                  <AmountInput
                    onAmountChange={handleAmountChange}
                    amount={amount}
                    currency={currency}
                    onCurrencyChange={handleCurrencyChange}
                  />
                )}

                {currentStep === 3 && (
                  <TransactionReview
                    recipient={selectedRecipient}
                    amount={amount}
                    currency={currency}
                    onConfirm={handleTransactionConfirm}
                    onEdit={handleEditStep}
                  />
                )}
              </div>

              {/* Navigation Footer */}
              {currentStep < 3 && (
                <div className="border-t border-border p-6">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Back
                    </Button>

                    <div className="flex items-center space-x-4">
                      {/* Current Selection Summary */}
                      {selectedRecipient && currentStep >= 2 && (
                        <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="User" size={14} />
                          <span>To: {selectedRecipient.name}</span>
                        </div>
                      )}

                      {amount > 0 && currentStep >= 3 && (
                        <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="DollarSign" size={14} />
                          <span>${amount.toFixed(2)}</span>
                        </div>
                      )}

                      <Button
                        variant="default"
                        onClick={handleNext}
                        disabled={!canProceedToNext()}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        {currentStep === 2 ? 'Review' : 'Continue'}
                      </Button>
                    </div>
                  </div>

                  {/* Validation Messages */}
                  {!canProceedToNext() && (
                    <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <p className="text-sm text-warning">
                          {currentStep === 1 && 'Please select a recipient to continue'}
                          {currentStep === 2 && 'Please enter a valid amount (max $5,000)'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-success flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Secure & Protected</p>
                  <p className="text-xs text-muted-foreground">
                    Your transfers are protected by 256-bit encryption and require PIN verification.
                    All transactions are monitored for fraud protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  );
};

export default SendMoney;