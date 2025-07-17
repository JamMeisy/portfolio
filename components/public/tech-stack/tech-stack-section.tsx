'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { Skill } from '@/lib/supabase/database.types'

interface TechStackSectionProps {
  skills: Skill[] | null
}

const skillCategories = {
  technical: { label: 'Technical Skills', color: 'text-blue-500' },
  framework: { label: 'Frameworks', color: 'text-green-500' },
  tool: { label: 'Tools', color: 'text-purple-500' },
  language: { label: 'Languages', color: 'text-orange-500' },
  soft: { label: 'Soft Skills', color: 'text-pink-500' }
}

const proficiencyLevels = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Expert',
  'Master'
]

export function TechStackSection({ skills }: TechStackSectionProps) {
  if (!skills || skills.length === 0) return null

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'technical'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  // Get featured skills (highest proficiency)
  const featuredSkills = skills
    .filter(skill => skill.is_featured || skill.proficiency_level >= 4)
    .slice(0, 12)

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
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit built through years of experience and continuous learning
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Featured Skills Grid */}
        {featuredSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-semibold text-center mb-8 gradient-text">
              Core Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="glass-card p-6 text-center group cursor-pointer"
                >
                  {/* Skill Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                      {/* Try to load skill icon, fallback to initials */}
                      <div className="text-2xl font-bold gradient-text">
                        {skill.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Skill Name */}
                  <h4 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {skill.name}
                  </h4>
                  
                  {/* Proficiency Level */}
                  <div className="flex justify-center">
                    <Badge 
                      variant="outline" 
                      className="text-xs glass-card border-primary/30"
                    >
                      {proficiencyLevels[skill.proficiency_level - 1] || 'Intermediate'}
                    </Badge>
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="mt-3 w-full bg-muted/20 rounded-full h-1.5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills by Category */}
        <div className="grid lg:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const config = skillCategories[category as keyof typeof skillCategories] || 
                          { label: category.charAt(0).toUpperCase() + category.slice(1), color: 'text-primary' }
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * categoryIndex }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <h3 className={`text-xl font-semibold mb-6 flex items-center ${config.color}`}>
                  <span className="w-2 h-2 rounded-full bg-current mr-3" />
                  {config.label}
                </h3>
                
                <div className="space-y-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        {skill.years_experience && (
                          <Badge variant="outline" className="text-xs">
                            {skill.years_experience}y
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {skill.endorsements > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {skill.endorsements} endorsements
                          </span>
                        )}
                        <div className="w-20 bg-muted/20 rounded-full h-2">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 + (0.1 * index) }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}