import { GitHubFile, GitHubRepository, ExtractionOptions, ExtractedCode } from '../types/github';

class GitHubService {
  private baseUrl = 'https://api.github.com';
  private token = import.meta.env.VITE_GITHUB_TOKEN;

  private getHeaders() {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitZen-App'
    };
    
    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }
    
    return headers;
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repository: ${response.statusText}`);
    }

    return response.json();
  }

  async getRepositoryContents(owner: string, repo: string, path = ''): Promise<GitHubFile[]> {
    const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repository contents: ${response.statusText}`);
    }

    return response.json();
  }

  async getFileContent(downloadUrl: string): Promise<string> {
    const response = await fetch(downloadUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }

    return response.text();
  }

  private shouldIncludeFile(file: GitHubFile, options: ExtractionOptions): boolean {
    // Check file size
    if (file.size > options.maxFileSize) {
      return false;
    }

    // Check if it's in excluded directories
    const isInExcludedDir = options.excludeDirectories.some(dir => 
      file.path.toLowerCase().includes(dir.toLowerCase())
    );
    if (isInExcludedDir) {
      return false;
    }

    // Get file extension
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    // Check excluded extensions
    if (options.excludeExtensions.includes(extension)) {
      return false;
    }

    // Check included extensions (if specified)
    if (options.includeExtensions.length > 0) {
      return options.includeExtensions.includes(extension);
    }

    return true;
  }

  private getLanguageFromExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'js': 'JavaScript',
      'jsx': 'JavaScript',
      'ts': 'TypeScript',
      'tsx': 'TypeScript',
      'py': 'Python',
      'java': 'Java',
      'cpp': 'C++',
      'c': 'C',
      'cs': 'C#',
      'php': 'PHP',
      'rb': 'Ruby',
      'go': 'Go',
      'rs': 'Rust',
      'swift': 'Swift',
      'kt': 'Kotlin',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sass': 'Sass',
      'json': 'JSON',
      'xml': 'XML',
      'yaml': 'YAML',
      'yml': 'YAML',
      'md': 'Markdown',
      'sql': 'SQL',
      'sh': 'Shell',
      'dockerfile': 'Docker'
    };
    
    return languageMap[extension || ''] || 'Text';
  }

  async extractRepositoryCode(
    owner: string, 
    repo: string, 
    options: ExtractionOptions
  ): Promise<ExtractedCode> {
    const repository = await this.getRepository(owner, repo);
    const allFiles: Array<{
      path: string;
      content: string;
      size: number;
      language: string;
    }> = [];

    const processDirectory = async (path = ''): Promise<void> => {
      const contents = await this.getRepositoryContents(owner, repo, path);
      
      for (const item of contents) {
        if (allFiles.length >= options.maxFiles) {
          break;
        }

        if (item.type === 'file' && this.shouldIncludeFile(item, options)) {
          try {
            const content = await this.getFileContent(item.download_url);
            allFiles.push({
              path: item.path,
              content,
              size: item.size,
              language: this.getLanguageFromExtension(item.name)
            });
          } catch (error) {
            console.warn(`Failed to fetch content for ${item.path}:`, error);
          }
        } else if (item.type === 'dir' && allFiles.length < options.maxFiles) {
          // Check if directory should be excluded
          const isExcluded = options.excludeDirectories.some(dir => 
            item.path.toLowerCase().includes(dir.toLowerCase())
          );
          
          if (!isExcluded) {
            await processDirectory(item.path);
          }
        }
      }
    };

    await processDirectory();

    const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);

    return {
      repository,
      files: allFiles,
      totalFiles: allFiles.length,
      totalSize,
      extractedAt: new Date().toISOString()
    };
  }
}

export const githubService = new GitHubService();