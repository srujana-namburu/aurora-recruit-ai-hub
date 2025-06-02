-- Complete fix for job posting issues

-- 1. Add department column to job_postings table if it doesn't exist
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS department TEXT;

-- 2. Create a record in the users table if it doesn't exist
DO $$ 
BEGIN
  -- Check if the user exists in the users table
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d') THEN
    -- Insert the user
    INSERT INTO users (id, email, created_at, updated_at)
    VALUES (
      '74757499-d5a8-48bc-88e1-e5b36e674d6d',
      'srujananamburu03@gmail.com',
      NOW(),
      NOW()
    );
    RAISE NOTICE 'User inserted successfully';
  ELSE
    RAISE NOTICE 'User already exists';
  END IF;

  -- 3. Create a record in the companies table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM companies WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d') THEN
    -- Insert the company
    INSERT INTO companies (id, name, created_at, updated_at)
    VALUES (
      '74757499-d5a8-48bc-88e1-e5b36e674d6d',
      'Default Company',
      NOW(),
      NOW()
    );
    RAISE NOTICE 'Company inserted successfully';
  ELSE
    RAISE NOTICE 'Company already exists';
  END IF;
END $$;

-- 4. Disable RLS on job_postings table to allow all operations
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;

-- 5. Verify the changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'job_postings' AND column_name = 'department';

-- 6. Verify the user and company records
SELECT * FROM users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d';
SELECT * FROM companies WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d';
