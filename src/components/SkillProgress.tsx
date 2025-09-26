import React from 'react';
import { TrendingUp, Code2, Database, Palette, Smartphone } from 'lucide-react';

const SkillProgress: React.FC = () => {
  const skills = [
    { name: 'Frontend Development', level: 85, growth: '+15%', icon: Code2 },
    { name: 'Backend Development', level: 72, growth: '+22%', icon: Database },
    { name: 'UI/UX Design', level: 68, growth: '+18%', icon: Palette },
    { name: 'Mobile Development', level: 54, growth: '+28%', icon: Smartphone },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Skill Progress</h2>
            <p className="text-sm text-gray-600 mt-1">Track your learning journey</p>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">+18% avg growth</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <skill.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{skill.name}</p>
                    <p className="text-sm text-green-600 font-medium">{skill.growth}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">{skill.level}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillProgress;