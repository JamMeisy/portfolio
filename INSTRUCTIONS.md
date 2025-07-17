# Portfolio Website Setup Instructions

This is a comprehensive AI-powered portfolio website with admin CMS, resume generation, and content management features.

## 🏗️ System Architecture

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS 4
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth (admin-only access)
- **AI**: LangChain.js with OpenAI/Anthropic for resume generation
- **File Storage**: Supabase Storage for media files
- **Deployment**: Vercel (free tier compatible)

## 📋 Prerequisites

1. **Node.js**: Version 18.0 or higher
2. **npm/yarn**: Package manager
3. **Supabase Account**: For database and authentication
4. **OpenAI API Key**: For AI-powered resume generation
5. **SMTP Credentials**: For contact form emails (optional)

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd portfolio
npm install
```

### 2. Environment Variables Setup

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Fill in the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Configuration
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Email Configuration (for contact forms)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf

# Environment
NODE_ENV=development
```

### 3. Supabase Database Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema** by copying the contents of `database/schema.sql` and executing it in the Supabase SQL editor.

3. **Set up Row Level Security policies** (included in the schema file)

4. **Configure Storage** for file uploads:
   - Go to Storage in your Supabase dashboard
   - Create a bucket named `portfolio-media`
   - Set bucket policies for public read access

### 4. Authentication Setup

1. **Enable Email Auth** in Supabase Auth settings
2. **Add your admin email** to the auth users (you can do this via Supabase dashboard)
3. **Configure redirect URLs**:
   - Site URL: `http://localhost:3000` (development)
   - Redirect URLs: `http://localhost:3000/admin/login`

### 5. AI API Setup

