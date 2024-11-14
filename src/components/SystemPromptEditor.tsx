import React, { useState } from 'react';
import { Settings, Code } from 'lucide-react';
import { DEFAULT_SYSTEM_PROMPT } from '../services/openai';
import type { ResumeScore } from '../types';

interface SystemPromptEditorProps {
  systemPrompt: string;
  onSystemPromptChange: (prompt: string) => void;
}

export function SystemPromptEditor({ systemPrompt, onSystemPromptChange }: SystemPromptEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'output'>('prompt');
  const [lastApiOutput, setLastApiOutput] = useState<ResumeScore | null>(null);

  // Subscribe to API responses
  React.useEffect(() => {
    const handleApiResponse = (event: CustomEvent<ResumeScore>) => {
      setLastApiOutput(event.detail);
    };

    window.addEventListener('apiResponse' as any, handleApiResponse);
    return () => {
      window.removeEventListener('apiResponse' as any, handleApiResponse);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Edit System Prompt"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Development Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'prompt'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                System Prompt
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeTab === 'output'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Raw API Output</span>
              </button>
            </div>

            {/* Content */}
            <div className="mb-4">
              {activeTab === 'prompt' ? (
                <div className="space-y-4">
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => onSystemPromptChange(e.target.value)}
                    className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                    placeholder="Enter system prompt..."
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => onSystemPromptChange(DEFAULT_SYSTEM_PROMPT)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-700">Latest API Response</h4>
                      {lastApiOutput && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(lastApiOutput, null, 2));
                          }}
                          className="text-blue-500 hover:text-blue-600 text-sm flex items-center space-x-1"
                        >
                          <Code className="w-4 h-4" />
                          <span>Copy JSON</span>
                        </button>
                      )}
                    </div>
                    <pre className="text-xs overflow-auto max-h-96 bg-gray-900 text-gray-100 p-4 rounded">
                      {lastApiOutput 
                        ? JSON.stringify(lastApiOutput, null, 2)
                        : 'No API response captured yet. Try analyzing a resume first.'}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}