-- Create a SQL function to allow admin operations on job_postings

-- Function to insert a job posting with admin privileges
CREATE OR REPLACE FUNCTION insert_job_posting_admin(
  p_title TEXT,
  p_description TEXT,
  p_location TEXT,
  p_employment_type TEXT,
  p_salary_range_min NUMERIC,
  p_salary_range_max NUMERIC,
  p_status TEXT,
  p_expires_at TIMESTAMP WITH TIME ZONE,
  p_created_by UUID,
  p_company_id UUID,
  p_department TEXT
) RETURNS SETOF job_postings
SECURITY DEFINER -- This runs with the privileges of the function creator (typically admin)
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO job_postings (
    title,
    description,
    location,
    employment_type,
    salary_range_min,
    salary_range_max,
    status,
    expires_at,
    created_by,
    company_id,
    department
  ) VALUES (
    p_title,
    p_description,
    p_location,
    p_employment_type,
    p_salary_range_min,
    p_salary_range_max,
    p_status,
    p_expires_at,
    p_created_by,
    p_company_id,
    p_department
  )
  RETURNING *;
END;
$$ LANGUAGE plpgsql;
