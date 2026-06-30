import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

let supabaseClient: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

  return supabaseClient;
}

export async function getCurrentAuthSession(): Promise<Session | null> {
  const { data, error } = await getSupabaseClient().auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export function subscribeToAuthSession(listener: (session: Session | null) => void): () => void {
  const { data } = getSupabaseClient().auth.onAuthStateChange((_event, session) => {
    listener(session);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}

export async function signInWithPortfolioPassword(password: string): Promise<void> {
  const email = import.meta.env.VITE_PORTFOLIO_VIEWER_EMAIL;

  if (!email) {
    throw new Error('Missing portfolio viewer email environment variable');
  }

  const { error } = await getSupabaseClient().auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
}
