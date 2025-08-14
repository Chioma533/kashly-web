import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import GroupCard from './components/GroupCard';
import GroupStats from './components/GroupStats';
import GroupFilters from './components/GroupFilters';
import EmptyState from './components/EmptyState';
import CreateGroupModal from './components/CreateGroupModal';

const SavingsGroups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for savings groups
  const mockGroups = [
    {
      id: 1,
      name: "Summer Vacation 2025",
      description: "Planning an amazing summer trip to Europe with the squad! We\'re aiming to visit 5 countries and create unforgettable memories together.",
      targetAmount: 5000,
      currentAmount: 3750,
      category: "vacation",
      privacy: "private",
      members: [
        { id: 1, name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 3, name: "Emma Wilson", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: 4, name: "David Brown", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: 5, name: "Lisa Garcia", avatar: "https://randomuser.me/api/portraits/women/5.jpg" }
      ],
      lastContribution: "2 days ago",
      createdAt: "2024-12-15",
      isNewAchievement: false
    },
    {
      id: 2,
      name: "Emergency Fund",
      description: "Building a solid emergency fund to cover 6 months of expenses. Financial security is our top priority for peace of mind.",
      targetAmount: 12000,
      currentAmount: 8400,
      category: "emergency",
      privacy: "private",
      members: [
        { id: 1, name: "Alex Thompson", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
        { id: 2, name: "Rachel Kim", avatar: "https://randomuser.me/api/portraits/women/7.jpg" },
        { id: 3, name: "James Rodriguez", avatar: "https://randomuser.me/api/portraits/men/8.jpg" }
      ],
      lastContribution: "5 hours ago",
      createdAt: "2024-11-20",
      isNewAchievement: true
    },
    {
      id: 3,
      name: "Dream Wedding Fund",
      description: "Saving for our perfect wedding day! Every contribution brings us closer to the celebration of our dreams.",
      targetAmount: 25000,
      currentAmount: 25000,
      category: "wedding",
      privacy: "private",
      members: [
        { id: 1, name: "Jennifer Lee", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
        { id: 2, name: "Michael Davis", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
        { id: 3, name: "Susan Miller", avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
        { id: 4, name: "Robert Wilson", avatar: "https://randomuser.me/api/portraits/men/12.jpg" }
      ],
      lastContribution: "1 week ago",
      createdAt: "2024-08-10",
      isNewAchievement: false
    },
    {
      id: 4,
      name: "New Car Fund",
      description: "Time for a reliable new car! We\'re pooling resources to get the best deal on a family-friendly vehicle.",
      targetAmount: 18000,
      currentAmount: 4500,
      category: "other",
      privacy: "private",
      members: [
        { id: 1, name: "Kevin Park", avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
        { id: 2, name: "Amanda Taylor", avatar: "https://randomuser.me/api/portraits/women/14.jpg" }
      ],
      lastContribution: "3 days ago",
      createdAt: "2025-01-05",
      isNewAchievement: false
    },
    {
      id: 5,
      name: "Home Down Payment",
      description: "Saving for our first home! This is a big step towards building our future and creating a space we can call our own.",
      targetAmount: 50000,
      currentAmount: 32000,
      category: "home",
      privacy: "private",
      members: [
        { id: 1, name: "Chris Anderson", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
        { id: 2, name: "Maria Gonzalez", avatar: "https://randomuser.me/api/portraits/women/16.jpg" },
        { id: 3, name: "Tom Johnson", avatar: "https://randomuser.me/api/portraits/men/17.jpg" },
        { id: 4, name: "Nina Patel", avatar: "https://randomuser.me/api/portraits/women/18.jpg" },
        { id: 5, name: "Steve Clark", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
        { id: 6, name: "Grace Liu", avatar: "https://randomuser.me/api/portraits/women/20.jpg" }
      ],
      lastContribution: "1 day ago",
      createdAt: "2024-10-01",
      isNewAchievement: false
    }
  ];

  // Mock stats data
  const mockStats = {
    totalGroups: 5,
    totalContributions: 73650,
    goalsAchieved: 1,
    successRate: 85,
    recentBadges: ["Goal Achiever", "Team Player", "Consistent Saver"]
  };

  // Load initial data
  useEffect(() => {
    const loadGroups = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGroups(mockGroups);
      setFilteredGroups(mockGroups);
      setIsLoading(false);
    };

    loadGroups();
  }, []);

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setGroups([...mockGroups]);
    setFilteredGroups([...mockGroups]);
    setRefreshing(false);
  };

  // Filter and search functionality
  const handleFilterChange = ({ filter, sort }) => {
    let filtered = [...groups];

    // Apply filters
    if (filter === 'active') {
      filtered = filtered.filter(group => (group.currentAmount / group.targetAmount) < 1);
    } else if (filter === 'completed') {
      filtered = filtered.filter(group => (group.currentAmount / group.targetAmount) >= 1);
    } else if (filter === 'near-goal') {
      filtered = filtered.filter(group => {
        const progress = (group.currentAmount / group.targetAmount) * 100;
        return progress >= 75 && progress < 100;
      });
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sort === 'progress') {
      filtered.sort((a, b) => (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount));
    } else if (sort === 'amount') {
      filtered.sort((a, b) => b.targetAmount - a.targetAmount);
    } else if (sort === 'members') {
      filtered.sort((a, b) => b.members.length - a.members.length);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredGroups(filtered);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Re-apply current filters with new search
    handleFilterChange({ filter: 'all', sort: 'recent' });
  };

  // Group actions
  const handleContribute = (groupId) => {
    console.log('Contributing to group:', groupId);
    // In real app, this would open a contribution modal
  };

  const handleViewDetails = (groupId) => {
    console.log('Viewing details for group:', groupId);
    // Navigation handled by Link in GroupCard
  };

  const handleChat = (groupId) => {
    console.log('Opening chat for group:', groupId);
    // In real app, this would open group chat
  };

  const handleCreateGroup = (newGroup) => {
    const updatedGroups = [newGroup, ...groups];
    setGroups(updatedGroups);
    setFilteredGroups(updatedGroups);
  };

  const handleJoinGroup = () => {
    console.log('Browse and join groups');
    // In real app, this would show available public groups
  };

  return (
    <>
      <Helmet>
        <title>Savings Groups - Kashly</title>
        <meta name="description" content="Manage your collaborative savings groups and achieve financial goals together with friends and family." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        
        <main className="pt-2 lg:pt-6 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbTrail />
            
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Savings Groups
                </h1>
                <p className="text-muted-foreground">
                  Achieve your financial goals together with friends and family
                </p>
              </div>
              
              <div className="hidden lg:block">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
                >
                  <span className="text-lg">+</span>
                  <span>Create Group</span>
                </button>
              </div>
            </div>

            {/* Pull to refresh indicator */}
            {refreshing && (
              <div className="flex items-center justify-center py-4 mb-4">
                <div className="flex items-center space-x-2 text-primary">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Refreshing...</span>
                </div>
              </div>
            )}

            {isLoading ? (
              <EmptyState type="loading" />
            ) : groups.length === 0 ? (
              <EmptyState
                type="no-groups"
                onCreateGroup={() => setShowCreateModal(true)}
                onJoinGroup={handleJoinGroup}
              />
            ) : (
              <>
                {/* Stats Overview */}
                <GroupStats stats={mockStats} />

                {/* Filters */}
                <GroupFilters
                  onFilterChange={handleFilterChange}
                  onSearchChange={handleSearchChange}
                  searchQuery={searchQuery}
                />

                {/* Groups Grid */}
                {filteredGroups.length === 0 ? (
                  <EmptyState
                    type="no-search-results"
                    onCreateGroup={() => setShowCreateModal(true)}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        onContribute={handleContribute}
                        onViewDetails={handleViewDetails}
                        onChat={handleChat}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {/* Create Group Modal */}
        <CreateGroupModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateGroup={handleCreateGroup}
        />

        {/* <FloatingActionButton /> */}
      </div>
    </>
  );
};

export default SavingsGroups;