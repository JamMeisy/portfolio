'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Edit, Globe, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface WebsiteSection {
  id: string;
  section: string;
  title: string | null;
  content: string | null;
  metadata: any;
  is_published: boolean;
  last_updated: string;
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

export default function WebsiteContentPage() {
  const [sections, setSections] = useState<WebsiteSection[]>([
    {
      id: '1',
      section: 'hero',
      title: 'Hero Section',
      content: JSON.stringify({
        name: 'John Doe',
        tagline: 'Full Stack Developer & AI Enthusiast',
        description: 'I craft digital experiences that bridge creativity and functionality. Specializing in modern web technologies and AI-powered applications.',
        ctaText: 'View My Work'
      }),
      metadata: { editable: ['name', 'tagline', 'description', 'ctaText'] },
      is_published: true,
      last_updated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      section: 'about',
      title: 'About Section',
      content: JSON.stringify({
        title: 'About Me',
        subtitle: 'A passionate developer who loves creating meaningful digital experiences',
        biography: 'Hi! I\'m John, a full-stack developer with a passion for creating digital experiences that make a difference. With over 4 years of experience in the industry, I\'ve had the privilege of working with startups and established companies alike.',
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker']
      }),
      metadata: { editable: ['title', 'subtitle', 'biography', 'skills'] },
      is_published: true,
      last_updated: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      section: 'contact',
      title: 'Contact Information',
      content: JSON.stringify({
        email: 'hello@johndoe.dev',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        social: {
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          twitter: 'https://twitter.com/johndoe'
        }
      }),
      metadata: { editable: ['email', 'phone', 'location', 'social'] },
      is_published: true,
      last_updated: '2024-01-13T09:15:00Z'
    }
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [lastBuild, setLastBuild] = useState('2024-01-15T12:00:00Z');
  const [building, setBuilding] = useState(false);

  const startEditing = (section: WebsiteSection) => {
    setEditingSection(section.id);
    try {
      const parsedContent = JSON.parse(section.content || '{}');
      setEditForm(parsedContent);
    } catch (error) {
      setEditForm({});
    }
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditForm({});
  };

  const saveSection = async (sectionId: string) => {
    setSaving(sectionId);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? {
            ...section,
            content: JSON.stringify(editForm),
            last_updated: new Date().toISOString()
          }
        : section
    ));

    setSaving(null);
    setEditingSection(null);
    setEditForm({});
  };

  const togglePublished = async (sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? {
            ...section,
            is_published: !section.is_published,
            last_updated: new Date().toISOString()
          }
        : section
    ));
  };

  const rebuildSite = async () => {
    setBuilding(true);

    // Simulate site rebuild
    await new Promise(resolve => setTimeout(resolve, 3000));

    setLastBuild(new Date().toISOString());
    setBuilding(false);
  };

  const renderEditForm = (section: WebsiteSection) => {
    const editableFields = section.metadata?.editable || [];

    return (
      <div className="space-y-4">
        {editableFields.map((field: string) => {
          const value = editForm[field];

          if (field === 'skills' && Array.isArray(value)) {
            return (
              <div key={field}>
                <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                  {field}
                </label>
                <Input
                  value={value.join(', ')}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    [field]: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Enter skills separated by commas"
                />
              </div>
            );
          }

          if (field === 'social' && typeof value === 'object') {
            return (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                  Social Links
                </label>
                {Object.entries(value).map(([platform, url]) => (
                  <div key={platform}>
                    <label className="block text-xs text-muted-foreground mb-1 capitalize">
                      {platform}
                    </label>
                    <Input
                      value={url as string}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        [field]: {
                          ...value,
                          [platform]: e.target.value
                        }
                      })}
                      placeholder={`${platform} URL`}
                    />
                  </div>
                ))}
              </div>
            );
          }

          if (field === 'biography' || field === 'description') {
            return (
              <div key={field}>
                <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                  {field}
                </label>
                <Textarea
                  value={value || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    [field]: e.target.value
                  })}
                  rows={4}
                  placeholder={`Enter ${field}`}
                />
              </div>
            );
          }

          return (
            <div key={field}>
              <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <Input
                value={value || ''}
                onChange={(e) => setEditForm({
                  ...editForm,
                  [field]: e.target.value
                })}
                placeholder={`Enter ${field}`}
              />
            </div>
          );
        })}

        <div className="flex space-x-2 pt-4">
          <Button
            onClick={() => saveSection(section.id)}
            disabled={saving === section.id}
          >
            {saving === section.id ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
          <Button variant="outline" onClick={cancelEditing}>
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  const renderSectionPreview = (section: WebsiteSection) => {
    try {
      const content = JSON.parse(section.content || '{}');

      return (
        <div className="space-y-3">
          {Object.entries(content).map(([key, value]) => {
            if (Array.isArray(value)) {
              return (
                <div key={key}>
                  <strong className="text-sm text-foreground capitalize">{key}:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {value.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            }

            if (typeof value === 'object' && value !== null) {
              return (
                <div key={key}>
                  <strong className="text-sm text-foreground capitalize">{key}:</strong>
                  <div className="ml-4 mt-1 space-y-1">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey} className="text-sm">
                        <span className="text-muted-foreground capitalize">{subKey}:</span>{' '}
                        <span className="text-foreground">{subValue as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={key}>
                <strong className="text-sm text-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </strong>{' '}
                <span className="text-muted-foreground">{value as string}</span>
              </div>
            );
          })}
        </div>
      );
    } catch (error) {
      return (
        <div className="text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 inline mr-1" />
          Error parsing content
        </div>
      );
    }
  };

  const publishedCount = sections.filter(s => s.is_published).length;

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
          <h1 className="text-3xl font-bold text-foreground">Website Content</h1>
          <p className="text-muted-foreground">Manage and edit your portfolio website content</p>
        </div>
        <Button
          onClick={rebuildSite}
          disabled={building}
          className="bg-primary hover:bg-primary/90"
        >
          {building ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
              Building...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Rebuild Site
            </>
          )}
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">{sections.length}</div>
            <div className="text-sm text-muted-foreground">Total Sections</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">{publishedCount}</div>
            <div className="text-sm text-muted-foreground">Published</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm font-medium text-foreground">Last Build</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(lastBuild).toLocaleString()}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Content Sections */}
      <motion.div variants={fadeInUp} className="space-y-6">
        {sections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
                  <Badge
                    variant={section.is_published ? 'default' : 'secondary'}
                    className={section.is_published ? 'bg-green-600' : ''}
                  >
                    {section.is_published ? 'Published' : 'Draft'}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {section.section}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublished(section.id)}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    {section.is_published ? 'Unpublish' : 'Publish'}
                  </Button>

                  {editingSection === section.id ? (
                    <Button variant="outline" size="sm" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => startEditing(section)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground mb-4">
                Last updated: {new Date(section.last_updated).toLocaleString()}
              </div>

              {editingSection === section.id ? (
                renderEditForm(section)
              ) : (
                <div className="bg-muted/50 rounded-lg p-4">
                  {renderSectionPreview(section)}
                </div>
              )}
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Instructions */}
      <motion.div variants={fadeInUp}>
        <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-foreground mb-2 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            Publishing Instructions
          </h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Make changes to any section using the Edit button</p>
            <p>• Use Publish/Unpublish to control section visibility</p>
            <p>• Click "Rebuild Site" to deploy changes to the public website</p>
            <p>• Published sections will be visible to visitors after rebuild</p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
