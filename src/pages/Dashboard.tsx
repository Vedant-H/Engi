import React from 'react';
import MetricsCards from '../components/MetricsCards';
import ProjectsList from '../components/ProjectsList';
import SkillProgress from '../components/SkillProgress';
import ActivityFeed from '../components/ActivityFeed';
import FundingOverview from '../components/FundingOverview';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <MetricsCards />
            <ProjectsList />
            <SkillProgress />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <ActivityFeed />
            <FundingOverview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;