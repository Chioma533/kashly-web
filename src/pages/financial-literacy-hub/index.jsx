import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import CategoryCard from './components/CategoryCard';
import FeaturedContentCarousel from './components/FeaturedContentCarousel';
import QuizSection from './components/QuizSection';
import VideoContent from './components/VideoContent';
import SearchAndFilter from './components/SearchAndFilter';
import AchievementSystem from './components/AchievementSystem';
import RelatedContent from './components/RelatedContent';

import Button from '../../components/ui/Button';

const FinancialLiteracyHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchResults, setSearchResults] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  // Mock data for categories
  const categories = [
    {
      id: 1,
      title: "Financial Basics",
      description: "Essential money management concepts",
      icon: "DollarSign",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      progress: 75,
      articleCount: 24,
      readingTime: 45,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Investing",
      description: "Build wealth through smart investments",
      icon: "TrendingUp",
      iconColor: "text-success",
      bgColor: "bg-success/10",
      progress: 45,
      articleCount: 18,
      readingTime: 60,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Saving Strategies",
      description: "Effective ways to save and grow money",
      icon: "PiggyBank",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      progress: 90,
      articleCount: 15,
      readingTime: 30,
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "Digital Finance",
      description: "Navigate the digital financial world",
      icon: "Smartphone",
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      progress: 20,
      articleCount: 12,
      readingTime: 35,
      difficulty: "Advanced"
    }
  ];

  // Mock data for featured content
  const featuredContent = [
    {
      id: 1,
      title: "Understanding Compound Interest: The 8th Wonder of the World",
      description: "Learn how compound interest can dramatically grow your wealth over time and why Einstein called it the most powerful force in the universe.",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
      type: "article",
      duration: "8 min read",
      difficulty: "Beginner",
      views: "12.5K",
      isNew: true
    },
    {
      id: 2,
      title: "Cryptocurrency Basics: Your First Steps into Digital Currency",
      description: "A comprehensive guide to understanding Bitcoin, Ethereum, and other cryptocurrencies for beginners.",
      thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=450&fit=crop",
      type: "video",
      duration: "15:30",
      difficulty: "Intermediate",
      views: "8.2K",
      isNew: false
    },
    {
      id: 3,
      title: "Emergency Fund Challenge: Build Your Safety Net",
      description: "Take our 30-day challenge to build an emergency fund that will protect you from financial surprises.",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop",
      type: "quiz",
      duration: "10 questions",
      difficulty: "Beginner",
      views: "5.8K",
      isNew: true
    }
  ];

  // Mock data for quizzes
  const quizzes = [
    {
      id: 1,
      title: "Budgeting Basics",
      questions: 10,
      estimatedTime: "5 min",
      difficulty: "Beginner",
      completed: true,
      lastScore: 85,
      badge: "Budget Master"
    },
    {
      id: 2,
      title: "Investment Fundamentals",
      questions: 15,
      estimatedTime: "8 min",
      difficulty: "Intermediate",
      completed: false,
      badge: "Investor"
    },
    {
      id: 3,
      title: "Cryptocurrency Knowledge",
      questions: 12,
      estimatedTime: "6 min",
      difficulty: "Advanced",
      completed: true,
      lastScore: 92,
      badge: "Crypto Expert"
    },
    {
      id: 4,
      title: "Saving Strategies",
      questions: 8,
      estimatedTime: "4 min",
      difficulty: "Beginner",
      completed: false,
      badge: "Saver"
    }
  ];

  // Mock data for videos
  const videos = [
    {
      id: 1,
      title: "The Power of Compound Interest Explained",
      description: "Discover how small investments can grow into substantial wealth through the magic of compound interest.",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
      duration: 420,
      category: "Basics",
      difficulty: "Beginner",
      views: "15.2K",
      uploadDate: "2 days ago",
      watchProgress: 0,
      isNew: true
    },
    {
      id: 2,
      title: "Stock Market Investing for Beginners",
      description: "Learn the fundamentals of stock market investing and how to build a diversified portfolio.",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=225&fit=crop",
      duration: 720,
      category: "Investing",
      difficulty: "Beginner",
      views: "23.1K",
      uploadDate: "1 week ago",
      watchProgress: 45,
      isNew: false
    },
    {
      id: 3,
      title: "Creating Your First Budget",
      description: "Step-by-step guide to creating a budget that works for your lifestyle and financial goals.",
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=225&fit=crop",
      duration: 540,
      category: "Budgeting",
      difficulty: "Beginner",
      views: "18.7K",
      uploadDate: "3 days ago",
      watchProgress: 100,
      isNew: false
    },
    {
      id: 4,
      title: "Understanding Cryptocurrency Wallets",
      description: "Learn about different types of crypto wallets and how to keep your digital assets secure.",
      thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop",
      duration: 480,
      category: "Cryptocurrency",
      difficulty: "Intermediate",
      views: "9.8K",
      uploadDate: "5 days ago",
      watchProgress: 0,
      isNew: true
    }
  ];

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first article",
      icon: "BookOpen",
      category: "learning",
      rarity: "common",
      earned: true,
      earnedDate: "Jan 15, 2025",
      points: 10
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Score 90% or higher on 5 quizzes",
      icon: "Award",
      category: "quiz",
      rarity: "rare",
      earned: true,
      earnedDate: "Jan 20, 2025",
      points: 50
    },
    {
      id: 3,
      title: "Streak Champion",
      description: "Maintain a 30-day learning streak",
      icon: "Flame",
      category: "streak",
      rarity: "epic",
      earned: false,
      progress: 73,
      points: 100
    },
    {
      id: 4,
      title: "Knowledge Sharer",
      description: "Share 10 articles with friends",
      icon: "Share",
      category: "social",
      rarity: "rare",
      earned: false,
      progress: 40,
      points: 75
    },
    {
      id: 5,
      title: "Financial Guru",
      description: "Complete all learning categories",
      icon: "Crown",
      category: "learning",
      rarity: "legendary",
      earned: false,
      progress: 65,
      points: 500
    }
  ];

  // Mock learning stats
  const learningStats = {
    currentStreak: 15,
    articlesRead: 47,
    badgesEarned: 12,
    quizScore: 87
  };

  // Mock related content
  const relatedContent = [
    {
      id: 1,
      title: "Building Your Emergency Fund",
      description: "Learn how to build a financial safety net for unexpected expenses.",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=120&fit=crop",
      type: "article",
      readingTime: "6 min read",
      difficulty: "Beginner",
      progress: 0
    },
    {
      id: 2,
      title: "Debt Management Strategies",
      description: "Effective methods to pay off debt and improve your credit score.",
      thumbnail: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=200&h=120&fit=crop",
      type: "video",
      duration: "12:45",
      difficulty: "Intermediate",
      views: "8.5K",
      progress: 25
    },
    {
      id: 3,
      title: "Investment Risk Assessment",
      description: "Test your knowledge about investment risks and portfolio management.",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&h=120&fit=crop",
      type: "quiz",
      duration: "8 questions",
      difficulty: "Advanced",
      progress: 0
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'articles', label: 'Articles', icon: 'FileText' },
    { id: 'videos', label: 'Videos', icon: 'Play' },
    { id: 'quizzes', label: 'Quizzes', icon: 'HelpCircle' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
    // Navigate to category content
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
    console.log('Content clicked:', content);
  };

  const handleQuizStart = (quiz) => {
    console.log('Quiz started:', quiz);
    // Navigate to quiz interface
  };

  const handleVideoPlay = (video) => {
    console.log('Video play:', video);
    // Open video player
  };

  const handleSearch = (query, filters) => {
    console.log('Search:', query, filters);
    // Simulate search results
    if (query) {
      const mockResults = [
        { id: 1, title: "Budgeting Basics", type: "article", difficulty: "Beginner" },
        { id: 2, title: "Investment 101", type: "video", difficulty: "Intermediate" },
        { id: 3, title: "Savings Quiz", type: "quiz", difficulty: "Beginner" }
      ];
      setSearchResults(mockResults);
    } else {
      setSearchResults(null);
    }
  };

  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Featured Content Carousel */}
            <FeaturedContentCarousel 
              featuredContent={featuredContent}
              onContentClick={handleContentClick}
            />

            {/* Categories Grid */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Learning Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onCategoryClick={handleCategoryClick}
                  />
                ))}
              </div>
            </div>

            {/* Quick Quiz Section */}
            <QuizSection 
              quizzes={quizzes.slice(0, 3)}
              onQuizStart={handleQuizStart}
            />
          </div>
        );

      case 'articles':
        return (
          <div className="space-y-6">
            <SearchAndFilter
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              searchResults={searchResults}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onCategoryClick={handleCategoryClick}
                />
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <VideoContent 
            videos={videos}
            onVideoPlay={handleVideoPlay}
          />
        );

      case 'quizzes':
        return (
          <QuizSection 
            quizzes={quizzes}
            onQuizStart={handleQuizStart}
          />
        );

      case 'achievements':
        return (
          <AchievementSystem 
            achievements={achievements}
            learningStats={learningStats}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Financial Literacy Hub - Kashly</title>
        <meta name="description" content="Expand your financial knowledge through articles, videos, quizzes, and interactive learning experiences." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        
        <main className="pt-32 lg:pt-36 pb-24 mb-[240px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbTrail />
            
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Financial Literacy Hub</h1>
                <p className="text-muted-foreground mt-2">
                  Expand your financial knowledge and build better money habits
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-3">
                <Button variant="outline" size="sm" iconName="Bookmark" iconPosition="left">
                  Bookmarks
                </Button>
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                  Offline
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-1 mb-8 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  iconName={tab.icon}
                  iconPosition="left"
                  onClick={() => setActiveTab(tab.id)}
                  className="whitespace-nowrap"
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {renderTabContent()}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Learning Progress */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Your Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium text-foreground">68%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary">15</div>
                        <div className="text-xs text-muted-foreground">Day Streak</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-success">47</div>
                        <div className="text-xs text-muted-foreground">Articles Read</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Content */}
                <RelatedContent 
                  relatedContent={relatedContent}
                  onContentClick={handleContentClick}
                />

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" fullWidth iconName="Target" iconPosition="left">
                      Set Learning Goal
                    </Button>
                    <Button variant="outline" size="sm" fullWidth iconName="Users" iconPosition="left">
                      Study with Friends
                    </Button>
                    <Button variant="outline" size="sm" fullWidth iconName="Download" iconPosition="left">
                      Download for Offline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <FloatingActionButton />
      </div>
    </>
  );
};

export default FinancialLiteracyHub;