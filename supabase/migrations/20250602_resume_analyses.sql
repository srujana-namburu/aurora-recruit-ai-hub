-- Create resume_analyses table if it doesn't exist
CREATE TABLE IF NOT EXISTS resume_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access (for demo purposes)
CREATE POLICY "Allow public access to resume_analyses"
  ON resume_analyses
  FOR ALL
  USING (true);


-- Create resume_results table to store individual resume results
CREATE TABLE IF NOT EXISTS resume_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES resume_analyses(id) ON DELETE CASCADE,
  resume_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE resume_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access (for demo purposes)
CREATE POLICY "Allow public access to resume_results"
  ON resume_results
  FOR ALL
  USING (true);


-- Create function to set up resume analysis tables
CREATE OR REPLACE FUNCTION create_resume_analyses_tables()
RETURNS VOID AS $$
BEGIN
  -- Function body is empty as the tables are created above
  -- This is just a placeholder for the RPC call
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create storage bucket for resumes if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE name = 'resumes'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('resumes', 'resumes', false);
  END IF;
END $$;
