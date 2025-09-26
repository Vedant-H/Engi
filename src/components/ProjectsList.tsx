import React from 'react';
import { Calendar, Users, Code, Rocket, Clock } from 'lucide-react';

const ProjectsList: React.FC = () => {
  const projects = [
    {
      title: 'AI-Powered Code Review Tool',
      status: 'In Progress',
      progress: 68,
      skills: ['Python', 'Machine Learning', 'React'],
      deadline: '2 weeks',
      team: 4,
      priority: 'high'
    },
    {
      title: 'Smart IoT Home Automation',
      status: 'Starting Soon',
      progress: 15,
      skills: ['Arduino', 'Node.js', 'Mobile App'],
      deadline: '1 month',
      team: 3,
      priority: 'medium'
    },
    {
      title: 'Blockchain Voting System',
      status: 'In Progress',
      progress: 42,
      skills: ['Solidity', 'Web3', 'React'],
      deadline: '3 weeks',
      team: 5,
      priority: 'high'
    },
    {
      title: 'Mental Health Tracker App',
      status: 'Review',
      progress: 89,
      skills: ['Flutter', 'Firebase', 'UI/UX'],
      deadline: '5 days',
      team: 2,
      priority: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Starting Soon': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Review': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-blue-500';
      case 'medium': return 'border-l-green-500';
      case 'low': return 'border-l-gray-300';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Adopted Projects</h2>
        <p className="text-sm text-gray-600 mt-1">Track your active engineering projects</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`border-l-4 ${getPriorityColor(project.priority)} bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-all duration-200`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full border ${getStatusColor(project.status)} font-medium`}>
                      {project.status}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.team}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{project.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200"
                  >
                    <Code className="w-3 h-3 mr-1" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;