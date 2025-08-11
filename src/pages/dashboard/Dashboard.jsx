import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header  from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';
import { supabase } from '../../utils/supabase';
import { 
  Wallet, 
  TrendingUp, 
  Send, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  Target,
  Users,
  BookOpen,
  PieChart,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
  }, [user?.id]);

  const [wallets, setWallets] = useState([]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const [transactionsRes, goalsRes, walletsRes] = await Promise.all([
        supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5),

        supabase
          .from('savings_goals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3),

        supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      if (transactionsRes.error || goalsRes.error || walletsRes.error) {
        throw transactionsRes.error || goalsRes.error || walletsRes.error;
      }

      setTransactions(transactionsRes.data || []);
      setSavingsGoals(goalsRes.data || []);
      setWallets(walletsRes.data || []);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard data loading error:', err);
    } finally {
      setLoading(false);
    }
  };


  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount || 0);
  };


  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5 text-success" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-error" />;
      case 'transfer':
        return <Send className="w-5 h-5 text-primary" />;
      case 'payment':
        return <ArrowUpRight className="w-5 h-5 text-warning" />;
      default:
        return <Wallet className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'text-success';
      case 'withdrawal':
        return 'text-error';
      case 'transfer':
        return 'text-primary';
      case 'payment':
        return 'text-warning';
      default:
        return 'text-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Dashboard" />
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span className="text-muted-foreground">Loading dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Dashboard" />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {userProfile?.full_name || 'User'}! 👋
          </h1>
          <p className="text-white/90">
            Here's what's happening with your finances today.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <p className="text-error text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Wallet Balance Card */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="bg-card rounded-2xl shadow-soft border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {wallet.currency_code} Wallet
                    </h2>
                    <p className="text-sm text-muted-foreground capitalize">
                      {wallet.type} account
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-bold text-foreground">
                  {showBalance
                    ? formatCurrency(wallet.balance, wallet.currency_code)
                    : '••••••'}
                </p>
                <p className="text-sm text-success flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2.4% from last month
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link to="/send-money">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold">
                    <Send className="w-5 h-5 mr-2" />
                    Send
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full h-12 font-semibold"
                  onClick={() => {/* Handle add money */ }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Fund
                </Button>
              </div>
            </div>
          ))}
        </div>


        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/savings-groups" className="block">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6 text-center hover:shadow-elevated transition-all duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Groups</h3>
              <p className="text-xs text-muted-foreground">Savings Groups</p>
            </div>
          </Link>

          <Link to="/budgeting-coach" className="block">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6 text-center hover:shadow-elevated transition-all duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <PieChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Budget</h3>
              <p className="text-xs text-muted-foreground">Budgeting Coach</p>
            </div>
          </Link>

          <div className="bg-card rounded-xl shadow-soft border border-border p-6 text-center hover:shadow-elevated transition-all duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Goals</h3>
            <p className="text-xs text-muted-foreground">Savings Goals</p>
          </div>

          <Link to="/financial-literacy-hub" className="block">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6 text-center hover:shadow-elevated transition-all duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Learn</h3>
              <p className="text-xs text-muted-foreground">Financial Hub</p>
            </div>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
            <Link to="/digital-wallet" className="text-primary hover:text-primary/80 text-sm font-medium">
              View All
            </Link>
          </div>

          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border border-border">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {transaction.description || `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-semibold", getTransactionColor(transaction.type))}>
                      {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground mt-1">Your transaction history will appear here</p>
            </div>
          )}
        </div>

        {/* Savings Goals */}
        {savingsGoals.length > 0 && (
          <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Savings Goals</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div className="grid gap-4">
              {savingsGoals.map((goal) => {
                const progress = (goal.current_amount / goal.target_amount) * 100;
                return (
                  <div key={goal.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">{goal.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
                      </span>
                      {goal.target_date && (
                        <span className="text-muted-foreground">
                          Due {new Date(goal.target_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}