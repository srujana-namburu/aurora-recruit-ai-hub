-- Create a dummy company record to fix foreign key constraint issues

-- First, check if the dummy company already exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM companies WHERE id = '00000000-0000-0000-0000-000000000000') THEN
    -- Insert a dummy company with the UUID we're using in the code
    INSERT INTO companies (id, name, created_at, updated_at)
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      'Dummy Company',
      NOW(),
      NOW()
    );
  END IF;
END $$;

-- Verify the company was created
SELECT * FROM companies WHERE id = '00000000-0000-0000-0000-000000000000';
