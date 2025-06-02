-- Create interview_feedback table if it doesn't exist
CREATE TABLE IF NOT EXISTS interview_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comments TEXT,
  ai_summary TEXT,
  interview_id UUID NOT NULL DEFAULT uuid_generate_v4(),
  interviewer_id UUID NOT NULL DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE interview_feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access (for demo purposes)
CREATE POLICY "Allow public access to interview_feedback"
  ON interview_feedback
  FOR ALL
  USING (true);


-- Create function to set up interview feedback table
CREATE OR REPLACE FUNCTION create_interview_feedback_table()
RETURNS VOID AS $$
BEGIN
  -- Function body is empty as the table is created above
  -- This is just a placeholder for the RPC call
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
