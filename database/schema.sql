-- AI Portfolio Website Database Schema
-- LinkedIn-style content entities with comprehensive structure

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Personal information and profile
CREATE TABLE personal_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT,
    headline TEXT, -- Professional headline (like LinkedIn)
    bio TEXT,
    location TEXT,
    email TEXT,
    phone TEXT,
    profile_image_url TEXT,
    cover_image_url TEXT,
    social_links JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Unified content entity table (LinkedIn-style)
CREATE TYPE content_entity_type AS ENUM (
    'work', 'project', 'education', 'certification', 
    'volunteer', 'publication', 'award', 'course', 
    'organization', 'skill'
);

CREATE TABLE content_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type content_entity_type NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT, -- Company, school, publisher, etc.
    description TEXT,
    
    -- Date fields
    date_start DATE,
    date_end DATE,
    is_current BOOLEAN DEFAULT FALSE,
    
    -- Metadata (JSONB for flexibility per entity type)
    metadata JSONB DEFAULT '{}', -- Stores type-specific data
    
    -- Display and filtering
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE, -- Highlight on homepage
    is_visible BOOLEAN DEFAULT TRUE,
    resume_priority INTEGER DEFAULT 5, -- 1-10 for AI resume selection
    
    -- Metadata and timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills with enhanced LinkedIn-style structure
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT, -- 'technical', 'soft', 'language', 'tool', 'framework'
    proficiency_level INTEGER DEFAULT 3, -- 1-5 scale
    years_experience INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    endorsements INTEGER DEFAULT 0, -- LinkedIn-style endorsements
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media files with enhanced metadata
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    media_type TEXT, -- 'image', 'document', 'certificate', 'logo'
    description TEXT,
    alt_text TEXT,
    is_cover_image BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume versions with editing capability
CREATE TABLE resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    target_company TEXT,
    target_role TEXT,
    job_description TEXT,
    
    -- Content selection
    selected_entities UUID[], -- IDs from content_entities
    tailored_content JSONB NOT NULL,
    
    -- File management
    template_type TEXT DEFAULT 'harvard',
    original_docx_path TEXT, -- AI-generated version
    edited_docx_path TEXT,   -- User-edited version
    pdf_path TEXT,
    
    -- Metadata
    is_favorite BOOLEAN DEFAULT FALSE,
    is_edited BOOLEAN DEFAULT FALSE, -- Has user modifications
    edit_history JSONB DEFAULT '[]', -- Track editing sessions
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website content with glassmorphism sections
CREATE TABLE website_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section VARCHAR(50) NOT NULL UNIQUE,
    title TEXT,
    content TEXT,
    metadata JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI patterns for learning and optimization
CREATE TABLE ai_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_version_id UUID REFERENCES resume_versions(id),
    job_analysis JSONB NOT NULL,
    entity_selection JSONB NOT NULL, -- Which entities were selected and why
    success_metrics JSONB DEFAULT '{}',
    user_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rebuild logs for tracking static generation
CREATE TABLE rebuild_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    user_email TEXT,
    trigger_type TEXT NOT NULL, -- 'manual', 'automatic', 'webhook'
    data_summary JSONB,
    error_message TEXT,
    validation_passed BOOLEAN,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_content_entities_type ON content_entities(entity_type);
CREATE INDEX idx_content_entities_featured ON content_entities(is_featured);
CREATE INDEX idx_content_entities_visible ON content_entities(is_visible);
CREATE INDEX idx_content_entities_display_order ON content_entities(display_order);
CREATE INDEX idx_content_entities_resume_priority ON content_entities(resume_priority);
CREATE INDEX idx_content_entities_date_start ON content_entities(date_start);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_proficiency ON skills(proficiency_level);
CREATE INDEX idx_skills_featured ON skills(is_featured);
CREATE INDEX idx_skills_visible ON skills(is_visible);
CREATE INDEX idx_skills_display_order ON skills(display_order);

CREATE INDEX idx_media_files_entity ON media_files(entity_type, entity_id);
CREATE INDEX idx_media_files_type ON media_files(media_type);
CREATE INDEX idx_media_files_featured ON media_files(is_featured);

