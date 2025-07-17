export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      personal_info: {
        Row: {
          id: string
          name: string
          title: string | null
          bio: string | null
          location: string | null
          email: string | null
          phone: string | null
          profile_image_url: string | null
          social_links: Json
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title?: string | null
          bio?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          profile_image_url?: string | null
          social_links?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string | null
          bio?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          profile_image_url?: string | null
          social_links?: Json
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          category: 'work' | 'volunteer' | 'personal' | 'academic' | 'freelance' | 'internship' | 'leadership' | 'entrepreneurial'
          title: string
          company: string
          location: string | null
          start_date: string | null
          end_date: string | null
          is_current: boolean
          description: string | null
          skills: string[] | null
          technologies: string[] | null
          achievements: string[] | null
          resume_priority: number
          impact_metrics: Json
          display_order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category?: 'work' | 'volunteer' | 'personal' | 'academic' | 'freelance' | 'internship' | 'leadership' | 'entrepreneurial'
          title: string
          company: string
          location?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          description?: string | null
          skills?: string[] | null
          technologies?: string[] | null
          achievements?: string[] | null
          resume_priority?: number
          impact_metrics?: Json
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: 'work' | 'volunteer' | 'personal' | 'academic' | 'freelance' | 'internship' | 'leadership' | 'entrepreneurial'
          title?: string
          company?: string
          location?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          description?: string | null
          skills?: string[] | null
          technologies?: string[] | null
          achievements?: string[] | null
          resume_priority?: number
          impact_metrics?: Json
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      education: {
        Row: {
          id: string
          institution: string
          degree: string | null
          field_of_study: string | null
          start_date: string | null
          end_date: string | null
          is_current: boolean
          description: string | null
          gpa: string | null
          activities: string[] | null
          display_order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          institution: string
          degree?: string | null
          field_of_study?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          description?: string | null
          gpa?: string | null
          activities?: string[] | null
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          institution?: string
          degree?: string | null
          field_of_study?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          description?: string | null
          gpa?: string | null
          activities?: string[] | null
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          start_date: string | null
          end_date: string | null
          is_current: boolean
          project_url: string | null
          github_url: string | null
          technologies: string[] | null
          achievements: string[] | null
          display_order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          project_url?: string | null
          github_url?: string | null
          technologies?: string[] | null
          achievements?: string[] | null
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          project_url?: string | null
          github_url?: string | null
          technologies?: string[] | null
          achievements?: string[] | null
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      awards: {
        Row: {
          id: string
          title: string
          issuer: string
          date_received: string | null
          description: string | null
          credential_url: string | null
          credential_id: string | null
          expiry_date: string | null
          display_order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          issuer: string
          date_received?: string | null
          description?: string | null
          credential_url?: string | null
          credential_id?: string | null
          expiry_date?: string | null
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          issuer?: string
          date_received?: string | null
          description?: string | null
          credential_url?: string | null
          credential_id?: string | null
          expiry_date?: string | null
          display_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          proficiency_level: string | null
          is_visible: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          proficiency_level?: string | null
          is_visible?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          proficiency_level?: string | null
          is_visible?: boolean
          display_order?: number
          created_at?: string
        }
      }
      media_files: {
        Row: {
          id: string
          entity_type: string
          entity_id: string
          file_path: string
          file_name: string
          file_size: number | null
          media_type: string | null
          description: string | null
          alt_text: string | null
          is_cover_image: boolean
          created_at: string
        }
        Insert: {
          id?: string
          entity_type: string
          entity_id: string
          file_path: string
          file_name: string
          file_size?: number | null
          media_type?: string | null
          description?: string | null
          alt_text?: string | null
          is_cover_image?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          entity_type?: string
          entity_id?: string
          file_path?: string
          file_name?: string
          file_size?: number | null
          media_type?: string | null
          description?: string | null
          alt_text?: string | null
          is_cover_image?: boolean
          created_at?: string
        }
      }
      website_content: {
        Row: {
          id: string
          section: string
          title: string | null
          content: string | null
          metadata: Json
          is_published: boolean
          last_updated: string
        }
        Insert: {
          id?: string
          section: string
          title?: string | null
          content?: string | null
          metadata?: Json
          is_published?: boolean
          last_updated?: string
        }
        Update: {
          id?: string
          section?: string
          title?: string | null
          content?: string | null
          metadata?: Json
          is_published?: boolean
          last_updated?: string
        }
      }
      resume_versions: {
        Row: {
          id: string
          name: string
          target_company: string | null
          target_role: string | null
          job_description: string | null
          selected_experiences: string[]
          tailored_content: Json
          template_type: string
          generated_docx_path: string | null
          generated_pdf_path: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          target_company?: string | null
          target_role?: string | null
          job_description?: string | null
          selected_experiences?: string[]
          tailored_content: Json
          template_type?: string
          generated_docx_path?: string | null
          generated_pdf_path?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          target_company?: string | null
          target_role?: string | null
          job_description?: string | null
          selected_experiences?: string[]
          tailored_content?: Json
          template_type?: string
          generated_docx_path?: string | null
          generated_pdf_path?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_patterns: {
        Row: {
          id: string
          resume_version_id: string | null
          job_analysis: Json
          tailored_content: Json
          target_company: string | null
          target_role: string | null
          success_rating: number | null
          user_feedback: string | null
          interviews_received: number
          was_hired: boolean
          created_at: string
        }
        Insert: {
          id?: string
          resume_version_id?: string | null
          job_analysis: Json
          tailored_content: Json
          target_company?: string | null
          target_role?: string | null
          success_rating?: number | null
          user_feedback?: string | null
          interviews_received?: number
          was_hired?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          resume_version_id?: string | null
          job_analysis?: Json
          tailored_content?: Json
          target_company?: string | null
          target_role?: string | null
          success_rating?: number | null
          user_feedback?: string | null
          interviews_received?: number
          was_hired?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type PersonalInfo = Database['public']['Tables']['personal_info']['Row']
export type Experience = Database['public']['Tables']['experiences']['Row']
export type Education = Database['public']['Tables']['education']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Award = Database['public']['Tables']['awards']['Row']
export type Skill = Database['public']['Tables']['skills']['Row']
export type MediaFile = Database['public']['Tables']['media_files']['Row']
export type WebsiteContent = Database['public']['Tables']['website_content']['Row']
export type ResumeVersion = Database['public']['Tables']['resume_versions']['Row']
export type AiPattern = Database['public']['Tables']['ai_patterns']['Row']

// Experience category type
export type ExperienceCategory = Experience['category']

// Experience with media files
export type ExperienceWithMedia = Experience & {
  media_files: MediaFile[]
}