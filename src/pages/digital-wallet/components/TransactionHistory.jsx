import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionHistory = ({ transactions, onLoadMore, hasMore, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(tx => tx.type === filterType);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 0;
      if (days > 0) {
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(tx => new Date(tx.timestamp) >= cutoff);
      }
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType, dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'send': return 'ArrowUpRight';
      case 'receive': return 'ArrowDownLeft';
      case 'buy': return 'Plus';
      case 'sell': return 'Minus';
      case 'transfer': return 'ArrowRightLeft';
      default: return 'Activity';
    }
  };

  const getTransactionColor = (type, amount) => {
    if (type === 'receive' || type === 'buy' || amount > 0) {
      return 'text-success';
    } else if (type === 'send' || type === 'sell' || amount < 0) {
      return 'text-error';
    }
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="send">Send</option>
          <option value="receive">Receive</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
          <option value="transfer">Transfer</option>
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Time</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== 'all' || dateRange !== 'all' ?'Try adjusting your filters' :'Your transaction history will appear here'
              }
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'receive' || transaction.amount > 0 ?'bg-success/10' :'bg-error/10'
                }`}>
                  <Icon 
                    name={getTransactionIcon(transaction.type)} 
                    size={20} 
                    className={getTransactionColor(transaction.type, transaction.amount)}
                  />
                </div>
                
                <div>
                  <div className="font-medium text-foreground">
                    {transaction.description}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.recipient && `To: ${transaction.recipient} • `}
                    {formatDate(transaction.timestamp)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-semibold font-mono ${
                  getTransactionColor(transaction.type, transaction.amount)
                }`}>
                  {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed' 
                    ? 'bg-success/10 text-success'
                    : transaction.status === 'pending' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
                }`}>
                  {transaction.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {hasMore && filteredTransactions.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={isLoading}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More Transactions
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;