-- Final fix for job posting issues

-- 1. First, check if the tables exist
DO $$ 
DECLARE
  users_table_exists boolean;
  companies_table_exists boolean;
BEGIN
  SELECT EXISTS(
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'users'
  ) INTO users_table_exists;

  SELECT EXISTS(
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'companies'
  ) INTO companies_table_exists;

  -- 2. Create the users table if it doesn't exist
  IF NOT users_table_exists THEN
    CREATE TABLE users (
      id UUID PRIMARY KEY,
      email TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    RAISE NOTICE 'Users table created';
  END IF;

  -- 3. Create the companies table if it doesn't exist
  IF NOT companies_table_exists THEN
    CREATE TABLE companies (
      id UUID PRIMARY KEY,
      name TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    RAISE NOTICE 'Companies table created';
  END IF;

  -- 4. Insert the user record if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d') THEN
    INSERT INTO users (id, email, created_at, updated_at)
    VALUES (
      '74757499-d5a8-48bc-88e1-e5b36e674d6d',
      'srujananamburu03@gmail.com',
      NOW(),
      NOW()
    );
    RAISE NOTICE 'User record inserted';
  ELSE
    RAISE NOTICE 'User record already exists';
  END IF;

  -- 5. Insert the company record if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM companies WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d') THEN
    INSERT INTO companies (id, name, created_at, updated_at)
    VALUES (
      '74757499-d5a8-48bc-88e1-e5b36e674d6d',
      'Default Company',
      NOW(),
      NOW()
    );
    RAISE NOTICE 'Company record inserted';
  ELSE
    RAISE NOTICE 'Company record already exists';
  END IF;
END $$;

-- 6. Add department column to job_postings table if it doesn't exist
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS department TEXT;

-- 7. Disable RLS on job_postings table to allow all operations
ALTER TABLE job_postings DISABLE ROW LEVEL SECURITY;

-- 8. Verify the changes
SELECT * FROM users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d';
SELECT * FROM companies WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d';
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'job_postings' AND column_name = 'department';
