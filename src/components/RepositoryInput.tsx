import React, { useState } from 'react';
import { Search, Github, AlertCircle } from 'lucide-react';

interface RepositoryInputProps {
  onSubmit: (owner: string, repo: string) => void;
  loading: boolean;
}

export const RepositoryInput: React.FC<RepositoryInputProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const parseGitHubUrl = (input: string): { owner: string; repo: string } | null => {
    // Remove whitespace
    const cleanInput = input.trim();
    
    // Handle different GitHub URL formats
    const patterns = [
      /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/.*)?$/,
      /^github\.com\/([^\/]+)\/([^\/]+)(?:\/.*)?$/,
      /^([^\/]+)\/([^\/]+)$/
    ];

    for (const pattern of patterns) {
      const match = cleanInput.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace(/\.git$/, '') // Remove .git suffix if present
        };
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a GitHub repository URL or owner/repo');
      return;
    }

    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setError('Invalid GitHub repository format. Use: owner/repo or full GitHub URL');
      return;
    }

    onSubmit(parsed.owner, parsed.repo);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Repository
          </label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="repo-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="owner/repo or https://github.com/owner/repo"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={loading}
            />
          </div>
          {error && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing Repository...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze Repository</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Supported formats:</p>
        <ul className="space-y-1 text-gray-500">
          <li>• <code className="bg-gray-100 px-1 rounded">owner/repository</code></li>
          <li>• <code className="bg-gray-100 px-1 rounded">https://github.com/owner/repository</code></li>
          <li>• <code className="bg-gray-100 px-1 rounded">github.com/owner/repository</code></li>
        </ul>
      </div>
    </div>
  );
};