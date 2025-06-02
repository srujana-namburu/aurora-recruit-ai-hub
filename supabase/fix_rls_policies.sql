-- This script fixes the Row Level Security (RLS) policies for the Aurora Recruit AI Hub
-- It can be executed directly in the Supabase SQL Editor

-- 1. Disable RLS on resume_analyses table (for development purposes)
ALTER TABLE resume_analyses DISABLE ROW LEVEL SECURITY;

-- 2. Disable RLS on resume_results table
ALTER TABLE resume_results DISABLE ROW LEVEL SECURITY;

-- 3. Disable RLS on interview_feedback table
ALTER TABLE interview_feedback DISABLE ROW LEVEL SECURITY;

-- 4. Disable RLS on job_postings table
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;

-- 4. If you prefer to keep RLS enabled but allow all operations, use these policies instead:
-- Uncomment the following lines and comment out the DISABLE statements above

/*
-- Enable RLS but with permissive policies for resume_analyses
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on resume_analyses" ON resume_analyses;
CREATE POLICY "Allow all operations on resume_analyses" 
  ON resume_analyses 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Enable RLS but with permissive policies for resume_results
ALTER TABLE resume_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on resume_results" ON resume_results;
CREATE POLICY "Allow all operations on resume_results" 
  ON resume_results 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Enable RLS but with permissive policies for interview_feedback
ALTER TABLE interview_feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on interview_feedback" ON interview_feedback;
CREATE POLICY "Allow all operations on interview_feedback" 
  ON interview_feedback 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
*/

-- Note: For production environments, you should implement proper RLS policies
-- based on authenticated users and their roles.
