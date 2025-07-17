'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, Download, Sparkles, Target, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

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

interface JobAnalysis {
  requiredSkills: string[];
  preferredSkills: string[];
  seniorityLevel: string;
  companyValues: string[];
  roleType: string;
  industry: string;
  keyResponsibilities: string[];
}

interface GenerationState {
  step: 'input' | 'analyzing' | 'generating' | 'complete' | 'error';
  progress: number;
  currentTask: string;
  jobAnalysis?: JobAnalysis;
  error?: string;
}

export default function AIResumeGeneratorPage() {
  const [formData, setFormData] = useState({
    jobDescription: '',
    targetCompany: '',
    targetRole: '',
    additionalNotes: ''
  });

  const [generationState, setGenerationState] = useState<GenerationState>({
    step: 'input',
    progress: 0,
    currentTask: ''
  });

  const [recentGenerations, setRecentGenerations] = useState([
    {
      id: '1',
      company: 'Google',
      role: 'Senior Frontend Developer',
      generatedAt: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: '2',
      company: 'Microsoft',
      role: 'Full Stack Engineer',
      generatedAt: '2024-01-14T15:45:00Z',
      status: 'completed'
    },
    {
      id: '3',
      company: 'Meta',
      role: 'React Developer',
      generatedAt: '2024-01-13T09:15:00Z',
      status: 'completed'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = async () => {
    setGenerationState({
      step: 'analyzing',
      progress: 10,
      currentTask: 'Analyzing job description with AI...'
    });

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockJobAnalysis: JobAnalysis = {
        requiredSkills: ['React', 'TypeScript', 'Node.js', 'AWS'],
        preferredSkills: ['Next.js', 'GraphQL', 'Docker'],
        seniorityLevel: 'senior',
        companyValues: ['Innovation', 'Collaboration', 'Excellence'],
        roleType: 'Frontend Development',
        industry: 'Technology',
        keyResponsibilities: ['Lead frontend development', 'Mentor junior developers', 'Architect scalable solutions']
      };

      setGenerationState({
        step: 'generating',
        progress: 60,
        currentTask: 'Tailoring resume content to match job requirements...',
        jobAnalysis: mockJobAnalysis
      });

      // Simulate resume generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      setGenerationState({
        step: 'complete',
        progress: 100,
        currentTask: 'Resume generated successfully!',
        jobAnalysis: mockJobAnalysis
      });

      // Add to recent generations
      const newGeneration = {
        id: Date.now().toString(),
        company: formData.targetCompany,
        role: formData.targetRole,
        generatedAt: new Date().toISOString(),
        status: 'completed'
      };
      setRecentGenerations([newGeneration, ...recentGenerations]);

    } catch (error) {
      setGenerationState({
        step: 'error',
        progress: 0,
        currentTask: 'Generation failed',
        error: 'Failed to generate resume. Please try again.'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      jobDescription: '',
      targetCompany: '',
      targetRole: '',
      additionalNotes: ''
    });
    setGenerationState({
      step: 'input',
      progress: 0,
      currentTask: ''
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">AI Resume Generator</h1>
        </div>
        <p className="text-muted-foreground">
          Generate tailored resumes using AI analysis of job descriptions and your experiences
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Generation Form */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <Card className="p-6">
            {generationState.step === 'input' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Job Information</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="targetCompany" className="block text-sm font-medium text-foreground mb-2">
                      Target Company
                    </label>
                    <Input
                      id="targetCompany"
                      name="targetCompany"
                      value={formData.targetCompany}
                      onChange={handleInputChange}
                      placeholder="e.g., Google, Microsoft, Meta"
                    />
                  </div>
                  <div>
                    <label htmlFor="targetRole" className="block text-sm font-medium text-foreground mb-2">
                      Target Role
                    </label>
                    <Input
                      id="targetRole"
                      name="targetRole"
                      value={formData.targetRole}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Frontend Developer"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-foreground mb-2">
                    Job Description *
                  </label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    placeholder="Paste the full job description here..."
                    rows={12}
                    className="resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-foreground mb-2">
                    Additional Notes (Optional)
                  </label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements or preferences..."
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!formData.jobDescription.trim()}
                  size="lg"
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI-Tailored Resume
                </Button>
              </div>
            )}

            {(generationState.step === 'analyzing' || generationState.step === 'generating') && (
              <div className="text-center py-12">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                    style={{
                      background: `conic-gradient(from 0deg, transparent ${100 - generationState.progress}%, hsl(var(--primary)) ${generationState.progress}%)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {generationState.currentTask}
                </h3>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${generationState.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This may take a few moments while our AI analyzes the job requirements...
                </p>
              </div>
            )}

            {generationState.step === 'complete' && generationState.jobAnalysis && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Resume Generated Successfully!</h2>
                </div>

                {/* Job Analysis Results */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">AI Analysis Results</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Role Type:</strong> {generationState.jobAnalysis.roleType}
                    </div>
                    <div>
                      <strong>Seniority:</strong> {generationState.jobAnalysis.seniorityLevel}
                    </div>
                    <div>
                      <strong>Industry:</strong> {generationState.jobAnalysis.industry}
                    </div>
                  </div>

                  <div className="mt-4">
                    <strong>Required Skills:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {generationState.jobAnalysis.requiredSkills.map((skill, idx) => (
                        <Badge key={idx} variant="default" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <strong>Preferred Skills:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {generationState.jobAnalysis.preferredSkills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="flex space-x-4">
                  <Button size="lg" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download DOCX
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <Button variant="outline" onClick={resetForm} className="w-full">
                  Generate Another Resume
                </Button>
              </div>
            )}

            {generationState.step === 'error' && (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Generation Failed</h3>
                <p className="text-muted-foreground mb-6">{generationState.error}</p>
                <Button onClick={resetForm}>Try Again</Button>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent Generations & Tips */}
        <motion.div variants={fadeInUp} className="space-y-6">
          {/* Recent Generations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Generations</h3>
            <div className="space-y-3">
              {recentGenerations.slice(0, 5).map((generation) => (
                <div key={generation.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground text-sm">{generation.company}</div>
                    <div className="text-xs text-muted-foreground">{generation.role}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(generation.generatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              <Target className="h-5 w-5 inline mr-2" />
              Tips for Better Results
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Include the complete job description for more accurate analysis</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Provide specific company and role names for better tailoring</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Review and update your experiences regularly for best results</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>The AI learns from successful applications to improve over time</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
