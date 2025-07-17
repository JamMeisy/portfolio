'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Database, Globe, Shield, Save, RefreshCw, Download, Upload } from 'lucide-react';
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

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'hello@johndoe.dev',
      title: 'Full Stack Developer & AI Enthusiast',
      bio: 'Passionate developer creating digital experiences that make a difference.',
      location: 'San Francisco, CA',
      timezone: 'America/Los_Angeles'
    },
    ai: {
      openaiApiKey: '••••••••••••••••',
      model: 'gpt-4',
      temperature: 0.3,
      maxTokens: 2000,
      enableLearning: true,
      autoArchive: true
    },
    website: {
      siteName: 'John Doe Portfolio',
      siteUrl: 'https://johndoe.dev',
      metaDescription: 'Full Stack Developer specializing in modern web technologies and AI applications.',
      analytics: 'GA_MEASUREMENT_ID',
      enableSEO: true,
      enableAnalytics: true
    },
    deployment: {
      autoRebuild: true,
      webhookUrl: 'https://api.vercel.com/v1/webhooks/••••••••',
      buildCommand: 'npm run build',
      outputDirectory: 'out',
      enableCDN: true
    }
  });

  const handleSave = async (category: string) => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    // Show success message
  };

  const handleExportData = () => {
    const data = {
      experiences: [],
      media: [],
      content: [],
      settings: settings,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'ai', label: 'AI Settings', icon: Settings },
    { id: 'website', label: 'Website', icon: Globe },
    { id: 'deployment', label: 'Deployment', icon: Database }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your portfolio system configuration</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeInUp}>
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <motion.div variants={fadeInUp} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <Input
                  value={settings.profile.name}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, name: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, email: e.target.value }
                  })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Professional Title</label>
                <Input
                  value={settings.profile.title}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, title: e.target.value }
                  })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <Textarea
                  rows={3}
                  value={settings.profile.bio}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, bio: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <Input
                  value={settings.profile.location}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, location: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                <select
                  value={settings.profile.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, timezone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => handleSave('profile')} disabled={saving}>
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* AI Settings */}
      {activeTab === 'ai' && (
        <motion.div variants={fadeInUp} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">AI Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">OpenAI API Key</label>
                <Input
                  type="password"
                  value={settings.ai.openaiApiKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    ai: { ...settings.ai, openaiApiKey: e.target.value }
                  })}
                  placeholder="sk-..."
                />
                <p className="text-xs text-muted-foreground mt-1">Required for AI resume generation</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Model</label>
                  <select
                    value={settings.ai.model}
                    onChange={(e) => setSettings({
                      ...settings,
                      ai: { ...settings.ai, model: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Temperature</label>
                  <Input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.ai.temperature}
                    onChange={(e) => setSettings({
                      ...settings,
                      ai: { ...settings.ai, temperature: parseFloat(e.target.value) }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Max Tokens</label>
                  <Input
                    type="number"
                    value={settings.ai.maxTokens}
                    onChange={(e) => setSettings({
                      ...settings,
                      ai: { ...settings.ai, maxTokens: parseInt(e.target.value) }
                    })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.ai.enableLearning}
                    onChange={(e) => setSettings({
                      ...settings,
                      ai: { ...settings.ai, enableLearning: e.target.checked }
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Enable AI Learning</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.ai.autoArchive}
                    onChange={(e) => setSettings({
                      ...settings,
                      ai: { ...settings.ai, autoArchive: e.target.checked }
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Auto-archive Patterns</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => handleSave('ai')} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                Save AI Settings
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Website Settings */}
      {activeTab === 'website' && (
        <motion.div variants={fadeInUp} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Website Configuration</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Site Name</label>
                  <Input
                    value={settings.website.siteName}
                    onChange={(e) => setSettings({
                      ...settings,
                      website: { ...settings.website, siteName: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Site URL</label>
                  <Input
                    value={settings.website.siteUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      website: { ...settings.website, siteUrl: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Meta Description</label>
                <Textarea
                  rows={2}
                  value={settings.website.metaDescription}
                  onChange={(e) => setSettings({
                    ...settings,
                    website: { ...settings.website, metaDescription: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Google Analytics ID</label>
                <Input
                  value={settings.website.analytics}
                  onChange={(e) => setSettings({
                    ...settings,
                    website: { ...settings.website, analytics: e.target.value }
                  })}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.website.enableSEO}
                    onChange={(e) => setSettings({
                      ...settings,
                      website: { ...settings.website, enableSEO: e.target.checked }
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Enable SEO Optimization</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.website.enableAnalytics}
                    onChange={(e) => setSettings({
                      ...settings,
                      website: { ...settings.website, enableAnalytics: e.target.checked }
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Enable Analytics</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => handleSave('website')} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                Save Website Settings
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Deployment Settings */}
      {activeTab === 'deployment' && (
        <motion.div variants={fadeInUp} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Deployment Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Webhook URL</label>
                <Input
                  type="password"
                  value={settings.deployment.webhookUrl}
                  onChange={(e) => setSettings({
                    ...settings,
                    deployment: { ...settings.deployment, webhookUrl: e.target.value }
                  })}
                  placeholder="https://api.vercel.com/v1/webhooks/..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Build Command</label>
                  <Input
                    value={settings.deployment.buildCommand}
                    onChange={(e) => setSettings({
                      ...settings,
                      deployment: { ...settings.deployment, buildCommand: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Output Directory</label>
                  <Input
                    value={settings.deployment.outputDirectory}
                    onChange={(e) => setSettings({
                      ...settings,
                      deployment: { ...settings.deployment, outputDirectory: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.deployment.autoRebuild}
                    onChange={(e) => setSettings({
                      ...settings,
                      deployment: { ...settings.deployment, autoRebuild: e.target.checked }
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Auto-rebuild on Changes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.deployment.enableCDN}
                    onChange={(e) => setSettings({
                      ...settings,
                      deployment: { ...settings.deployment, enableCDN: e.target.checked }
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Enable CDN</span>
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Test Webhook
              </Button>
              <Button onClick={() => handleSave('deployment')} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                Save Deployment Settings
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* System Status */}
      <motion.div variants={fadeInUp}>
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">System Status</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-foreground">Database Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-foreground">AI Service Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-foreground">Website Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-foreground">Backup Pending</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
