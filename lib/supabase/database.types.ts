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
          headline: string | null
          bio: string | null
          location: string | null
          email: string | null
          phone: string | null
          profile_image_url: string | null
          cover_image_url: string | null
          social_links: Json
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title?: string | null
          headline?: string | null
          bio?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          profile_image_url?: string | null
          cover_image_url?: string | null
          social_links?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string | null
          headline?: string | null
          bio?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          profile_image_url?: string | null
          cover_image_url?: string | null
          social_links?: Json
          updated_at?: string
        }
      }
      content_entities: {
        Row: {
          id: string
          entity_type: 'work' | 'project' | 'education' | 'certification' | 'volunteer' | 'publication' | 'award' | 'course' | 'organization' | 'skill'
          title: string
          subtitle: string | null
          description: string | null
          date_start: string | null
          date_end: string | null
          is_current: boolean
          metadata: Json
          display_order: number
          is_featured: boolean
          is_visible: boolean
          resume_priority: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          entity_type: 'work' | 'project' | 'education' | 'certification' | 'volunteer' | 'publication' | 'award' | 'course' | 'organization' | 'skill'
          title: string
          subtitle?: string | null
          description?: string | null
          date_start?: string | null
          date_end?: string | null
          is_current?: boolean
          metadata?: Json
          display_order?: number
          is_featured?: boolean
          is_visible?: boolean
          resume_priority?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          entity_type?: 'work' | 'project' | 'education' | 'certification' | 'volunteer' | 'publication' | 'award' | 'course' | 'organization' | 'skill'
          title?: string
          subtitle?: string | null
          description?: string | null
          date_start?: string | null
          date_end?: string | null
          is_current?: boolean
          metadata?: Json
          display_order?: number
          is_featured?: boolean
          is_visible?: boolean
          resume_priority?: number
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          proficiency_level: number
          years_experience: number | null
          is_featured: boolean
          is_visible: boolean
          display_order: number
          endorsements: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          proficiency_level?: number
          years_experience?: number | null
          is_featured?: boolean
          is_visible?: boolean
          display_order?: number
          endorsements?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          proficiency_level?: number
          years_experience?: number | null
          is_featured?: boolean
          is_visible?: boolean
          display_order?: number
          endorsements?: number
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
          mime_type: string | null
          media_type: string | null
          description: string | null
          alt_text: string | null
          is_cover_image: boolean
          is_featured: boolean
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          entity_type: string
          entity_id: string
          file_path: string
          file_name: string
          file_size?: number | null
          mime_type?: string | null
          media_type?: string | null
          description?: string | null
          alt_text?: string | null
          is_cover_image?: boolean
          is_featured?: boolean
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          entity_type?: string
          entity_id?: string
          file_path?: string
          file_name?: string
          file_size?: number | null
          mime_type?: string | null
          media_type?: string | null
          description?: string | null
          alt_text?: string | null
          is_cover_image?: boolean
          is_featured?: boolean
          metadata?: Json
          created_at?: string
        }
      }
      resume_versions: {
        Row: {
          id: string
          name: string
          target_company: string | null
          target_role: string | null
          job_description: string | null
          selected_entities: string[]
          tailored_content: Json
          template_type: string
          original_docx_path: string | null
          edited_docx_path: string | null
          pdf_path: string | null
          is_favorite: boolean
          is_edited: boolean
          edit_history: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          target_company?: string | null
          target_role?: string | null
          job_description?: string | null
          selected_entities?: string[]
          tailored_content: Json
          template_type?: string
          original_docx_path?: string | null
          edited_docx_path?: string | null
          pdf_path?: string | null
          is_favorite?: boolean
          is_edited?: boolean
          edit_history?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          target_company?: string | null
          target_role?: string | null
          job_description?: string | null
          selected_entities?: string[]
          tailored_content?: Json
          template_type?: string
          original_docx_path?: string | null
          edited_docx_path?: string | null
          pdf_path?: string | null
          is_favorite?: boolean
          is_edited?: boolean
          edit_history?: Json
          created_at?: string
          updated_at?: string
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
      ai_patterns: {
        Row: {
          id: string
          resume_version_id: string | null
          job_analysis: Json
          entity_selection: Json
          success_metrics: Json
          user_feedback: string | null
          created_at: string
        }
        Insert: {
          id?: string
          resume_version_id?: string | null
          job_analysis: Json
          entity_selection: Json
          success_metrics?: Json
          user_feedback?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          resume_version_id?: string | null
          job_analysis?: Json
          entity_selection?: Json
          success_metrics?: Json
          user_feedback?: string | null
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          ip_address: string | null
          user_agent: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          ip_address?: string | null
          user_agent?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          ip_address?: string | null
          user_agent?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
      rebuild_logs: {
        Row: {
          id: string
          user_id: string | null
          user_email: string | null
          trigger_type: string
          data_summary: Json | null
          error_message: string | null
          validation_passed: boolean | null
          completed_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          user_email?: string | null
          trigger_type: string
          data_summary?: Json | null
          error_message?: string | null
          validation_passed?: boolean | null
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          user_email?: string | null
          trigger_type?: string
          data_summary?: Json | null
          error_message?: string | null
          validation_passed?: boolean | null
          completed_at?: string
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
      content_entity_type: 'work' | 'project' | 'education' | 'certification' | 'volunteer' | 'publication' | 'award' | 'course' | 'organization' | 'skill'
    }
  }
}

// Type exports for easy use
export type PersonalInfo = Database['public']['Tables']['personal_info']['Row']
export type ContentEntity = Database['public']['Tables']['content_entities']['Row']
export type Skill = Database['public']['Tables']['skills']['Row']
export type MediaFile = Database['public']['Tables']['media_files']['Row']
export type ResumeVersion = Database['public']['Tables']['resume_versions']['Row']
export type WebsiteContent = Database['public']['Tables']['website_content']['Row']
export type AiPattern = Database['public']['Tables']['ai_patterns']['Row']
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type RebuildLog = Database['public']['Tables']['rebuild_logs']['Row']

// Content entity type
export type ContentEntityType = Database['public']['Enums']['content_entity_type']

// Insert types
export type PersonalInfoInsert = Database['public']['Tables']['personal_info']['Insert']
export type ContentEntityInsert = Database['public']['Tables']['content_entities']['Insert']
export type SkillInsert = Database['public']['Tables']['skills']['Insert']
export type MediaFileInsert = Database['public']['Tables']['media_files']['Insert']
export type ResumeVersionInsert = Database['public']['Tables']['resume_versions']['Insert']
export type WebsiteContentInsert = Database['public']['Tables']['website_content']['Insert']
export type AiPatternInsert = Database['public']['Tables']['ai_patterns']['Insert']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']
export type RebuildLogInsert = Database['public']['Tables']['rebuild_logs']['Insert']

// Update types
export type PersonalInfoUpdate = Database['public']['Tables']['personal_info']['Update']
export type ContentEntityUpdate = Database['public']['Tables']['content_entities']['Update']
export type SkillUpdate = Database['public']['Tables']['skills']['Update']
export type MediaFileUpdate = Database['public']['Tables']['media_files']['Update']
export type ResumeVersionUpdate = Database['public']['Tables']['resume_versions']['Update']
export type WebsiteContentUpdate = Database['public']['Tables']['website_content']['Update']
export type AiPatternUpdate = Database['public']['Tables']['ai_patterns']['Update']
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update']
export type RebuildLogUpdate = Database['public']['Tables']['rebuild_logs']['Update']

// Extended types with relationships
export type ContentEntityWithMedia = ContentEntity & {
  media_files: MediaFile[]
}

export type SkillWithCategory = Skill & {
  categoryInfo: {
    label: string
    color: string
  }
}

// Static data type for public consumption
export type StaticPortfolioData = {
  personalInfo: PersonalInfo | null
  contentEntities: ContentEntity[]
  contentByType: Record<ContentEntityType, ContentEntity[]>
  skills: Skill[]
  skillsByCategory: Record<string, Skill[]>
  stats: {
    experience: number
    projects: number
    education: number
    certifications: number
  }
  featuredContent: ContentEntity[]
  lastUpdated: string
}

// AI resume generation types
export type JobAnalysis = {
  keywords: string[]
  required_skills: string[]
  preferred_skills: string[]
  experience_level: 'entry' | 'mid' | 'senior' | 'executive'
  industry: string
  role_type: string
}

export type EntitySelection = {
  entity_id: string
  selection_reason: string
  relevance_score: number
  tailoring_notes: string
}

export type TailoredContent = {
  selected_entities: EntitySelection[]
  customized_descriptions: Record<string, string>
  highlighted_skills: string[]
  summary: string
}

// Contact form types
export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

// API response types
export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  details?: string
  message?: string
}

export type PaginatedResponse<T = any> = ApiResponse<T> & {
  count: number
  page?: number
  pageSize?: number
  totalPages?: number
}