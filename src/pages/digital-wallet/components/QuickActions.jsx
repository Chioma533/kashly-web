import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onSendMoney, onReceiveMoney, onAddFunds, onConvertCurrency }) => {
  // const navigate = useNavigate();

  const actions = [
    {
      id: 'send',
      label: 'Transfer',
      icon: 'Send',
      color: 'primary',
      action: () => navigate('/send-money'),
      // description: 'Transfer funds to friends'
    },
    {
      id: 'receive',
      label: 'Withdraw',
      icon: 'Download',
      color: 'secondary',
      action: onReceiveMoney,
      // description: 'Get paid by others'
    },
    {
      id: 'add',
      label: 'Deposit',
      icon: 'Plus',
      color: 'success',
      action: onAddFunds,
      // description: 'Top up your wallet'
    },
    {
      id: 'convert',
      label: 'Budgets',
      icon: 'ChartPie',
      color: 'accent',
      // action: onConvertCurrency,
      // description: 'Exchange currencies'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: 'Book',
      color: '',
      action: () => navigate('/buy-crypto'),
      // description: 'Purchase cryptocurrencies'
    },
    {
      id: 'goals',
      label: 'Goals',
      icon: 'Target',
      color: 'Warning',
      action: () => navigate('/sell-crypto'),
      // description: 'Sell your crypto assets'
    }
  ];

  return (
    <div className=" border border-border rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex flex-col items-center space-y-1 p-4 rounded-lg border border-bo  rder hover:text-white hover:border-primary transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              action.color === 'primary' ? 'bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white' :
              action.color === 'secondary' ? 'bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-secondary-foreground' :
              action.color === 'success' ? 'bg-success/10 group-hover:bg-success text-success group-hover:text-success-foreground' :
              'bg-accent/10 group-hover:bg-accent text-accent group-hover:text-accent-foreground'
            }`}>
              <Icon name={action.icon} size={24} />
            </div>
            
            <div className="text-center">
              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {action.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Recipients */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Recipients</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {[
            { name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
            { name: 'Mike Johnson', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
            { name: 'Lisa Wang', avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
            { name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/23.jpg' },
            { name: 'Emma Davis', avatar: 'https://randomuser.me/api/portraits/women/89.jpg' }
          ].map((recipient, index) => (
            <button
              key={index}
              onClick={() => navigate('/send-money', { state: { recipient } })}
              className="flex flex-col items-center space-y-2 min-w-[60px] hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                <img
                  src={recipient.avatar}
                  alt={recipient.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground text-center leading-tight">
                {recipient.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;