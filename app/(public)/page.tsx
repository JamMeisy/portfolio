import { Suspense } from 'react'
import { HeroSection } from '@/components/public/hero/hero-section'
import { AboutSection } from '@/components/public/about/about-section'
import { ContentSections } from '@/components/public/content/content-sections'
import { TechStackSection } from '@/components/public/tech-stack/tech-stack-section'
import { ContactSection } from '@/components/public/contact/contact-section'
import { Header } from '@/components/public/layout/header'
import { Footer } from '@/components/public/layout/footer'
import { FloatingElements } from '@/components/shared/effects/floating-elements'
import portfolioData from '@/public/data/portfolio.json'

export default async function PortfolioPage() {
  // Load static portfolio data
  const {
    personalInfo,
    contentEntities,
    skills,
    contentByType: groupedContent,
    stats
  } = portfolioData

  return (
    <div className="min-h-screen bg-background dark hero-gradient">
      <FloatingElements />
      
      {/* Fixed Header */}
      <Header personalInfo={personalInfo} />
      
      <main className="relative pt-16">
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
            stats={stats}
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
      <Footer personalInfo={personalInfo} />
    </div>
  )
}