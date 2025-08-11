import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AssetCard = ({ asset, type, onSend, onReceive, onBuy, onSell }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: type === 'fiat' ? asset.currency : 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-soft transition-all duration-200">
      {/* Asset Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {type === 'crypto' ? (
            <Image
              src={asset.icon}
              alt={asset.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={asset.icon} size={20} className="text-primary" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground">{asset.name}</h3>
            <p className="text-sm text-muted-foreground">
              {type === 'fiat' ? asset.currency : asset.symbol}
            </p>
          </div>
        </div>

        {asset.isConnected !== undefined && (
          <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
            asset.isConnected 
              ? 'bg-success/10 text-success' :'bg-error/10 text-error'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              asset.isConnected ? 'bg-success' : 'bg-error'
            }`} />
            <span>{asset.isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        )}
      </div>

      {/* Balance and Change */}
      <div className="mb-4">
        <div className="text-2xl font-bold font-mono text-foreground mb-1">
          {formatCurrency(asset.balance)}
        </div>
        {type === 'crypto' && asset.holdings && (
          <div className="text-sm text-muted-foreground mb-2">
            {asset.holdings} {asset.symbol}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Icon 
            name={asset.change >= 0 ? "TrendingUp" : "TrendingDown"} 
            size={14} 
            className={asset.change >= 0 ? "text-success" : "text-error"}
          />
          <span className={`text-sm font-medium ${
            asset.change >= 0 ? "text-success" : "text-error"
          }`}>
            {formatChange(asset.change)}
          </span>
          <span className="text-sm text-muted-foreground">24h</span>
        </div>
      </div>

      {/* Portfolio Allocation (Crypto only) */}
      {type === 'crypto' && asset.allocation && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Portfolio Allocation</span>
            <span className="font-medium">{asset.allocation}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${asset.allocation}%` }}
            />
          </div>
        </div>
      )}

      {/* Pending Transfers (Fiat only) */}
      {type === 'fiat' && asset.pendingTransfers && asset.pendingTransfers.length > 0 && (
        <div className="mb-4 p-3 bg-warning/10 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Pending Transfers</span>
          </div>
          {asset.pendingTransfers.map((transfer, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              {transfer.type}: {formatCurrency(transfer.amount)}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Send"
          iconPosition="left"
          onClick={() => onSend(asset)}
          className="w-full"
        >
          Send
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={() => onReceive(asset)}
          className="w-full"
        >
          Receive
        </Button>
        {type === 'crypto' && (
          <>
            <Button
              variant="secondary"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => onBuy(asset)}
              className="w-full"
            >
              Buy
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Minus"
              iconPosition="left"
              onClick={() => onSell(asset)}
              className="w-full"
            >
              Sell
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AssetCard;