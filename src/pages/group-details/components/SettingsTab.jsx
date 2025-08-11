import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsTab = ({ group, isAdmin, onUpdateGroup, onLeaveGroup, onDeleteGroup }) => {
  const [groupName, setGroupName] = useState(group.name);
  const [groupDescription, setGroupDescription] = useState(group.description);
  const [targetAmount, setTargetAmount] = useState(group.targetAmount);
  const [endDate, setEndDate] = useState(group.endDate);
  const [isPrivate, setIsPrivate] = useState(group.isPrivate);
  const [allowInvites, setAllowInvites] = useState(group.allowInvites);
  const [notifications, setNotifications] = useState({
    contributions: true,
    milestones: true,
    reminders: false,
    chat: true
  });

  const handleSaveSettings = () => {
    const updatedGroup = {
      ...group,
      name: groupName,
      description: groupDescription,
      targetAmount: parseFloat(targetAmount),
      endDate,
      isPrivate,
      allowInvites
    };
    onUpdateGroup(updatedGroup);
  };

  const handleNotificationChange = (type, value) => {
    setNotifications(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Group Settings */}
      {isAdmin && (
        <div className="bg-card rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Group Settings</h3>
          
          <div className="space-y-4">
            <Input
              label="Group Name"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
            
            <Input
              label="Description"
              type="text"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="Describe your savings goal"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Target Amount ($)"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0.00"
              />
              
              <Input
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <Checkbox
                label="Private Group"
                description="Only invited members can join"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              
              <Checkbox
                label="Allow Member Invites"
                description="Members can invite others to join"
                checked={allowInvites}
                onChange={(e) => setAllowInvites(e.target.checked)}
              />
            </div>
            
            <div className="pt-4">
              <Button
                variant="default"
                iconName="Save"
                iconPosition="left"
                onClick={handleSaveSettings}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      <div className="bg-card rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Contribution Notifications"
            description="Get notified when members contribute"
            checked={notifications.contributions}
            onChange={(e) => handleNotificationChange('contributions', e.target.checked)}
          />
          
          <Checkbox
            label="Milestone Achievements"
            description="Celebrate when goals are reached"
            checked={notifications.milestones}
            onChange={(e) => handleNotificationChange('milestones', e.target.checked)}
          />
          
          <Checkbox
            label="Contribution Reminders"
            description="Weekly reminders to contribute"
            checked={notifications.reminders}
            onChange={(e) => handleNotificationChange('reminders', e.target.checked)}
          />
          
          <Checkbox
            label="Chat Messages"
            description="New messages in group chat"
            checked={notifications.chat}
            onChange={(e) => handleNotificationChange('chat', e.target.checked)}
          />
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-card rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Privacy & Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <div className="font-medium text-foreground">Export Data</div>
              <div className="text-sm text-muted-foreground">Download your contribution history</div>
            </div>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <div className="font-medium text-foreground">Share Group Link</div>
              <div className="text-sm text-muted-foreground">Invite others with a shareable link</div>
            </div>
            <Button variant="outline" iconName="Link" iconPosition="left">
              Copy Link
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-lg shadow-soft p-6 border-l-4 border-l-error">
        <h3 className="text-lg font-semibold text-error mb-6">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-error/20 rounded-lg bg-error/5">
            <div>
              <div className="font-medium text-foreground">Leave Group</div>
              <div className="text-sm text-muted-foreground">
                You'll lose access to this group and its chat
              </div>
            </div>
            <Button 
              variant="outline" 
              iconName="LogOut" 
              iconPosition="left"
              onClick={onLeaveGroup}
              className="border-error text-error hover:bg-error hover:text-error-foreground"
            >
              Leave
            </Button>
          </div>
          
          {isAdmin && (
            <div className="flex items-center justify-between p-4 border border-error/20 rounded-lg bg-error/5">
              <div>
                <div className="font-medium text-foreground">Delete Group</div>
                <div className="text-sm text-muted-foreground">
                  Permanently delete this group and all its data
                </div>
              </div>
              <Button 
                variant="destructive" 
                iconName="Trash2" 
                iconPosition="left"
                onClick={onDeleteGroup}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;