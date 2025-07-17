'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Image, 
  Settings, 
  Globe,
  Brain,
  UserCheck
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Content Management', href: '/admin/content', icon: FileText },
  { name: 'Media Library', href: '/admin/media', icon: Image },
  { name: 'AI Resume Builder', href: '/admin/resume', icon: Brain },
  { name: 'Website Content', href: '/admin/website', icon: Globe },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
        <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-gray-300' : 'text-gray-400'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}