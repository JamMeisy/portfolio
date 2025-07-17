'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Experience {
  id: string;
  title: string;
  organization: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  public_description: string | null;
  category: string | null;
  visibility: string;
  resume_priority: number;
  skills_developed: string[] | null;
  technologies_used: string[] | null;
  achievements: string[] | null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockExperiences: Experience[] = [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        organization: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        start_date: '2023-01-01',
        end_date: null,
        public_description: 'Leading development of scalable web applications using modern technologies.',
        category: 'work',
        visibility: 'public',
        resume_priority: 10,
        skills_developed: ['React', 'Node.js', 'AWS', 'TypeScript'],
        technologies_used: ['Next.js', 'PostgreSQL', 'Docker'],
        achievements: ['Led team of 5 developers', 'Improved performance by 40%']
      },
      {
        id: '2',
        title: 'Frontend Developer',
        organization: 'StartupXYZ',
        location: 'Remote',
        start_date: '2021-06-01',
        end_date: '2022-12-31',
        public_description: 'Built responsive user interfaces and improved user experience metrics.',
        category: 'work',
        visibility: 'public',
        resume_priority: 8,
        skills_developed: ['React', 'TailwindCSS', 'JavaScript'],
        technologies_used: ['React', 'Redux', 'Figma'],
        achievements: ['Improved UX metrics by 40%', 'Launched 3 major features']
      },
      {
        id: '3',
        title: 'Computer Science Degree',
        organization: 'University of Technology',
        location: 'Boston, MA',
        start_date: '2017-09-01',
        end_date: '2021-05-31',
        public_description: 'Bachelor of Science in Computer Science with focus on software engineering.',
        category: 'education',
        visibility: 'public',
        resume_priority: 6,
        skills_developed: ['Algorithms', 'Data Structures', 'Software Design'],
        technologies_used: ['Java', 'Python', 'C++'],
        achievements: ['Graduated Magna Cum Laude', 'Dean\'s List 6 semesters']
      }
    ];

    setTimeout(() => {
      setExperiences(mockExperiences);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         false;
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'education': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'volunteer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'private': return 'bg-red-100 text-red-800';
      case 'resume_only': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experiences</h1>
          <p className="text-muted-foreground">Manage your work, education, and project experiences</p>
        </div>
        <Button asChild>
          <Link href="/admin/experiences/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp}>
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search experiences..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'work', 'education', 'project', 'volunteer'].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">{experiences.length}</div>
            <div className="text-sm text-muted-foreground">Total Experiences</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {experiences.filter(e => e.category === 'work').length}
            </div>
            <div className="text-sm text-muted-foreground">Work Experiences</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {experiences.filter(e => e.visibility === 'public').length}
            </div>
            <div className="text-sm text-muted-foreground">Public</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(experiences.reduce((sum, e) => sum + e.resume_priority, 0) / experiences.length) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Avg Priority</div>
          </Card>
        </div>
      </motion.div>

      {/* Experiences List */}
      <motion.div variants={fadeInUp} className="space-y-4">
        {filteredExperiences.map((experience) => (
          <Card key={experience.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{experience.title}</h3>
                  <Badge className={getCategoryColor(experience.category)}>
                    {experience.category}
                  </Badge>
                  <Badge className={getVisibilityColor(experience.visibility)}>
                    {experience.visibility}
                  </Badge>
                  <Badge variant="outline">
                    Priority: {experience.resume_priority}
                  </Badge>
                </div>

                {experience.organization && (
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    {experience.organization}
                    {experience.location && (
                      <>
                        <MapPin className="h-4 w-4 ml-4 mr-2" />
                        {experience.location}
                      </>
                    )}
                  </div>
                )}

                {(experience.start_date || experience.end_date) && (
                  <div className="flex items-center text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {experience.start_date && new Date(experience.start_date).toLocaleDateString()}
                    {experience.start_date && experience.end_date && ' - '}
                    {experience.end_date ? new Date(experience.end_date).toLocaleDateString() : 'Present'}
                  </div>
                )}

                {experience.public_description && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {experience.public_description}
                  </p>
                )}

                {/* Skills and Technologies */}
                <div className="space-y-2">
                  {experience.skills_developed && experience.skills_developed.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-foreground mr-2">Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {experience.skills_developed.slice(0, 5).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {experience.skills_developed.length > 5 && (
                          <Badge variant="secondary" className="text-xs">
                            +{experience.skills_developed.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {experience.technologies_used && experience.technologies_used.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-foreground mr-2">Technologies:</span>
                      <div className="flex flex-wrap gap-1">
                        {experience.technologies_used.slice(0, 5).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {experience.technologies_used.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{experience.technologies_used.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/experiences/${experience.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/experiences/${experience.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredExperiences.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No experiences found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first experience'
              }
            </p>
            <Button asChild>
              <Link href="/admin/experiences/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Link>
            </Button>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}
