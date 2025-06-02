-- Fix for the created_by foreign key constraint issue

-- 1. First, check if the user already exists in the users table
DO $$ 
DECLARE
  user_exists boolean;
BEGIN
  SELECT EXISTS(SELECT 1 FROM users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d') INTO user_exists;
  
  IF NOT user_exists THEN
    -- 2. Insert the authenticated user into the users table
    INSERT INTO users (id, email, created_at, updated_at)
    VALUES (
      '74757499-d5a8-48bc-88e1-e5b36e674d6d', -- The authenticated user's UUID
      'srujananamburu03@gmail.com', -- The authenticated user's email
      NOW(),
      NOW()
    );
    RAISE NOTICE 'User inserted successfully';
  ELSE
    RAISE NOTICE 'User already exists';
  END IF;
END $$;

-- 3. Verify the user was inserted
SELECT * FROM users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d';
