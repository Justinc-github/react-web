// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vuokvekrxsebdsxfhmup.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1b2t2ZWtyeHNlYmRzeGZobXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNDQ4MDcsImV4cCI6MjA2MTcyMDgwN30.ujwotqfcfdebStV5As-wSQdYEUhEJMUv5ecr73b2AoM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
