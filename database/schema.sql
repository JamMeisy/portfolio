-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Personal information table
CREATE TABLE personal_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT,
    bio TEXT,
    location TEXT,
    email TEXT,
    phone TEXT,
    profile_image_url TEXT,
    social_links JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience categories enum
CREATE TYPE experience_category AS ENUM (
    'work',           -- Full-time, part-time, contract work
    'volunteer',      -- Volunteer work and community service
    'personal',       -- Personal projects and side projects
    'academic',       -- Research, thesis, academic projects
    'freelance',      -- Freelance and consulting work
    'internship',     -- Internships and co-ops
    'leadership',     -- Leadership roles and positions
    'entrepreneurial' -- Startups, business ventures
);

-- Work experiences table (LinkedIn-style with categories)
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category experience_category NOT NULL DEFAULT 'work',
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    skills TEXT[],
    technologies TEXT[],
    achievements TEXT[],
    resume_priority INTEGER DEFAULT 1, -- 1-10 priority for resume inclusion
    impact_metrics JSONB DEFAULT '{}', -- Quantifiable impact data
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Education table
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution TEXT NOT NULL,
    degree TEXT,
    field_of_study TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    gpa TEXT,
    activities TEXT[],
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    project_url TEXT,
    github_url TEXT,
    technologies TEXT[],
    achievements TEXT[],
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awards & Certifications table
CREATE TABLE awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date_received DATE,
    description TEXT,
    credential_url TEXT,
    credential_id TEXT,
    expiry_date DATE,
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    proficiency_level TEXT,
    is_visible BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media files table (for images, documents, etc.)
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL, -- 'experience', 'project', 'education', 'award', 'personal'
    entity_id UUID NOT NULL,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT,
    media_type TEXT, -- 'image', 'document', 'certificate'
    description TEXT,
    alt_text TEXT,
    is_cover_image BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website content table (for managing static content)
CREATE TABLE website_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section VARCHAR(50) NOT NULL UNIQUE,
    title TEXT,
    content TEXT,
    metadata JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume versions table (for storing different resume versions)
CREATE TABLE resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    target_company TEXT,
    target_role TEXT,
    job_description TEXT,
    selected_experiences UUID[],
    tailored_content JSONB NOT NULL,
    template_type TEXT DEFAULT 'harvard', -- harvard, modern, minimal, etc.
    generated_docx_path TEXT,
    generated_pdf_path TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI patterns table (for learning from successful resume generations)
CREATE TABLE ai_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_version_id UUID REFERENCES resume_versions(id) ON DELETE CASCADE,
    job_analysis JSONB NOT NULL,
    tailored_content JSONB NOT NULL,
    target_company TEXT,
    target_role TEXT,
    success_rating INTEGER,
    user_feedback TEXT,
    interviews_received INTEGER DEFAULT 0,
    was_hired BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_experiences_category ON experiences(category);
CREATE INDEX idx_experiences_company ON experiences(company);
CREATE INDEX idx_experiences_display_order ON experiences(display_order);
CREATE INDEX idx_experiences_is_visible ON experiences(is_visible);
CREATE INDEX idx_experiences_resume_priority ON experiences(resume_priority);

CREATE INDEX idx_education_institution ON education(institution);
CREATE INDEX idx_education_display_order ON education(display_order);
CREATE INDEX idx_education_is_visible ON education(is_visible);

CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_is_visible ON projects(is_visible);

CREATE INDEX idx_awards_display_order ON awards(display_order);
CREATE INDEX idx_awards_is_visible ON awards(is_visible);
CREATE INDEX idx_awards_date_received ON awards(date_received);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_display_order ON skills(display_order);
CREATE INDEX idx_skills_is_visible ON skills(is_visible);

CREATE INDEX idx_media_files_entity ON media_files(entity_type, entity_id);
CREATE INDEX idx_media_files_media_type ON media_files(media_type);

CREATE INDEX idx_website_content_section ON website_content(section);
CREATE INDEX idx_website_content_is_published ON website_content(is_published);

CREATE INDEX idx_resume_versions_target_company ON resume_versions(target_company);
CREATE INDEX idx_resume_versions_target_role ON resume_versions(target_role);
CREATE INDEX idx_resume_versions_template_type ON resume_versions(template_type);
CREATE INDEX idx_resume_versions_is_favorite ON resume_versions(is_favorite);

CREATE INDEX idx_ai_patterns_resume_version_id ON ai_patterns(resume_version_id);
CREATE INDEX idx_ai_patterns_target_company ON ai_patterns(target_company);
CREATE INDEX idx_ai_patterns_target_role ON ai_patterns(target_role);
CREATE INDEX idx_ai_patterns_success_rating ON ai_patterns(success_rating);
CREATE INDEX idx_ai_patterns_was_hired ON ai_patterns(was_hired);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic updated_at updates
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resume_versions_updated_at BEFORE UPDATE ON resume_versions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default website content sections
INSERT INTO website_content (section, title, content, is_published) VALUES 
('hero', 'Hero Section', '{"heading": "Hello! I''m", "name": "Your Name", "title": "Web Developer", "description": "Brief description about yourself and what you do."}', true),
('about', 'About Me', '{"description": "Tell your story, your background, and what drives you.", "stats": [{"label": "Years of Experience", "value": "3+"}, {"label": "Projects Completed", "value": "20+"}]}', true),
('services', 'Services', '{"heading": "Services", "items": [{"title": "Full-Stack Development", "description": "End-to-end web application development"}, {"title": "UI/UX Design", "description": "User-centered design and prototyping"}, {"title": "Mobile Development", "description": "Cross-platform mobile applications"}]}', true),
('contact', 'Contact Me', '{"heading": "Contact Me", "description": "Get in touch for collaborations or opportunities"}', true);

-- Row Level Security (RLS) policies
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_patterns ENABLE ROW LEVEL SECURITY;

-- Public read access for visible content
CREATE POLICY "Allow public read access for visible experiences" ON experiences FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read access for visible education" ON education FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read access for visible projects" ON projects FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read access for visible awards" ON awards FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read access for visible skills" ON skills FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read access for personal info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access for published website content" ON website_content FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read access for media files" ON media_files FOR SELECT USING (true);

-- Admin access (authenticated users can do everything)
CREATE POLICY "Allow authenticated users full access to experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to education" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to awards" ON awards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to personal info" ON personal_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to website content" ON website_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to media files" ON media_files FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to ai patterns" ON ai_patterns FOR ALL USING (auth.role() = 'authenticated');