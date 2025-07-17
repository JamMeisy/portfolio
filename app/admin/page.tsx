'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Users,
  FileText,
  Image,
  Brain,
  Settings,
  TrendingUp,
  Eye,
  Download,
  Calendar,
  Activity
} from 'lucide-react';

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

const stats = [
  {
    title: 'Total Experiences',
    value: '15',
    change: '+2 this month',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    title: 'Media Files',
    value: '47',
    change: '+5 this week',
    icon: Image,
    color: 'text-green-600'
  },
  {
    title: 'AI Resumes Generated',
    value: '23',
    change: '+8 this month',
    icon: Brain,
    color: 'text-purple-600'
  },
  {
    title: 'Site Visitors',
    value: '1,247',
    change: '+12% this week',
    icon: Eye,
    color: 'text-orange-600'
  }
];

const recentActivities = [
  {
    action: 'New experience added',
    item: 'Senior Developer at TechCorp',
    time: '2 hours ago',
    type: 'create'
  },
  {
    action: 'Resume generated',
    item: 'Frontend Developer position',
    time: '5 hours ago',
    type: 'ai'
  },
  {
    action: 'Media uploaded',
    item: 'project-screenshot.png',
    time: '1 day ago',
    type: 'upload'
  },
  {
    action: 'Website content updated',
    item: 'About page',
    time: '2 days ago',
    type: 'edit'
  }
];

const quickActions = [
  {
    title: 'Add Experience',
    description: 'Create a new work or education experience',
    icon: FileText,
    href: '/admin/experiences/new',
    color: 'bg-blue-500'
  },
  {
    title: 'Upload Media',
    description: 'Add images or documents to your portfolio',
    icon: Image,
    href: '/admin/media/upload',
    color: 'bg-green-500'
  },
  {
    title: 'Generate Resume',
    description: 'Create AI-tailored resume for job application',
    icon: Brain,
    href: '/admin/resume/generate',
    color: 'bg-purple-500'
  },
  {
    title: 'Update Content',
    description: 'Edit website sections and content',
    icon: Settings,
    href: '/admin/website',
    color: 'bg-orange-500'
  }
];

export default function AdminDashboard() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your portfolio system.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 justify-start"
                    asChild
                  >
                    <a href={action.href}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${action.color} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {action.description}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    activity.type === 'create' ? 'bg-green-100 text-green-600' :
                    activity.type === 'ai' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <Activity className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {activity.item}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Overview */}
      <motion.div variants={fadeInUp}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Analytics Overview
            </h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <div className="text-sm text-muted-foreground">Page Views</div>
              <div className="text-xs text-green-600">+15% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Resume Downloads</div>
              <div className="text-xs text-green-600">+23% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">42</div>
              <div className="text-sm text-muted-foreground">Contact Form Submissions</div>
              <div className="text-xs text-green-600">+8% from last month</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* System Status */}
      <motion.div variants={fadeInUp}>
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            System Status
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-foreground">Website Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-foreground">Database Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-foreground">AI Service Active</span>
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
