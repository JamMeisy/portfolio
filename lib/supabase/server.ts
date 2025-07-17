import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './database.types';

export function createServerSupabaseClient() {
  const cookieStore = cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

export async function getPublicExperiences() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('experiences')
    .select('*, media_files(*)')
    .eq('is_visible', true)
    .order('start_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching public experiences:', error);
    return [];
  }
  
  return data || [];
}

export async function getWebsiteContent() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('website_content')
    .select('*')
    .eq('is_published', true);
    
  if (error) {
    console.error('Error fetching website content:', error);
    return [];
  }
  
  return data || [];
}

export async function getPersonalInfo() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('personal_info')
    .select('*')
    .single();
    
  if (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }
  
  return data;
}

export async function getPublicEducation() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('education')
    .select('*, media_files(*)')
    .eq('is_visible', true)
    .order('start_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching education:', error);
    return [];
  }
  
  return data || [];
}

export async function getPublicProjects() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*, media_files(*)')
    .eq('is_visible', true)
    .order('start_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data || [];
}

export async function getPublicAwards() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('awards')
    .select('*, media_files(*)')
    .eq('is_visible', true)
    .order('date_received', { ascending: false });
    
  if (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
  
  return data || [];
}

export async function getPublicSkills() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });
    
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  
  return data || [];
}