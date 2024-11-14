import React from 'react';
import { UploadSection } from './UploadSection';
import type { JobDescription } from '../types';

interface JobDescriptionInputProps {
  jd: JobDescription;
  onJdChange: (jd: JobDescription) => void;
}

export function JobDescriptionInput({ jd, onJdChange }: JobDescriptionInputProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="jd-text" className="block text-sm font-medium text-gray-700 mb-2">
          Option 1: Paste Job Description
        </label>
        <textarea
          id="jd-text"
          rows={8}
          value={jd.text}
          onChange={(e) => onJdChange({ ...jd, text: e.target.value })}
          placeholder="Paste the job description here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Option 2: Upload Job Description File
        </label>
        <UploadSection
          type="jd"
          file={jd.file}
          onFileUpload={(file) => onJdChange({ ...jd, file })}
        />
      </div>
    </div>
  );
}