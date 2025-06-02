#!/bin/bash

# Script to apply Supabase migrations using the Supabase CLI

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
  echo "Supabase CLI is not installed. Please install it first."
  echo "You can install it with: brew install supabase/tap/supabase"
  exit 1
fi

echo "Applying Supabase migrations..."

# Navigate to the project root directory
cd "$(dirname "$0")"

# Apply migrations using Supabase CLI
supabase migration up

echo "Migrations applied successfully!"

# Since we're using a local dev environment without Supabase CLI, 
# we'll provide alternative instructions
echo ""
echo "Alternative instructions if Supabase CLI is not set up:"
echo "1. Go to your Supabase project dashboard"
echo "2. Navigate to the SQL Editor"
echo "3. Copy and paste the contents of each migration file and run them manually"
echo ""
echo "Migration files:"
echo "- supabase/migrations/20250602_resume_analyses.sql"
echo "- supabase/migrations/20250602_interview_feedback.sql"
