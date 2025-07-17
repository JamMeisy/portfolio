# CLAUDE.md - AI Portfolio System Context

## 🎯 Project Overview
Building a zero-cost AI-powered portfolio website system with a single-page static portfolio and comprehensive admin CMS for content management and intelligent resume generation.

## 🏗️ System Architecture

### Core Components
- **Public Portfolio**: Single-page static website (zero runtime costs)
- **Admin CMS**: Dynamic content management with authentication
- **AI Resume Generator**: LangChain.js powered intelligent resume tailoring
- **Media Management**: Complete file and media organization system
- **Static Generation**: Automated rebuilds triggered by admin changes

### Technology Stack
```
Framework: Next.js 15 (App Router + Server Components)
Database: Supabase PostgreSQL (free tier)
Hosting: Vercel (free tier)
Styling: Tailwind CSS 4
UI: shadcn/ui v2
AI: LangChain.js + OpenAI/Anthropic
Auth: Supabase Auth (admin-only)
Files: Supabase Storage
Language: TypeScript 5+
```

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── page.tsx                    # Single-page portfolio (static, glassmorphism design)
│   ├── layout.tsx                  # Root layout with OKLCH theme
│   │
│   ├── admin/                      # Admin-only dynamic area
│   │   ├── layout.tsx              # Admin layout (with auth)
│   │   ├── page.tsx                # Admin dashboard
│   │   ├── content/                # Content entity management (LinkedIn-style)
│   │   │   ├── work/               # Work experiences
│   │   │   ├── projects/           # Projects & personal work
│   │   │   ├── education/          # Education & academic
│   │   │   ├── certifications/     # Certifications & licenses
│   │   │   ├── volunteer/          # Volunteer work
│   │   │   ├── publications/       # Publications & articles
│   │   │   ├── awards/             # Awards & honors
│   │   │   ├── courses/            # Courses & training
│   │   │   ├── organizations/      # Organizations & memberships
│   │   │   └── skills/             # Skills management
│   │   ├── media/                  # Media library with glass cards
│   │   ├── resume/                 # AI resume generation + editing system
│   │   ├── website/                # Website content management
│   │   └── settings/               # System settings
│   │
│   ├── api/
│   │   ├── public/                 # Public API (downloads, contact)
│   │   └── admin/                  # Admin API (CRUD, AI, publishing)
│   │
│   ├── globals.css                 # OKLCH color system + glassmorphism
│   └── not-found.tsx
│
├── components/
│   ├── ui/                         # shadcn/ui components (glass theme)
│   ├── public/                     # Public website components (glassmorphism)
│   ├── admin/                      # Admin interface components
│   ├── portfolio/                  # Specialized portfolio components
│   │   ├── hero/                   # Hero section with gradient
│   │   ├── about/                  # About with stats
│   │   ├── content-sections/       # LinkedIn-style content display
│   │   ├── tech-stack/             # Skills showcase
│   │   └── contact/                # Contact form
│   └── shared/                     # Shared components
│
├── lib/
│   ├── supabase/                   # Database setup and queries
│   ├── ai/                         # LangChain AI agents + DOCX editing
│   ├── static/                     # Static content generation
│   ├── theme/                      # OKLCH color utilities
│   └── utils/                      # Utilities and validation
│
├── types/                          # TypeScript definitions
├── hooks/                          # Custom React hooks
├── public/
│   ├── data/                       # Generated static data
│   ├── templates/                  # Resume templates (DOCX)
│   └── images/                     # Static images
│
└── middleware.ts                   # Auth routing
```

## 🗄️ Database Schema (LinkedIn-Style Content Entities)

### Portfolio Content Entity Types
```
work            # Professional work experience
projects        # Personal and professional projects  
education       # Academic background and degrees
certifications  # Professional certifications and licenses
volunteer       # Volunteer work and community service
publications    # Publications, articles, and papers
awards          # Awards, honors, and recognition
courses         # Courses, training, and workshops
organizations   # Professional organizations and memberships
skills          # Technical and soft skills with proficiency
```

### Core Tables
```sql
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
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Unified content entity table (LinkedIn-style)
CREATE TYPE content_entity_type AS ENUM (
    'work', 'projects', 'education', 'certifications', 
    'volunteer', 'publications', 'awards', 'courses', 
    'organizations', 'skills'
);

CREATE TABLE content_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type content_entity_type NOT NULL,
    title TEXT NOT NULL,
    organization TEXT, -- Company, school, publisher, etc.
    location TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    short_description TEXT, -- For card previews
    
    -- Type-specific fields (JSONB for flexibility)
    entity_data JSONB DEFAULT '{}', -- Stores type-specific data
    
    -- Common fields
    skills TEXT[],
    technologies TEXT[],
    achievements TEXT[],
    urls JSONB DEFAULT '{}', -- project_url, github_url, credential_url, etc.
    
    -- Display and filtering
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE, -- Highlight on homepage
    is_visible BOOLEAN DEFAULT TRUE,
    resume_priority INTEGER DEFAULT 5, -- 1-10 for AI resume selection
    
    -- Metadata
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
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
    created_at TIMESTAMP DEFAULT NOW()
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
    created_at TIMESTAMP DEFAULT NOW()
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
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Website content with glassmorphism sections
CREATE TABLE website_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section VARCHAR(50) NOT NULL UNIQUE,
    title TEXT,
    content TEXT,
    metadata JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- AI patterns for learning and optimization