1. **OpenAI API**:
   - Get API key from [platform.openai.com](https://platform.openai.com)
   - Add to `OPENAI_API_KEY` environment variable

2. **Anthropic API** (optional):
   - Get API key from [console.anthropic.com](https://console.anthropic.com)
   - Add to `ANTHROPIC_API_KEY` environment variable

### 6. Development Server

Start the development server:

```bash
npm run dev
```

Visit:
- **Public Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js 15 App Router
│   ├── page.tsx                  # Public portfolio homepage
│   ├── admin/                    # Admin panel
│   │   ├── layout.tsx            # Admin authentication wrapper
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── experiences/          # Experience management
│   │   ├── media/                # Media library
│   │   ├── resume/               # AI resume generator
│   │   ├── website/              # Website content CMS
│   │   └── settings/             # Admin settings
│   └── api/                      # API routes
│       ├── admin/                # Protected admin APIs
│       └── public/               # Public APIs (contact, downloads)
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── admin/                    # Admin panel components
│   └── public/                   # Public website components
├── lib/
│   ├── supabase/                 # Database client and queries
│   ├── ai/                       # LangChain AI agents
│   └── utils/                    # Utility functions
├── database/
│   └── schema.sql                # Complete database schema
└── public/
    ├── images/                   # Static images
    └── templates/                # Resume templates
```

## 🗄️ Database Schema

The system uses a comprehensive database schema with the following main tables:

### Core Tables
- `personal_info`: Your personal information
- `experiences`: Work, education, projects (categorized)
- `education`: Academic background
- `projects`: Personal and professional projects
- `awards`: Certifications and awards
- `skills`: Technical and soft skills
- `media_files`: File attachments for any entity
- `website_content`: CMS content for static pages
- `resume_versions`: Stored AI-generated resumes
- `ai_patterns`: Learning patterns for resume optimization

### Experience Categories
- `work`: Full-time, part-time, contract work
- `volunteer`: Volunteer work and community service
- `personal`: Personal projects and side projects
- `academic`: Research, thesis, academic projects
- `freelance`: Freelance and consulting work
- `internship`: Internships and co-ops
- `leadership`: Leadership roles and positions
- `entrepreneurial`: Startups, business ventures

## 🎨 Asset Management

### Image Assets (public/images/)

Create the following image asset structure:

```
public/images/
├── icons/
│   ├── social/                   # Social media icons
│   │   ├── linkedin.svg
│   │   ├── github.svg
│   │   ├── twitter.svg
│   │   ├── instagram.svg
│   │   └── email.svg
│   └── tech/                     # Technology/skill icons
│       ├── react.svg
│       ├── nextjs.svg
│       ├── typescript.svg
│       ├── javascript.svg
│       ├── python.svg
│       ├── nodejs.svg
│       ├── docker.svg
│       ├── aws.svg
│       ├── figma.svg
│       ├── tailwindcss.svg
│       ├── postgresql.svg
│       ├── mongodb.svg
│       ├── git.svg
│       ├── html5.svg
│       ├── css3.svg
│       └── java.svg
├── profile/
│   ├── profile-main.jpg          # Main profile image
│   ├── profile-about.jpg         # About section image
│   └── profile-contact.jpg       # Contact section image
├── projects/
│   └── [project-screenshots]    # Project images
├── experiences/
│   └── [company-logos]          # Company/organization logos
└── general/
    ├── hero-background.jpg       # Hero section background
    ├── about-background.jpg      # About section background
    └── contact-background.jpg    # Contact section background
```

### Recommended Image Formats
- **Icons**: SVG (scalable, small file size)
- **Photos**: WebP or JPG (optimized for web)
- **Logos**: SVG or PNG with transparency

## 🤖 AI Resume Generator Features

The AI system includes:

1. **Job Description Analysis**: Extracts key requirements and skills
2. **Experience Matching**: Selects most relevant experiences
3. **Content Tailoring**: Customizes descriptions for specific roles
4. **Template Generation**: Creates DOCX files using professional templates
5. **Version Management**: Stores different resume versions
6. **Learning System**: Improves recommendations based on success patterns

### Resume Templates
- Harvard Business School format
- Modern tech-focused layout
- Minimal clean design
- ATS-optimized format

## 📧 Contact Form Setup

To enable the contact form email functionality:

1. **Configure SMTP settings** in your `.env.local`
2. **Create email templates** in `lib/email/templates/`
3. **Test email delivery** using the admin panel

Supported email providers:
- Gmail (with app passwords)
- SendGrid
- Mailgun
- Custom SMTP servers

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Configure custom domain** (optional)
4. **Set up automatic deployments** from your main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_URL=https://your-domain.com
# ... other production variables
```

## 🔧 Development Workflow

### Adding New Content

1. **Access Admin Panel**: http://localhost:3000/admin
2. **Login** with your admin credentials
3. **Manage content** through the intuitive interface:
   - Add work experiences, education, projects
   - Upload media files and images
   - Customize website content
   - Generate AI-powered resumes

### Customizing Design

1. **Edit CSS variables** in `app/globals.css`
2. **Modify Tailwind config** in `tailwind.config.mjs`
3. **Update components** in `components/` directory
4. **Test responsiveness** across devices

### Adding New Features

1. **Database changes**: Update `database/schema.sql`
2. **API endpoints**: Add to `app/api/`
3. **Components**: Create in `components/`
4. **Pages**: Add to `app/`

## 🐳 Docker Support

A Docker configuration is provided for containerized deployment:

```bash
# Build and run with Docker
docker build -t portfolio .
docker run -p 3000:3000 portfolio

# Or use Docker Compose
docker-compose up -d
```

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- Admin-only authentication for CMS
- File upload restrictions and validation
- Environment variable protection
- CSRF protection on forms
- Input sanitization and validation

## 📊 Analytics and Monitoring

The system includes:
- Built-in analytics dashboard
- Resume download tracking
- Contact form submission monitoring
- Performance metrics
- Error logging and monitoring

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Verify Supabase URL and keys
   - Check network connectivity
   - Ensure RLS policies are correct

2. **Authentication Problems**:
   - Verify redirect URLs in Supabase
   - Check admin user exists in auth.users
   - Confirm email/password combinations

3. **AI Resume Generation Errors**:
   - Verify OpenAI API key is valid
   - Check API quota and billing
   - Ensure proper environment variables

4. **File Upload Issues**:
   - Check Supabase storage bucket permissions
   - Verify file size limits
   - Confirm allowed file types

### Development Tips

- Use `npm run type-check` to validate TypeScript
- Run `npm run lint` to check code quality
- Test all admin features before deployment
- Backup database regularly during development

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [LangChain.js Documentation](https://js.langchain.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 🆘 Support

For issues and questions:
1. Check this documentation first
2. Review error logs in the browser console
3. Check Supabase dashboard for database issues
4. Verify all environment variables are set correctly

---

**Happy coding! 🚀**