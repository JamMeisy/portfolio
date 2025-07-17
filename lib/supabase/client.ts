import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './database.types';

// Client-side Supabase client
export const createClientSupabaseClient = () => {
  return createClientComponentClient<Database>();
};

// Convenience exports
export const supabaseClient = createClientSupabaseClient;
