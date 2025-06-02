import axios from 'axios';

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/Shushant/ApplicantTrackingSystemBERT';

interface ResumeMatchResult {
  name: string;
  score: number;
  content?: string;
}

export async function analyzeResumes(
  jobDescription: string,
  resumeContents: Array<{ name: string; content: string }>,
  apiKey: string
): Promise<ResumeMatchResult[]> {
  try {
    const results: ResumeMatchResult[] = [];
    
    // Process each resume individually
    for (const resume of resumeContents) {
      const response = await axios.post(
        HUGGINGFACE_API_URL,
        {
          inputs: {
            source_sentence: jobDescription,
            sentences: [resume.content]
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // The model returns cosine similarity scores
      const similarity = response.data[0];
      
      results.push({
        name: resume.name,
        // Convert similarity to percentage (0-100)
        score: Math.round((similarity + 1) / 2 * 100),
        content: resume.content
      });
    }
    
    // Sort results by score in descending order
    return results.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error calling HuggingFace API:', error);
    throw error;
  }
}

// Function to extract text from PDF files
export async function extractTextFromPDF(file: File): Promise<string> {
  // In a real implementation, you would use a PDF parsing library
  // For this demo, we'll return a placeholder
  return `Simulated content extracted from PDF: ${file.name}`;
}

// Function to extract text from Word documents
export async function extractTextFromWord(file: File): Promise<string> {
  // In a real implementation, you would use a Word document parsing library
  // For this demo, we'll return a placeholder
  return `Simulated content extracted from Word document: ${file.name}`;
}
