import React, { useState } from 'react';

const BasicResumeMatcher = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      console.log(`Selected ${selectedFiles.length} files:`, selectedFiles.map(f => f.name));
      setFiles(selectedFiles);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    if (files.length === 0) {
      setError('Please select at least one resume file');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      
      files.forEach(file => {
        formData.append('resumes', file);
      });
      
      console.log(`Sending ${files.length} files to backend`);
      
      const response = await fetch('http://localhost:5002/rank-resumes', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      console.log('Raw response:', data);
      
      if (data && data.results && Array.isArray(data.results)) {
        // Transform and sort results
        const processedResults = data.results
          .map((result: any) => ({
            filename: result.filename,
            percentage: Math.round(result.cosine_similarity * 100)
          }))
          .sort((a: any, b: any) => b.percentage - a.percentage);
        
        console.log('Processed results:', processedResults);
        setResults(processedResults);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to analyze resumes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-rose-700">Resume Matcher</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-2 font-medium text-slate-800">Job Description:</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2 border border-rose-300 rounded text-slate-800"
            rows={4}
            placeholder="Enter job description here..."
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-slate-800">Upload Resumes:</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.txt"
            className="w-full p-2 border border-rose-300 rounded text-slate-800"
          />
          <div className="mt-2 text-sm text-rose-600 font-medium">
            Selected: {files.length} file(s)
          </div>
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resumes'}
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}
      
      {results.length > 0 && (
        <div className="border border-rose-200 rounded-lg p-4 bg-rose-50">
          <h2 className="text-xl font-bold mb-4 text-rose-700">Results (Sorted by Match Percentage)</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border border-rose-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-slate-800">{result.filename}</div>
                  <div className="font-bold text-lg text-rose-700">{result.percentage}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-rose-600 h-4 rounded-full" 
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicResumeMatcher;
