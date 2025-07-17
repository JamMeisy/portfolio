/**
 * Static Site Generation Utilities
 * 
 * Functions for generating static content from CMS data
 * and triggering rebuild processes.
 */

import { createClient } from '@/lib/supabase/client'
import type { ContentEntity, PersonalInfo, Skill } from '@/lib/supabase/database.types'

/**
 * Fetch all data needed for static generation
 */
export async function fetchStaticData() {
  const supabase = createClient()
  
  try {
    // Fetch all content entities
    const { data: contentEntities, error: contentError } = await supabase
      .from('content_entities')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true })
    
    if (contentError) throw contentError

    // Fetch personal info
    const { data: personalInfo, error: personalError } = await supabase
      .from('personal_info')
      .select('*')
      .single()
    
    if (personalError && personalError.code !== 'PGRST116') {
      throw personalError
    }

    // Fetch skills
    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .eq('is_visible', true)
      .order('proficiency_level', { ascending: false })
    
    if (skillsError) throw skillsError

    return {
      contentEntities: contentEntities || [],
      personalInfo: personalInfo || null,
      skills: skills || [],
      success: true,
    }
  } catch (error) {
    console.error('Error fetching static data:', error)
    return {
      contentEntities: [],
      personalInfo: null,
      skills: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Generate JSON files for static consumption
 */
export async function generateStaticFiles() {
  const data = await fetchStaticData()
  
  if (!data.success) {
    throw new Error(`Failed to fetch data: ${data.error}`)
  }

  // Organize content by type for easier consumption
  const contentByType = data.contentEntities.reduce((acc, entity) => {
    if (!acc[entity.entity_type]) {
      acc[entity.entity_type] = []
    }
    acc[entity.entity_type].push(entity)
    return acc
  }, {} as Record<string, ContentEntity[]>)

  // Calculate stats for about section
  const stats = {
    experience: contentByType.work?.length || 0,
    projects: contentByType.project?.length || 0,
    education: contentByType.education?.length || 0,
    certifications: contentByType.certification?.length || 0,
  }

  // Get featured content for hero section
  const featuredContent = data.contentEntities
    .filter(entity => entity.is_featured)
    .slice(0, 6)

  // Group skills by category
  const skillsByCategory = data.skills.reduce((acc, skill) => {
    const category = skill.category || 'technical'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const staticData = {
    personalInfo: data.personalInfo,
    contentEntities: data.contentEntities,
    contentByType,
    skills: data.skills,
    skillsByCategory,
    stats,
    featuredContent,
    lastUpdated: new Date().toISOString(),
  }

  return staticData
}

/**
 * Trigger static site rebuild (for development)
 */
export async function triggerRebuild() {
  try {
    // In production, this would trigger a Vercel deployment
    // For development, we just regenerate the static data
    const staticData = await generateStaticFiles()
    
    console.log('Static rebuild triggered:', {
      entities: staticData.contentEntities.length,
      skills: staticData.skills.length,
      lastUpdated: staticData.lastUpdated,
    })

    return {
      success: true,
      data: staticData,
      message: 'Static data regenerated successfully',
    }
  } catch (error) {
    console.error('Rebuild failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Validate static data integrity
 */
export function validateStaticData(data: any) {
  const errors: string[] = []

  // Check personal info
  if (!data.personalInfo) {
    errors.push('Personal info is missing')
  } else {
    if (!data.personalInfo.name) errors.push('Personal name is required')
    if (!data.personalInfo.email) errors.push('Personal email is required')
  }

  // Check content entities
  if (!Array.isArray(data.contentEntities)) {
    errors.push('Content entities should be an array')
  } else {
    data.contentEntities.forEach((entity: any, index: number) => {
      if (!entity.id) errors.push(`Content entity ${index} missing ID`)
      if (!entity.title) errors.push(`Content entity ${index} missing title`)
      if (!entity.entity_type) errors.push(`Content entity ${index} missing entity_type`)
    })
  }

  // Check skills
  if (!Array.isArray(data.skills)) {
    errors.push('Skills should be an array')
  } else {
    data.skills.forEach((skill: any, index: number) => {
      if (!skill.id) errors.push(`Skill ${index} missing ID`)
      if (!skill.name) errors.push(`Skill ${index} missing name`)
      if (typeof skill.proficiency_level !== 'number') {
        errors.push(`Skill ${index} missing valid proficiency_level`)
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Cache management for static data
 */
export class StaticDataCache {
  private static instance: StaticDataCache
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  static getInstance() {
    if (!StaticDataCache.instance) {
      StaticDataCache.instance = new StaticDataCache()
    }
    return StaticDataCache.instance
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  get(key: string) {
    const cached = this.cache.get(key)
    if (!cached) return null

    const isExpired = Date.now() - cached.timestamp > this.CACHE_TTL
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  clear() {
    this.cache.clear()
  }

  invalidate(key: string) {
    this.cache.delete(key)
  }
}

/**
 * Development utilities
 */
export const devUtils = {
  /**
   * Mock data for development
   */
  generateMockData() {
    return {
      personalInfo: {
        id: '1',
        name: 'John Doe',
        title: 'Full Stack Developer',
        email: 'john@example.com',
        bio: 'Passionate developer with 5+ years of experience.',
        location: 'San Francisco, CA',
        social_links: {
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
        },
      },
      contentEntities: [
        {
          id: '1',
          entity_type: 'work',
          title: 'Senior Developer',
          subtitle: 'Tech Company',
          description: 'Built amazing applications.',
          date_start: '2020-01-01',
          date_end: null,
          is_current: true,
          is_featured: true,
          is_visible: true,
          display_order: 1,
        },
      ],
      skills: [
        {
          id: '1',
          name: 'TypeScript',
          category: 'technical',
          proficiency_level: 5,
          years_experience: 4,
          is_featured: true,
          is_visible: true,
        },
      ],
    }
  },

  /**
   * Log static data summary
   */
  logDataSummary(data: any) {
    console.log('📊 Static Data Summary:')
    console.log(`├── Personal Info: ${data.personalInfo ? '✅' : '❌'}`)
    console.log(`├── Content Entities: ${data.contentEntities?.length || 0}`)
    console.log(`├── Skills: ${data.skills?.length || 0}`)
    console.log(`└── Last Updated: ${data.lastUpdated || 'Never'}`)
    
    if (data.contentByType) {
      console.log('\n📋 Content by Type:')
      Object.entries(data.contentByType).forEach(([type, items]: [string, any]) => {
        console.log(`├── ${type}: ${items.length}`)
      })
    }
  },
}