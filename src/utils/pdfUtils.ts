import { PDFDocument } from 'pdf-lib';

export async function extractTextFromPDF(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file provided');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('File appears to be empty');
    }

    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    if (pages.length === 0) {
      throw new Error('No pages found in PDF');
    }

    let fullText = '';
    for (const page of pages) {
      const textContent = await page.doc.saveAsBase64({ format: 'txt' });
      const decodedText = atob(textContent);
      fullText += decodedText + '\n';
    }

    const trimmedText = fullText.trim();
    if (!trimmedText) {
      throw new Error('No text content found in PDF');
    }

    return trimmedText;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`PDF parsing failed: ${error.message}`);
    }
    throw new Error('Failed to parse PDF file');
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file provided');
  }

  try {
    // Handle PDF files
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file);
    }

    // Handle text-based files
    if (
      file.type.startsWith('text/') ||
      file.type === 'application/rtf' ||
      /\.(txt|md|rtf)$/i.test(file.name)
    ) {
      const text = await file.text();
      if (!text.trim()) {
        throw new Error('File appears to be empty');
      }
      return text.trim();
    }

    throw new Error('Unsupported file type. Please use PDF, TXT, MD, or RTF files');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to read file');
  }
}