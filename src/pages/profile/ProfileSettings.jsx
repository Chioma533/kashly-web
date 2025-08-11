import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import  Header  from '../../components/ui/Header';
import { cn } from '../../utils/cn';
import { User, Mail, Phone, Camera, Save, X, CheckCircle, AlertCircle, Building } from 'lucide-react';

export default function ProfileSettings() {
  const { user, userProfile, updateProfile, authError } = useAuth();
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    phone_number: userProfile?.phone_number || '',
    account_type: userProfile?.account_type || 'personal'
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userProfile?.profile_picture_url || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      account_type: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setProfilePicture(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result);
      };
      reader.readAsDataURL(file);
      
      setError('');
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (formData.full_name.trim().length < 2) {
      setError('Full name must be at least 2 characters');
      return false;
    }
    if (formData.phone_number && formData.phone_number.trim().length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updates = {
        full_name: formData.full_name.trim(),
        phone_number: formData.phone_number.trim(),
        account_type: formData.account_type
      };

      const result = await updateProfile(updates);
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
        // Clear the success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error || 'Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      full_name: userProfile?.full_name || '',
      phone_number: userProfile?.phone_number || '',
      account_type: userProfile?.account_type || 'personal'
    });
    setProfilePicture(null);
    setPreviewUrl(userProfile?.profile_picture_url || '');
    setError('');
    setSuccess('');
  };

  const accountTypeOptions = [
    { value: 'personal', label: 'Personal Account', icon: User },
    { value: 'business', label: 'Business Account', icon: Building }
  ];

  const hasChanges = 
    formData.full_name !== (userProfile?.full_name || '') ||
    formData.phone_number !== (userProfile?.phone_number || '') ||
    formData.account_type !== (userProfile?.account_type || 'personal') ||
    profilePicture !== null;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Profile Settings"
        showBalance={false}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">
              Update your personal information and account preferences
            </p>
          </div>

          {/* Messages */}
          {(error || authError) && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-error mr-3 flex-shrink-0" />
              <p className="text-error text-sm font-medium">{error || authError}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
              <p className="text-success text-sm font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-4 border-background shadow-soft">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <User className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleProfilePictureClick}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-soft hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <p className="text-sm text-muted-foreground text-center">
                Click the camera icon to upload a new profile picture
                <br />
                <span className="text-xs">Maximum file size: 5MB</span>
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="pl-10 h-12 bg-muted/50 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Email address cannot be changed
                </p>
              </div>

              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="account_type" className="block text-sm font-medium text-foreground mb-2">
                  Account Type
                </label>
                <Select
                  value={formData.account_type}
                  onValueChange={handleSelectChange}
                  placeholder="Select account type"
                >
                  {accountTypeOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <option.icon className="w-4 h-4 mr-2" />
                        {option.label}
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                disabled={isLoading || !hasChanges}
                className={cn(
                  "flex-1 h-12 text-base font-semibold",
                  hasChanges 
                    ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80" :"bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </div>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading || !hasChanges}
                className="flex-1 h-12 text-base font-medium"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Account Information */}
        <div className="bg-card rounded-2xl shadow-soft border border-border p-6 mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Created:</span>
              <span className="text-foreground">
                {new Date(userProfile?.created_at || '').toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="text-foreground">
                {new Date(userProfile?.updated_at || '').toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID:</span>
              <span className="text-foreground font-mono text-xs">
                {user?.id?.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}