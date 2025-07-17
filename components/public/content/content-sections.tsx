'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ExternalLink, Github, Award, Briefcase, GraduationCap, Heart, Bookmark, Users } from 'lucide-react'
import type { ContentEntity } from '@/lib/supabase/database.types'

interface ContentSectionsProps {
  contentEntities: ContentEntity[] | null
}

const entityTypeConfig = {
  work: {
    title: 'Professional Experience',
    icon: Briefcase,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'My professional journey and career highlights'
  },
  project: {
    title: 'Featured Projects',
    icon: Bookmark,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Projects and applications I have built'
  },
  education: {
    title: 'Education',
    icon: GraduationCap,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Academic background and qualifications'
  },
  certification: {
    title: 'Certifications',
    icon: Award,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    description: 'Professional certifications and achievements'
  },
  volunteer: {
    title: 'Volunteer Work',
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    description: 'Community involvement and volunteer experiences'
  },
  publication: {
    title: 'Publications',
    icon: ExternalLink,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    description: 'Articles, papers, and written contributions'
  },
  award: {
    title: 'Awards & Recognition',
    icon: Award,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    description: 'Recognition and achievements'
  },
  course: {
    title: 'Courses & Training',
    icon: GraduationCap,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    description: 'Additional training and coursework'
  },
  organization: {
    title: 'Organizations',
    icon: Users,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    description: 'Professional organizations and memberships'
  }
}

function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

function formatDateRange(startDate: string, endDate: string | null, isCurrent: boolean) {
  const start = formatDate(startDate)
  if (isCurrent) return `${start} - Present`
  const end = endDate ? formatDate(endDate) : ''
  return end ? `${start} - ${end}` : start
}

export function ContentSections({ contentEntities }: ContentSectionsProps) {
  if (!contentEntities || contentEntities.length === 0) {
    return (
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">No content available yet.</p>
        </div>
      </div>
    )
  }

  // Group content by entity type
  const groupedContent = contentEntities.reduce((acc, entity) => {
    if (!acc[entity.entity_type]) {
      acc[entity.entity_type] = []
    }
    acc[entity.entity_type].push(entity)
    return acc
  }, {} as Record<string, ContentEntity[]>)

  // Sort each group by display_order, then by date
  Object.keys(groupedContent).forEach(type => {
    groupedContent[type].sort((a, b) => {
      if (a.display_order !== b.display_order) {
        return a.display_order - b.display_order
      }
      // Sort by start date descending (most recent first)
      return new Date(b.date_start || '').getTime() - new Date(a.date_start || '').getTime()
    })
  })

  // Determine which sections to show and their order
  const sectionOrder = ['work', 'project', 'education', 'certification', 'volunteer', 'publication', 'award', 'course', 'organization']
  const visibleSections = sectionOrder.filter(type => groupedContent[type]?.length > 0)

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-20">
        {visibleSections.map((entityType, sectionIndex) => {
          const config = entityTypeConfig[entityType as keyof typeof entityTypeConfig]
          const entities = groupedContent[entityType]
          const Icon = config.icon

          return (
            <motion.section
              key={entityType}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * sectionIndex }}
              viewport={{ once: true }}
              id={entityType}
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
                  viewport={{ once: true }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.bgColor} mb-6`}
                >
                  <Icon className={`w-8 h-8 ${config.color}`} />
                </motion.div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  <span className="gradient-text">{config.title}</span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {config.description}
                </p>
                
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6" />
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {entities.map((entity, index) => (
                  <motion.div
                    key={entity.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`glass-card p-8 relative group ${entity.is_featured ? 'ring-2 ring-primary/30' : ''}`}
                  >
                    {/* Featured Badge */}
                    {entity.is_featured && (
                      <div className="absolute -top-3 -right-3">
                        <Badge className="glass-card gradient-bg text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {entity.title}
                        </h3>
                        {entity.subtitle && (
                          <p className="text-lg text-muted-foreground font-medium">
                            {entity.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 mb-4">
                      {(entity.date_start || entity.date_end) && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDateRange(entity.date_start, entity.date_end, entity.is_current)}
                        </div>
                      )}
                      
                      {entity.metadata?.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {entity.metadata.location}
                        </div>
                      )}

                      {entity.metadata?.company && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {entity.metadata.company}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {entity.description && (
                      <p className="text-foreground leading-relaxed mb-6">
                        {entity.description}
                      </p>
                    )}

                    {/* Technologies/Skills */}
                    {entity.metadata?.technologies && entity.metadata.technologies.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {entity.metadata.technologies.map((tech: string, techIndex: number) => (
                            <Badge key={techIndex} variant="outline" className="glass-card text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {entity.metadata?.project_url && (
                        <Button variant="outline" size="sm" className="glass-button" asChild>
                          <a href={entity.metadata.project_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </a>
                        </Button>
                      )}
                      
                      {entity.metadata?.github_url && (
                        <Button variant="outline" size="sm" className="glass-button" asChild>
                          <a href={entity.metadata.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      )}

                      {entity.metadata?.credential_url && (
                        <Button variant="outline" size="sm" className="glass-button" asChild>
                          <a href={entity.metadata.credential_url} target="_blank" rel="noopener noreferrer">
                            <Award className="w-4 h-4 mr-2" />
                            View Credential
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )
        })}
      </div>
    </div>
  )
}