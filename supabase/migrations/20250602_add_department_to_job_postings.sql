-- Migration to add department column to job_postings table

-- Add department column to job_postings table
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS department TEXT;

-- Update existing records with a default department if needed
-- Uncomment if you want to set a default for existing records
-- UPDATE job_postings SET department = 'Engineering' WHERE department IS NULL;

-- Comment: This migration adds the department column to the job_postings table
-- to support categorizing job postings by department.
