import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  FolderOpen, 
  Code, 
  Search,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import { ExtractedCode } from '../types/github';

interface ExtractedCodeViewProps {
  extractedCode: ExtractedCode;
}

export const ExtractedCodeView: React.FC<ExtractedCodeViewProps> = ({ extractedCode }) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

  const languages = Array.from(new Set(extractedCode.files.map(f => f.language))).sort();
  
  const filteredFiles = extractedCode.files.filter(file => {
    const matchesSearch = file.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = !selectedLanguage || file.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const copyToClipboard = async (text: string, fileId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFile(fileId);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const downloadAllCode = () => {
    const allCode = extractedCode.files.map(file => 
      `// File: ${file.path}\n// Language: ${file.language}\n// Size: ${file.size} bytes\n\n${file.content}\n\n${'='.repeat(80)}\n\n`
    ).join('');

    const blob = new Blob([allCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${extractedCode.repository.name}-code.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleFileExpansion = (filePath: string) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(filePath)) {
      newExpanded.delete(filePath);
    } else {
      newExpanded.add(filePath);
    }
    setExpandedFiles(newExpanded);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <Code className="w-6 h-6 text-green-600" />
          <span>Extracted Code</span>
        </h3>
        <button
          onClick={downloadAllCode}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download All</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{extractedCode.totalFiles}</div>
          <div className="text-sm text-gray-600">Total Files</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{formatFileSize(extractedCode.totalSize)}</div>
          <div className="text-sm text-gray-600">Total Size</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{languages.length}</div>
          <div className="text-sm text-gray-600">Languages</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{filteredFiles.length}</div>
          <div className="text-sm text-gray-600">Filtered</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search files and content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Files List */}
      <div className="space-y-4">
        {filteredFiles.map((file, index) => {
          const isExpanded = expandedFiles.has(file.path);
          const fileId = `file-${index}`;
          
          return (
            <div key={file.path} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFileExpansion(file.path)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <FolderOpen className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-800">{file.path}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {file.language}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(file.content, fileId)}
                  className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedFile === fileId ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="text-sm">Copy</span>
                </button>
              </div>
              
              {isExpanded && (
                <div className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
                  <pre className="text-sm">
                    <code>{file.content}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No files match your current filters.</p>
        </div>
      )}
    </div>
  );
};