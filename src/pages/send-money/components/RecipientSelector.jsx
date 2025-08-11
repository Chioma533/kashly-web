import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const RecipientSelector = ({ onRecipientSelect, selectedRecipient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualRecipient, setManualRecipient] = useState({
    type: 'email',
    value: '',
    name: ''
  });

  const recentRecipients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastTransaction: "2 days ago",
      isFrequent: true
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 987-6543",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastTransaction: "1 week ago",
      isFrequent: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastTransaction: "3 days ago",
      isFrequent: false
    }
  ];

  const contacts = [
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isContact: true
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.t@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isContact: true
    }
  ];

  const filteredRecipients = [...recentRecipients, ...contacts].filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.phone.includes(searchQuery)
  );

  const handleRecipientClick = (recipient) => {
    onRecipientSelect(recipient);
  };

  const handleManualSubmit = () => {
    if (manualRecipient.value && manualRecipient.name) {
      const recipient = {
        id: 'manual',
        name: manualRecipient.name,
        [manualRecipient.type]: manualRecipient.value,
        isManual: true
      };
      onRecipientSelect(recipient);
    }
  };

  const getRecipientTypeIcon = (type) => {
    switch (type) {
      case 'email': return 'Mail';
      case 'phone': return 'Phone';
      case 'wallet': return 'Wallet';
      default: return 'User';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search contacts or enter email/phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
      </div>

      {/* Manual Entry Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          iconName={showManualEntry ? "Users" : "Plus"}
          iconPosition="left"
          onClick={() => setShowManualEntry(!showManualEntry)}
        >
          {showManualEntry ? "Show Contacts" : "Add New Recipient"}
        </Button>
      </div>

      {showManualEntry ? (
        /* Manual Entry Form */
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Add New Recipient</h3>
          
          {/* Recipient Type Selector */}
          <div className="flex space-x-2">
            {['email', 'phone', 'wallet'].map((type) => (
              <Button
                key={type}
                variant={manualRecipient.type === type ? "default" : "outline"}
                size="sm"
                iconName={getRecipientTypeIcon(type)}
                iconPosition="left"
                onClick={() => setManualRecipient(prev => ({ ...prev, type }))}
                className="flex-1"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          <Input
            label="Recipient Name"
            type="text"
            placeholder="Enter recipient's name"
            value={manualRecipient.name}
            onChange={(e) => setManualRecipient(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <Input
            label={`${manualRecipient.type.charAt(0).toUpperCase() + manualRecipient.type.slice(1)} Address`}
            type={manualRecipient.type === 'email' ? 'email' : 'text'}
            placeholder={
              manualRecipient.type === 'email' ? 'recipient@email.com' :
              manualRecipient.type === 'phone' ? '+1 (555) 123-4567' :
              'wallet-address-123'
            }
            value={manualRecipient.value}
            onChange={(e) => setManualRecipient(prev => ({ ...prev, value: e.target.value }))}
            required
          />

          <Button
            variant="default"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={handleManualSubmit}
            disabled={!manualRecipient.value || !manualRecipient.name}
          >
            Add Recipient
          </Button>
        </div>
      ) : (
        /* Recipients List */
        <div className="space-y-4">
          {/* Recent Recipients */}
          {recentRecipients.filter(r => 
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.email.toLowerCase().includes(searchQuery.toLowerCase())
          ).length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Recipients</h3>
              <div className="space-y-2">
                {recentRecipients.filter(r => 
                  r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  r.email.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((recipient) => (
                  <div
                    key={recipient.id}
                    onClick={() => handleRecipientClick(recipient)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-smooth ${
                      selectedRecipient?.id === recipient.id
                        ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={recipient.avatar}
                        alt={recipient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {recipient.isFrequent && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                          <Icon name="Star" size={10} className="text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground truncate">{recipient.name}</p>
                        {recipient.isFrequent && (
                          <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                            Frequent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{recipient.email}</p>
                      <p className="text-xs text-muted-foreground">Last sent: {recipient.lastTransaction}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {selectedRecipient?.id === recipient.id && (
                        <Icon name="Check" size={18} className="text-primary" />
                      )}
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts */}
          {contacts.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase())
          ).length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Contacts</h3>
              <div className="space-y-2">
                {contacts.filter(c => 
                  c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.email.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleRecipientClick(contact)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-smooth ${
                      selectedRecipient?.id === contact.id
                        ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{contact.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {selectedRecipient?.id === contact.id && (
                        <Icon name="Check" size={18} className="text-primary" />
                      )}
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredRecipients.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recipients found for "{searchQuery}"</p>
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowManualEntry(true)}
                className="mt-4"
              >
                Add as New Recipient
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipientSelector;