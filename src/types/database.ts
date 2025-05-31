
export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          domain: string | null
          settings: any | null
          subscription_tier: 'free' | 'premium' | 'enterprise'
          created_at: string
          updated_at: string
          logo_url: string | null
          industry: string | null
          address: string | null
          company_size: string | null
          billing_email: string | null
        }
        Insert: {
          id?: string
          name: string
          domain?: string | null
          settings?: any | null
          subscription_tier?: 'free' | 'premium' | 'enterprise'
          created_at?: string
          updated_at?: string
          logo_url?: string | null
          industry?: string | null
          address?: string | null
          company_size?: string | null
          billing_email?: string | null
        }
        Update: {
          id?: string
          name?: string
          domain?: string | null
          settings?: any | null
          subscription_tier?: 'free' | 'premium' | 'enterprise'
          created_at?: string
          updated_at?: string
          logo_url?: string | null
          industry?: string | null
          address?: string | null
          company_size?: string | null
          billing_email?: string | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          role: 'admin' | 'recruiter' | 'interviewer' | 'hiring_manager'
          company_id: string
          created_at: string
          updated_at: string
          last_login: string | null
          is_active: boolean | null
          profile_image_url: string | null
          phone: string | null
          department: string | null
          reset_token: string | null
          reset_token_expires: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          role: 'admin' | 'recruiter' | 'interviewer' | 'hiring_manager'
          company_id: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean | null
          profile_image_url?: string | null
          phone?: string | null
          department?: string | null
          reset_token?: string | null
          reset_token_expires?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          first_name?: string
          last_name?: string
          role?: 'admin' | 'recruiter' | 'interviewer' | 'hiring_manager'
          company_id?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean | null
          profile_image_url?: string | null
          phone?: string | null
          department?: string | null
          reset_token?: string | null
          reset_token_expires?: string | null
        }
      }
      job_postings: {
        Row: {
          id: string
          title: string
          description: string
          requirements: any | null
          qualifications: any | null
          responsibilities: any | null
          salary_range_min: number | null
          salary_range_max: number | null
          location: string | null
          employment_type: 'full_time' | 'part_time' | 'contract' | 'internship' | null
          company_id: string
          created_by: string
          status: 'draft' | 'active' | 'paused' | 'closed'
          created_at: string
          updated_at: string
          expires_at: string | null
          application_count: number | null
          views_count: number | null
          job_description_file_url: string | null
          remote_allowed: boolean | null
          experience_level: 'entry' | 'mid' | 'senior' | 'executive' | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          requirements?: any | null
          qualifications?: any | null
          responsibilities?: any | null
          salary_range_min?: number | null
          salary_range_max?: number | null
          location?: string | null
          employment_type?: 'full_time' | 'part_time' | 'contract' | 'internship' | null
          company_id: string
          created_by: string
          status?: 'draft' | 'active' | 'paused' | 'closed'
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          application_count?: number | null
          views_count?: number | null
          job_description_file_url?: string | null
          remote_allowed?: boolean | null
          experience_level?: 'entry' | 'mid' | 'senior' | 'executive' | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          requirements?: any | null
          qualifications?: any | null
          responsibilities?: any | null
          salary_range_min?: number | null
          salary_range_max?: number | null
          location?: string | null
          employment_type?: 'full_time' | 'part_time' | 'contract' | 'internship' | null
          company_id?: string
          created_by?: string
          status?: 'draft' | 'active' | 'paused' | 'closed'
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          application_count?: number | null
          views_count?: number | null
          job_description_file_url?: string | null
          remote_allowed?: boolean | null
          experience_level?: 'entry' | 'mid' | 'senior' | 'executive' | null
        }
      }
      candidates: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          resume_url: string | null
          resume_text: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          current_company: string | null
          current_title: string | null
          salary_expectation: number | null
          availability_date: string | null
          created_at: string
          updated_at: string
          source: 'website' | 'referral' | 'linkedin' | 'indeed' | 'other' | null
          skills: any | null
          experience_years: number | null
          education: any | null
          location: string | null
          visa_status: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          resume_url?: string | null
          resume_text?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          current_company?: string | null
          current_title?: string | null
          salary_expectation?: number | null
          availability_date?: string | null
          created_at?: string
          updated_at?: string
          source?: 'website' | 'referral' | 'linkedin' | 'indeed' | 'other' | null
          skills?: any | null
          experience_years?: number | null
          education?: any | null
          location?: string | null
          visa_status?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          resume_url?: string | null
          resume_text?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          current_company?: string | null
          current_title?: string | null
          salary_expectation?: number | null
          availability_date?: string | null
          created_at?: string
          updated_at?: string
          source?: 'website' | 'referral' | 'linkedin' | 'indeed' | 'other' | null
          skills?: any | null
          experience_years?: number | null
          education?: any | null
          location?: string | null
          visa_status?: string | null
          notes?: string | null
        }
      }
      applications: {
        Row: {
          id: string
          candidate_id: string
          job_posting_id: string
          status: 'applied' | 'screening' | 'phone_screen' | 'technical_interview' | 'final_interview' | 'offer_sent' | 'offer_accepted' | 'offer_declined' | 'hired' | 'rejected' | 'withdrawn'
          applied_at: string | null
          updated_at: string
          cover_letter: string | null
          ai_match_score: number | null
          ai_match_details: any | null
          notes: string | null
          resume_version_url: string | null
          referrer_id: string | null
          stage_changed_at: string | null
          stage_changed_by: string | null
        }
        Insert: {
          id?: string
          candidate_id: string
          job_posting_id: string
          status?: 'applied' | 'screening' | 'phone_screen' | 'technical_interview' | 'final_interview' | 'offer_sent' | 'offer_accepted' | 'offer_declined' | 'hired' | 'rejected' | 'withdrawn'
          applied_at?: string | null
          updated_at?: string
          cover_letter?: string | null
          ai_match_score?: number | null
          ai_match_details?: any | null
          notes?: string | null
          resume_version_url?: string | null
          referrer_id?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
        }
        Update: {
          id?: string
          candidate_id?: string
          job_posting_id?: string
          status?: 'applied' | 'screening' | 'phone_screen' | 'technical_interview' | 'final_interview' | 'offer_sent' | 'offer_accepted' | 'offer_declined' | 'hired' | 'rejected' | 'withdrawn'
          applied_at?: string | null
          updated_at?: string
          cover_letter?: string | null
          ai_match_score?: number | null
          ai_match_details?: any | null
          notes?: string | null
          resume_version_url?: string | null
          referrer_id?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
        }
      }
    }
  }
}
