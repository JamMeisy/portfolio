'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Briefcase, GraduationCap, Award, FolderOpen } from 'lucide-react'
import type { PersonalInfo } from '@/lib/supabase/database.types'

interface AboutSectionProps {
  personalInfo: PersonalInfo | null
  stats: {
    experience: number
    projects: number
    education: number
    certifications: number
  }
}

const statsConfig = [
  {
    key: 'experience' as const,
    label: 'Years Experience',
    icon: Briefcase,
    color: 'text-blue-500'
  },
  {
    key: 'projects' as const,
    label: 'Projects Completed',
    icon: FolderOpen,
    color: 'text-green-500'
  },
  {
    key: 'education' as const,
    label: 'Education',
    icon: GraduationCap,
    color: 'text-purple-500'
  },
  {
    key: 'certifications' as const,
    label: 'Certifications',
    icon: Award,
    color: 'text-orange-500'
  }
]

export function AboutSection({ personalInfo, stats }: AboutSectionProps) {
  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-8">
              <p className="text-lg text-foreground leading-relaxed">
                {personalInfo?.bio || 
                  `I'm a passionate developer with expertise in creating modern, scalable applications. 
                  My journey in technology has been driven by curiosity and a desire to solve complex problems 
                  through elegant code. I believe in continuous learning and staying at the forefront of 
                  technological innovation.`
                }
              </p>
            </div>

            {personalInfo?.headline && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-semibold mb-3 gradient-text">Professional Focus</h3>
                <p className="text-muted-foreground">{personalInfo.headline}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {statsConfig.map((stat, index) => {
              const Icon = stat.icon
              const value = stats[stat.key]
              
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className="glass-card p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <motion.div
                        className="text-3xl font-bold gradient-text"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.4 + (0.1 * index),
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        {value}+
                      </motion.div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h4 className="font-semibold mb-3 gradient-text">Current Status</h4>
              <div className="space-y-2">
                <Badge variant="secondary" className="glass-card">
                  🚀 Available for opportunities
                </Badge>
                <Badge variant="outline" className="glass-card">
                  🌱 Continuous learning
                </Badge>
                <Badge variant="outline" className="glass-card">
                  🎯 Open to collaboration
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}