import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MembersTab = ({ members, isAdmin, onRemoveMember, onMakeAdmin }) => {
  const [sortBy, setSortBy] = useState('contribution');

  const sortedMembers = [...members].sort((a, b) => {
    switch (sortBy) {
      case 'contribution':
        return b.totalContribution - a.totalContribution;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'joinDate':
        return new Date(b.joinDate) - new Date(a.joinDate);
      default:
        return 0;
    }
  });

  const totalContributions = members.reduce((sum, member) => sum + member.totalContribution, 0);

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Members ({members.length})</h3>
        
        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="contribution">By Contribution</option>
          <option value="name">By Name</option>
          <option value="joinDate">By Join Date</option>
        </select>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {sortedMembers.map((member) => {
          const contributionPercentage = totalContributions > 0 
            ? (member.totalContribution / totalContributions) * 100 
            : 0;

          return (
            <div key={member.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {member.isAdmin && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Crown" size={12} className="text-primary-foreground" />
                  </div>
                )}
                {member.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                )}
              </div>

              {/* Member Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">{member.name}</h4>
                  {member.isAdmin && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                  <span>{member.contributionCount} contributions</span>
                </div>
              </div>

              {/* Contribution Info */}
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-foreground">
                  ${member.totalContribution.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {contributionPercentage.toFixed(1)}% of total
                </div>
                
                {/* Contribution Bar */}
                <div className="w-20 bg-muted rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(contributionPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              {isAdmin && !member.isAdmin && (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="Crown"
                    iconSize={16}
                    onClick={() => onMakeAdmin(member.id)}
                    className="h-8 w-8"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="UserMinus"
                    iconSize={16}
                    onClick={() => onRemoveMember(member.id)}
                    className="h-8 w-8 text-error hover:text-error"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Member Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">{members.length}</div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {members.filter(m => m.isOnline).length}
            </div>
            <div className="text-sm text-muted-foreground">Online Now</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              ${totalContributions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Contributed</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              ${Math.round(totalContributions / members.length).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Avg per Member</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersTab;