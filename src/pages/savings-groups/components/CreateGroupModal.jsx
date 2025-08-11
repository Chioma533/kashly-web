import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetAmount: '',
    category: 'vacation',
    privacy: 'private',
    inviteCode: '',
    deadline: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'vacation', label: 'Vacation & Travel', icon: 'Plane' },
    { value: 'emergency', label: 'Emergency Fund', icon: 'Shield' },
    { value: 'home', label: 'Home & Property', icon: 'Home' },
    { value: 'education', label: 'Education', icon: 'GraduationCap' },
    { value: 'wedding', label: 'Wedding', icon: 'Heart' },
    { value: 'business', label: 'Business', icon: 'Briefcase' },
    { value: 'other', label: 'Other', icon: 'Target' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
      newErrors.targetAmount = 'Please enter a valid target amount';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Target date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newGroup = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: 0,
        category: formData.category,
        privacy: formData.privacy,
        deadline: formData.deadline,
        members: [
          {
            id: 'user-1',
            name: 'You',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            isOwner: true
          }
        ],
        createdAt: new Date().toISOString(),
        lastContribution: 'Just created'
      };
      
      onCreateGroup(newGroup);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        targetAmount: '',
        category: 'vacation',
        privacy: 'private',
        inviteCode: '',
        deadline: ''
      });
      
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-elevated">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Create New Group</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Group Name */}
          <Input
            label="Group Name"
            type="text"
            placeholder="e.g., Summer Vacation Fund"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Tell your group members what you're saving for..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
            />
            {errors.description && (
              <p className="text-error text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Target Amount */}
          <Input
            label="Target Amount"
            type="number"
            placeholder="0.00"
            value={formData.targetAmount}
            onChange={(e) => handleInputChange('targetAmount', e.target.value)}
            error={errors.targetAmount}
            required
            min="1"
            step="0.01"
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleInputChange('category', category.value)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    formData.category === category.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Date */}
          <Input
            label="Target Date"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
            error={errors.deadline}
            required
            min={new Date().toISOString().split('T')[0]}
          />

          {/* Privacy Settings */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Privacy
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={formData.privacy === 'private'}
                  onChange={(e) => handleInputChange('privacy', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">Private</div>
                  <div className="text-xs text-muted-foreground">Only invited members can join</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={formData.privacy === 'public'}
                  onChange={(e) => handleInputChange('privacy', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">Public</div>
                  <div className="text-xs text-muted-foreground">Anyone can discover and join</div>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              iconName="Plus"
              iconPosition="left"
              className="flex-1"
            >
              Create Group
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;