import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import Button from '../../../components/ui/Button';

const ExpenseChart = () => {
  const [chartType, setChartType] = useState('pie');
  const [timeRange, setTimeRange] = useState('month');

  const pieData = [
    { name: 'Housing', value: 1350, color: '#6B46C1', percentage: 47.4 },
    { name: 'Food', value: 520, color: '#84CC16', percentage: 18.3 },
    { name: 'Transportation', value: 380, color: '#F59E0B', percentage: 13.3 },
    { name: 'Entertainment', value: 280, color: '#10B981', percentage: 9.8 },
    { name: 'Shopping', value: 317, color: '#EF4444', percentage: 11.1 }
  ];

  const barData = [
    { month: 'Sep', Housing: 1400, Food: 480, Transportation: 420, Entertainment: 320, Shopping: 280 },
    { month: 'Oct', Housing: 1380, Food: 510, Transportation: 390, Entertainment: 290, Shopping: 310 },
    { month: 'Nov', Housing: 1360, Food: 495, Transportation: 375, Entertainment: 275, Shopping: 295 },
    { month: 'Dec', Housing: 1340, Food: 530, Transportation: 385, Entertainment: 310, Shopping: 340 },
    { month: 'Jan', Housing: 1350, Food: 520, Transportation: 380, Entertainment: 280, Shopping: 317 }
  ];

  const trendData = [
    { day: '1', amount: 45 },
    { day: '5', amount: 120 },
    { day: '10', amount: 89 },
    { day: '15', amount: 156 },
    { day: '20', amount: 203 },
    { day: '25', amount: 178 },
    { day: '28', amount: 95 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
              {entry.name}: ${entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-popover-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            ${data.value.toLocaleString()} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-foreground">Expense Analysis</h2>
        
        <div className="flex items-center space-x-2">
          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'pie' ? 'default' : 'ghost'}
              size="sm"
              iconName="PieChart"
              iconSize={16}
              onClick={() => setChartType('pie')}
              className="h-8"
            />
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              iconName="BarChart3"
              iconSize={16}
              onClick={() => setChartType('bar')}
              className="h-8"
            />
            <Button
              variant={chartType === 'trend' ? 'default' : 'ghost'}
              size="sm"
              iconName="TrendingUp"
              iconSize={16}
              onClick={() => setChartType('trend')}
              className="h-8"
            />
          </div>

          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm bg-background border border-border rounded-md px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-80 mb-6">
        {chartType === 'pie' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}

        {chartType === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Housing" fill="#6B46C1" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Food" fill="#84CC16" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Transportation" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Entertainment" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Shopping" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'trend' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#6B46C1" 
                strokeWidth={3}
                dot={{ fill: '#6B46C1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#6B46C1', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend and Summary */}
      {chartType === 'pie' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">${item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chart Actions */}
      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left" iconSize={14}>
          Export Data
        </Button>
        <Button variant="outline" size="sm" iconName="Share2" iconPosition="left" iconSize={14}>
          Share Report
        </Button>
        <Button variant="outline" size="sm" iconName="Filter" iconPosition="left" iconSize={14}>
          Advanced Filters
        </Button>
      </div>
    </div>
  );
};

export default ExpenseChart;