CREATE TABLE ai_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_version_id UUID REFERENCES resume_versions(id),
    job_analysis JSONB NOT NULL,
    entity_selection JSONB NOT NULL, -- Which entities were selected and why
    success_metrics JSONB DEFAULT '{}',
    user_feedback TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🤖 AI Integration

### LangChain.js Agent
```typescript
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

export class ResumeAIAgent {
  private llm: ChatOpenAI;
  private analyzer: RunnableSequence;
  private generator: RunnableSequence;

  // Job description analysis
  async analyzeJobDescription(jobDescription: string);

  // Generate tailored resume content
  async generateTailoredResume(params: {
    jobDescription: string;
    targetCompany: string;
    experiences: any[];
    successfulPatterns?: any[];
  });

  // Learn from successful patterns
  private async archiveSuccessfulPattern(data: any);
}
```

### AI Features
- **Job Analysis**: Extract requirements, skills, seniority level
- **Content Tailoring**: Select and optimize experiences for specific jobs
- **Pattern Learning**: Improve based on successful applications
- **Template Processing**: Generate DOCX files from templates

## 🔄 Data Flow

### Public Site (Static)
```
Database → Static Generation → JSON Files → Next.js Build → CDN
```

### Admin Interface (Dynamic)
```
Admin Action → Database Update → Real-time UI → Publish Trigger → Static Rebuild
```

### AI Resume Generation
```
Job Description → LangChain Analysis → Experience Selection → DOCX Generation → Download
```

## 💡 Key Features

### Public Portfolio (Single Page)
- Hero section with profile and bio
- About me section with stats
- Technical skills showcase
- Work experience timeline
- Education section
- Projects showcase with filtering
- Awards and certifications
- Contact form
- Resume/CV download
- Social media links
- SEO optimized static generation

### Admin CMS
- Personal info management
- Work experience CRUD
- Education management
- Project management
- Awards/certifications CRUD
- Skills management
- Media library
- AI resume generation
- Website content editing
- Analytics and patterns

### AI Capabilities
- Intelligent job analysis
- Experience selection optimization
- Content tailoring for specific roles
- Template-based document generation
- Learning from successful patterns
- Company-specific customization

## 🎨 Design Principles

### Public Site
- Modern, professional design
- Fast loading (static files)
- Mobile-first responsive
- Accessibility compliant
- SEO optimized
- Clean typography

### Admin Interface
- Intuitive dashboard design
- Efficient bulk operations
- Real-time updates
- Progress indicators
- Error handling
- Keyboard shortcuts

## 🚀 Performance Targets

### Public Site
- **Loading**: < 1 second first load
- **Lighthouse**: 95+ on all metrics
- **Bundle Size**: < 100KB initial
- **SEO**: Fully static HTML

### Admin Interface
- **Response Time**: < 200ms for CRUD operations
- **File Uploads**: Progress indicators, drag-and-drop
- **Real-time Updates**: WebSocket connections
- **Caching**: Intelligent query caching

## 💰 Cost Management

### Free Tier Limits
- **Supabase**: 500MB DB, 1GB storage, 50K API calls
- **Vercel**: 100GB bandwidth, unlimited builds
- **AI Usage**: Pay-per-use (admin only)

### Optimization Strategies
- Static generation eliminates runtime costs
- Admin-only AI usage
- Efficient database queries
- CDN for media files
- Intelligent caching

## 🔐 Security & Authentication

### Admin Security
- Supabase Auth integration
- Protected API routes
- Input validation with Zod
- File upload restrictions
- Rate limiting

### Data Protection
- Admin/public data separation
- Secure file storage
- Environment variable management
- SQL injection prevention

## 📱 Mobile Considerations

### Responsive Design
- Mobile-first approach
- Touch-friendly admin interface
- Optimized media loading
- Keyboard navigation
- Accessibility features

## 🧪 Testing Strategy

### Unit Tests
- Database queries
- AI agent functions
- Utility functions
- Component logic

### Integration Tests
- API endpoints
- Authentication flows
- File upload processes
- Static generation

### E2E Tests
- Admin workflows
- Public site navigation
- Form submissions
- Download functionality

## 🔧 Development Workflow

### Local Development
1. Set up Supabase project
2. Configure environment variables
3. Install dependencies
4. Run development server
5. Test admin and public routes

### Deployment
1. Push to Git repository
2. Vercel auto-deploys
3. Environment variables synced
4. Static files served from CDN
5. Database migrations applied

## 📊 Monitoring & Analytics

### Performance Monitoring
- Vercel analytics
- Core Web Vitals
- Database query performance
- AI usage tracking

### User Analytics
- Public site visits
- Download tracking
- Admin usage patterns
- Error monitoring

## 🎯 Success Metrics

### Public Portfolio
- Fast loading times
- High SEO scores
- Low bounce rates
- Download conversions

### Admin Efficiency
- Quick content updates
- Successful resume generations
- Pattern learning improvement
- Media management efficiency

## 🔄 Maintenance

### Regular Tasks
- Database cleanup
- Media optimization
- Security updates
- Performance monitoring

### Scaling Considerations
- Database growth management
- CDN optimization
- AI cost monitoring
- Feature usage analytics

---

## 📝 Current Context

**User Goal**: Build a comprehensive portfolio website with AI-powered resume generation and content management system.

**Technical Requirements**:
- Zero-cost public hosting
- Modern tech stack (Next.js 15, Tailwind 4)
- LangChain.js AI integration
- Supabase backend
- Static generation for performance

**Key Constraints**:
- Free tier resource limits
- Admin-only AI usage
- Static public pages
- Scalable architecture

**Next Steps**: Begin with project setup, database schema creation, and basic Next.js configuration.