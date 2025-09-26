import React from 'react';
import { Github, Sparkles } from 'lucide-react';

export const GitZenHeader: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative">
            <Github className="w-10 h-10" />
            <Sparkles className="w-5 h-5 absolute -top-1 -right-1 text-yellow-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            GitZen
          </h1>
        </div>
        <p className="text-center text-blue-100 text-lg max-w-2xl mx-auto">
          Extract, analyze, and summarize GitHub repositories with AI-powered insights
        </p>
      </div>
    </header>
  );
};