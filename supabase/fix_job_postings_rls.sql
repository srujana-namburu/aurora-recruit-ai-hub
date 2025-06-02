-- Fix RLS policies for job_postings table

-- Option 1: Disable RLS on job_postings table (for development purposes)
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;

-- Option 2: If you prefer to keep RLS enabled but allow all operations
-- Uncomment the following lines and comment out the DISABLE statement above

/*
-- Enable RLS but with permissive policies for job_postings
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on job_postings" ON job_postings;
CREATE POLICY "Allow all operations on job_postings" 
  ON job_postings 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
*/

-- Option 3: Create more specific policies (for production use)
-- Uncomment and modify as needed

/*
-- Enable RLS with specific policies
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- Allow users to view all job postings
DROP POLICY IF EXISTS "Allow users to view all job postings" ON job_postings;
CREATE POLICY "Allow users to view all job postings" 
  ON job_postings 
  FOR SELECT 
  USING (true);

-- Allow users to insert their own job postings
DROP POLICY IF EXISTS "Allow users to insert their own job postings" ON job_postings;
CREATE POLICY "Allow users to insert their own job postings" 
  ON job_postings 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own job postings
DROP POLICY IF EXISTS "Allow users to update their own job postings" ON job_postings;
CREATE POLICY "Allow users to update their own job postings" 
  ON job_postings 
  FOR UPDATE 
  USING (auth.uid() = created_by);

-- Allow users to delete their own job postings
DROP POLICY IF EXISTS "Allow users to delete their own job postings" ON job_postings;
CREATE POLICY "Allow users to delete their own job postings" 
  ON job_postings 
  FOR DELETE 
  USING (auth.uid() = created_by);
*/
