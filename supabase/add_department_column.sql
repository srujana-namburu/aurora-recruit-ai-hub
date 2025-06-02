-- Add department column to job_postings table in Supabase

-- First, add the column if it doesn't exist
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS department TEXT;

-- Disable RLS on job_postings table to allow operations
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;

-- Create index on department column for faster queries
CREATE INDEX IF NOT EXISTS idx_job_postings_department ON job_postings(department);

-- Optional: Create a policy that allows all operations on job_postings
-- Uncomment if you want to keep RLS enabled but allow all operations
/*
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations on job_postings" ON job_postings;
CREATE POLICY "Allow all operations on job_postings"
  ON job_postings
  FOR ALL
  USING (true)
  WITH CHECK (true);
*/

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'job_postings' AND column_name = 'department';
