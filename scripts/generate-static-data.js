#!/usr/bin/env node

/**
 * Static Data Generation Script
 * Generates JSON files from database for static site consumption
 */

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function generateStaticData() {
  try {
    console.log('🔄 Generating static data...')
    
    // Ensure public/data directory exists
    const dataDir = path.join(process.cwd(), 'public', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Fetch all required data
    const [contentResult, skillsResult, personalResult] = await Promise.all([
      supabase
        .from('content_entities')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true }),
      
      supabase
        .from('skills')
        .select('*')
        .eq('is_visible', true)
        .order('proficiency_level', { ascending: false }),
      
      supabase
        .from('personal_info')
        .select('*')
        .single()
    ])

    if (contentResult.error) {
      throw new Error(`Content entities error: ${contentResult.error.message}`)
    }

    if (skillsResult.error) {
      throw new Error(`Skills error: ${skillsResult.error.message}`)
    }

    const contentEntities = contentResult.data || []
    const skills = skillsResult.data || []
    const personalInfo = personalResult.data

    // Group content by type
    const contentByType = contentEntities.reduce((acc, entity) => {
      if (!acc[entity.entity_type]) {
        acc[entity.entity_type] = []
      }
      acc[entity.entity_type].push(entity)
      return acc
    }, {})

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
      const category = skill.category || 'technical'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    }, {})

    // Calculate stats
    const stats = {
      experience: contentByType.work?.length || 0,
      projects: contentByType.project?.length || 0,
      education: contentByType.education?.length || 0,
      certifications: contentByType.certification?.length || 0,
    }

    // Get featured content
    const featuredContent = contentEntities
      .filter(entity => entity.is_featured)
      .slice(0, 6)

    // Prepare static data
    const staticData = {
      contentEntities,
      contentByType,
      skills,
      skillsByCategory,
      personalInfo,
      stats,
      featuredContent,
      metadata: {
        lastUpdated: new Date().toISOString(),
        totalEntities: contentEntities.length,
        totalSkills: skills.length,
        hasPersonalInfo: !!personalInfo,
      }
    }

    // Write main portfolio data
    fs.writeFileSync(
      path.join(dataDir, 'portfolio.json'),
      JSON.stringify(staticData, null, 2)
    )

    // Write individual files for better performance
    fs.writeFileSync(
      path.join(dataDir, 'content-entities.json'),
      JSON.stringify(contentEntities, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'skills.json'),
      JSON.stringify(skills, null, 2)
    )

    fs.writeFileSync(
      path.join(dataDir, 'personal-info.json'),
      JSON.stringify(personalInfo, null, 2)
    )

    console.log('✅ Static data generated successfully!')
    console.log(`📊 Generated ${contentEntities.length} content entities`)
    console.log(`🎯 Generated ${skills.length} skills`)
    console.log(`📝 Generated personal info: ${!!personalInfo}`)
    
  } catch (error) {
    console.error('❌ Static data generation failed:', error)
    process.exit(1)
  }
}

// Run the generation
generateStaticData()