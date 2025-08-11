import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AssetTabs = ({ activeTab, onTabChange, fiatAssets, cryptoAssets, onCreateWallet }) => {
  const tabs = [
    {
      id: 'fiat',
      label: 'Fiat Currency',
      icon: 'DollarSign',
      count: fiatAssets.length,
      totalValue: fiatAssets.reduce((sum, asset) => sum + asset.balance, 0)
    },
    {
      id: 'crypto',
      label: 'Cryptocurrency',
      icon: 'Bitcoin',
      count: cryptoAssets.length,
      totalValue: cryptoAssets.reduce((sum, asset) => sum + asset.balance, 0)
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            <Icon 
              name={tab.icon} 
              size={18} 
              className={activeTab === tab.id ? 'text-primary-foreground' : 'text-current'}
            />
            <span>{tab.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeTab === tab.id 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {/* {tab.count} */}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Summary */}
      <div className="mt-4 p-4 bg-card rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={tabs.find(t => t.id === activeTab)?.icon} 
              size={20} 
              className="text-primary"
            />
            <span className="font-medium">
              {tabs.find(t => t.id === activeTab)?.label} Portfolio 
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold font-mono">
              ${tabs.find(t => t.id === activeTab)?.totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {tabs.find(t => t.id === activeTab)?.count} assets
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'crypto' && cryptoAssets.length === 0 && (
        <div className='mt-4 text-center'>
          <button 
            onClick={onCreateWallet}
            className='btn-primary'
          >
            Create Crypto Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetTabs;