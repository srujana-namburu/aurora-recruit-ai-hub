export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          session_id: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_processing_logs: {
        Row: {
          ai_response: Json | null
          confidence_score: number | null
          entity_id: string | null
          entity_type: string | null
          error_message: string | null
          id: string
          input_data_hash: string | null
          model_version: string | null
          process_type: Database["public"]["Enums"]["process_type"] | null
          processed_at: string | null
          processing_status:
            | Database["public"]["Enums"]["processing_status"]
            | null
          processing_time_ms: number | null
          tokens_used: number | null
        }
        Insert: {
          ai_response?: Json | null
          confidence_score?: number | null
          entity_id?: string | null
          entity_type?: string | null
          error_message?: string | null
          id?: string
          input_data_hash?: string | null
          model_version?: string | null
          process_type?: Database["public"]["Enums"]["process_type"] | null
          processed_at?: string | null
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          processing_time_ms?: number | null
          tokens_used?: number | null
        }
        Update: {
          ai_response?: Json | null
          confidence_score?: number | null
          entity_id?: string | null
          entity_type?: string | null
          error_message?: string | null
          id?: string
          input_data_hash?: string | null
          model_version?: string | null
          process_type?: Database["public"]["Enums"]["process_type"] | null
          processed_at?: string | null
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          processing_time_ms?: number | null
          tokens_used?: number | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          ai_match_details: Json | null
          ai_match_score: number | null
          applied_at: string | null
          candidate_id: string
          cover_letter: string | null
          id: string
          job_posting_id: string
          notes: string | null
          referrer_id: string | null
          resume_version_url: string | null
          stage_changed_at: string | null
          stage_changed_by: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string
        }
        Insert: {
          ai_match_details?: Json | null
          ai_match_score?: number | null
          applied_at?: string | null
          candidate_id: string
          cover_letter?: string | null
          id?: string
          job_posting_id: string
          notes?: string | null
          referrer_id?: string | null
          resume_version_url?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
        }
        Update: {
          ai_match_details?: Json | null
          ai_match_score?: number | null
          applied_at?: string | null
          candidate_id?: string
          cover_letter?: string | null
          id?: string
          job_posting_id?: string
          notes?: string | null
          referrer_id?: string | null
          resume_version_url?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_stage_changed_by_fkey"
            columns: ["stage_changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bias_detections: {
        Row: {
          bias_categories: Json | null
          confidence_score: number | null
          detected_at: string | null
          detected_biases: Json
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"] | null
          id: string
          recommendations: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          severity_level: Database["public"]["Enums"]["severity_level"] | null
          status: Database["public"]["Enums"]["bias_status"] | null
        }
        Insert: {
          bias_categories?: Json | null
          confidence_score?: number | null
          detected_at?: string | null
          detected_biases: Json
          entity_id: string
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          id?: string
          recommendations?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity_level?: Database["public"]["Enums"]["severity_level"] | null
          status?: Database["public"]["Enums"]["bias_status"] | null
        }
        Update: {
          bias_categories?: Json | null
          confidence_score?: number | null
          detected_at?: string | null
          detected_biases?: Json
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          id?: string
          recommendations?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity_level?: Database["public"]["Enums"]["severity_level"] | null
          status?: Database["public"]["Enums"]["bias_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "bias_detections_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          availability_date: string | null
          created_at: string
          current_company: string | null
          current_title: string | null
          education: Json | null
          email: string
          experience_years: number | null
          first_name: string
          id: string
          last_name: string
          linkedin_url: string | null
          location: string | null
          notes: string | null
          phone: string | null
          portfolio_url: string | null
          resume_text: string | null
          resume_url: string | null
          salary_expectation: number | null
          skills: Json | null
          source: Database["public"]["Enums"]["candidate_source"] | null
          updated_at: string
          visa_status: string | null
        }
        Insert: {
          availability_date?: string | null
          created_at?: string
          current_company?: string | null
          current_title?: string | null
          education?: Json | null
          email: string
          experience_years?: number | null
          first_name: string
          id?: string
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_text?: string | null
          resume_url?: string | null
          salary_expectation?: number | null
          skills?: Json | null
          source?: Database["public"]["Enums"]["candidate_source"] | null
          updated_at?: string
          visa_status?: string | null
        }
        Update: {
          availability_date?: string | null
          created_at?: string
          current_company?: string | null
          current_title?: string | null
          education?: Json | null
          email?: string
          experience_years?: number | null
          first_name?: string
          id?: string
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_text?: string | null
          resume_url?: string | null
          salary_expectation?: number | null
          skills?: Json | null
          source?: Database["public"]["Enums"]["candidate_source"] | null
          updated_at?: string
          visa_status?: string | null
        }
        Relationships: []
      }
      chat_transcripts: {
        Row: {
          analyzed_at: string | null
          analyzed_by: string | null
          application_id: string
          availability_extracted: string | null
          candidate_id: string
          communication_quality: number | null
          created_at: string
          id: string
          interest_level_score: number | null
          key_insights: Json | null
          red_flags: Json | null
          salary_expectation_extracted: number | null
          sentiment_score: number | null
          transcript_source:
            | Database["public"]["Enums"]["transcript_source"]
            | null
          transcript_text: string
        }
        Insert: {
          analyzed_at?: string | null
          analyzed_by?: string | null
          application_id: string
          availability_extracted?: string | null
          candidate_id: string
          communication_quality?: number | null
          created_at?: string
          id?: string
          interest_level_score?: number | null
          key_insights?: Json | null
          red_flags?: Json | null
          salary_expectation_extracted?: number | null
          sentiment_score?: number | null
          transcript_source?:
            | Database["public"]["Enums"]["transcript_source"]
            | null
          transcript_text: string
        }
        Update: {
          analyzed_at?: string | null
          analyzed_by?: string | null
          application_id?: string
          availability_extracted?: string | null
          candidate_id?: string
          communication_quality?: number | null
          created_at?: string
          id?: string
          interest_level_score?: number | null
          key_insights?: Json | null
          red_flags?: Json | null
          salary_expectation_extracted?: number | null
          sentiment_score?: number | null
          transcript_source?:
            | Database["public"]["Enums"]["transcript_source"]
            | null
          transcript_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_transcripts_analyzed_by_fkey"
            columns: ["analyzed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_transcripts_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_transcripts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          billing_email: string | null
          company_size: string | null
          created_at: string
          domain: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          settings: Json | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          billing_email?: string | null
          company_size?: string | null
          created_at?: string
          domain?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          settings?: Json | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          billing_email?: string | null
          company_size?: string | null
          created_at?: string
          domain?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          settings?: Json | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          body: string | null
          delivery_status: Database["public"]["Enums"]["delivery_status"] | null
          entity_id: string | null
          entity_type: string | null
          error_message: string | null
          id: string
          recipient_email: string
          sent_at: string | null
          sent_by: string | null
          subject: string
          template_id: string | null
        }
        Insert: {
          body?: string | null
          delivery_status?:
            | Database["public"]["Enums"]["delivery_status"]
            | null
          entity_id?: string | null
          entity_type?: string | null
          error_message?: string | null
          id?: string
          recipient_email: string
          sent_at?: string | null
          sent_by?: string | null
          subject: string
          template_id?: string | null
        }
        Update: {
          body?: string | null
          delivery_status?:
            | Database["public"]["Enums"]["delivery_status"]
            | null
          entity_id?: string | null
          entity_type?: string | null
          error_message?: string | null
          id?: string
          recipient_email?: string
          sent_at?: string | null
          sent_by?: string | null
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          company_id: string
          created_at: string
          created_by: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: Database["public"]["Enums"]["template_type"] | null
          updated_at: string
          variables: Json | null
        }
        Insert: {
          body: string
          company_id: string
          created_at?: string
          created_by: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type?: Database["public"]["Enums"]["template_type"] | null
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          body?: string
          company_id?: string
          created_at?: string
          created_by?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: Database["public"]["Enums"]["template_type"] | null
          updated_at?: string
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      file_uploads: {
        Row: {
          entity_id: string | null
          entity_type: string | null
          file_path: string
          file_size: number | null
          filename: string
          id: string
          is_processed: boolean | null
          mime_type: string | null
          original_filename: string
          processing_status:
            | Database["public"]["Enums"]["processing_status"]
            | null
          uploaded_at: string | null
          uploaded_by: string
          virus_scan_status: Database["public"]["Enums"]["scan_status"] | null
        }
        Insert: {
          entity_id?: string | null
          entity_type?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: string
          is_processed?: boolean | null
          mime_type?: string | null
          original_filename: string
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          uploaded_at?: string | null
          uploaded_by: string
          virus_scan_status?: Database["public"]["Enums"]["scan_status"] | null
        }
        Update: {
          entity_id?: string | null
          entity_type?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: string
          is_processed?: boolean | null
          mime_type?: string | null
          original_filename?: string
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          uploaded_at?: string | null
          uploaded_by?: string
          virus_scan_status?: Database["public"]["Enums"]["scan_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "file_uploads_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_feedback: {
        Row: {
          ai_summary: string | null
          bias_flags: Json | null
          comments: string | null
          communication_score: number | null
          created_at: string
          cultural_fit_score: number | null
          follow_up_questions: string | null
          id: string
          interview_duration_actual: number | null
          interview_id: string
          interviewer_id: string
          overall_score: number | null
          problem_solving_score: number | null
          recommendation: Database["public"]["Enums"]["recommendation"] | null
          strengths: string | null
          technical_score: number | null
          updated_at: string
          weaknesses: string | null
        }
        Insert: {
          ai_summary?: string | null
          bias_flags?: Json | null
          comments?: string | null
          communication_score?: number | null
          created_at?: string
          cultural_fit_score?: number | null
          follow_up_questions?: string | null
          id?: string
          interview_duration_actual?: number | null
          interview_id: string
          interviewer_id: string
          overall_score?: number | null
          problem_solving_score?: number | null
          recommendation?: Database["public"]["Enums"]["recommendation"] | null
          strengths?: string | null
          technical_score?: number | null
          updated_at?: string
          weaknesses?: string | null
        }
        Update: {
          ai_summary?: string | null
          bias_flags?: Json | null
          comments?: string | null
          communication_score?: number | null
          created_at?: string
          cultural_fit_score?: number | null
          follow_up_questions?: string | null
          id?: string
          interview_duration_actual?: number | null
          interview_id?: string
          interviewer_id?: string
          overall_score?: number | null
          problem_solving_score?: number | null
          recommendation?: Database["public"]["Enums"]["recommendation"] | null
          strengths?: string | null
          technical_score?: number | null
          updated_at?: string
          weaknesses?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_feedback_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: true
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_feedback_interviewer_id_fkey"
            columns: ["interviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string
          created_at: string
          duration_minutes: number | null
          feedback_submitted_at: string | null
          id: string
          interview_round: number | null
          interviewer_id: string
          location: string | null
          meeting_link: string | null
          notes: string | null
          rescheduled_from: string | null
          scheduled_at: string
          status: Database["public"]["Enums"]["interview_status"] | null
          type: Database["public"]["Enums"]["interview_type"] | null
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          duration_minutes?: number | null
          feedback_submitted_at?: string | null
          id?: string
          interview_round?: number | null
          interviewer_id: string
          location?: string | null
          meeting_link?: string | null
          notes?: string | null
          rescheduled_from?: string | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["interview_status"] | null
          type?: Database["public"]["Enums"]["interview_type"] | null
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          duration_minutes?: number | null
          feedback_submitted_at?: string | null
          id?: string
          interview_round?: number | null
          interviewer_id?: string
          location?: string | null
          meeting_link?: string | null
          notes?: string | null
          rescheduled_from?: string | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["interview_status"] | null
          type?: Database["public"]["Enums"]["interview_type"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_interviewer_id_fkey"
            columns: ["interviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applicant_id: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string | null
          resume_url: string
          status: string
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          application_count: number | null
          application_deadline: string | null
          company_id: string
          created_at: string
          created_by: string
          department: string | null
          description: string
          employment_type: Database["public"]["Enums"]["employment_type"] | null
          experience_level:
            | Database["public"]["Enums"]["experience_level"]
            | null
          expires_at: string | null
          id: string
          job_description_file_url: string | null
          job_type: string | null
          location: string | null
          posting_date: string | null
          qualifications: Json | null
          remote_allowed: boolean | null
          remote_policy: string | null
          requirements: Json | null
          responsibilities: Json | null
          salary_range_max: number | null
          salary_range_min: number | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          application_count?: number | null
          application_deadline?: string | null
          company_id: string
          created_at?: string
          created_by: string
          department?: string | null
          description: string
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          expires_at?: string | null
          id?: string
          job_description_file_url?: string | null
          job_type?: string | null
          location?: string | null
          posting_date?: string | null
          qualifications?: Json | null
          remote_allowed?: boolean | null
          remote_policy?: string | null
          requirements?: Json | null
          responsibilities?: Json | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          application_count?: number | null
          application_deadline?: string | null
          company_id?: string
          created_at?: string
          created_by?: string
          department?: string | null
          description?: string
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          expires_at?: string | null
          id?: string
          job_description_file_url?: string | null
          job_type?: string | null
          location?: string | null
          posting_date?: string | null
          qualifications?: Json | null
          remote_allowed?: boolean | null
          remote_policy?: string | null
          requirements?: Json | null
          responsibilities?: Json | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          message: string
          priority: Database["public"]["Enums"]["priority"] | null
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"] | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message: string
          priority?: Database["public"]["Enums"]["priority"] | null
          read_at?: string | null
          title: string
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message?: string
          priority?: Database["public"]["Enums"]["priority"] | null
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      resume_analyses: {
        Row: {
          ai_insights: Json | null
          candidate_id: string
          confidence_score: number | null
          education_relevance: number | null
          experience_relevance: number | null
          id: string
          job_description: string | null
          job_posting_id: string
          keyword_matches: Json | null
          match_score: number
          model_version: string | null
          processed_at: string | null
          resume_text: string | null
          skills_matched: Json | null
          skills_missing: Json | null
        }
        Insert: {
          ai_insights?: Json | null
          candidate_id: string
          confidence_score?: number | null
          education_relevance?: number | null
          experience_relevance?: number | null
          id?: string
          job_description?: string | null
          job_posting_id: string
          keyword_matches?: Json | null
          match_score: number
          model_version?: string | null
          processed_at?: string | null
          resume_text?: string | null
          skills_matched?: Json | null
          skills_missing?: Json | null
        }
        Update: {
          ai_insights?: Json | null
          candidate_id?: string
          confidence_score?: number | null
          education_relevance?: number | null
          experience_relevance?: number | null
          id?: string
          job_description?: string | null
          job_posting_id?: string
          keyword_matches?: Json | null
          match_score?: number
          model_version?: string | null
          processed_at?: string | null
          resume_text?: string | null
          skills_matched?: Json | null
          skills_missing?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_analyses_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resume_analyses_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_results: {
        Row: {
          analysis_id: string | null
          content: string | null
          created_at: string | null
          id: string
          resume_name: string
          score: number
        }
        Insert: {
          analysis_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          resume_name: string
          score: number
        }
        Update: {
          analysis_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          resume_name?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "resume_results_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "resume_analyses"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          company_id: string
          created_at: string
          department: string | null
          email: string
          first_name: string
          id: string
          is_active: boolean | null
          last_login: string | null
          last_name: string
          password_hash: string
          phone: string | null
          profile_complete: boolean | null
          profile_image_url: string | null
          profile_picture_url: string | null
          reset_token: string | null
          reset_token_expires: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          department?: string | null
          email: string
          first_name: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name: string
          password_hash: string
          phone?: string | null
          profile_complete?: boolean | null
          profile_image_url?: string | null
          profile_picture_url?: string | null
          reset_token?: string | null
          reset_token_expires?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          department?: string | null
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string
          password_hash?: string
          phone?: string | null
          profile_complete?: boolean | null
          profile_image_url?: string | null
          profile_picture_url?: string | null
          reset_token?: string | null
          reset_token_expires?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_interview_feedback_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_resume_analyses_tables: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_current_user_company_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_or_recruiter: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      application_status:
        | "applied"
        | "screening"
        | "phone_screen"
        | "technical_interview"
        | "final_interview"
        | "offer_sent"
        | "offer_accepted"
        | "offer_declined"
        | "hired"
        | "rejected"
        | "withdrawn"
      bias_status: "flagged" | "reviewed" | "dismissed" | "resolved"
      candidate_source: "website" | "referral" | "linkedin" | "indeed" | "other"
      delivery_status: "queued" | "sent" | "delivered" | "bounced" | "failed"
      employment_type: "full_time" | "part_time" | "contract" | "internship"
      entity_type:
        | "interview_feedback"
        | "application_notes"
        | "job_posting"
        | "resume_analysis"
      experience_level: "entry" | "mid" | "senior" | "executive"
      interview_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show"
      interview_type:
        | "phone"
        | "video"
        | "in_person"
        | "technical"
        | "behavioral"
        | "panel"
      job_status: "draft" | "active" | "paused" | "closed"
      notification_type:
        | "new_application"
        | "interview_scheduled"
        | "feedback_pending"
        | "bias_alert"
        | "system_update"
      priority: "low" | "normal" | "high"
      process_type:
        | "resume_match"
        | "interview_summary"
        | "chat_analysis"
        | "bias_detection"
        | "bulk_analysis"
      processing_status: "queued" | "processing" | "completed" | "failed"
      recommendation:
        | "strong_hire"
        | "hire"
        | "maybe"
        | "no_hire"
        | "strong_no_hire"
      scan_status: "pending" | "clean" | "infected" | "failed"
      severity_level: "low" | "medium" | "high" | "critical"
      subscription_tier: "free" | "premium" | "enterprise"
      template_type:
        | "application_confirmation"
        | "interview_invitation"
        | "rejection"
        | "offer_letter"
        | "feedback_request"
      transcript_source: "recruiter_call" | "candidate_chat" | "screening_call"
      user_role: "hr" | "job_seeker"
      visa_status:
        | "citizen"
        | "permanent_resident"
        | "h1b"
        | "opt"
        | "f1"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "applied",
        "screening",
        "phone_screen",
        "technical_interview",
        "final_interview",
        "offer_sent",
        "offer_accepted",
        "offer_declined",
        "hired",
        "rejected",
        "withdrawn",
      ],
      bias_status: ["flagged", "reviewed", "dismissed", "resolved"],
      candidate_source: ["website", "referral", "linkedin", "indeed", "other"],
      delivery_status: ["queued", "sent", "delivered", "bounced", "failed"],
      employment_type: ["full_time", "part_time", "contract", "internship"],
      entity_type: [
        "interview_feedback",
        "application_notes",
        "job_posting",
        "resume_analysis",
      ],
      experience_level: ["entry", "mid", "senior", "executive"],
      interview_status: [
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ],
      interview_type: [
        "phone",
        "video",
        "in_person",
        "technical",
        "behavioral",
        "panel",
      ],
      job_status: ["draft", "active", "paused", "closed"],
      notification_type: [
        "new_application",
        "interview_scheduled",
        "feedback_pending",
        "bias_alert",
        "system_update",
      ],
      priority: ["low", "normal", "high"],
      process_type: [
        "resume_match",
        "interview_summary",
        "chat_analysis",
        "bias_detection",
        "bulk_analysis",
      ],
      processing_status: ["queued", "processing", "completed", "failed"],
      recommendation: [
        "strong_hire",
        "hire",
        "maybe",
        "no_hire",
        "strong_no_hire",
      ],
      scan_status: ["pending", "clean", "infected", "failed"],
      severity_level: ["low", "medium", "high", "critical"],
      subscription_tier: ["free", "premium", "enterprise"],
      template_type: [
        "application_confirmation",
        "interview_invitation",
        "rejection",
        "offer_letter",
        "feedback_request",
      ],
      transcript_source: ["recruiter_call", "candidate_chat", "screening_call"],
      user_role: ["hr", "job_seeker"],
      visa_status: [
        "citizen",
        "permanent_resident",
        "h1b",
        "opt",
        "f1",
        "other",
      ],
    },
  },
} as const
