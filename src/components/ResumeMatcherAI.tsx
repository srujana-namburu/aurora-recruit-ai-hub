
import React, { useState, useRef } from 'react';
import { FileText, Loader2, Brain, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Result {
  name: string;
  score: number;
}

const ResumeMatcherAI: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      // Only accept PDF and TXT files
      const validFiles = fileList.filter(file => 
        file.type === 'application/pdf' || 
        file.type === 'text/plain' || 
        file.name.toLowerCase().endsWith('.pdf') || 
        file.name.toLowerCase().endsWith('.txt')
      );
      
      console.log(`Selected ${validFiles.length} files:`, validFiles.map(f => f.name));
      
      if (validFiles.length !== fileList.length) {
        toast({
          title: "Invalid file type",
          description: "Only PDF and TXT files are accepted",
          variant: "destructive"
        });
      }
      
      setResumes(validFiles);
    }
  };
  
  // Remove a resume from the list
  const removeResume = (index: number) => {
    setResumes(prev => prev.filter((_, i) => i !== index));
  };
  
  // Convert cosine similarity to percentage
  const similarityToPercentage = (similarity: number): number => {
    // Convert similarity score (usually between -1 and 1) to percentage
    const percentage = Math.round((similarity + 1) / 2 * 100);
    return Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100
  };
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-rose-100 text-rose-800';
  };
  
  // Analyze resumes using the backend API
  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Missing Job Description",
        description: "Please enter a job description.",
        variant: "destructive"
      });
      return;
    }

    if (resumes.length === 0) {
      toast({
        title: "No Resumes Selected",
        description: "Please upload at least one resume.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      
      // Append all resume files
      console.log(`Sending ${resumes.length} resumes to backend:`, resumes.map(f => f.name));
      resumes.forEach(file => {
        formData.append('resumes', file);
      });
      
      // Make API request to the backend server
      console.log('Sending request to backend server...');
      const response = await fetch('http://localhost:5002/rank-resumes', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Parse response
      const data = await response.json();
      
      console.log('Raw API response:', data);
      
      if (data && data.results && Array.isArray(data.results)) {
        // Force type conversion to ensure proper handling
        const transformedResults: Result[] = [];
        
        // Process each result item individually
        data.results.forEach((result: any) => {
          console.log('Processing individual result:', result);
          if (result && result.filename && typeof result.cosine_similarity === 'number') {
            transformedResults.push({
              name: result.filename,
              score: Math.round(result.cosine_similarity * 100) // Convert to percentage
            });
          }
        });
        
        // Sort results by score in descending order
        const sortedResults = [...transformedResults].sort((a, b) => b.score - a.score);
        
        console.log('Final processed results:', sortedResults);
        console.log('Number of results:', sortedResults.length);
        
        // Force a complete state refresh to ensure React updates the UI
        setResults([]); // Clear first to ensure state update
        // Use a more reliable approach to force state update
        requestAnimationFrame(() => {
          console.log('Setting results with length:', sortedResults.length);
          setResults([...sortedResults]); // Create a completely new array
        });
        
        if (sortedResults.length > 0) {
          toast({
            title: "Analysis Complete",
            description: `Successfully analyzed ${sortedResults.length} resume(s)`,
          });
        } else {
          toast({
            title: "No Valid Results",
            description: "No valid results could be generated from the analysis.",
            variant: "destructive"
          });
        }
      } else {
        console.error('Invalid or empty results data:', data);
        toast({
          title: "No Results",
          description: "No valid results were returned from the analysis.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error analyzing resumes:", error);
      
      setError("Failed to analyze resumes. Please try again.");
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-rose-700 mb-2">Resume Matcher AI</h2>
          <p className="text-slate-600 font-medium">AI-powered resume analysis and matching</p>
        </div>
        <div className="flex items-center space-x-3 bg-rose-50 px-6 py-3 rounded-xl">
          <Brain className="h-5 w-5 text-rose-700" />
          <span className="font-semibold text-rose-700">AI Powered</span>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
      </div>
      
      <Card className="border-rose-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-white">
          <CardTitle className="text-rose-700">Resume Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Job Description Input */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Job Description</h3>
            <Textarea 
              placeholder="Enter job description here..."
              className="min-h-32 border-rose-200 focus:border-rose-500 focus:ring-rose-200 text-slate-800"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{ color: '#1e293b' }}
            />
          </div>
          
          {/* Resume Upload */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Upload Resumes</h3>
            <div className="border-2 border-dashed border-rose-200 rounded-lg p-6 text-center bg-rose-50/30 hover:bg-rose-50 transition-colors">
              <div className="flex flex-col items-center justify-center space-y-2">
                <FileText className="h-8 w-8 text-rose-400" />
                <p className="text-slate-600">Click to upload PDF or TXT files</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.txt"
                  multiple
                />
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-rose-300 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                >
                  Select Files
                </Button>
              </div>
            </div>
          </div>
          
          {/* Uploaded Files List */}
          {resumes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-700">Uploaded Resumes</h3>
              <div className="space-y-2">
                {resumes.map((file, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-100"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-rose-500" />
                      <span className="font-medium truncate max-w-xs text-slate-700">{file.name}</span>
                      <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeResume(index)}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-100"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Analyze Button */}
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleAnalyze}
              disabled={isLoading || resumes.length === 0 || !jobDescription.trim()}
              className="px-6 bg-rose-600 hover:bg-rose-700 text-white"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing...</span>
                </span>
              ) : (
                <span>Analyze Resumes</span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>



      {/* Results Section */}
      {/* Results Section */}
      <Card className="mt-6 border-rose-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-white">
          <CardTitle className="text-rose-700">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center p-6 bg-rose-50 rounded-lg border border-rose-100">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-rose-500" />
              <p className="mt-2 text-rose-700 font-medium">Analyzing resumes...</p>
            </div>
          ) : results && results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className="border border-rose-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-rose-500" />
                      <h4 className="font-bold text-slate-700">{result.name}</h4>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full font-bold ${getScoreColor(result.score)}`}>
                      <span className="text-lg">{result.score}%</span> Match
                    </div>
                  </div>
                  <Progress value={result.score} className="h-3 mt-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6">
              <p className="text-slate-600">No results to display. Upload resumes and analyze them to see results here.</p>
              <div className="mt-4 p-4 bg-rose-50 rounded-lg border border-rose-200">
                <h3 className="font-medium text-rose-700 mb-2">Troubleshooting</h3>
                <ul className="list-disc pl-5 text-sm text-rose-800 space-y-1">
                  <li>Make sure your resume is in PDF or TXT format</li>
                  <li>Ensure the job description is detailed enough</li>
                  <li>Try refreshing the page and uploading again</li>
                </ul>
              </div>
              <pre className="mt-4 text-left text-xs text-gray-500 bg-gray-50 p-2 rounded overflow-auto">
                {JSON.stringify({results}, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeMatcherAI;
