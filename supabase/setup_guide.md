# Supabase Setup Guide for Aurora Recruit AI Hub

This guide will help you set up the necessary Row Level Security (RLS) policies in your Supabase project to ensure proper functioning of the Aurora Recruit AI Hub application.

## The Issue

You're seeing an error related to Row Level Security (RLS) policies in Supabase. This happens because:

1. Supabase enables RLS by default on all tables for security reasons
2. When RLS is enabled, you need explicit policies to allow operations on tables
3. Without policies, even the application owner cannot insert or read data

## Solution

### Option 1: Apply the Migration Files

We've created migration files that set up the tables with proper RLS policies. To apply them:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of each migration file:
   - `supabase/migrations/20250602_resume_analyses.sql`
   - `supabase/migrations/20250602_interview_feedback.sql`
4. Execute each SQL script

### Option 2: Manually Add RLS Policies

If you already have the tables created but need to add RLS policies:

1. Go to your Supabase dashboard
2. Navigate to the Authentication > Policies section
3. For each table (`resume_analyses`, `resume_results`, and `interview_feedback`):
   - Click on the table name
   - Click "New Policy"
   - Select "Allow all operations for all users" (for development purposes)
   - Save the policy

### Option 3: Disable RLS (Development Only)

For development purposes only, you can disable RLS:

```sql
-- WARNING: Only use this in development, never in production
ALTER TABLE resume_analyses DISABLE ROW LEVEL SECURITY;
ALTER TABLE resume_results DISABLE ROW LEVEL SECURITY;
ALTER TABLE interview_feedback DISABLE ROW LEVEL SECURITY;
```

## Production Considerations

For a production environment, you should implement proper RLS policies based on authenticated users. For example:

```sql
-- Example of a more secure policy for authenticated users
CREATE POLICY "Users can view their own data"
ON resume_analyses
FOR SELECT
USING (auth.uid() = user_id);
```

## Additional Resources

- [Supabase Row Level Security Guide](https://supabase.io/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
