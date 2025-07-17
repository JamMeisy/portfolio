'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import type { PersonalInfo } from '@/lib/supabase/database.types'

interface FooterProps {
  personalInfo: PersonalInfo | null
}

export function Footer({ personalInfo }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const socialLinks = personalInfo?.social_links as any

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-background/80 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">
              {personalInfo?.name || 'Your Name'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {personalInfo?.title || personalInfo?.headline || 'Your Professional Title'}
            </p>
            <div className="flex space-x-4">
              {socialLinks?.github && (
                <Button variant="ghost" size="sm" className="glass-button" asChild>
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {socialLinks?.linkedin && (
                <Button variant="ghost" size="sm" className="glass-button" asChild>
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {personalInfo?.email && (
                <Button variant="ghost" size="sm" className="glass-button" asChild>
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const element = document.querySelector(link.href)
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Status & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <p className="text-muted-foreground text-sm">
              Ready to start a conversation? I'd love to hear from you.
            </p>
            <div className="space-y-2">
              <Badge variant="secondary" className="glass-card">
                🚀 Available for opportunities
              </Badge>
              <Badge variant="outline" className="glass-card">
                💼 Open for freelance
              </Badge>
            </div>
            {personalInfo?.email && (
              <Button className="w-full glass-button gradient-bg text-primary-foreground" asChild>
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} {personalInfo?.name || 'Your Name'}. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>using Next.js & Tailwind CSS</span>
            </div>
            
            {/* Back to Top */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="glass-button group"
            >
              <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
              Back to Top
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>
    </footer>
  )
}