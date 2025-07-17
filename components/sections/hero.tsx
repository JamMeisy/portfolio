'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import type { PersonalInfo } from '@/lib/supabase/database.types'

interface HeroSectionProps {
  personalInfo: PersonalInfo | null
  featuredContent?: any[]
}

export function HeroSection({ personalInfo, featuredContent }: HeroSectionProps) {
  const socialLinks = personalInfo?.social_links as any

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile & Social */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start space-y-8"
          >
            {/* Profile Image */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-80 h-80 rounded-full overflow-hidden glass-card border-2 border-primary/20"
              >
                <Image
                  src={personalInfo?.profile_image_url || '/images/profile/profile-main.jpg'}
                  alt={personalInfo?.name || 'Profile'}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 -right-4 glass-card px-4 py-2"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
              </motion.div>
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-muted-foreground mb-4">
                <Mail className="w-4 h-4" />
                <span>{personalInfo?.email}</span>
              </div>
              
              {personalInfo?.location && (
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex space-x-4"
            >
              {socialLinks?.github && (
                <Button variant="ghost" size="lg" className="glass-button" asChild>
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {socialLinks?.linkedin && (
                <Button variant="ghost" size="lg" className="glass-button" asChild>
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {personalInfo?.email && (
                <Button variant="ghost" size="lg" className="glass-button" asChild>
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Text Content */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl font-semibold text-foreground"
              >
                Hello! I'm
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-6xl lg:text-7xl font-bold gradient-text leading-tight"
              >
                {personalInfo?.name || 'Your Name'}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-muted-foreground font-light"
              >
                {personalInfo?.title || personalInfo?.headline || 'Your Professional Title'}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-lg text-foreground leading-relaxed max-w-2xl"
              >
                {personalInfo?.bio || 'Tell the world about yourself, your experience, and what drives you.'}
              </motion.p>
            </div>

            {/* Featured Tags */}
            {featuredContent && featuredContent.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-3"
              >
                {featuredContent.map((content, index) => (
                  <Badge key={content.id} variant="secondary" className="glass-card px-4 py-2">
                    {content.title}
                  </Badge>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button size="lg" className="glass-button gradient-bg text-primary-foreground">
                <ExternalLink className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              
              <Button size="lg" variant="outline" className="glass-button">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}