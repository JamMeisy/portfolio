'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Briefcase,
  GraduationCap,
  Award,
  Book,
  Users,
  FileText,
  Bookmark,
  Star,
  Building,
  Code,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Tag,
  ExternalLink
} from 'lucide-react';

// Define content entity types matching our schema
const entityTypes = [
  { type: 'work', label: 'Work Experience', icon: Briefcase, color: 'bg-blue-500' },
  { type: 'project', label: 'Projects', icon: Bookmark, color: 'bg-green-500' },
  { type: 'education', label: 'Education', icon: GraduationCap, color: 'bg-purple-500' },
  { type: 'certification', label: 'Certifications', icon: Award, color: 'bg-orange-500' },
  { type: 'volunteer', label: 'Volunteer Work', icon: Users, color: 'bg-pink-500' },
  { type: 'publication', label: 'Publications', icon: FileText, color: 'bg-indigo-500' },
  { type: 'award', label: 'Awards', icon: Star, color: 'bg-yellow-500' },
  { type: 'course', label: 'Courses', icon: Book, color: 'bg-cyan-500' },
  { type: 'organization', label: 'Organizations', icon: Building, color: 'bg-red-500' },
  { type: 'skill', label: 'Skills', icon: Code, color: 'bg-emerald-500' }
];

interface ContentEntity {
  id: string;
  entity_type: string;
  title: string;
  organization?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  short_description?: string;
  skills?: string[];
  technologies?: string[];
  achievements?: string[];
  urls?: Record<string, string>;
  display_order: number;
  is_featured: boolean;
  is_visible: boolean;
  resume_priority: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ContentManagement() {
  const [entities, setEntities] = useState<ContentEntity[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingEntity, setEditingEntity] = useState<ContentEntity | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const response = await fetch('/api/admin/content-entities');
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error('Error fetching entities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEntities = entities.filter(entity => {
    const matchesType = selectedType === 'all' || entity.entity_type === selectedType;
    const matchesSearch = entity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const response = await fetch(`/api/admin/content-entities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_visible: !currentVisibility })
      });
      
      if (response.ok) {
        setEntities(entities.map(entity => 
          entity.id === id ? { ...entity, is_visible: !currentVisibility } : entity
        ));
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/admin/content-entities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !currentFeatured })
      });
      
      if (response.ok) {
        setEntities(entities.map(entity => 
          entity.id === id ? { ...entity, is_featured: !currentFeatured } : entity
        ));
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const deleteEntity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entity?')) return;
    
    try {
      const response = await fetch(`/api/admin/content-entities/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setEntities(entities.filter(entity => entity.id !== id));
      }
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  const getEntityTypeConfig = (type: string) => 
    entityTypes.find(et => et.type === type) || entityTypes[0];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">
            Manage your LinkedIn-style content entities
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="glass-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp}>
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title, organization, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="type-filter">Content Type</Label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="all">All Types</option>
                {entityTypes.map(type => (
                  <option key={type.type} value={type.type}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Content Types Overview */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {entityTypes.map(type => {
            const count = entities.filter(e => e.entity_type === type.type).length;
            const Icon = type.icon;
            return (
              <Card 
                key={type.type}
                className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                  selectedType === type.type ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedType(selectedType === type.type ? 'all' : type.type)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${type.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{count} items</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Content Entities List */}
      <motion.div variants={fadeInUp}>
        <div className="space-y-4">
          {filteredEntities.map((entity) => {
            const typeConfig = getEntityTypeConfig(entity.entity_type);
            const Icon = typeConfig.icon;
            
            return (
              <Card key={entity.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-lg ${typeConfig.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{entity.title}</h3>
                        {entity.is_featured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {!entity.is_visible && (
                          <Badge variant="destructive">Hidden</Badge>
                        )}
                      </div>
                      
                      {entity.organization && (
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Building className="h-4 w-4 mr-1" />
                          {entity.organization}
                        </div>
                      )}
                      
                      {(entity.start_date || entity.location) && (
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          {entity.start_date && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(entity.start_date)}
                              {entity.end_date && !entity.is_current && ` - ${formatDate(entity.end_date)}`}
                              {entity.is_current && ' - Present'}
                            </div>
                          )}
                          {entity.location && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {entity.location}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {entity.short_description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {entity.short_description}
                        </p>
                      )}
                      
                      {entity.technologies && entity.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {entity.technologies.slice(0, 5).map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {entity.technologies.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{entity.technologies.length - 5} more
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {entity.urls && Object.keys(entity.urls).length > 0 && (
                        <div className="flex space-x-2 mb-2">
                          {Object.entries(entity.urls).map(([key, url]) => (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              {key}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleVisibility(entity.id, entity.is_visible)}
                    >
                      {entity.is_visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(entity.id, entity.is_featured)}
                    >
                      <Star className={`h-4 w-4 ${entity.is_featured ? 'text-yellow-500 fill-current' : ''}`} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingEntity(entity)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntity(entity.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {filteredEntities.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No content found</h3>
              <p className="text-sm">
                {selectedType === 'all' 
                  ? "Get started by creating your first content entity."
                  : `No ${getEntityTypeConfig(selectedType).label.toLowerCase()} found.`
                }
              </p>
              <Button onClick={() => setShowCreateForm(true)} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}