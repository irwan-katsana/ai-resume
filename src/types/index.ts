export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
}

export interface CandidateInfo {
  fullName: string;
  email: string;
  contactNumber: string;
  currentTitle: string;
  totalExperience: string;
  longestEmployment: string;
  salaryExpectations: string | null;
}

export interface FullAnalysis {
  educationalBackground: string;
  workExperience: string;
  technicalSkills: string;
  alignmentWithJobDescription: string;
}

export interface ResumeScore {
  candidateInfo: CandidateInfo;
  overallScore: number;
  categories: ScoreCategory[];
  fullAnalysis: FullAnalysis;
  summary: string;
}