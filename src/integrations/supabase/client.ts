
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jtdoaifkpdfgbradsxfg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZG9haWZrcGRmZ2JyYWRzeGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzEwMzUsImV4cCI6MjA2NDIwNzAzNX0.9ubDjsSm3pppuZ0gCOZ8onNceWsdWDVqzKGxoE2vEsU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
