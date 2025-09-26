import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { ExtractionOptions } from '../types/github';

interface ExtractionOptionsProps {
  options: ExtractionOptions;
  onChange: (options: ExtractionOptions) => void;
}

export const ExtractionOptionsComponent: React.FC<ExtractionOptionsProps> = ({ options, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const commonExtensions = [
    'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'swift', 'kt',
    'html', 'css', 'scss', 'sass', 'json', 'xml', 'yaml', 'yml', 'md', 'sql', 'sh'
  ];

  const commonExcludeExtensions = [
    'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'pdf', 'zip', 'tar', 'gz', 'exe', 'dll', 'so'
  ];

  const commonExcludeDirs = [
    'node_modules', '.git', 'dist', 'build', 'target', 'bin', 'obj', '.vscode', '.idea', 'coverage'
  ];

  const handleArrayChange = (
    field: 'includeExtensions' | 'excludeExtensions' | 'excludeDirectories',
    value: string
  ) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    onChange({ ...options, [field]: items });
  };

  const toggleExtension = (extension: string, field: 'includeExtensions' | 'excludeExtensions') => {
    const current = options[field];
    const updated = current.includes(extension)
      ? current.filter(ext => ext !== extension)
      : [...current, extension];
    onChange({ ...options, [field]: updated });
  };

  const toggleDirectory = (directory: string) => {
    const current = options.excludeDirectories;
    const updated = current.includes(directory)
      ? current.filter(dir => dir !== directory)
      : [...current, directory];
    onChange({ ...options, excludeDirectories: updated });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Extraction Options</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* File Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max File Size (bytes)
              </label>
              <input
                type="number"
                value={options.maxFileSize}
                onChange={(e) => onChange({ ...options, maxFileSize: parseInt(e.target.value) || 100000 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1000"
                max="10000000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current: {(options.maxFileSize / 1000).toFixed(0)}KB
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Files to Extract
              </label>
              <input
                type="number"
                value={options.maxFiles}
                onChange={(e) => onChange({ ...options, maxFiles: parseInt(e.target.value) || 50 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="500"
              />
            </div>
          </div>

          {/* Include Extensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Include File Extensions (leave empty to include all)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonExtensions.map(ext => (
                <button
                  key={ext}
                  onClick={() => toggleExtension(ext, 'includeExtensions')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    options.includeExtensions.includes(ext)
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  .{ext}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={options.includeExtensions.join(', ')}
              onChange={(e) => handleArrayChange('includeExtensions', e.target.value)}
              placeholder="js, py, java (comma-separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Exclude Extensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exclude File Extensions
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonExcludeExtensions.map(ext => (
                <button
                  key={ext}
                  onClick={() => toggleExtension(ext, 'excludeExtensions')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    options.excludeExtensions.includes(ext)
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  .{ext}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={options.excludeExtensions.join(', ')}
              onChange={(e) => handleArrayChange('excludeExtensions', e.target.value)}
              placeholder="png, jpg, pdf (comma-separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Exclude Directories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exclude Directories
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonExcludeDirs.map(dir => (
                <button
                  key={dir}
                  onClick={() => toggleDirectory(dir)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    options.excludeDirectories.includes(dir)
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={options.excludeDirectories.join(', ')}
              onChange={(e) => handleArrayChange('excludeDirectories', e.target.value)}
              placeholder="node_modules, dist, build (comma-separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};