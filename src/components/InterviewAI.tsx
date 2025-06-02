import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InterviewAI: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeFeedback = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Missing Feedback",
        description: "Please provide interview feedback to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setAnalysis('');
    
    try {
      const response = await fetch('http://localhost:5003/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: feedback }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Analysis result:', data);
      
      if (data.result) {
        setAnalysis(data.result);
        
        toast({
          title: "Analysis Complete",
          description: "Your interview feedback has been analyzed.",
        });
      } else {
        throw new Error('No summary in response');
      }
    } catch (error) {
      console.error("Error analyzing feedback:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your feedback. Please try again.",
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
          <h2 className="text-3xl font-bold text-rose-700 mb-2">Interview AI</h2>
          <p className="text-slate-600 font-medium">AI-powered interview feedback analysis</p>
        </div>
        <div className="flex items-center space-x-3 bg-rose-50 px-6 py-3 rounded-xl">
          <Brain className="h-5 w-5 text-rose-700" />
          <span className="font-semibold text-rose-700">AI Powered</span>
        </div>
      </div>
      
      <Card className="border-rose-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-white">
          <CardTitle className="text-rose-700">Interview Feedback Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Interviewer Feedback</h3>
            <Textarea 
              placeholder="Enter detailed interviewer feedback here..."
              className="min-h-40 border-rose-200 focus:border-rose-500 focus:ring-rose-200 text-slate-800"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{ color: '#1e293b' }}
            />
          </div>
          
          {/* Analyze Button */}
          <div className="flex justify-center mt-6">
            <Button 
              onClick={analyzeFeedback}
              disabled={isLoading || !feedback.trim()}
              className="px-6 bg-rose-600 hover:bg-rose-700 text-white"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Analyze Feedback</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
          
          {/* Loading state message */}
          {isLoading && (
            <div className="mt-4 text-center text-slate-600">
              <p>Processing with T5 model. This may take a moment for the first request...</p>
            </div>
          )}
        </CardContent>
      </Card>



      {/* Results Section */}
      {analysis && (
        <Card className="border-rose-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-white">
            <CardTitle className="text-rose-700">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg border border-rose-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-slate-700">AI Summary</h3>
              <p className="text-slate-700 whitespace-pre-line">{analysis}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewAI;
