-- This script disables Row Level Security for the job_postings table
-- Run this in the Supabase SQL Editor

-- Disable RLS on job_postings table
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;

-- Alternative: Create a permissive policy instead of disabling RLS
-- Uncomment these lines if you prefer to keep RLS enabled but allow all operations
/*
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on job_postings" ON job_postings;
CREATE POLICY "Allow all operations on job_postings"
  ON job_postings
  FOR ALL
  USING (true)
  WITH CHECK (true);
*/
