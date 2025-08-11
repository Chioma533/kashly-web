import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import GroupHeader from './components/GroupHeader';
import TabNavigationLocal from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import ActivityTab from './components/ActivityTab';
import MembersTab from './components/MembersTab';
import SettingsTab from './components/SettingsTab';
import GroupChat from './components/GroupChat';
import ContributeModal from './components/ContributeModal';

const GroupDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Mock group data
  const [groupData, setGroupData] = useState({
    id: 1,
    name: "Europe Trip 2025",
    description: "Saving together for our dream European adventure! Let's explore Paris, Rome, and Barcelona.",
    bannerImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
    currentAmount: 8750,
    targetAmount: 15000,
    memberCount: 6,
    daysLeft: 127,
    isAdmin: true,
    isPrivate: false,
    allowInvites: true,
    endDate: "2025-06-15"
  });

  // Mock user contributions
  const userContributions = [
    {
      id: 1,
      amount: 500,
      date: "2025-01-20T10:30:00Z",
      note: "First contribution! So excited for this trip!"
    },
    {
      id: 2,
      amount: 300,
      date: "2025-01-15T14:20:00Z",
      note: "Adding more for flights"
    },
    {
      id: 3,
      amount: 250,
      date: "2025-01-10T09:15:00Z",
      note: "Weekly contribution"
    },
    {
      id: 4,
      amount: 400,
      date: "2025-01-05T16:45:00Z",
      note: "Bonus money from work!"
    },
    {
      id: 5,
      amount: 200,
      date: "2024-12-28T11:30:00Z",
      note: "Holiday savings"
    }
  ];

  // Mock milestones
  const milestones = [
    {
      id: 1,
      title: "First $2,500",
      amount: 2500,
      achieved: true,
      current: false,
      celebrationDate: "2024-12-15T00:00:00Z"
    },
    {
      id: 2,
      title: "Quarter Goal",
      amount: 5000,
      achieved: true,
      current: false,
      celebrationDate: "2025-01-08T00:00:00Z"
    },
    {
      id: 3,
      title: "Halfway There!",
      amount: 7500,
      achieved: true,
      current: false,
      celebrationDate: "2025-01-18T00:00:00Z"
    },
    {
      id: 4,
      title: "Flight Money",
      amount: 10000,
      achieved: false,
      current: true
    },
    {
      id: 5,
      title: "Final Goal",
      amount: 15000,
      achieved: false,
      current: false
    }
  ];

  // Mock activities
  const activities = [
    {
      id: 1,
      type: 'contribution',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      description: 'contributed to the group goal',
      amount: 150,
      note: 'For accommodation booking!',
      timestamp: '2025-01-28T14:30:00Z',
      reactions: 5
    },
    {
      id: 2,
      type: 'milestone',
      user: {
        name: 'Group System',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      description: 'Milestone achieved: Halfway There!',
      timestamp: '2025-01-27T18:45:00Z',
      reactions: 12
    },
    {
      id: 3,
      type: 'member_joined',
      user: {
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      description: 'joined the group',
      timestamp: '2025-01-26T10:20:00Z',
      reactions: 8
    },
    {
      id: 4,
      type: 'contribution',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      description: 'contributed to the group goal',
      amount: 200,
      note: 'Weekly savings contribution',
      timestamp: '2025-01-25T16:15:00Z',
      reactions: 3
    },
    {
      id: 5,
      type: 'goal_updated',
      user: {
        name: 'Alex Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      description: 'updated the group description',
      timestamp: '2025-01-24T09:30:00Z',
      reactions: 2
    }
  ];

  // Mock members
  const members = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      totalContribution: 2100,
      contributionCount: 8,
      joinDate: '2024-11-15T00:00:00Z',
      isAdmin: true,
      isOnline: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      totalContribution: 1850,
      contributionCount: 6,
      joinDate: '2024-11-20T00:00:00Z',
      isAdmin: false,
      isOnline: true
    },
    {
      id: 3,
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      totalContribution: 1650,
      contributionCount: 7,
      joinDate: '2024-12-01T00:00:00Z',
      isAdmin: false,
      isOnline: false
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      totalContribution: 1400,
      contributionCount: 5,
      joinDate: '2024-12-10T00:00:00Z',
      isAdmin: false,
      isOnline: true
    },
    {
      id: 5,
      name: 'David Park',
      avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
      totalContribution: 1200,
      contributionCount: 4,
      joinDate: '2024-12-20T00:00:00Z',
      isAdmin: false,
      isOnline: false
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
      totalContribution: 550,
      contributionCount: 3,
      joinDate: '2025-01-05T00:00:00Z',
      isAdmin: false,
      isOnline: true
    }
  ];

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      userId: 2,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      content: 'Hey everyone! Just contributed $150 for accommodation booking. We\'re getting so close!',
      timestamp: '2025-01-28T14:30:00Z',
      reactions: [{ emoji: '🎉', count: 3 }, { emoji: '❤️', count: 2 }]
    },
    {
      id: 2,
      userId: 1,
      user: {
        name: 'Alex Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      content: 'Amazing! We just hit the halfway milestone. Paris, here we come! 🗼',
      timestamp: '2025-01-27T18:45:00Z',
      reactions: [{ emoji: '🚀', count: 5 }]
    },
    {
      id: 3,
      userId: 3,
      user: {
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      content: 'Welcome to the group! Excited to save together for this amazing trip.',
      timestamp: '2025-01-26T10:20:00Z'
    },
    {
      id: 4,
      userId: 4,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      content: 'I found some great flight deals! Should we start booking soon?',
      timestamp: '2025-01-25T16:15:00Z',
      reactions: [{ emoji: '✈️', count: 4 }]
    }
  ]);

  const currentUser = {
    id: 1,
    name: 'Alex Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  };

  // Handlers
  const handleContribute = async (contributionData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update group data
    setGroupData(prev => ({
      ...prev,
      currentAmount: prev.currentAmount + contributionData.amount
    }));

    // Add to activities
    const newActivity = {
      id: Date.now(),
      type: 'contribution',
      user: currentUser,
      description: 'contributed to the group goal',
      amount: contributionData.amount,
      note: contributionData.note,
      timestamp: contributionData.timestamp,
      reactions: 0
    };

    console.log('New contribution:', newActivity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: groupData.name,
        text: `Join our savings group: ${groupData.description}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Group link copied to clipboard!');
    }
  };

  const handleInvite = () => {
    console.log('Invite members');
  };

  const handleUpdateGroup = (updatedGroup) => {
    setGroupData(updatedGroup);
    console.log('Group updated:', updatedGroup);
  };

  const handleLeaveGroup = () => {
    if (confirm('Are you sure you want to leave this group?')) {
      navigate('/savings-groups');
    }
  };

  const handleDeleteGroup = () => {
    if (confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      navigate('/savings-groups');
    }
  };

  const handleRemoveMember = (memberId) => {
    if (confirm('Are you sure you want to remove this member?')) {
      console.log('Remove member:', memberId);
    }
  };

  const handleMakeAdmin = (memberId) => {
    if (confirm('Make this member an admin?')) {
      console.log('Make admin:', memberId);
    }
  };

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      userId: currentUser.id,
      user: currentUser,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            group={groupData}
            userContributions={userContributions}
            milestones={milestones}
          />
        );
      case 'activity':
        return <ActivityTab activities={activities} />;
      case 'members':
        return (
          <MembersTab
            members={members}
            isAdmin={groupData.isAdmin}
            onRemoveMember={handleRemoveMember}
            onMakeAdmin={handleMakeAdmin}
          />
        );
      case 'settings':
        return (
          <SettingsTab
            group={groupData}
            isAdmin={groupData.isAdmin}
            onUpdateGroup={handleUpdateGroup}
            onLeaveGroup={handleLeaveGroup}
            onDeleteGroup={handleDeleteGroup}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-32 lg:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <GroupHeader
                group={groupData}
                onContribute={() => setShowContributeModal(true)}
                onShare={handleShare}
                onInvite={handleInvite}
              />
              
              <TabNavigationLocal
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              
              {renderTabContent()}
            </div>
            
            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block space-y-6">
              <GroupChat
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                currentUser={currentUser}
              />
            </div>
          </div>
          
          {/* Mobile Chat Toggle */}
          <div className="lg:hidden fixed bottom-20 left-4 z-200">
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-primary text-primary-foreground p-3 rounded-full shadow-elevated"
            >
              <span className="sr-only">Toggle chat</span>
              💬
            </button>
          </div>
          
          {/* Mobile Chat Overlay */}
          {showChat && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-300 p-4 pt-20">
              <div className="bg-card rounded-lg h-full">
                <GroupChat
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  currentUser={currentUser}
                />
                <button
                  onClick={() => setShowChat(false)}
                  className="absolute top-4 right-4 bg-muted text-muted-foreground p-2 rounded-full"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <ContributeModal
        isOpen={showContributeModal}
        onClose={() => setShowContributeModal(false)}
        onContribute={handleContribute}
        group={groupData}
      />
      
      <FloatingActionButton />
    </div>
  );
};

export default GroupDetails;