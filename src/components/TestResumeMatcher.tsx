import React, { useState } from 'react';

const TestResumeMatcher = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files || files.length === 0) {
      setError('Please select at least one resume file');
      return;
    }
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      
      for (let i = 0; i < files.length; i++) {
        formData.append('resumes', files[i]);
      }
      
      // Send request
      console.log('Sending request to backend...');
      const response = await fetch('http://localhost:5002/rank-resumes', {
        method: 'POST',
        body: formData
      });
      
      // Handle response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      setResults(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Resume Matcher Test</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Job Description:</label>
          <textarea 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        
        <div>
          <label className="block mb-2">Resumes (PDF or TXT):</label>
          <input 
            type="file" 
            onChange={handleFileChange}
            multiple
            accept=".pdf,.txt"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resumes'}
        </button>
      </form>
      
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {results && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Results:</h2>
          <pre className="p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
          
          {results.results && results.results.length > 0 ? (
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Ranked Resumes:</h3>
              {results.results.map((result: any, index: number) => (
                <div key={index} className="p-4 border rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">{result.filename}</span>
                    <span className="font-bold">{Math.round(result.cosine_similarity * 100)}% Match</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.round(result.cosine_similarity * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-700">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TestResumeMatcher;
