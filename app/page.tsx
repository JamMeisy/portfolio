import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { HeroSection } from '@/components/portfolio/hero/hero-section'
import { AboutSection } from '@/components/portfolio/about/about-section'
import { ContentSections } from '@/components/portfolio/content-sections/content-sections'
import { TechStackSection } from '@/components/portfolio/tech-stack/tech-stack-section'
import { ContactSection } from '@/components/portfolio/contact/contact-section'
import { NavigationBar } from '@/components/portfolio/navigation/navigation-bar'
import { FooterSection } from '@/components/portfolio/footer/footer-section'
import { FloatingElements } from '@/components/portfolio/effects/floating-elements'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function PortfolioPage() {
  const supabase = createServerSupabaseClient()
  
  // Fetch all portfolio data
  const [
    { data: personalInfo },
    { data: contentEntities },
    { data: skills },
    { data: websiteContent }
  ] = await Promise.all([
    supabase
      .from('personal_info')
      .select('*')
      .single(),
    supabase
      .from('content_entities')
      .select(`
        *,
        media_files (*)
      `)
      .eq('is_visible', true)
      .order('display_order'),
    supabase
      .from('skills')
      .select('*')
      .eq('is_visible', true)
      .order('display_order'),
    supabase
      .from('website_content')
      .select('*')
      .eq('is_published', true)
  ])

  // Group content entities by type for organized display
  const groupedContent = contentEntities?.reduce((acc, entity) => {
    if (!acc[entity.entity_type]) {
      acc[entity.entity_type] = []
    }
    acc[entity.entity_type].push(entity)
    return acc
  }, {} as Record<string, any[]>) || {}

  return (
    <div className="min-h-screen bg-background dark hero-gradient">
      <FloatingElements />
      
      {/* Fixed Navigation */}
      <NavigationBar />
      
      <main className="relative">
        {/* Hero Section */}
        <section id="home">
          <Suspense fallback={<div className="h-screen" />}>
            <HeroSection 
              personalInfo={personalInfo} 
              featuredContent={contentEntities?.filter(c => c.is_featured).slice(0, 3)}
            />
          </Suspense>
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection 
            personalInfo={personalInfo} 
            stats={{
              experience: groupedContent.work?.length || 0,
              projects: groupedContent.projects?.length || 0,
              education: groupedContent.education?.length || 0,
              certifications: groupedContent.certifications?.length || 0
            }}
          />
        </section>

        {/* Tech Stack */}
        <section id="skills">
          <TechStackSection skills={skills} />
        </section>

        {/* Content Sections (LinkedIn-style) */}
        <section id="experience">
          <ContentSections 
            groupedContent={groupedContent}
            contentOrder={[
              'work',
              'projects', 
              'education',
              'certifications',
              'volunteer',
              'publications',
              'awards',
              'courses',
              'organizations'
            ]}
          />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection personalInfo={personalInfo} />
        </section>
      </main>

      {/* Footer */}
      <FooterSection personalInfo={personalInfo} />
    </div>
  )
}