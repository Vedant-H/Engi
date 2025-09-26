import React from 'react';
import { MessageSquare, GitCommitVertical as GitCommit, Award, DollarSign, Clock } from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const activities = [
    {
      type: 'milestone',
      title: 'Milestone completed',
      description: 'Backend API development for AI Code Review',
      time: '2 hours ago',
      icon: Award,
      color: 'text-green-700 bg-green-50'
    },
    {
      type: 'comment',
      title: 'New mentor feedback',
      description: 'John Smith commented on your IoT project',
      time: '4 hours ago',
      icon: MessageSquare,
      color: 'text-blue-700 bg-blue-50'
    },
    {
      type: 'commit',
      title: 'Code contribution',
      description: 'Pushed 12 commits to blockchain voting system',
      time: '6 hours ago',
      icon: GitCommit,
      color: 'text-purple-700 bg-purple-50'
    },
    {
      type: 'funding',
      title: 'Funding received',
      description: '$2,500 funding for Mental Health Tracker',
      time: '1 day ago',
      icon: DollarSign,
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      type: 'deadline',
      title: 'Upcoming deadline',
      description: 'AI Code Review project due in 2 weeks',
      time: '2 days ago',
      icon: Clock,
      color: 'text-amber-700 bg-amber-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <p className="text-sm text-gray-600 mt-1">Stay updated with your projects</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;