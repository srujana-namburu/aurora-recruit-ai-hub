-- Run this in the Supabase SQL Editor to fix the job_postings RLS issue

-- Option 1: Disable RLS on job_postings table (simplest solution for development)
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS but allow all operations
-- Uncomment these lines and comment out the DISABLE statement above
/*
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations
DROP POLICY IF EXISTS "Allow all operations on job_postings" ON job_postings;
CREATE POLICY "Allow all operations on job_postings"
  ON job_postings
  FOR ALL
  USING (true)
  WITH CHECK (true);
*/
