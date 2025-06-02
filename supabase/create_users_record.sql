-- Create a record in the users table for the authenticated user

-- First, check if the user already exists
DO $$ 
DECLARE
  user_exists boolean;
BEGIN
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d') INTO user_exists;
  
  IF NOT user_exists THEN
    -- Insert the user into the auth.users table
    INSERT INTO auth.users (id, email, created_at, updated_at)
    VALUES (
      '74757499-d5a8-48bc-88e1-e5b36e674d6d',
      'srujananamburu03@gmail.com',
      NOW(),
      NOW()
    );
  END IF;

  -- Now check if the user exists in the public.users table
  SELECT EXISTS(SELECT 1 FROM public.users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d') INTO user_exists;
  
  IF NOT user_exists THEN
    -- Insert the user into the public.users table
    INSERT INTO public.users (id, email, created_at, updated_at)
    VALUES (
      '74757499-d5a8-48bc-88e1-e5b36e674d6d',
      'srujananamburu03@gmail.com',
      NOW(),
      NOW()
    );
  END IF;
END $$;

-- Verify the user exists in the public.users table
SELECT * FROM public.users WHERE id = '74757499-d5a8-48bc-88e1-e5b36e674d6d';