CREATE INDEX idx_resume_versions_company ON resume_versions(target_company);
CREATE INDEX idx_resume_versions_role ON resume_versions(target_role);
CREATE INDEX idx_resume_versions_template ON resume_versions(template_type);
CREATE INDEX idx_resume_versions_favorite ON resume_versions(is_favorite);

CREATE INDEX idx_website_content_section ON website_content(section);
CREATE INDEX idx_website_content_published ON website_content(is_published);

CREATE INDEX idx_ai_patterns_resume_id ON ai_patterns(resume_version_id);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_read ON contact_submissions(is_read);

CREATE INDEX idx_rebuild_logs_trigger_type ON rebuild_logs(trigger_type);
CREATE INDEX idx_rebuild_logs_completed ON rebuild_logs(completed_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic updated_at updates
CREATE TRIGGER update_content_entities_updated_at 
    BEFORE UPDATE ON content_entities 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_versions_updated_at 
    BEFORE UPDATE ON resume_versions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personal_info_updated_at 
    BEFORE UPDATE ON personal_info 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_content_updated_at 
    BEFORE UPDATE ON website_content 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default personal info
INSERT INTO personal_info (name, title, headline, bio, email, location, social_links) VALUES (
    'Your Name',
    'Full Stack Developer',
    'Passionate about creating innovative solutions through code',
    'I''m a dedicated developer with expertise in modern web technologies. I love solving complex problems and building applications that make a difference.',
    'your.email@example.com',
    'Your City, Country',
    '{"github": "https://github.com/yourusername", "linkedin": "https://linkedin.com/in/yourusername"}'
);

-- Insert default website content sections
INSERT INTO website_content (section, title, content, is_published) VALUES 
('hero', 'Hero Section', '{"heading": "Hello! I''m", "description": "Welcome to my portfolio"}', true),
('about', 'About Me', '{"description": "Learn more about my background and experience"}', true),
('contact', 'Contact Me', '{"heading": "Get In Touch", "description": "Let''s start a conversation"}', true);

-- Sample content entities for demonstration
INSERT INTO content_entities (entity_type, title, subtitle, description, date_start, is_current, is_featured, metadata) VALUES 
('work', 'Senior Full Stack Developer', 'Tech Company Inc.', 'Led development of scalable web applications using React, Node.js, and PostgreSQL. Managed a team of 3 developers and improved application performance by 40%.', '2022-01-01', true, true, '{"location": "Remote", "company": "Tech Company Inc.", "technologies": ["React", "Node.js", "PostgreSQL", "TypeScript"]}'),
('project', 'AI Portfolio Website', 'Personal Project', 'Built a comprehensive portfolio website with AI-powered resume generation, CMS, and static site generation.', '2024-01-01', true, true, '{"technologies": ["Next.js", "Supabase", "LangChain", "Tailwind CSS"], "github_url": "https://github.com/username/portfolio", "project_url": "https://yourportfolio.com"}'),
('education', 'Bachelor of Computer Science', 'University Name', 'Graduated with honors. Focused on software engineering, algorithms, and web development.', '2018-09-01', false, false, '{"location": "City, Country", "gpa": "3.8/4.0"}');

-- Sample skills
INSERT INTO skills (name, category, proficiency_level, years_experience, is_featured) VALUES 
('TypeScript', 'technical', 5, 4, true),
('React', 'framework', 5, 5, true),
('Node.js', 'technical', 4, 4, true),
('Next.js', 'framework', 4, 3, true),
('PostgreSQL', 'technical', 4, 4, false),
('Tailwind CSS', 'framework', 4, 3, true),
('Python', 'technical', 3, 2, false);

-- Row Level Security (RLS) policies
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rebuild_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for visible content
CREATE POLICY "Allow public read access for personal info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access for visible content entities" ON content_entities FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read access for visible skills" ON skills FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read access for media files" ON media_files FOR SELECT USING (true);
CREATE POLICY "Allow public read access for published website content" ON website_content FOR SELECT USING (is_published = true);

-- Admin access (authenticated users can do everything)
CREATE POLICY "Allow authenticated users full access to personal info" ON personal_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to content entities" ON content_entities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to media files" ON media_files FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to website content" ON website_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to resume versions" ON resume_versions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to ai patterns" ON ai_patterns FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to contact submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to rebuild logs" ON rebuild_logs FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous contact submissions
CREATE POLICY "Allow anonymous contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);