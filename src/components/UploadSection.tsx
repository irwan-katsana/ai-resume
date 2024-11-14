import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfUtils';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  type: 'resume' | 'jd';
  file: File | null;
}

export function UploadSection({ onFileUpload, type, file }: UploadSectionProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (!uploadedFile) return;

    if (type === 'resume' && uploadedFile.type === 'application/pdf') {
      try {
        await extractTextFromPDF(uploadedFile);
        onFileUpload(uploadedFile);
      } catch (error) {
        console.error('Error processing PDF:', error);
        // Handle error appropriately
      }
    } else {
      onFileUpload(uploadedFile);
    }
  }, [onFileUpload, type]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: type === 'resume' 
      ? { 'application/pdf': ['.pdf'] }
      : { 'text/plain': ['.txt'] },
    multiple: false,
  });

  return (
    <div className="w-full h-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors h-full flex items-center justify-center
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {file ? (
            <>
              <FileText className="w-12 h-12 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">Click or drop to replace</p>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">
                  Drop your {type === 'resume' ? 'resume PDF' : 'job description'} here
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to select a file
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}