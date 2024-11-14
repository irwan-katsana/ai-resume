import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, User, Mail, Phone, Briefcase, Clock, Building, DollarSign } from 'lucide-react';
import type { ResumeScore, ScoreCategory } from '../types';

interface ScoreCardProps {
  score: ResumeScore;
}

function ScoreCategoryRow({ category }: { category: ScoreCategory }) {
  const percentage = (category.score / category.maxScore) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">{category.name}</span>
          {percentage >= 80 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
          {percentage < 60 && <AlertCircle className="w-4 h-4 text-yellow-500" />}
        </div>
        <span className="text-gray-600">
          {category.score}/{category.maxScore} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${getScoreColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function getScoreColor(percentage: number): string {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

function CandidateInfoCard({ info: candidate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Full Name</div>
            <div className="font-medium">{candidate.fullName}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{candidate.email}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Contact</div>
            <div className="font-medium">{candidate.contactNumber}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Current Title</div>
            <div className="font-medium">{candidate.currentTitle}</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Total Experience</div>
            <div className="font-medium">{candidate.totalExperience}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Building className="w-5 h-5 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Longest Employment</div>
            <div className="font-medium">{candidate.longestEmployment}</div>
          </div>
        </div>
        
        {candidate.salaryExpectations && (
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Salary Expectations</div>
              <div className="font-medium">{candidate.salaryExpectations}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ScoreCard({ score }: ScoreCardProps) {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  const getOverallScoreColor = () => {
    if (score.overallScore >= 80) return 'border-green-500 bg-green-50 text-green-500';
    if (score.overallScore >= 60) return 'border-blue-500 bg-blue-50 text-blue-500';
    if (score.overallScore >= 40) return 'border-yellow-500 bg-yellow-50 text-yellow-500';
    return 'border-red-500 bg-red-50 text-red-500';
  };

  const analysisOrder = [
    { key: 'educationalBackground', title: 'Educational Background' },
    { key: 'workExperience', title: 'Work Experience' },
    { key: 'technicalSkills', title: 'Technical Skills' },
    { key: 'alignmentWithJobDescription', title: 'Alignment with Job Description' }
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Candidate Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Candidate Information</h3>
        <CandidateInfoCard info={score.candidateInfo} />
      </div>

      {/* Overall Score */}
      <div className="flex justify-center">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-4 transition-colors ${getOverallScoreColor()}`}>
            <div>
              <div className="text-4xl font-bold">
                {score.overallScore}
              </div>
              <div className="text-sm text-gray-600">out of 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Categories */}
      <div className="space-y-4">
        {score.categories.map((category) => (
          <ScoreCategoryRow key={category.name} category={category} />
        ))}
      </div>

      {/* Summary Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Executive Summary</h3>
        <p className="text-gray-700 leading-relaxed">{score.summary}</p>
      </div>

      {/* Full Analysis Toggle */}
      <div className="border-t pt-6">
        <button
          onClick={() => setShowFullAnalysis(!showFullAnalysis)}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium"
        >
          <span>{showFullAnalysis ? 'Hide Detailed Analysis' : 'Show Detailed Analysis'}</span>
          {showFullAnalysis ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {showFullAnalysis && (
          <div className="mt-6 space-y-6">
            {analysisOrder.map(({ key, title }) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-700 leading-relaxed">{score.fullAnalysis[key]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}