import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          full_name: string | null;
          avatar_url: string | null;
          telegram_chat_id: string | null;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          telegram_chat_id?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          telegram_chat_id?: string | null;
        };
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          exchange: string;
          api_key: string;
          api_secret: string;
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          exchange: string;
          api_key: string;
          api_secret: string;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          exchange?: string;
          api_key?: string;
          api_secret?: string;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
      };
      trades: {
        Row: {
          id: string;
          user_id: string;
          symbol: string;
          side: 'BUY' | 'SELL';
          quantity: number;
          price: number;
          status: 'OPEN' | 'CLOSED' | 'CANCELLED';
          created_at: string;
          updated_at: string;
          closed_at: string | null;
          pnl: number | null;
          pnl_percentage: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          symbol: string;
          side: 'BUY' | 'SELL';
          quantity: number;
          price: number;
          status?: 'OPEN' | 'CLOSED' | 'CANCELLED';
          created_at?: string;
          updated_at?: string;
          closed_at?: string | null;
          pnl?: number | null;
          pnl_percentage?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          symbol?: string;
          side?: 'BUY' | 'SELL';
          quantity?: number;
          price?: number;
          status?: 'OPEN' | 'CLOSED' | 'CANCELLED';
          created_at?: string;
          updated_at?: string;
          closed_at?: string | null;
          pnl?: number | null;
          pnl_percentage?: number | null;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
          status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
          created_at: string;
          updated_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
          status?: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
          created_at?: string;
          updated_at?: string;
          expires_at: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan?: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
          status?: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
          created_at?: string;
          updated_at?: string;
          expires_at?: string;
        };
      };
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
