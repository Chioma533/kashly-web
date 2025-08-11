import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressIndicator = ({ currentStep, onStepClick, canNavigateBack }) => {
  const steps = [
    {
      id: 1,
      title: 'Recipient',
      description: 'Choose who to send to',
      icon: 'User'
    },
    {
      id: 2,
      title: 'Amount',
      description: 'Enter amount to send',
      icon: 'DollarSign'
    },
    {
      id: 3,
      title: 'Review',
      description: 'Confirm and send',
      icon: 'Check'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-foreground">
            {steps[currentStep - 1]?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {steps[currentStep - 1]?.description}
          </p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden lg:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const isClickable = canNavigateBack && step.id < currentStep;
              
              return (
                <li key={step.id} className="flex items-center">
                  {/* Step Circle */}
                  <div className="relative flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={isClickable ? () => onStepClick(step.id) : undefined}
                      disabled={!isClickable}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${getStepClasses(status)} ${
                        isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                      }`}
                    >
                      {status === 'completed' ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <Icon name={step.icon} size={20} />
                      )}
                    </Button>
                    
                    {/* Step Number Badge */}
                    {status !== 'completed' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-foreground">{step.id}</span>
                      </div>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="ml-4 min-w-0">
                    <p className={`text-sm font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-8">
                      <div className={`h-0.5 transition-all duration-300 ${getConnectorClasses(step.id)}`} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Current Step Details */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center space-x-2 bg-muted rounded-full px-4 py-2">
            <Icon 
              name={steps[currentStep - 1]?.icon} 
              size={16} 
              className="text-primary" 
            />
            <span className="text-sm font-medium text-foreground">
              {steps[currentStep - 1]?.title}
            </span>
            <span className="text-sm text-muted-foreground">
              • {steps[currentStep - 1]?.description}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Hints */}
      {canNavigateBack && currentStep > 1 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="inline mr-1" />
            You can click on previous steps to make changes
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;