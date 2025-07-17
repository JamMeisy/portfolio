import { createServerComponentClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from './database.types';

// Server-side Supabase client
export const createServerSupabaseClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({
    cookies: () => cookieStore
  });
};

// Client-side Supabase client
export const createClientSupabaseClient = () => {
  return createClientComponentClient<Database>();
};

// Convenience exports
export const supabaseServer = createServerSupabaseClient;
export const supabaseClient = createClientSupabaseClient;
