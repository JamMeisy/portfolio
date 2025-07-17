'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, FileText, Trash2, Eye, Download, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface MediaFile {
  id: string;
  experience_id: string | null;
  file_path: string;
  file_name: string;
  file_size: number | null;
  media_type: string | null;
  description: string | null;
  alt_text: string | null;
  is_cover_image: boolean;
  created_at: string;
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

export default function MediaManagementPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      experience_id: '1',
      file_path: '/media/project-screenshot-1.png',
      file_name: 'project-screenshot-1.png',
      file_size: 2048576,
      media_type: 'image',
      description: 'Main dashboard screenshot',
      alt_text: 'Dashboard showing analytics and metrics',
      is_cover_image: true,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      experience_id: '1',
      file_path: '/media/architecture-diagram.pdf',
      file_name: 'architecture-diagram.pdf',
      file_size: 1024000,
      media_type: 'document',
      description: 'System architecture documentation',
      alt_text: null,
      is_cover_image: false,
      created_at: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      experience_id: '2',
      file_path: '/media/certificate.pdf',
      file_name: 'aws-certification.pdf',
      file_size: 512000,
      media_type: 'certificate',
      description: 'AWS Solutions Architect Certificate',
      alt_text: null,
      is_cover_image: false,
      created_at: '2024-01-13T09:15:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         false;
    const matchesType = selectedType === 'all' || file.media_type === selectedType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mediaType: string | null) => {
    switch (mediaType) {
      case 'image': return Image;
      case 'document': return FileText;
      case 'certificate': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (mediaType: string | null) => {
    switch (mediaType) {
      case 'image': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-green-100 text-green-800';
      case 'certificate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileUpload = async (files: File[]) => {
    for (const file of files) {
      const fileId = `upload-${Date.now()}-${Math.random()}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);

      // Simulate file upload completion
      setTimeout(() => {
        const newFile: MediaFile = {
          id: fileId,
          experience_id: null,
          file_path: `/media/${file.name}`,
          file_name: file.name,
          file_size: file.size,
          media_type: file.type.startsWith('image/') ? 'image' : 'document',
          description: null,
          alt_text: null,
          is_cover_image: false,
          created_at: new Date().toISOString()
        };

        setMediaFiles(prev => [newFile, ...prev]);
        setUploadProgress(prev => {
          const { [fileId]: removed, ...rest } = prev;
          return rest;
        });
      }, 2500);
    }
  };

  const totalFiles = mediaFiles.length;
  const totalSize = mediaFiles.reduce((sum, file) => sum + (file.file_size || 0), 0);
  const imageCount = mediaFiles.filter(f => f.media_type === 'image').length;
  const documentCount = mediaFiles.filter(f => f.media_type === 'document').length;

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
          <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground">Manage files, images, and documents for your portfolio</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">{totalFiles}</div>
            <div className="text-sm text-muted-foreground">Total Files</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">{formatFileSize(totalSize)}</div>
            <div className="text-sm text-muted-foreground">Total Size</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">{imageCount}</div>
            <div className="text-sm text-muted-foreground">Images</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-foreground">{documentCount}</div>
            <div className="text-sm text-muted-foreground">Documents</div>
          </Card>
        </div>
      </motion.div>

      {/* Upload Area */}
      <motion.div variants={fadeInUp}>
        <Card
          className={`border-2 border-dashed transition-colors ${
            isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Upload Files</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <motion.div variants={fadeInUp}>
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Uploading Files</h3>
            <div className="space-y-2">
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">Uploading...</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div variants={fadeInUp}>
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'image', 'document', 'certificate'].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Media Grid/List */}
      <motion.div variants={fadeInUp}>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => {
              const IconComponent = getFileIcon(file.media_type);
              return (
                <Card key={file.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-square bg-muted flex items-center justify-center relative">
                    {file.media_type === 'image' ? (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Image className="h-12 w-12 text-primary/60" />
                      </div>
                    ) : (
                      <IconComponent className="h-12 w-12 text-muted-foreground" />
                    )}

                    {file.is_cover_image && (
                      <Badge className="absolute top-2 left-2 text-xs">Cover</Badge>
                    )}

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getTypeColor(file.media_type)}>
                        {file.media_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.file_size)}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground truncate mb-1">{file.file_name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {file.description || 'No description'}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="divide-y divide-border">
              {filteredFiles.map((file) => {
                const IconComponent = getFileIcon(file.media_type);
                return (
                  <div key={file.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <IconComponent className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-foreground truncate">{file.file_name}</h3>
                          <Badge className={getTypeColor(file.media_type)}>
                            {file.media_type}
                          </Badge>
                          {file.is_cover_image && (
                            <Badge variant="outline">Cover</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {file.description || 'No description'}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>{new Date(file.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {filteredFiles.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No files found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Upload your first file to get started'
              }
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}
