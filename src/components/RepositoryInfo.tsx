import React from 'react';
import { Star, GitFork, AlertCircle, Calendar, Code, ExternalLink } from 'lucide-react';
import { GitHubRepository } from '../types/github';

interface RepositoryInfoProps {
  repository: GitHubRepository;
}

export const RepositoryInfo: React.FC<RepositoryInfoProps> = ({ repository }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
            <span>{repository.full_name}</span>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </h2>
          {repository.description && (
            <p className="text-gray-600 mb-4">{repository.description}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm">{formatNumber(repository.stargazers_count)} stars</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <GitFork className="w-4 h-4 text-blue-500" />
          <span className="text-sm">{formatNumber(repository.forks_count)} forks</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm">{repository.open_issues_count} issues</span>
        </div>
        {repository.language && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Code className="w-4 h-4 text-green-500" />
            <span className="text-sm">{repository.language}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Created: {formatDate(repository.created_at)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Updated: {formatDate(repository.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};