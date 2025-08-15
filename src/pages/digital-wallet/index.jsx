import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import WalletHeader from './components/WalletHeader';
import AssetTabs from './components/AssetTabs';
import AssetCard from './components/AssetCard';
import TransactionHistory from './components/TransactionHistory';
import QuickActions from './components/QuickActions';
import CurrencyConverter from './components/CurrencyConverter';
import { useNavigate } from 'react-router-dom';

const DigitalWallet = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('fiat');
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreTransactions, setHasMoreTransactions] = useState(true);

  // Mock data for fiat assets
  const fiatAssets = [
    {
      id: 'usd-checking',
      name: 'US Dollar - Checking',
      currency: 'USD',
      balance: 2847.50,
      change: 2.3,
      icon: 'DollarSign',
      isConnected: true,
      pendingTransfers: [
        { type: 'Incoming', amount: 500.00 },
        { type: 'Outgoing', amount: 150.00 }
      ]
    },
    {
      id: 'eur-savings',
      name: 'Euro - Savings',
      currency: 'EUR',
      balance: 1250.75,
      change: -0.8,
      icon: 'Euro',
      isConnected: true,
      pendingTransfers: []
    },
    {
      id: 'gbp-business',
      name: 'British Pound - Business',
      currency: 'GBP',
      balance: 890.25,
      change: 1.2,
      icon: 'PoundSterling',
      isConnected: false,
      pendingTransfers: []
    }
  ];

  // Mock data for crypto assets
  const cryptoAssets = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: 15420.50,
      holdings: 0.3456,
      change: 5.2,
      allocation: 45,
      icon: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=40&h=40&fit=crop&crop=center'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: 8750.25,
      holdings: 4.2134,
      change: -2.1,
      allocation: 32,
      icon: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=40&h=40&fit=crop&crop=center'
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      balance: 1250.00,
      holdings: 2500.0,
      change: 8.7,
      allocation: 15,
      icon: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=40&h=40&fit=crop&crop=center'
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      balance: 890.75,
      holdings: 45.2,
      change: -4.3,
      allocation: 8,
      icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=40&h=40&fit=crop&crop=center'
    }
  ];

  const [transactions, setTransactions] = useState([
    {
      id: 'tx-001',
      type: 'receive',
      description: 'Payment from Sarah Chen',
      recipient: 'Sarah Chen',
      amount: 250.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'tx-002',
      type: 'send',
      description: 'Coffee payment',
      recipient: 'Starbucks Downtown',
      amount: -12.50,
      status: 'completed',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: 'tx-003',
      type: 'buy',
      description: 'Bitcoin purchase',
      amount: 500.00,
      status: 'pending',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: 'tx-004',
      type: 'transfer',
      description: 'Bank transfer',
      recipient: 'Chase Checking',
      amount: -1000.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 'tx-005',
      type: 'receive',
      description: 'Freelance payment',
      recipient: 'TechCorp Inc',
      amount: 1500.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'tx-006',
      type: 'sell',
      description: 'Ethereum sale',
      amount: -750.25,
      status: 'completed',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]); 
   const [wallet, setWallet] = useState([]);
  // const [fiatAssets, setFiatAssets] = useState([]);
  // const [cryptoAssets, setCryptoAssets] = useState([]);
  const navigate = useNavigate()


  // Wallet creation logic for crypto tab
  const createCryptoWallet = async () => {
    if (cryptoAssets.length > 0) return alert('You already have a crypto wallet');

    const { data, error } = await supabase.from('wallet').insert([
      {
        user_id: user.id,
        type: 'crypto',
        wallet_id: crypto.randomUUID(),
        currency_code: 'BTC',
        balance: 0
      }
    ]);

    if(error){
      console.error("Error creating wallet:", error);
    }else{
      fetchWalletAssets(); // Re-fetch to update UI
    }
  }
  // Mock data for crypto & fiat assets
  useEffect(() => {
    fetchWalletAssets();
  }, []);

  const fetchWalletAssets = async () => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user?.id); // Make sure `user` is from AuthContext

    if (error) {
      console.error('Error fetching wallets:', error);
      return;
    }
    setFiatAssets(data.filter(w => w.type === 'fiat'));
    setCryptoAssets(data.filter(w => w.type === 'crypto'));  
  };


  // Mock transaction data

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching transactions:', error);
      return;
    }

    setTransactions(data);
  };

  useEffect(() => {
    if (user?.id) {
      fetchWalletAssets();
      fetchTransactions();
    }
  }, [user?.id]);


  const totalBalance = [...fiatAssets, ...cryptoAssets].reduce((sum, asset) => sum + asset.balance, 0);
  const balanceChange = 3.8; // Mock percentage change

  const handleRefreshBalance = async () => {
    // Simulate API call to refresh balance
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  };

  const handleSendMoney = async () => {
    await supabase.from('transactions').insert([
      {
        user_id: user.id,
        type: 'send',
        amount: 50,
        description: 'Payment to Vendor',
        status: 'completed'
      }
    ]);
    // Navigate to send money page with asset context

    await supabase.from('wallets').insert([
      {
        user_id: user.id,
        currency_code: 'NGN',
        type: 'fiat',
        balance: 0.00
      }
    ]);

  };



  const handleReceiveMoney = (wallet) => {
    navigate('/receive-money', {
      state: {
        wallet,
      },
    });
  };

  const handleBuyCrypto = (asset) => {
    console.log('Buy crypto:', asset);
    // Navigate to buy crypto page
  };

  const handleSellCrypto = (asset) => {
    console.log('Sell crypto:', asset);
    // Navigate to sell crypto page
  };

  const handleAddFunds = () => {
    console.log('Add funds');
    // Show add funds modal
  };

  const handleConvertCurrency = (conversionData) => {
    console.log('Currency conversion:', conversionData);
    // Process currency conversion
  };

  const handleLoadMoreTransactions = async () => {
    setIsLoading(true);
    // Simulate loading more transactions
    setTimeout(() => {
      const newTransactions = [
        {
          id: 'tx-007',
          type: 'send',
          description: 'Grocery shopping',
          recipient: 'Whole Foods',
          amount: -85.30,
          status: 'completed',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'tx-008',
          type: 'receive',
          description: 'Refund',
          recipient: 'Amazon',
          amount: 45.99,
          status: 'completed',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        }
      ];
      setTransactions(prev => [...prev, ...newTransactions]);
      setIsLoading(false);
      if (transactions.length >= 20) {
        setHasMoreTransactions(false);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Digital Wallet - Kashly FinTech Platform</title>
        <meta name="description" content="Manage your digital assets, fiat currencies, and cryptocurrencies in one secure wallet. Track transactions, convert currencies, and send money instantly." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />

        <main className="pt-5 lg:pt-6 lg:mb-[30px] mb-[90px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <BreadcrumbTrail /> */}

            {/* Wallet Header */}
            <WalletHeader
              totalBalance={totalBalance}
              balanceChange={balanceChange}
              onRefresh={handleRefreshBalance}
            />

            {/* Quick Actions */}
            <QuickActions
              onSendMoney={handleSendMoney}
              onReceiveMoney={handleReceiveMoney}
              onAddFunds={handleAddFunds}
              onConvertCurrency={() => setIsConverterOpen(true)}
            />

            {/* Asset Tabs */}
            {/* <AssetTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              fiatAssets={fiatAssets}
              cryptoAssets={cryptoAssets}
              onCreateWallet={createCryptoWallet}
            /> */}

            {/* Asset Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {(activeTab === 'fiat' ? fiatAssets : cryptoAssets).map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  type={activeTab}
                  onSend={handleSendMoney}
                  onReceive={handleReceiveMoney}
                  onBuy={handleBuyCrypto}
                  onSell={handleSellCrypto}
                />
              ))}
            </div> */}

            {/* Transaction History */}
            <TransactionHistory
              transactions={transactions}
              onLoadMore={handleLoadMoreTransactions}
              hasMore={hasMoreTransactions}
              isLoading={isLoading}
            />
          </div>
        </main>

        {/* Currency Converter Modal */}
        <CurrencyConverter
          isOpen={isConverterOpen}
          onClose={() => setIsConverterOpen(false)}
          onConvert={handleConvertCurrency}
        />

        {/* <FloatingActionButton /> */}
      </div>
    </>
  );
};

export default DigitalWallet;