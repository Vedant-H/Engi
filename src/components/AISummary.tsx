import React from 'react';
import { CodeSummary } from '../types/github';

interface Summaries {
  technicalSummary: CodeSummary;
  nonTechnicalSummary: string;
}

export const AISummary: React.FC<{ summaries: Summaries | null }> = ({ summaries }) => {
  if (!summaries) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Summary of Project</h3>
        <p className="text-gray-600">No summary available. Try generating again.</p>
      </div>
    );
  }

  const { technicalSummary, nonTechnicalSummary } = summaries;
  const {
    overview,
    keyFeatures,
    techStack,
    projectStructure,
    gettingStarted,
    mainFiles,
    complexity,
    estimatedReadingTime,
  } = technicalSummary;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Summary of Project</h3>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Overview</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {overview}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Key Features</h4>
        <ul className="list-disc pl-6 text-sm text-gray-800">
          {keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Tech Stack</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {techStack.join(', ')}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Project Structure</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {projectStructure}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Getting Started</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {gettingStarted}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Main Files</h4>
        <ul className="list-disc pl-6 text-sm text-gray-800">
          {mainFiles.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Complexity</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {complexity}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Estimated Reading Time</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {estimatedReadingTime}
        </p>
      </div>

      <hr className="my-8" />

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Non-Technical Summary</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {nonTechnicalSummary}
        </p>
      </div>
    </div>
  );
};