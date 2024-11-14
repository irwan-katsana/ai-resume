import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { ScoreCard } from './components/ScoreCard';
import { SystemPromptEditor } from './components/SystemPromptEditor';
import { PDFParser } from './components/PDFParser';
import { DevModeButton } from './components/DevModeButton';
import { analyzeResume, DEFAULT_SYSTEM_PROMPT } from './services/openai';
import type { AnalysisState, ResumeScore } from './types';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isAnalyzing: false,
    error: null,
    score: null,
  });

  const handleAnalyze = async () => {
    if (!jobDescription || !resumeText) return;

    setAnalysis({ isAnalyzing: true, error: null, score: null });

    try {
      const result = await analyzeResume(resumeText, jobDescription, systemPrompt);
      setAnalysis({
        isAnalyzing: false,
        error: null,
        score: result,
      });
    } catch (error) {
      setAnalysis({
        isAnalyzing: false,
        error: error instanceof Error ? error.message : 'Failed to analyze resume. Please try again.',
        score: null,
      });
    }
  };

  const handleSampleDataLoad = (sampleData: ResumeScore) => {
    setAnalysis({
      isAnalyzing: false,
      error: null,
      score: sampleData,
    });
  };

  const handleSampleTextLoad = (sampleJobDescription: string, sampleResume: string) => {
    setJobDescription(sampleJobDescription);
    setResumeText(sampleResume);
  };

  const isReadyToAnalyze = jobDescription && resumeText && !analysis.isAnalyzing;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <MapPin className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">KATSANA Resume AI-Qualifier</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Description Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <PDFParser
                  onTextExtracted={setJobDescription}
                  label="job description"
                />
              </div>

              {/* Resume Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Resume
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste the resume content here..."
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <PDFParser
                  onTextExtracted={setResumeText}
                  label="resume"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!isReadyToAnalyze}
                className={`
                  px-6 py-3 rounded-lg font-medium text-white w-full sm:w-auto
                  ${!isReadyToAnalyze
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'}
                  transition-colors flex items-center justify-center space-x-2
                `}
              >
                {analysis.isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Analyze Resume</span>
                )}
              </button>
            </div>
          </div>

          {analysis.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
              {analysis.error}
            </div>
          )}

          {analysis.score && <ScoreCard score={analysis.score} />}
        </div>
      </main>
      
      <DevModeButton 
        onSampleDataLoad={handleSampleDataLoad}
        onSampleTextLoad={handleSampleTextLoad}
      />
      
      <SystemPromptEditor
        systemPrompt={systemPrompt}
        onSystemPromptChange={setSystemPrompt}
      />
    </div>
  );
}

export default App;