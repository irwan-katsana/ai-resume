import React, { useState, useCallback } from 'react';
import { FileText, Upload, AlertCircle, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { extractTextFromFile } from '../utils/pdfUtils';

interface PDFParserProps {
  onTextExtracted: (text: string) => void;
  label: string;
}

export function PDFParser({ onTextExtracted, label }: PDFParserProps) {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const clearError = () => setError(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError(null);
    setIsProcessing(true);
    setFileName(file.name);

    try {
      const text = await extractTextFromFile(file);
      if (text) {
        onTextExtracted(text);
      } else {
        throw new Error('No text could be extracted from the file');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process file');
      setFileName(null);
    } finally {
      setIsProcessing(false);
    }
  }, [onTextExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/rtf': ['.rtf']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${error ? 'border-red-300' : ''}
          ${isProcessing ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center space-x-3">
          {isProcessing ? (
            <Upload className="w-6 h-6 text-blue-500 animate-spin" />
          ) : (
            <FileText className={`w-6 h-6 ${error ? 'text-red-500' : 'text-blue-500'}`} />
          )}
          <div className="text-sm text-gray-600">
            {isProcessing ? (
              'Processing file...'
            ) : fileName ? (
              <span className="flex items-center space-x-2">
                <span className="font-medium">{fileName}</span>
                <span className="text-gray-400">(Click or drop to replace)</span>
              </span>
            ) : (
              `Drop ${label} file here or click to select (PDF(not working yet), TXT, MD, RTF)`
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between bg-red-50 text-red-600 text-sm p-2 rounded">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={clearError}
            className="text-red-500 hover:text-red-700"
            aria-label="Clear error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}